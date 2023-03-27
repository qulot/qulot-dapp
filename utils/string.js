
/**
 * The startsWith() method determines whether a string begins with the characters of a specified string, returning true or false as appropriate.
 * @param {*} str 
 * @param {*} value 
 * @returns 
 */
export function startsWith(str, value) {
    return String.prototype.startsWith.call(str || "", value)
}