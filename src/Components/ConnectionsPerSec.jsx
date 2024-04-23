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

export default function ConnectionsPerSec({ graphData }) {
	const [data, setData] = useState()

	const color = '#de3f70'

	function generateLabels(length) {
		if (length === 0) return Array.from({ length: 60 }, (_, i) => i)
		if (length === 60) return Array.from({ length: 60 }, (_, i) => i - length)
		return Array.from({ length: 60 }, (_, i) => i - (length - 1))
	}

	useEffect(() => {
		if (graphData) {
			const labels = generateLabels(graphData?.length)

			const data = {
				labels: labels,
				datasets: [
					{
						label: 'Connections',
						data: graphData,
						backgroundColor: color,
						borderColor: color,
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.2,
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
								text: 'Connections',
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
			{data ? <Line data={data} options={data?.options} height={200} /> : null}
		</div>
	)
}
