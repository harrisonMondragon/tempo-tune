/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = fn => {
    return function(...args) {
        return fn(...args).catch((err) => {
            console.error(err);
        })
    }
}

/**
 * Function for formatting time durations
 * @param {number} milliseconds Millisecond value to be converted.
 * @returns {string} String representing the time duration in the format "minutes:seconds".
 */
export const msToMinAndSec = milliseconds => {
    // Convert milliseconds to seconds
    var seconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Add leading zero if remaining seconds is less than 10
    var formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
};
