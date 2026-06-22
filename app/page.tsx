export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#D3D3D3' }}>
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-3 mb-2">
          <svg width="60" height="60" viewBox="0 0 60 60" className="flex-shrink-0">
            {/* Blue stripes logo */}
            <polygon points="15,15 20,15 30,45 25,45" fill="#0066CC" />
            <polygon points="22,15 27,15 37,45 32,45" fill="#0099FF" />
            <polygon points="29,15 34,15 44,45 39,45" fill="#33CCFF" />
            <polygon points="36,15 41,15 51,45 46,45" fill="#0088DD" />
          </svg>
          <div className="text-4xl font-bold tracking-wider" style={{ color: '#333333', letterSpacing: '0.05em' }}>
            SIERRA TEL
          </div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-md">
        <div style={{ backgroundColor: '#C0C0C0', border: '2px solid #A9A9A9', borderRadius: '4px' }}>
          {/* Form Header */}
          <div style={{ backgroundColor: '#D3D3D3', borderBottom: '1px solid #999', padding: '8px 16px' }}>
            <h1 className="text-center font-bold text-base" style={{ color: '#333' }}>Welcome to Sierra Tel Webmail</h1>
          </div>

          {/* Form Content */}
          <div style={{ backgroundColor: '#E8E8E8', padding: '24px 32px' }}>
            <form className="space-y-6">
              {/* Email Address Field */}
              <div className="flex items-center gap-4">
                <label htmlFor="email" className="text-sm flex-shrink-0 w-28" style={{ color: '#333' }}>
                  E-mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="flex-1 px-3 py-2 border text-sm focus:outline-none"
                  style={{ borderColor: '#999', backgroundColor: '#F5F5F5', color: '#333' }}
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center gap-4">
                <label htmlFor="password" className="text-sm flex-shrink-0 w-28" style={{ color: '#333' }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="flex-1 px-3 py-2 border text-sm focus:outline-none"
                  style={{ borderColor: '#999', backgroundColor: '#F5F5F5', color: '#333' }}
                />
              </div>

              {/* Login Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-2 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#C0C0C0', border: '2px outset #DFDFDF', color: '#333' }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Error Message */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0">
              <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              <path d="M7 3h2v6H7zm0 8h2v2H7z" />
            </svg>
            Your session is invalid or expired.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-xs text-gray-600">
        <p>
          © Copyright 2009-2026{' '}
          <a href="https://www.linuxmagic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            LinuxMagic Inc.
          </a>
          {' '}All Rights Reserved
        </p>
        <p className="mt-1">
          <a href="https://www.magicmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            www.magicmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
