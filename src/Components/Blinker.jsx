import styles from "./blinker.module.css";

export default function Blinker() {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}></div>
    </div>
  );
}
