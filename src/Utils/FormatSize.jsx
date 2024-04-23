export default function FormatSize(bytes, toFixed = 2, expanded = false) {
	if (bytes >= 1024 * 1024 * 1024 * 1024 * 1024)
		return `${(bytes / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(toFixed)}${
			expanded ? 'PB' : 'P'
		}`
	else if (bytes >= 1024 * 1024 * 1024 * 1024)
		return `${(bytes / (1024 * 1024 * 1024 * 1024)).toFixed(toFixed)}${expanded ? 'TB' : 'T'}`
	else if (bytes >= 1024 * 1024 * 1024)
		return `${(bytes / (1024 * 1024 * 1024)).toFixed(toFixed)}${expanded ? 'GB' : 'G'}`
	else if (bytes >= 1024 * 1024)
		return `${(bytes / (1024 * 1024)).toFixed(toFixed)}${expanded ? 'MB' : 'M'}`
	else if (bytes >= 1024) return `${(bytes / 1024).toFixed(toFixed)}${expanded ? 'KB' : 'K'}`
	else return `${bytes}B`
}
