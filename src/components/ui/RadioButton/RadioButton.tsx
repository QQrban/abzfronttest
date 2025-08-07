import styles from "./RadioButton.module.scss";

type RadioButtonProps = {
  id: string | number;
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
};

export default function RadioButton({
  id,
  name,
  value,
  checked,
  label,
  onChange,
}: RadioButtonProps) {
  return (
    <div>
      <input
        id={String(id)}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className={styles.radioInput}
      />
      <label htmlFor={String(id)} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  );
}
