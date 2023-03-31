export const FormatTimeAndDate = time => {
    try {
        return new Date(time).toLocaleString()
    } catch (e) {
        console.log("Error in FormatTimeAndDate: ", e, time)
    }
}