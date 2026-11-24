/* Generated agentic requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { AgenticAgentInfo, AgenticMandate, AgenticPaymentMethod, Env, Order, Result } from '../share.js';
import type * as InquireAccountInfoModels from '../model/inquireaccountinfo.js';
import type * as InquirePaymentTokenModels from '../model/inquirepaymenttoken.js';

/** Wire-format AlipayCreateAuthenticationSessionRequest; property names match the API JSON. */
export interface AlipayCreateAuthenticationSessionRequest {
    "agent": AgenticAgentInfo;
    "authenticationRequestId": string;
    "bindOnAuthorize"?: boolean;
    "countryCode"?: string;
    "env": Env;
    "mandate": AgenticMandate;
    "paymentMethod": AgenticPaymentMethod;
    "purchaseType": string;
    "redirectUrl"?: string;
    "userLoginId": string;
}

/** Wire-format AlipayCreateBindingSessionRequest; property names match the API JSON. */
export interface AlipayCreateBindingSessionRequest {
    "agent": AgenticAgentInfo;
    "authorizeOnBind": boolean;
    "bindingRequestId": string;
    "countryCode"?: string;
    "env": Env;
    "mandate"?: AgenticMandate;
    "paymentMethod": AgenticPaymentMethod;
    "purchaseType"?: string;
    "redirectUrl"?: string;
    "userLoginId": string;
}

/** Wire-format AlipayInquireAccountInfoRequest; property names match the API JSON. */
export interface AlipayInquireAccountInfoRequest {
    "agent": AgenticAgentInfo;
    "env": Env;
    "requestId": string;
    "userLoginId": string;
}

/** Wire-format AlipayInquirePaymentTokenRequest; property names match the API JSON. */
export interface AlipayInquirePaymentTokenRequest {
    "agent": AgenticAgentInfo;
    "mandateId": string;
    "metadata"?: string;
    "order"?: Order;
    "paymentMethod": AgenticPaymentMethod;
    "paymentTokenRequestId": string;
    "userLoginId": string;
}

/** Wire-format AlipayCreateAuthenticationSessionResponse; property names match the API JSON. */
export interface AlipayCreateAuthenticationSessionResponse {
    "authenticationSessionExpiryTime"?: string;
    "normalUrl"?: string;
    "result": Result;
    "sdHash"?: string;
}

/** Wire-format AlipayCreateBindingSessionResponse; property names match the API JSON. */
export interface AlipayCreateBindingSessionResponse {
    "bindingSessionData"?: string;
    "bindingSessionExpiryTime"?: string;
    "normalUrl"?: string;
    "result": Result;
    "sdHash"?: string;
}

/** Wire-format AlipayInquireAccountInfoResponse; property names match the API JSON. */
export interface AlipayInquireAccountInfoResponse {
    "paymentMethods"?: Array<InquireAccountInfoModels.AgenticBoundPaymentMethod>;
    "result": Result;
}

/** Wire-format AlipayInquirePaymentTokenResponse; property names match the API JSON. */
export interface AlipayInquirePaymentTokenResponse {
    "paymentToken"?: InquirePaymentTokenModels.AgenticPaymentToken;
    "result": Result;
}

/** Typed CreateAuthenticationSession operation for the signed Antom client. */
export const createAuthenticationSession = /*#__PURE__*/ defineOperation<AlipayCreateAuthenticationSessionRequest, AlipayCreateAuthenticationSessionResponse>("/ams/api/v1/agenticPayment/createAuthenticationSession");

/** Typed CreateBindingSession operation for the signed Antom client. */
export const createBindingSession = /*#__PURE__*/ defineOperation<AlipayCreateBindingSessionRequest, AlipayCreateBindingSessionResponse>("/ams/api/v1/agenticPayment/createBindingSession");

/** Typed InquireAccountInfo operation for the signed Antom client. */
export const inquireAccountInfo = /*#__PURE__*/ defineOperation<AlipayInquireAccountInfoRequest, AlipayInquireAccountInfoResponse>("/ams/api/v1/agenticPayment/inquireAccountInfo");

/** Typed InquirePaymentToken operation for the signed Antom client. */
export const inquirePaymentToken = /*#__PURE__*/ defineOperation<AlipayInquirePaymentTokenRequest, AlipayInquirePaymentTokenResponse>("/ams/api/v1/agenticPayment/inquirePaymentToken");

/** Create the immutable agentic resource tree. */
export function createAgenticResource(execute: OperationExecutor) {
    return Object.freeze({
        agenticPaymentCreateAuthenticationSession: bindOperation(execute, createAuthenticationSession),
        agenticPaymentCreateBindingSession: bindOperation(execute, createBindingSession),
        agenticPaymentInquireAccountInfo: bindOperation(execute, inquireAccountInfo),
        agenticPaymentInquirePaymentToken: bindOperation(execute, inquirePaymentToken)
    });
}

/** Public methods available on the agentic resource. */
export type AgenticResource = ReturnType<typeof createAgenticResource>;
