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

export default function RequestsPerSec({ graphData }) {
	const [data, setData] = useState()

	const color = '#c86dd3'

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
						label: 'Requests',
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
							display: false,
						},
						tooltip: {
							callbacks: {
								title: function (context) {
									return `${Math.abs(context[0].dataIndex + labels[0])} sec ago`
								},
							},
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
								text: 'Requests',
							},
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
		<>
			<div className={styles.container}>
				{data ? <Line data={data} options={data?.options} height={200} /> : null}
			</div>
			<div className={styles.legendWrapper}>
				<div className={styles.legend}>
					<div className={styles.legendColor} style={{ backgroundColor: color }}></div>
					<div className={styles.legendValue}>
						<span className={styles.legendTitle}>Requests</span>
					</div>
				</div>
			</div>
		</>
	)
}
