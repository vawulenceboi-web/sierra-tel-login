export function LogoSection() {
  return (
    <div
      style={{
        marginTop: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      {/* Logo Icon */}
      <svg width="70" height="55" viewBox="0 0 70 55" style={{ flexShrink: 0 }}>
        {/* Blue triangular stripes */}
        <polygon points="0,55 20,0 25,0 5,55" fill="#0096DD" />
        <polygon points="18,55 38,0 43,0 23,55" fill="#0088CC" />
        <polygon points="36,55 56,0 61,0 41,55" fill="#007BC0" />
      </svg>

      {/* Company Name with underline */}
      <div>
        <h1
          style={{
            fontFamily: '"Times New Roman", serif',
            fontSize: '28px',
            fontWeight: 'normal',
            color: '#111111',
            letterSpacing: '0',
            margin: '0 0 4px 0',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          SIERRA TEL
        </h1>
        <div
          style={{
            height: '2px',
            background: '#2C89D9',
            width: '170px',
          }}
        />
      </div>
    </div>
  );
}
