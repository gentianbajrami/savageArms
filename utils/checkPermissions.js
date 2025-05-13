import { UnauthorizedError } from '../errors/customErrors.js';

export const checkPermissions = (
  requestedUser,
  resourceUserId
) => {
  if (requestedUser.role === 'admin') return;
  if (
    requestedUser.userId ===
    resourceUserId.toString()
  )
    return;
  throw new UnauthorizedError(
    'Not authorized to access this route'
  );
};
