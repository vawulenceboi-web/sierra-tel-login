export function FooterSection() {
  return (
    <div
      style={{
        width: '350px',
        height: '44px',
        background: '#FAFAFA',
        borderRadius: '8px',
        marginTop: '42px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <p
        style={{
          fontSize: '12px',
          color: '#333333',
          margin: '0 0 4px 0',
          textAlign: 'center',
        }}
      >
        © Copyright 2009-2026{' '}
        <a
          href="https://www.linuxmagic.com"
          style={{
            color: '#333333',
            textDecoration: 'none',
          }}
        >
          LinuxMagic Inc.
        </a>{' '}
        All Rights Reserved
      </p>
      <a
        href="https://www.magicmail.com"
        style={{
          fontSize: '12px',
          color: '#1E73BE',
          textDecoration: 'underline',
          textAlign: 'center',
        }}
      >
        www.magicmail.com
      </a>
    </div>
  );
}
