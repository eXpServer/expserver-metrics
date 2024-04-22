import styles from './row-item.module.css'

export default function RowItem({ title, value, unit = null, divider = false }) {
	return (
		<div className={`${styles.container} ${divider ? styles.divider : ''}`}>
			<span className={styles.key}>{title}</span>
			<div className={styles.right}>
				<span className={styles.value}>{value}</span>
				{unit != null && <span className={styles.unit}>{unit}</span>}
			</div>
		</div>
	)
}
