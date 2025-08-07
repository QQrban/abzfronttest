import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  disabled: boolean;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  text,
  onClick,
  disabled,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${className ?? ""}`}
    >
      {text}
    </button>
  );
}
