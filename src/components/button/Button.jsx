import "./Button.css";

export function Button({ children, className, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}
