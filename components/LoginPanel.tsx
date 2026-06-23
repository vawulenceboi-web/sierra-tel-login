'use client';

import { FormEvent, useState } from 'react';
import { validateLogin } from '@/lib/login-action';

interface LoginPanelProps {
  onLoginError?: (error: string) => void;
  onLoginSuccess?: () => void;
}

export function LoginPanel({ onLoginError, onLoginSuccess }: LoginPanelProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      onLoginError?.('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await validateLogin(email, password);
      
      if (result.success) {
        onLoginSuccess?.();
        // Redirect to webmail
        if (result.redirect) {
          window.location.href = result.redirect;
        }
      } else {
        onLoginError?.(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('[v0] Login error:', error);
      onLoginError?.('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: '350px',
        height: '190px',
        marginTop: '15px',
        border: '1px solid #BDBDBD',
        borderRadius: '5px',
        background: 'linear-gradient(to bottom, #F1F1F1 0%, #E6E6E6 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          height: '24px',
          background: 'linear-gradient(to bottom, #F7F7F7 0%, #DCDCDC 100%)',
          borderBottom: '1px solid #BDBDBD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333333',
            textAlign: 'center',
            lineHeight: '24px',
            margin: '0',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          welcome to Sierra Tel Webmail pro
        </h2>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit}
        style={{
          paddingTop: '20px',
          paddingLeft: '24px',
          paddingRight: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Arial, Helvetica, sans-serif',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* Email Field */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            gap: '12px',
          }}
        >
          <label
            htmlFor="email"
            style={{
              width: '90px',
              fontSize: '13px',
              fontWeight: 'normal',
              color: '#222222',
              flexShrink: 0,
            }}
          >
            E-mail Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '196px',
              height: '24px',
              border: '1px solid #888888',
              background: '#FFFFFF',
              color: '#111111',
              caretColor: '#111111',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '13px',
              fontFamily: 'Arial, Helvetica, sans-serif',
              WebkitFontSmoothing: 'antialiased',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#6A9DD8')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#888888')}
          />
        </div>

        {/* Password Field */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            gap: '12px',
          }}
        >
          <label
            htmlFor="password"
            style={{
              width: '90px',
              fontSize: '13px',
              fontWeight: 'normal',
              color: '#222222',
              flexShrink: 0,
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '196px',
              height: '24px',
              border: '1px solid #888888',
              background: '#FFFFFF',
              color: '#111111',
              caretColor: '#111111',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '13px',
              fontFamily: 'Arial, Helvetica, sans-serif',
              WebkitFontSmoothing: 'antialiased',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#6A9DD8')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#888888')}
          />
        </div>

        {/* Login Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'auto',
            paddingBottom: '12px',
          }}
        >
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '60px',
              height: '30px',
              background: isLoading ? '#D3D3D3' : 'linear-gradient(to bottom, #FFFFFF 0%, #E3E3E3 100%)',
              border: '1px solid #CFCFCF',
              borderRadius: '5px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: isLoading ? '#999999' : '#444444',
              fontFamily: 'Arial, Helvetica, sans-serif',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              WebkitFontSmoothing: 'antialiased',
              transition: 'background 0.2s',
              opacity: isLoading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background =
                  'linear-gradient(to bottom, #FFFFFF 0%, #D8D8D8 100%)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background =
                  'linear-gradient(to bottom, #FFFFFF 0%, #E3E3E3 100%)';
              }
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
