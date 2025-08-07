import spinnerImg from "../../../assets/preloader.svg";

import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <img className={styles.spinner} src={spinnerImg} alt="loading" />
    </div>
  );
}
