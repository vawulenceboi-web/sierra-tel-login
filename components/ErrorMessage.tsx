interface ErrorMessageProps {
  message?: string;
  show?: boolean;
}

export function ErrorMessage({ message, show = false }: ErrorMessageProps) {
  if (!show || !message) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Warning Icon */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M7 0L0 14h14L7 0zm0 11.5a0.75 0.75 0 1 1 0-1.5 0.75 0.75 0 0 1 0 1.5zm0-3a0.5 0.5 0 0 1-.5-.5V4a.5.5 0 0 1 1 0v4a0.5 0.5 0 0 1-.5.5z"
          fill="#E53935"
        />
      </svg>

      {/* Error Text */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#D62828',
        }}
      >
        {message}
      </span>
    </div>
  );
}
