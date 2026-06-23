'use server';

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
      return { success: false, error: 'Your session is invalid or expired.' };
    }

    // Login successful
    return { success: true, redirect: response.url };
  } catch (error) {
    console.error('[v0] Login error:', error);
    return { 
      success: false, 
      error: 'Unable to connect to the server. Please try again.' 
    };
  }
}
