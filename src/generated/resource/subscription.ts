/* Generated subscription requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { Amount, CustomizedInfo, Env, OrderInfo, Paginator, PaymentMethod, PeriodRule, PeriodType, Result, SettlementStrategy, SubscriptionInfo, SubscriptionStatus, Trial } from '../share.js';
import type * as InquireSubscriptionPaymentModels from '../model/inquiresubscriptionpayment.js';
import type * as SubscriptionCreateModels from '../model/subscriptioncreate.js';
import type * as SubscriptionUpdateModels from '../model/subscriptionupdate.js';

/** Wire-format AlipayInquireSubscriptionListRequest; property names match the API JSON. */
export interface AlipayInquireSubscriptionListRequest {
    "currencies"?: Array<string>;
    "currentPage"?: number;
    "merchantAccountId"?: string;
    "pageSize"?: number;
    "paymentMethodTypes"?: Array<string>;
    "periodTypes"?: Array<PeriodType>;
    "startTimeFrom"?: string;
    "startTimeTo"?: string;
    "statuses"?: Array<SubscriptionStatus>;
}

/** Wire-format AlipayInquireSubscriptionPaymentRequest; property names match the API JSON. */
export interface AlipayInquireSubscriptionPaymentRequest {
    "currentPage"?: number;
    "merchantAccountId"?: string;
    "pageSize"?: number;
    "paymentStatuses"?: Array<InquireSubscriptionPaymentModels.PaymentStatus>;
    "subscriptionId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireSubscriptionRequest; property names match the API JSON. */
export interface AlipayInquireSubscriptionRequest {
    "merchantAccountId"?: string;
    "subscriptionId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipaySubscriptionCancelRequest; property names match the API JSON. */
export interface AlipaySubscriptionCancelRequest {
    "cancellationType": string;
    "subscriptionId"?: string;
    "subscriptionRequestId"?: string;
}

/** Wire-format AlipaySubscriptionChangeRequest; property names match the API JSON. */
export interface AlipaySubscriptionChangeRequest {
    "allowAccumulate"?: boolean;
    "maxAccumulateAmount"?: Amount;
    "orderInfo"?: OrderInfo;
    "paymentAmount"?: Amount;
    "paymentAmountDifference"?: Amount;
    "periodRule"?: PeriodRule;
    "subscriptionChangeRequestId": string;
    "subscriptionDescription"?: string;
    "subscriptionEndTime"?: string;
    "subscriptionExpiryTime"?: string;
    "subscriptionId": string;
    "subscriptionStartTime"?: string;
}

/** Wire-format AlipaySubscriptionCreateRequest; property names match the API JSON. */
export interface AlipaySubscriptionCreateRequest {
    "allowAccumulate"?: boolean;
    "allowRetry"?: boolean;
    "customizedInfo"?: CustomizedInfo;
    "env": Env;
    "maxAccumulateAmount"?: Amount;
    "maxAmountFloor"?: Amount;
    "merchantAccountId"?: string;
    "orderInfo": OrderInfo;
    "paymentAmount": Amount;
    "paymentMethod": PaymentMethod;
    "paymentNotificationUrl": string;
    "periodRule": PeriodRule;
    "settlementStrategy": SettlementStrategy;
    "subscriptionDescription": string;
    "subscriptionEndTime"?: string;
    "subscriptionExpiryTime"?: string;
    "subscriptionInfo"?: SubscriptionCreateModels.CreateSubscriptionInfo;
    "subscriptionNotificationUrl": string;
    "subscriptionRedirectUrl": string;
    "subscriptionRequestId": string;
    "subscriptionStartTime": string;
    "trials"?: Array<Trial>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipaySubscriptionsInquiryRequest; property names match the API JSON. */
export interface AlipaySubscriptionsInquiryRequest {
    "subscriptionId"?: string;
    "subscriptionRequestId"?: string;
}

/** Wire-format AlipaySubscriptionUpdateRequest; property names match the API JSON. */
export interface AlipaySubscriptionUpdateRequest {
    "nextSubscriptionDate"?: string;
    "orderInfo": OrderInfo;
    "paymentAmount"?: Amount;
    "periodRule"?: PeriodRule;
    "prorationSettings"?: SubscriptionUpdateModels.ProrationSettings;
    "subscriptionDescription"?: string;
    "subscriptionEndTime"?: string;
    "subscriptionId": string;
    "subscriptionUpdateRequestId": string;
}

/** Wire-format AlipayInquireSubscriptionListResponse; property names match the API JSON. */
export interface AlipayInquireSubscriptionListResponse {
    "paginator": Paginator;
    "result": Result;
    "subscriptions": Array<SubscriptionInfo>;
}

/** Wire-format AlipayInquireSubscriptionPaymentResponse; property names match the API JSON. */
export interface AlipayInquireSubscriptionPaymentResponse {
    "paginator": Paginator;
    "payments": Array<InquireSubscriptionPaymentModels.SubscriptionTransaction>;
    "result": Result;
}

/** Wire-format AlipayInquireSubscriptionResponse; property names match the API JSON. */
export interface AlipayInquireSubscriptionResponse {
    "result": Result;
    "subscription"?: SubscriptionInfo;
}

/** Wire-format AlipaySubscriptionCancelResponse; property names match the API JSON. */
export interface AlipaySubscriptionCancelResponse {
    "result": Result;
}

/** Wire-format AlipaySubscriptionChangeResponse; property names match the API JSON. */
export interface AlipaySubscriptionChangeResponse {
    "result": Result;
}

/** Wire-format AlipaySubscriptionCreateResponse; property names match the API JSON. */
export interface AlipaySubscriptionCreateResponse {
    "appIdentifier"?: string;
    "applinkUrl"?: string;
    "normalUrl"?: string;
    "result": Result;
    "schemeUrl"?: string;
}

/** Wire-format AlipaySubscriptionsInquiryResponse; property names match the API JSON. */
export interface AlipaySubscriptionsInquiryResponse {
    "allowRetry"?: string;
    "maxAmountFloor"?: Amount;
    "paymentAmount"?: Amount;
    "periodRule"?: PeriodRule;
    "result": Result;
    "subscriptionEndTime"?: string;
    "subscriptionRequestId"?: string;
    "subscriptionStartTime"?: string;
    "subscriptionStatus"?: string;
}

/** Wire-format AlipaySubscriptionUpdateResponse; property names match the API JSON. */
export interface AlipaySubscriptionUpdateResponse {
    "result": Result;
}

/** Typed InquireSubscription operation for the signed Antom client. */
export const inquireSubscription = /*#__PURE__*/ defineOperation<AlipayInquireSubscriptionRequest, AlipayInquireSubscriptionResponse>("/ams/api/v1/subscriptions/inquireSubscription");

/** Typed InquireSubscriptionList operation for the signed Antom client. */
export const inquireSubscriptionList = /*#__PURE__*/ defineOperation<AlipayInquireSubscriptionListRequest, AlipayInquireSubscriptionListResponse>("/ams/api/v1/subscriptions/inquireSubscriptionList");

/** Typed InquireSubscriptionPayment operation for the signed Antom client. */
export const inquireSubscriptionPayment = /*#__PURE__*/ defineOperation<AlipayInquireSubscriptionPaymentRequest, AlipayInquireSubscriptionPaymentResponse>("/ams/api/v1/subscriptions/inquireSubscriptionPayment");

/** Typed SubscriptionCancel operation for the signed Antom client. */
export const subscriptionCancel = /*#__PURE__*/ defineOperation<AlipaySubscriptionCancelRequest, AlipaySubscriptionCancelResponse>("/ams/api/v1/subscriptions/cancel");

/** Typed SubscriptionChange operation for the signed Antom client. */
export const subscriptionChange = /*#__PURE__*/ defineOperation<AlipaySubscriptionChangeRequest, AlipaySubscriptionChangeResponse>("/ams/api/v1/subscriptions/change");

/** Typed SubscriptionCreate operation for the signed Antom client. */
export const subscriptionCreate = /*#__PURE__*/ defineOperation<AlipaySubscriptionCreateRequest, AlipaySubscriptionCreateResponse>("/ams/api/v1/subscriptions/create");

/** Typed SubscriptionsInquiry operation for the signed Antom client. */
export const subscriptionsInquiry = /*#__PURE__*/ defineOperation<AlipaySubscriptionsInquiryRequest, AlipaySubscriptionsInquiryResponse>("/ams/api/v1/subscriptions/inquiry");

/** Typed SubscriptionUpdate operation for the signed Antom client. */
export const subscriptionUpdate = /*#__PURE__*/ defineOperation<AlipaySubscriptionUpdateRequest, AlipaySubscriptionUpdateResponse>("/ams/api/v1/subscriptions/update");

/** Create the immutable subscription resource tree. */
export function createSubscriptionResource(execute: OperationExecutor) {
    return Object.freeze({
        cancel: bindOperation(execute, subscriptionCancel),
        change: bindOperation(execute, subscriptionChange),
        create: bindOperation(execute, subscriptionCreate),
        inquireSubscription: bindOperation(execute, inquireSubscription),
        inquireSubscriptionList: bindOperation(execute, inquireSubscriptionList),
        inquireSubscriptionPayment: bindOperation(execute, inquireSubscriptionPayment),
        inquiry: bindOperation(execute, subscriptionsInquiry),
        update: bindOperation(execute, subscriptionUpdate)
    });
}

/** Public methods available on the subscription resource. */
export type SubscriptionResource = ReturnType<typeof createSubscriptionResource>;
