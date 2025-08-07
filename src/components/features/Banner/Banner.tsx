import Button from "../../ui/Button/Button";

import styles from "./Banner.module.scss";

import banner from "../../../assets/banner.png";

interface BannerProps {
  onNavigate: (section: "users" | "signup") => void;
}

export default function Banner({ onNavigate }: BannerProps) {
  return (
    <div className={styles.banner}>
      <img src={banner} alt="Banner" className={styles.bannerImg} />

      <div className={styles.bannerText}>
        <h1>Test assignment for front-end developer</h1>
        <p>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User
          design thinking as they'll be building web interfaces with
          accessibility in mind. They should also be excited to learn, as
          the world of Front-End Development keeps evolving.
        </p>
        <Button
          onClick={() => onNavigate("signup")}
          type="button"
          disabled={false}
          text="Sign up"
        />
      </div>
    </div>
  );
}
