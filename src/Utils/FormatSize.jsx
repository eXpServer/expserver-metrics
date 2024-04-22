export default function FormatSize(bytes) {
	if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'G'
	else if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + 'M'
	else if (bytes >= 1024) return (bytes / 1024).toFixed(2) + 'K'
	else return bytes + 'B'
}
