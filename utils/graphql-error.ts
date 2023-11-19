import { GraphQLError } from 'graphql'

export function isHasError(errors: readonly GraphQLError[] | undefined) {
  return errors !== undefined && errors.length > 0
}

export function isAlreadyExists(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'ALREADY_EXISTS')
}

export function isCanceled(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'CANCELLED')
}

export function isUnknown(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'UNKNOWN')
}

export function isInvalidArgument(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'INVALID_ARGUMENT')
}

export function isDeadlineExceeded(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'DEADLINE_EXCEEDED')
}

export function isNotFound(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'NOT_FOUND')
}

export function isPermissionDenied(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'PERMISSION_DENIED')
}

export function isAborted(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'ABORTED')
}

export function isInternal(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'INTERNAL')
}

export function isUnauthenticated(errors: readonly GraphQLError[]) {
  return errors.some((err) => err.extensions.code === 'UNAUTHENTICATED')
}
