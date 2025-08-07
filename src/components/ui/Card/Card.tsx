import Tooltip from "../Tooltip/Toopltip";

import photoCover from "../../../assets/photo-cover.svg";

import styles from "./Card.module.scss";

type CardProps = {
  photo: string;
  name: string;
  position: string;
  email: string;
  phone: string;
};

export default function Card({
  photo,
  name,
  position,
  email,
  phone,
}: CardProps) {
  function formatPhoneNumber(phone: string): string {
    const match = phone.match(/^\+380(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phone;
    return `+380 (${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
  }

  return (
    <div className={styles.cardWrapper}>
      <img
        className={styles.profilePhoto}
        src={photo ? photo : photoCover}
        alt={name}
      />
      <Tooltip text={name} />
      <div className={styles.cardInfo}>
        <div>{position}</div>
        <Tooltip text={email} />
        <div>{formatPhoneNumber(phone)}</div>
      </div>
    </div>
  );
}
