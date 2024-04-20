import styles from "./row-item.module.css";

export default function RowItem({ title, value, divider = false }) {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.key}>{title}</span>
        {value}
      </div>
      {divider ? <div className={styles.divider}></div> : null}
    </>
  );
}
