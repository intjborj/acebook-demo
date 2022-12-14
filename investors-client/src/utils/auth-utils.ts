import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
  AUTH_CRED,
  PERMISSIONS,
  POLL_RESULTS,
  POLL_VOTING,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  TOKEN,
} from "./constants";
import { AccFormValues } from "@/types/accounts/accountTypes";

export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN, ];
export const ownerOnly = [STORE_OWNER];
export const investorOnly = [POLL_VOTING];
export const investorAdminOnly = [POLL_VOTING, POLL_RESULTS];

export function setAuthCredentials(token: string, permissions: any, id: any, user?: AccFormValues | null) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions, id, user }));
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
  id: string | null;
  user?: AccFormValues | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null, id: null, user: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? "");
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}
export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
