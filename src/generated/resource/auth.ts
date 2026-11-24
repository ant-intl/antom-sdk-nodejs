/* Generated auth requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { Amount, CustomerBelongsTo, Env, OsType, PspCustomerInfo, Result, TerminalType } from '../share.js';
import type * as AuthApplyTokenModels from '../model/authapplytoken.js';
import type * as AuthConsultModels from '../model/authconsult.js';

/** Wire-format AlipayAuthApplyTokenRequest; property names match the API JSON. */
export interface AlipayAuthApplyTokenRequest {
    "authCode"?: string;
    "customerBelongsTo": CustomerBelongsTo;
    "extendInfo"?: string;
    "grantType": AuthApplyTokenModels.GrantType;
    "merchantAccountId"?: string;
    "merchantRegion"?: string;
    "refreshToken"?: string;
}

/** Wire-format AlipayAuthConsultRequest; property names match the API JSON. */
export interface AlipayAuthConsultRequest {
    "amount"?: Amount;
    "authClientId"?: string;
    "authMetaData"?: AuthConsultModels.AuthMetaData;
    "authNotifyUrl"?: string;
    "authRedirectUrl": string;
    "authState": string;
    "customerBelongsTo": CustomerBelongsTo;
    "directDebitInfo"?: AuthConsultModels.AuthorizationConsultDirectDebitInfo;
    "env"?: Env;
    "extendInfo"?: string;
    "merchantAccountId"?: string;
    "merchantRegion"?: string;
    "osType"?: OsType;
    "osVersion"?: string;
    "recurringPayment"?: boolean;
    "scopes": Array<AuthConsultModels.ScopeType>;
    "terminalType": TerminalType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayAuthRevokeTokenRequest; property names match the API JSON. */
export interface AlipayAuthRevokeTokenRequest {
    "accessToken": string;
    "extendInfo"?: string;
    "merchantAccountId"?: string;
}

/** Wire-format AlipayAuthApplyTokenResponse; property names match the API JSON. */
export interface AlipayAuthApplyTokenResponse {
    "accessToken"?: string;
    "accessTokenExpiryTime"?: string;
    "extendInfo"?: string;
    "pspCustomerInfo"?: PspCustomerInfo;
    "refreshToken"?: string;
    "refreshTokenExpiryTime"?: string;
    "result": Result;
    "userLoginId"?: string;
}

/** Wire-format AlipayAuthConsultResponse; property names match the API JSON. */
export interface AlipayAuthConsultResponse {
    "appIdentifier"?: string;
    "applinkUrl"?: string;
    "authCodeForm"?: AuthConsultModels.AuthCodeForm;
    "authUrl"?: string;
    "extendInfo"?: string;
    "normalUrl"?: string;
    "result": Result;
    "schemeUrl"?: string;
}

/** Wire-format AlipayAuthRevokeTokenResponse; property names match the API JSON. */
export interface AlipayAuthRevokeTokenResponse {
    "extendInfo"?: string;
    "result": Result;
}

/** Typed AuthApplyToken operation for the signed Antom client. */
export const authApplyToken = /*#__PURE__*/ defineOperation<AlipayAuthApplyTokenRequest, AlipayAuthApplyTokenResponse>("/ams/api/v1/authorizations/applyToken");

/** Typed AuthConsult operation for the signed Antom client. */
export const authConsult = /*#__PURE__*/ defineOperation<AlipayAuthConsultRequest, AlipayAuthConsultResponse>("/ams/api/v1/authorizations/consult");

/** Typed AuthRevokeToken operation for the signed Antom client. */
export const authRevokeToken = /*#__PURE__*/ defineOperation<AlipayAuthRevokeTokenRequest, AlipayAuthRevokeTokenResponse>("/ams/api/v1/authorizations/revoke");

/** Create the immutable auth resource tree. */
export function createAuthResource(execute: OperationExecutor) {
    return Object.freeze({
        authorizationsApplyToken: bindOperation(execute, authApplyToken),
        authorizationsConsult: bindOperation(execute, authConsult),
        authorizationsRevoke: bindOperation(execute, authRevokeToken)
    });
}

/** Public methods available on the auth resource. */
export type AuthResource = ReturnType<typeof createAuthResource>;
