import styles from './resource.module.css'

import FormatSize from '../Utils/FormatSize'

export function RAM({ values }) {
	return (
		<>
			<div className={styles.ramHeader} style={{ marginTop: '24px' }}>
				RAM Usage
				<span className={styles.ramValues}>
					{FormatSize(values[0], 2, false)}/{FormatSize(values[1], 2, false)}
				</span>
			</div>
			<ResourceBar value={values[0]} maxValue={values[1]} />
		</>
	)
}

export function CPUS({ values }) {
	return (
		<div className={styles.cpus}>
			{values?.map((value, index) => (
				<CPU key={index} value={value} index={index} />
			))}
		</div>
	)
}

function CPU({ value, index }) {
	return (
		<>
			<div className={styles.cpuWrapper}>
				<span className={styles.cpuIndex}>{index}</span>
				<ResourceBar value={value} />
				<span className={styles.cpuPercentage}>{value}%</span>
			</div>
		</>
	)
}

function ResourceBar({ value, maxValue = 100, width = 100, index = null }) {
	const percentage = (value / maxValue) * 100
	const progressWidth = (percentage / 100) * width

	return (
		<div className={styles.resourceBar} style={{ width: `${width}%` }}>
			<div
				className={styles.progress}
				style={{
					backgroundColor:
						percentage < 40 ? 'var(--green)' : percentage < 80 ? 'var(--yellow)' : 'var(--red)',
					width: `${progressWidth}%`,
				}}
			></div>
			{index != null ? (
				<span className={styles.cpuPercentage}>{percentage.toFixed(2)}%</span>
			) : null}
		</div>
	)
}
