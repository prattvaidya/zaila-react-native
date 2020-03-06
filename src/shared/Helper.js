const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formatDate = date => {
	date = new Date(date)
	return `${monthNames[date.getMonth()]}. ${date.getDate()}, ${date.getFullYear()}`
}

export { formatDate }
