import "./Button.css";

export function Button({ children, className }) {
  return <button className={`button ${className}`}>{children}</button>;
}
