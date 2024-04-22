import styles from './blinker.module.css'

export default function Blinker({ status }) {
	return (
		<div
			className={styles.container}
			style={{
				backgroundColor:
					status == 'Active' ? 'var(--green)' : status == 'Inactive' ? 'var(--red)' : null,
			}}
		>
			<span className={styles.status}>{status}</span>
			<div className={styles.outer}>
				<div
					className={styles.inner}
					style={{
						backgroundColor:
							status == 'Active'
								? 'var(--green-light)'
								: status == 'Inactive'
								? 'var(--red-light)'
								: null,
					}}
				></div>
			</div>
		</div>
	)
}
