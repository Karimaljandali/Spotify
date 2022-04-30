/**
 * A basic helper function to convert milliseconds to hh:mm time.
 * 
 * @param {int} millis - The time in milliseconds
 * @returns String representation of the time in minutes and seconds.
 */
export function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000)
    const seconds = ((millis % 60000) / 1000).toFixed(0)
    return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}