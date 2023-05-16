import { Logo } from "../../images";
import { Button } from "../index";
import "./Header.css";

export function Header() {
  return (
    <header className="header-container">
      <Logo />
      <div className="header-button__container">
        <Button className="button-connect__wallet">Connect Wallet</Button>
      </div>
    </header>
  );
}
