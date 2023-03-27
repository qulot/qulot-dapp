import { StatusCodes } from "http-status-codes"

/**
 * Check http response error is 400 status
 * @param {*} error 
 * @returns 
 */
export function isBadRequestError(error) {
    return error.response
        && error.response.status === StatusCodes.BAD_REQUEST
}

/**
 * Check http response error is 404 status
 * @param {*} error 
 * @returns 
 */
export function isNotFoundError(error) {
    return error.response
        && error.response.status === StatusCodes.NOT_FOUND
}

/**
 * Check http response error is 409 status
 * @param {*} error 
 * @returns 
 */
export function isConflictError(error) {
    return error.response
        && error.response.status === StatusCodes.CONFLICT
}

/**
 * Check http response error is 403 status
 * @param {*} error 
 * @returns 
 */
export function isForbiddenError(error) {
    return error.response
        && error.response.status === StatusCodes.FORBIDDEN
}

/**
 * Check http response error is 401 status
 * @param {*} error 
 * @returns 
 */
export function isUnauthorizedError(error) {
    return error.response
        && error.response.status === StatusCodes.UNAUTHORIZED
}


/**
 * Check http response is 200 status
 * @param {any} response 
 */
export function isOkResponse(response) {
    return response && response.status === StatusCodes.OK
}