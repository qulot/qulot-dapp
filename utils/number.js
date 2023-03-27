

/**
 * Format number to desired number of digits
 * 
 * @example
 * formatIntDigits(1, 2)
 * // returns 01
 * 
 * @param {number} number 
 * @param {number} degits 
 * @returns 
 */
export function formatIntDigits(number, digits = 2) {
    let formattedNumber = number.toLocaleString("en-US", {
        minimumIntegerDigits: digits,
        useGrouping: false,
    })

    return formattedNumber
}

/**
 * These formats can be achieved by using the num.toLocaleString() method.
 * @param {number} number 
 * @returns 
 */
export function formatNumber(number) {
    return new Number(number).toLocaleString('en-US')
}


/**
 * 
 * @param {number} number 
 * @param {number} fixed 
 * @param {string} currency 
 * @returns 
 */
export function formatMoney(number, currency, fixed = 4) {
    if (number == 0) {
        fixed = 0
    }

    return new Number(number.toFixed(fixed)) + " " + currency
}

/**
 * Getting a random number between two values
 * 
 * @example
 * getRandomRange(1, 5)
 * // returns 3
 * getRandomRange(1, 5)
 * // returns 5
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
export function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Getting a random numbers between two values
 * @param {number} numbers 
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
export function bulkRandomRange(numbers, min, max) {
    let randomNumbers = []
    while (true) {
        var randomNumber = randomRange(min, max)
        if (randomNumbers.includes(randomNumber)) {
            continue
        } else {
            randomNumbers.push(randomNumber)
        }

        if (randomNumbers.length >= numbers) {
            break;
        }
    }
    return randomNumbers
}