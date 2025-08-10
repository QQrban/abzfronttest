import { useEffect, useRef, useState } from "react";
import styles from "./Tooltip.module.scss";

interface Props {
  text: string;
}

export default function Tooltip({ text }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const isOverflowing = el.scrollWidth > el.clientWidth;
      setShouldShowTooltip(isOverflowing);
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (shouldShowTooltip) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 100);
  };

  const handleTooltipEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={textRef}
        className={styles.ellipsisText}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
        {showTooltip && shouldShowTooltip && (
          <div
            className={`${styles.tooltip} ${text.length > 42 ? styles.veryLongText : ""}`}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}