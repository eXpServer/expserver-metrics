export default function formatData(rawData, prevRawData, prevData) {
	let connectionsPerSec
	let requestsPerSec
	let traffic_realtime_send_graph
	let traffic_realtime_recv_graph

	let conn_success = rawData?.conn_accepted - rawData?.conn_error - rawData?.conn_timeout

	if (prevData == null) {
		connectionsPerSec = [0]
		requestsPerSec = [0]
		traffic_realtime_send_graph = [0]
		traffic_realtime_recv_graph = [0]
	} else {
		let conn_per_sec = zeroNonInt(rawData?.conn_accepted - prevRawData?.conn_accepted)
		let req_per_sec = zeroNonInt(rawData?.req_total - prevRawData?.req_total)

		connectionsPerSec = [...prevData.connectionsPerSec.slice(-60 + 1), conn_per_sec]
		requestsPerSec = [...prevData.requestsPerSec.slice(-60 + 1), req_per_sec]

		let send_per_sec = zeroNonInt(
			rawData?.traffic_total_send_bytes - prevRawData?.traffic_total_send_bytes
		)

		let recv_per_sec = zeroNonInt(
			rawData?.traffic_total_recv_bytes - prevRawData?.traffic_total_recv_bytes
		)

		traffic_realtime_send_graph = [
			...prevData.traffic_realtime_send_graph.slice(-60 + 1),
			send_per_sec,
		]
		traffic_realtime_recv_graph = [
			...prevData.traffic_realtime_recv_graph.slice(-60 + 1),
			recv_per_sec,
		]
	}

	const formattedData = {
		uptime: formatTime(rawData?.uptime_msec) ?? '--',
		pid: rawData?.pid ?? '--',
		workers: rawData?.workers ?? '--',
		server_name: rawData?.server_name ?? '--',
		sys_ram: [zeroNonInt(rawData?.sys_ram_usage_bytes), zeroNonInt(rawData?.sys_ram_total_bytes)],
		connectionsPerSec: connectionsPerSec,
		requestsPerSec: requestsPerSec,
		conn_current: formatInt(rawData?.conn_current),
		conn_total: formatInt(rawData?.conn_accepted),
		conn_graph: [
			zeroNonInt(conn_success),
			zeroNonInt(rawData?.conn_error),
			zeroNonInt(rawData?.conn_timeout),
			zeroNonInt(rawData?.conn_accepted_error),
		],
		req_current: formatInt(rawData?.req_current),
		req_total: formatInt(rawData?.req_total),
		req_graph: [
			zeroNonInt(rawData?.req_file_serve),
			zeroNonInt(rawData?.req_reverse_proxy),
			zeroNonInt(rawData?.req_redirect),
		],
		res_avg_res_time_msec: formatInt(rawData?.res_avg_res_time_msec),
		res_peak_res_time_msec: formatInt(rawData?.res_peak_res_time_msec),
		res_graph: [
			zeroNonInt(rawData?.res_code_2xx),
			zeroNonInt(rawData?.res_code_3xx),
			zeroNonInt(rawData?.res_code_4xx),
			zeroNonInt(rawData?.res_code_5xx),
		],
		traffic_realtime_send_graph: traffic_realtime_send_graph,
		traffic_realtime_recv_graph: traffic_realtime_recv_graph,
		traffic_total_graph: [
			zeroNonInt(rawData?.traffic_total_send_bytes),
			zeroNonInt(rawData?.traffic_total_recv_bytes),
		],
	}

	console.log(formattedData)

	return formattedData
}

function formatInt(int) {
	return Number.isInteger(int) ? int : '--'
}

function zeroNonInt(int) {
	return Number.isInteger(int) ? int : 0
}

function formatTime(ms) {
	if (isNaN(ms)) return null
	const hours = Math.floor(ms / 3600000)
	const minutes = Math.floor((ms % 3600000) / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)
	return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds}s`
}
