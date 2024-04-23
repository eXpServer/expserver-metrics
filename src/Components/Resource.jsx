import styles from './resource.module.css'

import FormatSize from '../Utils/FormatSize'

export function RAM({ values }) {
	return (
		<>
			<div className={styles.ramHeader}>
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
				<CPU key={index} value={value} />
			))}
		</div>
	)
}

function CPU({ value }) {
	return (
		<>
			<div className={styles.cpuWrapper}>
				<span className={styles.cpuIndex}>0</span>
				<ResourceBar value={value} width={35} />
				<span className={styles.cpuPercentage}>{value}%</span>
			</div>
		</>
	)
}

function ResourceBar({ value, maxValue = 100, width = 100 }) {
	const percentage = (value / maxValue) * 100
	const progressWidth = (percentage / 100) * width

	return (
		<div className={styles.resourceBar} style={{ width: `${width}%` }}>
			<div
				className={styles.progress}
				style={{
					backgroundColor:
						percentage < 40 ? 'var(--green)' : percentage < 80 ? 'var(--yellow)' : 'var(--red)',
					width: `${progressWidth}px`,
				}}
			></div>
		</div>
	)
}
