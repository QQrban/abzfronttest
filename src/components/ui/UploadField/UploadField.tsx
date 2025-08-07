import { useEffect, useRef, useState } from "react";

import styles from "./UploadField.module.scss";

interface UploadFieldProps {
  onFileChange: (file: File | null) => void;
  error?: boolean;
  helperText?: string;
  reset?: boolean;
}

export default function UploadField({
  onFileChange,
  error = false,
  helperText,
  reset = false,
}: UploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const isJpg =
        file.type === "image/jpeg" || file.type === "image/jpg";

      if (!isJpg) {
        setLocalError("Only .jpg/.jpeg files are allowed");
        setFileName("");
        onFileChange(null);
        return;
      }

      setLocalError("");
      setFileName(file.name);
      onFileChange(file);
    }
  };

  useEffect(() => {
    if (reset) {
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [reset]);

  return (
    <div>
      <div
        onClick={handleClick}
        className={`${styles.uploadField} ${error ? styles.error : ""}`}
      >
        <button
          type="button"
          className={`${styles.uploadBtn} ${error ? styles.error : ""}`}
        >
          Upload
        </button>

        <span
          className={`${styles.placeholder} ${
            fileName ? styles.filled : ""
          }`}
        >
          {fileName || "Upload your photo"}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleChange}
          className={styles.hiddenInput}
        />
      </div>
      {(helperText || localError) && (
        <span className={styles.errorText}>
          {helperText || localError}
        </span>
      )}
    </div>
  );
}
