import { Logo } from "../../images";
import "./Header.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="header-container">
      <Logo />
      <div className="header-button__container">
        <ConnectButton chainStatus="icon" />
      </div>
    </header>
  );
}
