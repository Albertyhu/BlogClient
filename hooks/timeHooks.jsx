export const FormatTimeAndDate = time => {
    try {
        return new Date(time).toLocaleString()
    } catch (e) {
        console.log("Error in FormatTimeAndDate: ", e, time)
    }
}

export const FormatDate = time => {
    try {
        return new Date(time).toDateString()
    } catch (e) {
        console.log("Error in FormatTimeAndDate: ", e, time)
    }
}

export function RenderTimePosted(timePosted) {
    var timeParsed = new Date(timePosted)
    var currentTime = new Date(Date.now());
    var difference = (currentTime.getTime() - timeParsed.getTime())
    var totalSeconds = Math.round(difference / 1000);
    var totalMinutes = Math.round(totalSeconds / 60);
    var totalHours = Math.round(totalMinutes / 60);
    var totalDays = Math.round(totalHours / 24);
    var totalWeeks = Math.round(totalDays / 7);
    var totalMonths = Math.round(totalWeeks / 4);
    var totalYears = Math.round(totalMonths / 12);

    if (totalYears !== 0) {
        if (totalYears > 1)
            return `${totalYears} years ago`;
        else
            return `1 year ago`;
    }

    if (totalMonths !== 0) {
        if (totalMonths > 1)
            return `${totalMonths} months ago`;
        else
            return `1 month ago`;
    }
    if (totalWeeks !== 0) {
        if (totalWeeks > 1)
            return `${totalWeeks} weeks ago`;
        else
            return `1 week ago`;
    }
    if (totalDays !== 0) {
        if (totalDays > 1) {
            return `${totalDays} days ago`;
        }
        else
            return `1 day ago`;
    }
    if (totalHours !== 0) {
        if (totalHours > 1)
            return `${totalHours} hours ago`;
        else
            return `1 hour ago`
    }
    if (totalMinutes !== 0) {
        if (totalMinutes > 1)
            return `${totalMinutes} minutes ago`;
        else
            return "1 minute ago"
    }
    if (totalSeconds !== 0) {
        if (totalSeconds > 1)
            return `${totalSeconds} seconds ago`;
        else
            return "1 second ago"
    }
    return "just now."

}