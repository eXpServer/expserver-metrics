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

export default function RealtimeTraffic({ graphData }) {
	const [data, setData] = useState()

	const colors = ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)']

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
						label: 'Send',
						data: graphData[0],
						backgroundColor: colors[0],
						borderColor: colors[0],
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.2,
					},
					{
						label: 'Recv',
						data: graphData[1],
						backgroundColor: colors[1],
						borderColor: colors[1],
						borderWidth: 2,
						borderRadius: 0,
						lineTension: 0.4,
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
								text: 'Size',
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
		<>
			<div className={styles.wrapper}>
				{data ? <Line data={data} options={data?.options} height={200} /> : null}
			</div>
			<div className={styles.legendWrapper}>
				<div className={styles.legend}>
					<div className={styles.legendColor} style={{ backgroundColor: colors[0] }}></div>
					<div className={styles.legendValue}>
						<span className={styles.legendTitle}>Send</span>
					</div>
				</div>
				<div className={styles.legend}>
					<div className={styles.legendColor} style={{ backgroundColor: colors[1] }}></div>
					<div className={styles.legendValue}>
						<span className={styles.legendTitle}>Recv</span>
					</div>
				</div>
			</div>
		</>
	)
}
