import styles from "./Header.module.scss";
import Button from "../ui/Button/Button";
import logo from "../../assets/logo.svg";

interface HeaderProps {
  onNavigate: (section: "users" | "signup") => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <div>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className={styles.headerButtonGroup}>
          <Button
            onClick={() => onNavigate("users")}
            disabled={false}
            type="button"
            text="Users"
          />
          <Button
            onClick={() => onNavigate("signup")}
            disabled={false}
            type="button"
            text="Sign up"
          />
        </div>
      </div>
    </header>
  );
}
