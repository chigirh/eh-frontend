export default {
    dateToString: (date) => {
        let formatted = date.getFullYear() + "-" + ('00' + (date.getMonth() + 1)).slice(-2) + "-" + ('00' + date.getDate()).slice(-2)
        return formatted
    },
}