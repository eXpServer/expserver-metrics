import styles from './half-doughnut.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import FormatSize from '../Utils/FormatSize'

ChartJS.register(ArcElement, Tooltip, Legend)

export function TotalTraffic({ graphData = null, labels }) {
	const [data, setData] = useState(null)

	const colors = ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)']

	useEffect(() => {
		if (graphData) {
			const data = {
				labels: labels,
				datasets: [
					{
						data: graphData,
						backgroundColor: colors,
						borderWidth: 1,
						borderRadius: 5,
					},
				],
				options: {
					rotation: -105,
					circumference: 210,
					cutout: '80%',
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			}
			setData(data)
		} else {
			const greyData = {
				labels: ['No data'],
				datasets: [
					{
						data: [1],
						backgroundColor: ['rgba(0,0,0,0.1)'],
						borderWidth: 1,
						borderRadius: 5,
					},
				],
				options: {
					rotation: -105,
					circumference: 210,
					cutout: '80%',
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			}
			setData(greyData)
		}
	}, [graphData])

	return (
		<div className={styles.container} style={{ margin: '-40px 0', width: '70%' }}>
			{data ? <Doughnut data={data} options={data.options} /> : null}
			<div className={styles.totalTraffic}>
				<span className={styles.totalTrafficValue}>
					{FormatSize(graphData[0] + graphData[1], 2, true)}
				</span>
				Total traffic
			</div>
			<div className={styles.legendWrapper}>
				<div className={styles.legend} style={{ marginLeft: '-10%' }}>
					<div className={styles.line} style={{ backgroundColor: colors[0] }}></div>
					<div className={styles.legendValues}>
						<span className={styles.legendValue}>{FormatSize(graphData[0], 2, true)}</span>
						{labels[0]}
					</div>
				</div>
				<div className={styles.divider}></div>
				<div className={styles.legend} style={{ marginRight: '-10%', justifyContent: 'flex-end' }}>
					<div className={styles.legendValues} style={{ textAlign: 'right' }}>
						<span className={styles.legendValue}>{FormatSize(graphData[1], 2, true)}</span>
						{labels[1]}
					</div>
					<div className={styles.line} style={{ backgroundColor: colors[1] }}></div>
				</div>
			</div>
		</div>
	)
}
