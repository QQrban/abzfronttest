import { useEffect, useRef, useState } from "react";

import styles from "./Tooltip.module.scss";

interface Props {
  text: string;
}

export default function Tooltip({ text }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const isOverflowing = el.scrollWidth > el.clientWidth;
      setShouldShowTooltip(isOverflowing);
    }
  }, [text]);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        if (shouldShowTooltip) setShowTooltip(true);
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div ref={textRef} className={styles.ellipsisText}>
        {text}
      </div>
      {showTooltip && shouldShowTooltip && (
        <div className={styles.tooltip}>{text}</div>
      )}
    </div>
  );
}
