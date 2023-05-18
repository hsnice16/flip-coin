import { Logo } from "../../images";
import "./Header.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="header-container">
      <img src={Logo} alt="Morty Logo" className="logo" />
      <div className="header-button__container">
        <ConnectButton chainStatus="icon" />
      </div>
    </header>
  );
}
