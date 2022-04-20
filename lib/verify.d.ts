import type { ParsedRequest } from './verify';

/**
 * Verify HMAC against shared secret.  You are expected to pass in an object
 * that was returned from `parse()`.
 *
 * @param {Object} parsedReq the object you got from `parse`.
 * @param {String | Buffer} secret HMAC shared secret.
 * @return {Boolean} true if valid, false otherwise.
 * @throws {TypeError} if you pass in bad arguments.
 * @throws {InvalidAlgorithmError}
 */
export function verifyHMAC(parsedReq: ParsedRequest, secret: string): boolean;
