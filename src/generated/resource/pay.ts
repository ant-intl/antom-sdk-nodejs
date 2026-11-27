/* Generated pay requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { AcquirerInfo, AgreementInfo, Amount, AutomaticTax, Buyer, CreditPayPlan, CustomizedInfo, Env, FundTransferInfo, FundsType, Goods, Merchant, Order, PaymentFactor, PaymentMethod, PaymentMethodDetail, PaymentMethodScope, PaymentResultInfo, ProductCodeType, PromotionResult, PspCustomerInfo, Quote, RedirectActionForm, ReleaseType, Result, RuleStatus, SettlementStrategy, Shipping, SplitDetail, SubscriptionInfo, TakeType, TransactionStatusType, Transit } from '../share.js';
import type * as InquireExchangeRateModels from '../model/inquireexchangerate.js';
import type * as InquireHoldListModels from '../model/inquireholdlist.js';
import type * as InquirePaymentMethodModels from '../model/inquirepaymentmethod.js';
import type * as InquireRuleListModels from '../model/inquirerulelist.js';
import type * as PayModels from '../model/pay.js';
import type * as PayConsultModels from '../model/payconsult.js';
import type * as PaymentSessionModels from '../model/paymentsession.js';
import type * as PayQueryModels from '../model/payquery.js';
import type * as RefundModels from '../model/refund.js';
import type * as VaultingPaymentMethodModels from '../model/vaultingpaymentmethod.js';
import type * as VaultsFetchNonceModels from '../model/vaultsfetchnonce.js';
import type * as VerifyAndCompletePaymentModels from '../model/verifyandcompletepayment.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCancelRuleRequest; property names match the API JSON. */
export interface AlipayCancelRuleRequest {
    "ruleId": string;
}

/** Wire-format AlipayCaptureRequest; property names match the API JSON. */
export interface AlipayCaptureRequest {
    "captureAmount": Amount;
    "captureRequestId": string;
    "captureType"?: string;
    "goods"?: Array<Goods>;
    "isLastCapture"?: boolean;
    "paymentId": string;
    "shippings"?: Array<Shipping>;
    "transit"?: Transit;
}

/** Wire-format AlipayCreateHoldRequest; property names match the API JSON. */
export interface AlipayCreateHoldRequest {
    "holdAmount": Amount;
    "holdRequestId": string;
    "releaseTime": string;
}

/** Wire-format AlipayCreateMandateRequest; property names match the API JSON. */
export interface AlipayCreateMandateRequest {
    "accessToken": string;
    "mandateRequestId": string;
    "paymentAmount": Amount;
}

/** Wire-format AlipayCreateReleaseRequest; property names match the API JSON. */
export interface AlipayCreateReleaseRequest {
    "holdId": string;
    "releaseAmount": Amount;
    "releaseRequestId": string;
}

/** Wire-format AlipayCreateRuleRequest; property names match the API JSON. */
export interface AlipayCreateRuleRequest {
    "fundsType"?: FundsType;
    "paymentMethodScope": PaymentMethodScope;
    "ratio": number;
    "releaseTime"?: string;
    "releaseType": ReleaseType;
    "retentionTime"?: number;
    "takeType"?: TakeType;
}

