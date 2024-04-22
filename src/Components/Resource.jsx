import { useEffect, useRef, useState } from 'react'
import styles from './resource.module.css'

import FormatSize from '../Utils/FormatSize'

export function RAM({ values }) {
	const [containerWidth, setContainerWidth] = useState(null)
	const containerRef = useRef(null)

	useEffect(() => {
		if (containerRef.current) {
			const width = containerRef.current.offsetWidth - 65
			setContainerWidth(width / 4)
		}
	}, [values])
	return (
		<div className={styles.ramContainer} ref={containerRef}>
			{containerWidth != null ? (
				<Resource
					value={values?.[0]}
					maxValue={values?.[1]}
					length={containerWidth}
					showValue={true}
					percentage={false}
				/>
			) : null}
		</div>
	)
}

export function CPUS({ values }) {
	const cpus = values.map((value, index) => (
		<Resource key={index} thread={index} value={value} maxValue={100} length={80} />
	))

	const cpuRows = []
	for (let i = 0; i < cpus.length; i += 4) {
		cpuRows.push(cpus.slice(i, i + 4))
	}

	return (
		<div className={styles.cpusContainer}>
			{cpuRows.map((row, index) => (
				<div key={index} className={styles.cpuRow}>
					{row}
				</div>
			))}
		</div>
	)
}

function Resource({ thread = null, value, maxValue, length, showValue = true, percentage = true }) {
	const bars = Array.from({ length }, (_, index) => {
		let color
		const percentage = (value / maxValue) * 100
		if (index == 0 && percentage > 0) color = 'var(--green)'
		else if (index < length * 0.4)
			color = percentage >= (index + 1) * (100 / length) ? 'var(--green)' : 'rgba(0,0,0,0.1)'
		else if (index < length * 0.8)
			color = percentage >= (index + 1) * (100 / length) ? 'var(--yellow)' : 'rgba(0,0,0,0.1)'
		else color = percentage >= (index + 1) * (100 / length) ? 'var(--red)' : 'rgba(0,0,0,0.1)'
		return <Bar key={index} color={color} />
	})

	return (
		<div className={styles.cpu}>
			{thread != null ? <span className={styles.thread}>{thread}</span> : null}
			<div className={styles.bars}>
				{bars.map((bar, index) => (
					<div key={index}>{bar}</div>
				))}
			</div>
			{showValue ? (
				<span className={styles.value}>
					{FormatSize(value, 2, false) + '/' + FormatSize(maxValue, 2, false)}
					{percentage ? '%' : null}
				</span>
			) : null}
		</div>
	)
}

function Bar({ color }) {
	return <div className={styles.bar} style={{ backgroundColor: color }}></div>
}
