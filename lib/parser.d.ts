import type { IncomingMessage } from 'http';

export type ParsedRequest = {
  scheme: 'Signature';
  params: {
    keyId: string;
    algorithm: 'hs2019';
    headers: string[];
    signature: string;
  };
  signingString: string;
};

type ParseRequestOptions = {
  /**
   * allowed clock skew in seconds
   * @default 300
   */
  clockSkew?: number;
  /**
   * required header names
   * @default date or x-date
   */
  headers?: string[];
  /**
   * algorithms to support
   * @default all
   */
  algorithms?: string;
  /**
   * should enforce latest spec parsing
   * @default false
   */
  strict?: boolean;
};

/**
 * Parses the 'Authorization' header out of an http.ServerRequest object.
 *
 * Note that this API will fully validate the Authorization header, and throw
 * on any error.  It will not however check the signature, or the keyId format
 * as those are specific to your environment.  You can use the options object
 * to pass in extra constraints.
 *
 * As a response object you can expect this:
 *
 *     {
 *       "scheme": "Signature",
 *       "params": {
 *         "keyId": "foo",
 *         "algorithm": "rsa-sha256",
 *         "headers": [
 *           "date" or "x-date",
 *           "digest"
 *         ],
 *         "signature": "base64"
 *       },
 *       "signingString": "ready to be passed to crypto.verify()"
 *     }
 *
 * @param {Object} request an http.ServerRequest.
 * @param {Object} options an optional options object with:
 *                   - clockSkew: allowed clock skew in seconds (default 300).
 *                   - headers: required header names (def: date or x-date)
 *                   - algorithms: algorithms to support (default: all).
 *                   - strict: should enforce latest spec parsing
 *                             (default: false).
 * @return {Object} parsed out object (see above).
 * @throws {TypeError} on invalid input.
 * @throws {InvalidHeaderError} on an invalid Authorization header error.
 * @throws {InvalidParamsError} if the params in the scheme are invalid.
 * @throws {MissingHeaderError} if the params indicate a header not present,
 *                              either in the request headers from the params,
 *                              or not in the params from a required header
 *                              in options.
 * @throws {StrictParsingError} if old attributes are used in strict parsing
 *                              mode.
 * @throws {ExpiredRequestError} if the value of date or x-date exceeds skew.
 */
export function parseRequest(
  req: IncomingMessage,
  opts?: ParseRequestOptions,
): ParsedRequest;
