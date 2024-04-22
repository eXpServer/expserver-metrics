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
import FormatSize from '../Utils/FormatSize'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export default function LineGraph({ graphData, height }) {
	const [data, setData] = useState()

	function generateArray(length) {
		if (length === 0) return Array.from({ length: 60 }, (_, i) => i)
		if (length === 60) return Array.from({ length: 60 }, (_, i) => i - length)
		return Array.from({ length: 60 }, (_, i) => i - (length - 1))
	}

	useEffect(() => {
		if (graphData) {
			const labels = generateArray(graphData[0]?.length)

			const data = {
				labels: labels,
				datasets: [
					{
						label: 'Dataset 1',
						data: graphData[0],
						backgroundColor: '#737bff',
						borderColor: '#737bff',
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.2,
					},
					{
						label: 'Dataset 2',
						data: graphData[1],
						backgroundColor: '#5cdf939c',
						borderColor: '#5cdf939c',
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.4,
					},
				],
				options: {
					animation: { duration: 0 },
					plugins: {
						legend: {
							position: 'bottom',
						},
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
							ticks: {
								maxTicksLimit: 6,
							},
						},
						y: {
							title: {
								display: true,
								text: 'Bytes /s',
							},
							ticks: {
								stepSize: 1000,
								callback: function (value) {
									return FormatSize(value, 1, false)
								},
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
