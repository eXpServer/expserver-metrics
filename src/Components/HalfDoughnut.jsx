import styles from './half-doughnut.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export function HalfDoughnutGraph({ graphData, margin, labels, colors = [] }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		if (graphData) {
			const data = {
				labels: labels,
				datasets: [
					{
						data: graphData,
						backgroundColor:
							colors.length > 0
								? colors
								: [
										'rgba(255, 99, 132, 1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)',
										'rgba(25, 232, 84, 1)',
										'rgba(103, 7, 177, 1)',
										'rgba(234, 22, 176, 1)',
										'rgba(16, 187, 241, 1)',
										'rgba(208, 34, 48, 1)',
										'rgba(45, 173, 234, 1)',
										'rgba(145, 67, 209, 1)',
										'rgba(92, 201, 78, 1)',
										'rgba(210, 101, 16, 1)',
										'rgba(33, 187, 122, 1)',
										'rgba(176, 49, 222, 1)',
										'rgba(74, 134, 17, 1)',
										'rgba(215, 90, 78, 1)',
										'rgba(12, 222, 176, 1)',
										'rgba(96, 54, 199, 1)',
								  ],
						borderWidth: 1,
						borderRadius: 5,
					},
				],
				options: {
					plugins: {
						legend: {
							position: 'bottom',
						},
					},
					rotation: -90,
					circumference: 180,
					cutout: '65%',
				},
			}
			setData(data)
		}
	}, [graphData])

	return (
		<div className={styles.container} style={{ margin: margin }}>
			{data ? <Doughnut data={data} options={data.options} /> : null}
		</div>
	)
}