/** Wire-format AlipayInquireExchangeRateRequest; property names match the API JSON. */
export interface AlipayInquireExchangeRateRequest {
    "buyCurrency"?: string;
    "currencyPairs"?: Array<InquireExchangeRateModels.CurrencyPair>;
    "merchantAccountId"?: string;
    "paymentCurrency"?: string;
    "productCode"?: ProductCodeType;
    "rateType"?: InquireExchangeRateModels.RateType;
    "sellCurrency"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireHoldListRequest; property names match the API JSON. */
export interface AlipayInquireHoldListRequest {
    "endingBefore"?: string;
    "holdId"?: string;
    "holdRequestId"?: string;
    "limit"?: number;
    "startingAfter"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquirePaymentMethodRequest; property names match the API JSON. */
export interface AlipayInquirePaymentMethodRequest {
    "cardToken"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireReleaseRequest; property names match the API JSON. */
export interface AlipayInquireReleaseRequest {
    "releaseId"?: string;
    "releaseRequestId"?: string;
}

/** Wire-format AlipayInquireRuleListRequest; property names match the API JSON. */
export interface AlipayInquireRuleListRequest {
    "endingBefore"?: string;
    "fundsType": FundsType;
    "limit"?: number;
    "releaseType"?: ReleaseType;
    "startingAfter"?: string;
    "takeType"?: TakeType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquiryRefundRequest; property names match the API JSON. */
export interface AlipayInquiryRefundRequest {
    "merchantAccountId"?: string;
    "refundId"?: string;
    "refundRequestId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPayCancelRequest; property names match the API JSON. */
export interface AlipayPayCancelRequest {
    "merchantAccountId"?: string;
    "paymentId"?: string;
    "paymentRequestId"?: string;
}

/** Wire-format AlipayPayConsultRequest; property names match the API JSON. */
export interface AlipayPayConsultRequest {
    "allowedPaymentMethodRegions"?: Array<string>;
    "allowedPaymentMethods"?: Array<string>;
    "allowedPspRegions"?: Array<string>;
    "blockedPaymentMethods"?: Array<string>;
    "buyer"?: Buyer;
    "customerId"?: string;
    "env": Env;
    "extendInfo"?: string;
    "merchant"?: Merchant;
    "merchantAccountId"?: string;
    "merchantRegion"?: string;
    "paymentAmount": Amount;
    "paymentEvaluation"?: PayConsultModels.PaymentEvaluation;
    "paymentFactor"?: PaymentFactor;
    "productCode": ProductCodeType;
    "referenceUserId"?: string;
    "region"?: string;
    "settlementStrategy"?: SettlementStrategy;
    "userRegion"?: string;
}

/** Wire-format AlipayPaymentSessionRequest; property names match the API JSON. */
export interface AlipayPaymentSessionRequest {
    "agreementInfo"?: AgreementInfo;
    "allowedPaymentMethodRegions"?: Array<string>;
    "automaticTax"?: AutomaticTax;
    "availablePaymentMethod"?: PaymentSessionModels.AvailablePaymentMethod;
    "creditPayPlan"?: CreditPayPlan;
    "customizedInfo"?: CustomizedInfo;
    "enableInstallmentCollection"?: boolean;
    "env"?: Env;
    "excludedPaymentMethod"?: PaymentSessionModels.ExcludedPaymentMethod;
    "fundTransferInfo"?: FundTransferInfo;
    "locale"?: string;
    "merchantAccountId"?: string;
    "merchantRegion"?: string;
    "metadata"?: string;
    "order": Order;
    "paymentAmount": Amount;
    "paymentExpiryTime"?: string;
    "paymentFactor"?: PaymentFactor;
    "paymentMethod"?: PaymentMethod;
    "paymentNotifyUrl"?: string;
    "paymentQuote"?: Quote;
    "paymentRedirectUrl": string;
    "paymentRequestId": string;
    "paymentSessionExpiryTime"?: string;
    "processingAmount"?: Amount;
    "productCode": ProductCodeType;
    "productScene"?: string;
    "riskData"?: PaymentSessionModels.RiskData;
    "savedPaymentMethods"?: Array<PaymentMethod>;
    "scopes"?: Array<string>;
    "settlementStrategy": SettlementStrategy;
    "subscription"?: PaymentSessionModels.BillingSubscription;
    "subscriptionInfo"?: SubscriptionInfo;
    "subscriptionPlan"?: PaymentSessionModels.SubscriptionPlan;
    "userRegion"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPayQueryRequest; property names match the API JSON. */
export interface AlipayPayQueryRequest {
    "merchantAccountId"?: string;
    "paymentId"?: string;
    "paymentRequestId"?: string;
}

/** Wire-format AlipayPayRequest; property names match the API JSON. */
export interface AlipayPayRequest {
    "agreementInfo"?: AgreementInfo;
    "appId"?: string;
    "creditPayPlan"?: CreditPayPlan;
    "customizedInfo"?: CustomizedInfo;
    "dualOfflinePayment"?: boolean;
    "env": Env;
    "extendInfo"?: string;
    "fundTransferInfo"?: FundTransferInfo;
    "isAuthorization"?: boolean;
    "locale"?: string;
    "merchant"?: Merchant;
    "merchantAccountId"?: string;
    "merchantRegion"?: string;
    "metadata"?: string;
    "order": Order;
    "payToMethod"?: PaymentMethod;
    "paymentAmount": Amount;
    "paymentExpiryTime"?: string;
    "paymentFactor"?: PaymentFactor;
    "paymentMethod": PaymentMethod;
    "paymentNotifyUrl"?: string;
    "paymentQuote"?: Quote;
    "paymentRedirectUrl": string;
    "paymentRequestId": string;
    "paymentVerificationData"?: PayModels.PaymentVerificationData;
    "processingAmount"?: Amount;
    "productCode": ProductCodeType;
    "settlementStrategy": SettlementStrategy;
    "subscriptionId"?: string;
    "subscriptionInfo"?: SubscriptionInfo;
    "userRegion"?: string;
}

/** Wire-format AlipayRefundRequest; property names match the API JSON. */
export interface AlipayRefundRequest {
    "actualRefundAmount"?: Amount;
    "captureId"?: string;
    "customizedInfo"?: CustomizedInfo;
    "extendInfo"?: string;
    "goods"?: Array<Goods>;
    "isAsyncRefund"?: boolean;
    "metadata"?: string;
    "paymentId": string;
    "referenceRefundId"?: string;
    "refundAmount": Amount;
    "refundDetails"?: Array<RefundModels.RefundDetail>;
    "refundNotifyUrl"?: string;
    "refundReason"?: string;
    "refundRequestId": string;
    "refundSourceAccountNo"?: string;
    "refundToBankInfo"?: RefundModels.RefundToBankInfo;
    "splitDetails"?: Array<SplitDetail>;
}

/** Wire-format AlipayUpdateAmountRequest; property names match the API JSON. */
export interface AlipayUpdateAmountRequest {
    "amount": Amount;
    "paymentId": string;
    "updateRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayUpdateHoldRequest; property names match the API JSON. */
export interface AlipayUpdateHoldRequest {
    "holdId": string;
    "releaseTime": string;
}

/** Wire-format AlipayUpdateRuleRequest; property names match the API JSON. */
export interface AlipayUpdateRuleRequest {
    "paymentMethodScope"?: PaymentMethodScope;
    "ratio"?: number;
    "releaseTime"?: string;
    "retentionTime"?: number;
    "ruleId": string;
    "ruleStatus"?: RuleStatus;
}

/** Wire-format AlipayVaultingPaymentMethodRequest; property names match the API JSON. */
export interface AlipayVaultingPaymentMethodRequest {
    "customizedInfo"?: CustomizedInfo;
    "env": Env;
    "merchantAccountId"?: string;
    "merchantRegion"?: string;
    "metadata"?: string;
    "paymentMethodDetail": VaultingPaymentMethodModels.VaultingRequestPaymentMethodDetail;
    "redirectUrl": string;
    "vaultingCurrency"?: string;
    "vaultingNotificationUrl": string;
    "vaultingRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayVaultingQueryRequest; property names match the API JSON. */
export interface AlipayVaultingQueryRequest {
    "merchantAccountId"?: string;
    "vaultingRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayVaultingSessionRequest; property names match the API JSON. */
export interface AlipayVaultingSessionRequest {
    "is3DSAuthentication"?: boolean;
    "merchantRegion"?: string;
    "paymentMethodMetaData"?: {
        [key: string]: any | null;
    };
    "paymentMethodType": string;
    "redirectUrl"?: string;
    "vaultingNotificationUrl": string;
    "vaultingRequestId": string;
}

/** Wire-format AlipayVaultsFetchNonceRequest; property names match the API JSON. */
export interface AlipayVaultsFetchNonceRequest {
    "card": VaultsFetchNonceModels.Card;
}

/** Wire-format AlipayVerifyAndCompletePaymentRequest; property names match the API JSON. */
export interface AlipayVerifyAndCompletePaymentRequest {
    "paymentId"?: string;
    "verifyMethod"?: VerifyAndCompletePaymentModels.VerifyMethod;
    "verifyRequestId"?: string;
}

/** Wire-format AlipayCancelRuleResponse; property names match the API JSON. */
export interface AlipayCancelRuleResponse {
    "createTime"?: string;
    "fundsType"?: FundsType;
    "merchantId"?: string;
    "paymentMethodScope"?: PaymentMethodScope;
    "ratio"?: number;
    "releaseTime"?: string;
    "releaseType"?: ReleaseType;
    "result": Result;
    "retentionTime"?: number;
    "ruleId"?: string;
    "ruleStatus"?: RuleStatus;
    "takeType"?: TakeType;
    "updateTime"?: string;
}

/** Wire-format AlipayCaptureResponse; property names match the API JSON. */
export interface AlipayCaptureResponse {
    "acquirerInfo"?: AcquirerInfo;
    "acquirerReferenceNo"?: string;
    "captureAmount"?: Amount;
    "captureId"?: string;
    "captureRequestId"?: string;
    "captureTime"?: string;
    "paymentId"?: string;
    "result": Result;
}

/** Wire-format AlipayCreateHoldResponse; property names match the API JSON. */
export interface AlipayCreateHoldResponse {
    "holdAmount"?: Amount;
    "holdId"?: string;
    "holdRequestId"?: string;
    "holdStatus"?: string;
    "releaseTime"?: string;
    "result": Result;
}

/** Wire-format AlipayCreateMandateResponse; property names match the API JSON. */
export interface AlipayCreateMandateResponse {
    "mandateId"?: string;
    "mandateRequestId"?: string;
    "result": Result;
    "validFrom"?: string;
    "validUntil"?: string;
}

/** Wire-format AlipayCreateReleaseResponse; property names match the API JSON. */
export interface AlipayCreateReleaseResponse {
    "holdId"?: string;
    "releaseAmount"?: Amount;
    "releaseId"?: string;
    "releaseRequestId"?: string;
    "releaseStatus"?: string;
    "result": Result;
}

/** Wire-format AlipayCreateRuleResponse; property names match the API JSON. */
export interface AlipayCreateRuleResponse {
    "createTime"?: string;
    "fundsType"?: FundsType;
    "merchantId"?: string;
    "paymentMethodScope"?: PaymentMethodScope;
    "ratio"?: number;
    "releaseTime"?: string;
    "releaseType"?: ReleaseType;
    "result": Result;
    "retentionTime"?: number;
    "ruleId"?: string;
    "ruleStatus"?: RuleStatus;
    "takeType"?: TakeType;
    "updateTime"?: string;
}

/** Wire-format AlipayInquireExchangeRateResponse; property names match the API JSON. */
export interface AlipayInquireExchangeRateResponse {
    "paymentQuotes"?: Array<InquireExchangeRateModels.PaymentQuote>;
    "quotes": Array<Quote>;
    "result": Result;
}

/** Wire-format AlipayInquireHoldListResponse; property names match the API JSON. */
export interface AlipayInquireHoldListResponse {
    "hasMore"?: boolean;
    "holdDetails"?: Array<InquireHoldListModels.ReserveHoldDetail>;
    "result": Result;
}

/** Wire-format AlipayInquirePaymentMethodResponse; property names match the API JSON. */
export interface AlipayInquirePaymentMethodResponse {
    "paymentMethodDetails"?: Array<InquirePaymentMethodModels.InquirePaymentMethodDetail>;
    "result"?: Result;
}

/** Wire-format AlipayInquireReleaseResponse; property names match the API JSON. */
export interface AlipayInquireReleaseResponse {
    "holdId"?: string;
    "releaseAmount"?: Amount;
    "releaseId"?: string;
    "releaseRequestId"?: string;
    "releaseStatus"?: string;
    "result": Result;
}

/** Wire-format AlipayInquireRuleListResponse; property names match the API JSON. */
export interface AlipayInquireRuleListResponse {
    "hasMore": boolean;
    "result": Result;
    "rules": Array<InquireRuleListModels.ReserveRule>;
}

/** Wire-format AlipayInquiryRefundResponse; property names match the API JSON. */
export interface AlipayInquiryRefundResponse {
    "acquirerInfo"?: AcquirerInfo;
    "actualRefundAmount"?: Amount;
    "arn"?: string;
    "authorizationCode"?: string;
    "customizedInfo"?: CustomizedInfo;
    "grossSettlementAmount"?: Amount;
    "metadata"?: string;
    "refundAmount"?: Amount;
    "refundId"?: string;
    "refundRequestId"?: string;
    "refundStatus"?: TransactionStatusType;
    "refundTime"?: string;
    "result": Result;
    "rrn"?: string;
    "settlementQuote"?: Quote;
    "splitDetails"?: Array<SplitDetail>;
}

/** Wire-format AlipayPayCancelResponse; property names match the API JSON. */
export interface AlipayPayCancelResponse {
    "cancelTime"?: string;
    "paymentId"?: string;
    "paymentRequestId"?: string;
    "result": Result;
}

/** Wire-format AlipayPayConsultResponse; property names match the API JSON. */
export interface AlipayPayConsultResponse {
    "extendInfo"?: string;
    "paymentMethodInfos"?: Array<PayConsultModels.PaymentMethodInfo>;
    "paymentOptions"?: Array<PayConsultModels.PaymentOption>;
    "result": Result;
}

/** Wire-format AlipayPaymentSessionResponse; property names match the API JSON. */
export interface AlipayPaymentSessionResponse {
    "invoiceId"?: string;
    "normalUrl"?: string;
    "paymentSessionData": string;
    "paymentSessionExpiryTime": string;
    "paymentSessionId": string;
    "result": Result;
    "subscriptionId"?: string;
    "url"?: string;
}

/** Wire-format AlipayPayQueryResponse; property names match the API JSON. */
export interface AlipayPayQueryResponse {
    "acquirerInfo"?: AcquirerInfo;
    "acquirerReferenceNo"?: string;
    "actualPaymentAmount"?: Amount;
    "authExpiryTime"?: string;
    "authPaymentId"?: string;
    "authReviewSource"?: string;
    "authReviewStatus"?: string;
    "cardInfo"?: PayQueryModels.CardInfo;
    "customizedInfo"?: CustomizedInfo;
    "customsDeclarationAmount"?: Amount;
    "earliestSettlementTime"?: string;
    "extendInfo"?: string;
    "grossSettlementAmount"?: Amount;
    "merchantAccountId"?: string;
    "metadata"?: string;
    "nonGuaranteeCouponAmount"?: Amount;
    "paymentAmount"?: Amount;
    "paymentCreateTime"?: string;
    "paymentId"?: string;
    "paymentMethodType"?: string;
    "paymentQuote"?: Quote;
    "paymentRequestId"?: string;
    "paymentResultCode"?: string;
    "paymentResultInfo"?: PaymentResultInfo;
    "paymentResultMessage"?: string;
    "paymentStatus"?: TransactionStatusType;
    "paymentTime"?: string;
    "popRiskDecisionResultInfo"?: PayQueryModels.PopRiskDecisionResultInfo;
    "processingAmount"?: Amount;
    "promotionResults"?: Array<PromotionResult>;
    "pspCustomerInfo"?: PspCustomerInfo;
    "redirectActionForm"?: RedirectActionForm;
    "result": Result;
    "retryInfo"?: PayQueryModels.RetryInfo;
    "settlementQuote"?: Quote;
    "transactions"?: Array<PayQueryModels.Transaction>;
}

/** Wire-format AlipayPayResponse; property names match the API JSON. */
export interface AlipayPayResponse {
    "acquirerInfo"?: AcquirerInfo;
    "actualPaymentAmount"?: Amount;
    "appIdentifier"?: string;
    "applinkUrl"?: string;
    "authExpiryTime"?: string;
    "challengeActionForm"?: PayModels.ChallengeActionForm;
    "currentPeriodEnd"?: string;
    "currentPeriodStart"?: string;
    "extendInfo"?: string;
    "grossSettlementAmount"?: Amount;
    "invoiceId"?: string;
    "nonGuaranteeCouponValue"?: Amount;
    "normalUrl"?: string;
    "orderCodeForm"?: PayModels.OrderCodeForm;
    "paymentActionForm"?: string;
    "paymentAmount"?: Amount;
    "paymentCreateTime"?: string;
    "paymentData"?: string;
    "paymentId"?: string;
    "paymentQuote"?: Quote;
    "paymentRequestId"?: string;
    "paymentResultInfo"?: PaymentResultInfo;
    "paymentTime"?: string;
    "processingAmount"?: Amount;
    "promotionResult"?: Array<PromotionResult>;
    "pspCustomerInfo"?: PspCustomerInfo;
    "redirectActionForm"?: RedirectActionForm;
    "result": Result;
    "schemeUrl"?: string;
    "settlementQuote"?: Quote;
    "status"?: string;
    "subscriptionId"?: string;
}

/** Wire-format AlipayRefundResponse; property names match the API JSON. */
export interface AlipayRefundResponse {
    "acquirerInfo"?: AcquirerInfo;
    "acquirerReferenceNo"?: string;
    "actualRefundAmount"?: Amount;
    "grossSettlementAmount"?: Amount;
    "paymentId"?: string;
    "refundAmount"?: Amount;
    "refundId"?: string;
    "refundNonGuaranteeCouponAmount"?: Amount;
    "refundRequestId"?: string;
    "refundTime"?: string;
    "result": Result;
    "settlementQuote"?: Quote;
}

/** Wire-format AlipayUpdateAmountResponse; property names match the API JSON. */
export interface AlipayUpdateAmountResponse {
    "amount"?: Amount;
    "paymentId"?: string;
    "result": Result;
    "updateRequestId"?: string;
}

/** Wire-format AlipayUpdateHoldResponse; property names match the API JSON. */
export interface AlipayUpdateHoldResponse {
    "holdId"?: string;
    "releaseTime"?: string;
    "result": Result;
}

/** Wire-format AlipayUpdateRuleResponse; property names match the API JSON. */
export interface AlipayUpdateRuleResponse {
    "createTime"?: string;
    "fundsType"?: FundsType;
    "merchantId"?: string;
    "paymentMethodScope"?: PaymentMethodScope;
    "ratio"?: number;
    "releaseTime"?: string;
    "releaseType"?: ReleaseType;
    "result": Result;
    "retentionTime"?: number;
    "ruleId"?: string;
    "ruleStatus"?: RuleStatus;
    "takeType"?: TakeType;
    "updateTime"?: string;
}

/** Wire-format AlipayVaultingPaymentMethodResponse; property names match the API JSON. */
export interface AlipayVaultingPaymentMethodResponse {
    "acquirerInfo"?: AcquirerInfo;
    "applinkUrl"?: string;
    "normalUrl"?: string;
    "paymentMethodDetail"?: PaymentMethodDetail;
    "result": Result;
    "schemeUrl"?: string;
    "vaultingRequestId": string;
}

/** Wire-format AlipayVaultingQueryResponse; property names match the API JSON. */
export interface AlipayVaultingQueryResponse {
    "acquirerInfo"?: AcquirerInfo;
    "applinkUrl"?: string;
    "metadata"?: string;
    "normalUrl"?: string;
    "paymentMethodDetail"?: PaymentMethodDetail;
    "result": Result;
    "schemeUrl"?: string;
    "vaultingRequestId": string;
    "vaultingResultCode"?: string;
    "vaultingResultMessage"?: string;
    "vaultingStatus"?: string;
}

/** Wire-format AlipayVaultingSessionResponse; property names match the API JSON. */
export interface AlipayVaultingSessionResponse {
    "normalUrl"?: string;
    "result": Result;
    "vaultingSessionData": string;
    "vaultingSessionExpiryTime": string;
    "vaultingSessionId": string;
}

/** Wire-format AlipayVaultsFetchNonceResponse; property names match the API JSON. */
export interface AlipayVaultsFetchNonceResponse {
    "cardToken": string;
    "result": Result;
}

/** Wire-format AlipayVerifyAndCompletePaymentResponse; property names match the API JSON. */
export interface AlipayVerifyAndCompletePaymentResponse {
    "acquirerInfo"?: AcquirerInfo;
    "paymentAmount"?: Amount;
    "paymentCreateTime"?: string;
    "paymentId"?: string;
    "paymentRequestId"?: string;
    "result"?: Result;
    "verifyRequestId"?: string;
}

/** Typed CancelRule operation for the signed Antom client. */
export const cancelRule = /*#__PURE__*/ defineOperation<AlipayCancelRuleRequest, AlipayCancelRuleResponse>("/ams/api/v1/payments/reserve/cancelRule");

/** Typed Capture operation for the signed Antom client. */
export const capture = /*#__PURE__*/ defineOperation<AlipayCaptureRequest, AlipayCaptureResponse>("/ams/api/v1/payments/capture");

/** Typed CreateHold operation for the signed Antom client. */
export const createHold = /*#__PURE__*/ defineOperation<AlipayCreateHoldRequest, AlipayCreateHoldResponse>("/ams/api/v1/payments/reserve/createHold");

/** Typed CreateMandate operation for the signed Antom client. */
export const createMandate = /*#__PURE__*/ defineOperation<AlipayCreateMandateRequest, AlipayCreateMandateResponse>("/ams/api/v1/payments/createMandate");

/** Typed CreateRelease operation for the signed Antom client. */
export const createRelease = /*#__PURE__*/ defineOperation<AlipayCreateReleaseRequest, AlipayCreateReleaseResponse>("/ams/api/v1/payments/reserve/createRelease");

/** Typed CreateRule operation for the signed Antom client. */
export const createRule = /*#__PURE__*/ defineOperation<AlipayCreateRuleRequest, AlipayCreateRuleResponse>("/ams/api/v1/payments/reserve/createRule");

/** Typed InquireExchangeRate operation for the signed Antom client. */
export const inquireExchangeRate = /*#__PURE__*/ defineOperation<AlipayInquireExchangeRateRequest, AlipayInquireExchangeRateResponse>("/ams/api/v1/payments/inquireExchangeRate");

/** Typed InquireHoldList operation for the signed Antom client. */
export const inquireHoldList = /*#__PURE__*/ defineOperation<AlipayInquireHoldListRequest, AlipayInquireHoldListResponse>("/ams/api/v1/payments/reserve/inquireHoldList");

/** Typed InquirePaymentMethod operation for the signed Antom client. */
export const inquirePaymentMethod = /*#__PURE__*/ defineOperation<AlipayInquirePaymentMethodRequest, AlipayInquirePaymentMethodResponse>("/ams/api/v1/paymentMethods/inquirePaymentMethod");

/** Typed InquireRelease operation for the signed Antom client. */
export const inquireRelease = /*#__PURE__*/ defineOperation<AlipayInquireReleaseRequest, AlipayInquireReleaseResponse>("/ams/api/v1/payments/reserve/inquireRelease");

/** Typed InquireRuleList operation for the signed Antom client. */
export const inquireRuleList = /*#__PURE__*/ defineOperation<AlipayInquireRuleListRequest, AlipayInquireRuleListResponse>("/ams/api/v1/payments/reserve/inquireRuleList");

/** Typed InquiryRefund operation for the signed Antom client. */
export const inquiryRefund = /*#__PURE__*/ defineOperation<AlipayInquiryRefundRequest, AlipayInquiryRefundResponse>("/ams/api/v1/payments/inquiryRefund");

/** Typed Pay operation for the signed Antom client. */
export const pay = /*#__PURE__*/ defineOperation<AlipayPayRequest, AlipayPayResponse>("/ams/api/v1/payments/pay");

/** Typed PayCancel operation for the signed Antom client. */
export const payCancel = /*#__PURE__*/ defineOperation<AlipayPayCancelRequest, AlipayPayCancelResponse>("/ams/api/v1/payments/cancel");

/** Typed PayConsult operation for the signed Antom client. */
export const payConsult = /*#__PURE__*/ defineOperation<AlipayPayConsultRequest, AlipayPayConsultResponse>("/ams/api/v1/payments/consult");

/** Typed PaymentSession operation for the signed Antom client. */
export const paymentSession = /*#__PURE__*/ defineOperation<AlipayPaymentSessionRequest, AlipayPaymentSessionResponse>("/ams/api/v1/payments/createPaymentSession");

/** Typed PayQuery operation for the signed Antom client. */
export const payQuery = /*#__PURE__*/ defineOperation<AlipayPayQueryRequest, AlipayPayQueryResponse>("/ams/api/v1/payments/inquiryPayment");

/** Typed Refund operation for the signed Antom client. */
export const refund = /*#__PURE__*/ defineOperation<AlipayRefundRequest, AlipayRefundResponse>("/ams/api/v1/payments/refund");

/** Typed UpdateAmount operation for the signed Antom client. */
export const updateAmount = /*#__PURE__*/ defineOperation<AlipayUpdateAmountRequest, AlipayUpdateAmountResponse>("/ams/api/v1/payments/updateAmount");

/** Typed UpdateHold operation for the signed Antom client. */
export const updateHold = /*#__PURE__*/ defineOperation<AlipayUpdateHoldRequest, AlipayUpdateHoldResponse>("/ams/api/v1/payments/reserve/updateHold");

/** Typed UpdateRule operation for the signed Antom client. */
export const updateRule = /*#__PURE__*/ defineOperation<AlipayUpdateRuleRequest, AlipayUpdateRuleResponse>("/ams/api/v1/payments/reserve/updateRule");

/** Typed VaultingPaymentMethod operation for the signed Antom client. */
export const vaultingPaymentMethod = /*#__PURE__*/ defineOperation<AlipayVaultingPaymentMethodRequest, AlipayVaultingPaymentMethodResponse>("/ams/api/v1/vaults/vaultPaymentMethod");

/** Typed VaultingQuery operation for the signed Antom client. */
export const vaultingQuery = /*#__PURE__*/ defineOperation<AlipayVaultingQueryRequest, AlipayVaultingQueryResponse>("/ams/api/v1/vaults/inquireVaulting");

/** Typed VaultingSession operation for the signed Antom client. */
export const vaultingSession = /*#__PURE__*/ defineOperation<AlipayVaultingSessionRequest, AlipayVaultingSessionResponse>("/ams/api/v1/vaults/createVaultingSession");

/** Typed VaultsFetchNonce operation for the signed Antom client. */
export const vaultsFetchNonce = /*#__PURE__*/ defineOperation<AlipayVaultsFetchNonceRequest, AlipayVaultsFetchNonceResponse>("/ams/api/v1/vaults/fetchNonce");

/** Typed VerifyAndCompletePayment operation for the signed Antom client. */
export const verifyAndCompletePayment = /*#__PURE__*/ defineOperation<AlipayVerifyAndCompletePaymentRequest, AlipayVerifyAndCompletePaymentResponse>("/ams/api/v1/payments/verifyAndCompletePayment");

/** Create the immutable pay resource tree. */
export function createPayResource(execute: OperationExecutor) {
    return Object.freeze({
        paymentMethodsInquirePaymentMethod: bindOperation(execute, inquirePaymentMethod),
        paymentsCancel: bindOperation(execute, payCancel),
        paymentsCapture: bindOperation(execute, capture),
        paymentsConsult: bindOperation(execute, payConsult),
        paymentsCreateMandate: bindOperation(execute, createMandate),
        paymentsCreatePaymentSession: bindOperation(execute, paymentSession),
        paymentsInquireExchangeRate: bindOperation(execute, inquireExchangeRate),
        paymentsInquiryPayment: bindOperation(execute, payQuery),
        paymentsInquiryRefund: bindOperation(execute, inquiryRefund),
        paymentsPay: bindOperation(execute, pay),
        paymentsRefund: bindOperation(execute, refund),
        paymentsReserveCancelRule: bindOperation(execute, cancelRule),
        paymentsReserveCreateHold: bindOperation(execute, createHold),
        paymentsReserveCreateRelease: bindOperation(execute, createRelease),
        paymentsReserveCreateRule: bindOperation(execute, createRule),
        paymentsReserveInquireHoldList: bindOperation(execute, inquireHoldList),
        paymentsReserveInquireRelease: bindOperation(execute, inquireRelease),
        paymentsReserveInquireRuleList: bindOperation(execute, inquireRuleList),
        paymentsReserveUpdateHold: bindOperation(execute, updateHold),
        paymentsReserveUpdateRule: bindOperation(execute, updateRule),
        paymentsUpdateAmount: bindOperation(execute, updateAmount),
        paymentsVerifyAndCompletePayment: bindOperation(execute, verifyAndCompletePayment),
        vaultsCreateVaultingSession: bindOperation(execute, vaultingSession),
        vaultsFetchNonce: bindOperation(execute, vaultsFetchNonce),
        vaultsInquireVaulting: bindOperation(execute, vaultingQuery),
        vaultsVaultPaymentMethod: bindOperation(execute, vaultingPaymentMethod)
    });
}

/** Public methods available on the pay resource. */
export type PayResource = ReturnType<typeof createPayResource>;
