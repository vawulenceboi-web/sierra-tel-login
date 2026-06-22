export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-12">
        <svg width="140" height="70" viewBox="0 0 280 140" className="mb-4">
          {/* Blue stripes for logo */}
          <polygon points="80,30 95,30 110,70 95,70" fill="#0066CC" />
          <polygon points="105,30 120,30 135,70 120,70" fill="#0099FF" />
          <polygon points="92,35 107,35 115,70 100,70" fill="#33AAFF" />
          <polygon points="120,32 135,32 145,70 130,70" fill="#0080CC" />
          {/* Text SIERRA TEL */}
          <text x="155" y="70" fontFamily="Georgia, serif" fontSize="52" fontWeight="bold" fill="#000">SIERRA TEL</text>
        </svg>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-md">
        <div className="bg-gray-200 border-2 border-gray-400 rounded">
          {/* Form Header */}
          <div className="bg-gray-300 border-b-2 border-gray-400 px-6 py-3">
            <h1 className="text-center font-bold text-gray-800 text-base">Welcome to Sierra Tel Webmail</h1>
          </div>

          {/* Form Content */}
          <div className="bg-gray-100 px-8 py-8">
            <form className="space-y-6">
              {/* Email Address Field */}
              <div className="flex items-center gap-4">
                <label htmlFor="email" className="text-sm text-gray-700 w-28 flex-shrink-0">
                  E-mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="flex-1 px-3 py-2 border border-gray-400 bg-white text-sm focus:outline-none"
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center gap-4">
                <label htmlFor="password" className="text-sm text-gray-700 w-28 flex-shrink-0">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="flex-1 px-3 py-2 border border-gray-400 bg-white text-sm focus:outline-none"
                />
              </div>

              {/* Login Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-2 bg-gray-200 border-2 border-gray-400 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors cursor-pointer"
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
