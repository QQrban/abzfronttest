import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  disabled: boolean;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export default function Button({
  text,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {text}
    </button>
  );
}
