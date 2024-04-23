import { useEffect, useState } from 'react'
import styles from './doughnut.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Requests({ graphData = null }) {
	const [data, setData] = useState(null)

	const labels = ['File serve', 'Reverse proxy', 'Redirect']
	const colors = ['#3A86FF', '#B5F44A', '#4CC9F0']

	useEffect(() => {
		if (graphData && graphData.reduce((acc, currentValue) => acc + currentValue, 0) > 0) {
			const data = {
				labels: labels,
				datasets: [
					{
						data: graphData,
						backgroundColor: colors,
						borderRadius: 5,
					},
				],
				options: {
					plugins: {
						legend: {
							display: false,
						},
					},
					cutout: '80%',
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
						borderRadius: 5,
					},
				],
				options: {
					plugins: {
						legend: {
							display: false,
						},
					},
					cutout: '80%',
				},
			}
			setData(greyData)
		}
	}, [graphData])

	return (
		<div className={styles.container}>
			{data ? <Doughnut data={data} options={data.options} /> : null}
			<div className={styles.legendWrapper}>
				{graphData?.map((value, index) => (
					<div key={index} className={styles.legend}>
						<div className={styles.legendColor} style={{ backgroundColor: colors[index] }}></div>
						<div className={styles.legendValue}>
							{value}
							<span className={styles.legendTitle}>{labels[index]}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
