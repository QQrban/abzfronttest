import styles from "./InputField.module.scss";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  type?: string;
}

export default function InputField({
  label,
  name,
  value,
  onChange,
  error = false,
  helperText = "",
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <div
        className={`${styles.outlinedInput} ${error ? styles.error : ""}`}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
        />
        <label htmlFor={name}>{label}</label>
      </div>

      {helperText && (
        <span
          className={`${styles.helperText} ${
            error ? styles["helperText--error"] : ""
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
