import styles from './line.module.css'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export default function LineGraph({ graphData, height }) {
	const [data, setData] = useState()

	useEffect(() => {
		if (graphData) {
			const data = {
				labels: Array.from({ length: 60 }, (_, index) => -59 + index),
				datasets: [
					{
						label: 'Dataset 1',
						data: graphData[0],
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
						borderColor: '#737bff',
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.2,
					},
					{
						label: 'Dataset 2',
						data: graphData[1],
						backgroundColor: 'rgba(53, 162, 235, 0.5)',
						borderColor: '#5cdf939c',
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.4,
					},
				],
				options: {
					animation: { duration: 0 },
					plugins: {
						legend: false,
					},
					interaction: {
						mode: 'index',
						intersect: false,
					},
					scales: {
						x: {
							title: {
								display: true,
								text: 'Seconds ago',
							},
						},
						y: {
							ticks: {
								stepSize: 1000,
							},
						},
					},
					elements: {
						point: {
							radius: 1,
						},
					},
					maintainAspectRatio: false,
				},
			}
			setData(data)
		}
	}, [graphData])

	return (
		<div className={styles.container}>
			{data ? <Line data={data} options={data?.options} height={height} /> : null}
		</div>
	)
}
