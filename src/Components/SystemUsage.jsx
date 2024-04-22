import styles from './half-doughnut.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function SystemUsage({ graphData }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		if (graphData) {
			const data = {
				labels: [],
				datasets: [
					{
						data: graphData,
						backgroundColor: ['#00c414', 'rgba(0,0,0,0.1)'],
						borderWidth: 1,
						borderRadius: 5,
					},
				],

				options: {
					rotation: -105,
					circumference: 210,
					cutout: '80%',
					events: [],
				},
			}
			setData(data)
		}
	}, [graphData])

	return (
		<div className={styles.container} style={{ margin: '-55px 0', width: '56%' }}>
			{data ? (
				<>
					<Doughnut data={data} options={data.options} />
					<div className={styles.systemUsage}>
						<span className={styles.cpuUsage}>
							{graphData[0].toFixed(2)}
							<span className={styles.percentage}>%</span>
						</span>
						System CPU usage
					</div>
				</>
			) : null}
		</div>
	)
}
