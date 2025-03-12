// Converts ISO to X Timezone
export const convertISOToTimezone = (isoTime, zone) => {
    return new Date(isoTime.toLocaleString("en-US", {timeZone: zone}))
}

// Rounds DateTime to nearest X minute interval
export const roundTimeToXMin = (minute, time) => {
    var coeff = 1000 * 60 * minute;
    console.log("Date: ", convertISOToTimezone(new Date(Math.round(time.getTime() / coeff) * coeff).toISOString(), "America/New_York"))
    return new Date(Math.round(time.getTime() / coeff) * coeff)
}