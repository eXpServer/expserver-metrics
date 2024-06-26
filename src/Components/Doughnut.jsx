import { useEffect, useState } from 'react'
import styles from './doughnut.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function DoughnutGraph({ graphData = null, labels }) {
	const [data, setData] = useState(null)

	const colors = ['#00c414', '#e01818', '#f3dc07', 'rgba(255, 159, 64, 1)']

	useEffect(() => {
		if (graphData && graphData.reduce((acc, currentValue) => acc + currentValue, 0) > 0) {
			const data = {
				labels: labels,
				datasets: [
					{
						data: graphData,
						backgroundColor: [
							// 'rgba(215, 90, 78, 1)',
							// 'rgba(54, 162, 235, 1)',
							// 'rgba(255, 206, 86, 1)',
							// 'rgba(75, 192, 192, 1)',
							// 'rgba(153, 102, 255, 1)',
							// 'rgba(103, 7, 177, 1)',
							// 'rgba(16, 187, 241, 1)',
							// 'rgba(208, 34, 48, 1)',
							// 'rgba(45, 173, 234, 1)',
							// 'rgba(145, 67, 209, 1)',
							// 'rgba(92, 201, 78, 1)',
							// 'rgba(210, 101, 16, 1)',
							// 'rgba(33, 187, 122, 1)',
							// 'rgba(176, 49, 222, 1)',
							// 'rgba(74, 134, 17, 1)',
							// 'rgba(12, 222, 176, 1)',
							// 'rgba(96, 54, 199, 1)',
						],
						borderRadius: 5,
					},
				],
				options: {
					plugins: {
						legend: {
							position: 'bottom',
						},
					},
					cutout: '65%',
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
					cutout: '65%',
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
