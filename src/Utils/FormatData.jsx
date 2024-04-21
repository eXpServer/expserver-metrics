export default function formatData(data, prevData) {
	let connectionsPerSec
	let requestsPerSec

	let traffic_realtime_send_graph
	let traffic_realtime_recv_graph

	const conn_total =
		data?.conn_accepted +
		data?.conn_accepted_error +
		data?.conn_current +
		data?.conn_error +
		data?.conn_timeout
	const req_total = data?.req_file_serve + data?.req_reverse_proxy + data?.req_redirect

	if (prevData == null) {
		connectionsPerSec = [conn_total]
		requestsPerSec = [req_total]

		traffic_realtime_send_graph = [data?.traffic_total_send_bytes]
		traffic_realtime_recv_graph = [data?.traffic_total_recv_bytes]
	} else {
		connectionsPerSec = [
			...prevData.connectionsPerSec.slice(-60 + 1),
			conn_total - prevData.conn_total,
		]
		requestsPerSec = [...prevData.requestsPerSec.slice(-60 + 1), req_total - prevData.req_total]

		traffic_realtime_send_graph = [
			...prevData.traffic_realtime_send_graph.slice(-60 + 1),
			data?.traffic_total_send_bytes - prevData?.traffic_total_graph[0],
		]
		traffic_realtime_recv_graph = [
			...prevData.traffic_realtime_recv_graph.slice(-60 + 1),
			data?.traffic_total_recv_bytes - prevData?.traffic_total_graph[1],
		]
	}

	const formattedData = {
		uptime_msec: formatTime(data?.uptime_msec),
		pid: data?.pid,
		workers: data?.workers,
		server_name: data?.server_name,
		sys_ram: [data?.sys_ram_usage_bytes, data?.sys_ram_total_bytes],
		connectionsPerSec: connectionsPerSec,
		requestsPerSec: requestsPerSec,
		conn_current: data?.conn_current,
		conn_total: conn_total,
		conn_graph: [
			data?.conn_accepted - data?.conn_error - data?.conn_timeout,
			data?.conn_error,
			data?.conn_timeout,
			data?.conn_accepted_error,
		],
		req_current: data?.req_current,
		req_total: req_total,
		req_graph: [data?.req_file_serve, data?.req_reverse_proxy, data?.req_redirect],
		res_avg_res_time_msec: data?.res_avg_res_time_msec,
		res_peak_res_time_msec: data?.res_peak_res_time_msec,
		res_graph: [data?.res_code_3xx, data?.res_code_4xx, data?.res_code_5xx],
		traffic_realtime_send_graph: traffic_realtime_send_graph,
		traffic_realtime_recv_graph: traffic_realtime_recv_graph,
		traffic_total_graph: [data?.traffic_total_send_bytes, data?.traffic_total_recv_bytes],
	}

	console.log(formattedData)

	return formattedData
}

function formatTime(ms) {
	const hours = Math.floor(ms / 3600000)
	const minutes = Math.floor((ms % 3600000) / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)

	return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds}s`
}
