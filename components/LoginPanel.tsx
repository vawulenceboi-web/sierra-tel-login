'use client';

import { FormEvent, useState } from 'react';

export function LoginPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login
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
          Welcome to Sierra Tel Webmail
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
            style={{
              width: '60px',
              height: '30px',
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #E3E3E3 100%)',
              border: '1px solid #CFCFCF',
              borderRadius: '5px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#444444',
              fontFamily: 'Arial, Helvetica, sans-serif',
              cursor: 'pointer',
              WebkitFontSmoothing: 'antialiased',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to bottom, #FFFFFF 0%, #D8D8D8 100%)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(to bottom, #FFFFFF 0%, #E3E3E3 100%)')
            }
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
