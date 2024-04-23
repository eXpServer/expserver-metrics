import { useEffect, useState } from 'react'
import styles from './doughnut.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Responses({ graphData = null }) {
	const [data, setData] = useState(null)

	const colors = ['#53599A', '#4B2E39', '#E2711D', '#FFB8D1']

	useEffect(() => {
		if (graphData && graphData.reduce((acc, currentValue) => acc + currentValue, 0) > 0) {
			const data = {
				labels: ['2xx', '3xx', '4xx', '5xx'],
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
							position: 'bottom',
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
							position: 'bottom',
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
		</div>
	)
}
