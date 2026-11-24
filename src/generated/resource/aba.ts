/* Generated aba requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { AccountBalance, Amount, AuthorizationControl, CardTransactionEvent, CardholderInfo, Order, PaymentMethod, Quote, RefundFromMethod, Result, Statement, TransactionStatusType } from '../share.js';
import type * as InquireCardModels from '../model/inquirecard.js';
import type * as InquireCardSensitiveInfoModels from '../model/inquirecardsensitiveinfo.js';
import type * as InquireCardTransactionEventModels from '../model/inquirecardtransactionevent.js';
import type * as InquireCardTransactionLifecycleModels from '../model/inquirecardtransactionlifecycle.js';
import type * as InquireCardTransactionLifecycleDetailModels from '../model/inquirecardtransactionlifecycledetail.js';
import type * as InquiryRateModels from '../model/inquiryrate.js';
import type * as InquiryStatementModels from '../model/inquirystatement.js';
import type * as InquiryStatementListModels from '../model/inquirystatementlist.js';

/** Wire-format AlipayApplyCardRequest; property names match the API JSON. */
export interface AlipayApplyCardRequest {
    "authorizationControl"?: AuthorizationControl;
    "cardBinRule"?: string;
    "cardNickName"?: string;
    "metadata"?: {
        [key: string]: string;
    };
    "note"?: string;
    "purpose"?: string;
    "requestId"?: string;
}

/** Wire-format AlipayCreateDirectPaymentRequest; property names match the API JSON. */
export interface AlipayCreateDirectPaymentRequest {
    "memo"?: string;
    "order": Order;
    "payFromAmount": Amount;
    "payToAmount": Amount;
    "payToMethod": PaymentMethod;
    "paymentNotifyUrl"?: string;
    "paymentRequestId": string;
    "remark"?: string;
}

/** Wire-format AlipayCreateDirectRefundRequest; property names match the API JSON. */
export interface AlipayCreateDirectRefundRequest {
    "memo"?: string;
    "paymentId": string;
    "referenceRefundId"?: string;
    "refundFromAmount": Amount;
    "refundFromMethod": RefundFromMethod;
    "refundNotifyUrl"?: string;
    "refundReason"?: string;
    "refundRequestId": string;
    "remark"?: string;
}

/** Wire-format AlipayCreateExchangeRequest; property names match the API JSON. */
export interface AlipayCreateExchangeRequest {
    "buyAmount"?: Amount;
    "exchangeMode"?: string;
    "exchangeRequestId"?: string;
    "exchangeTradeType"?: string;
    "quote"?: Quote;
    "sellAmount"?: Amount;
}

/** Wire-format AlipayCreateQuoteRequest; property names match the API JSON. */
export interface AlipayCreateQuoteRequest {
    "buyAmount": Amount;
    "exchangeTradeType"?: string;
    "sellAmount": Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireAvailableQuotaRequest; property names match the API JSON. */
export interface AlipayInquireAvailableQuotaRequest {
    "currency": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireCardDetailRequest; property names match the API JSON. */
export interface AlipayInquireCardDetailRequest {
    "assetId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireCardRequest; property names match the API JSON. */
export interface AlipayInquireCardRequest {
    "cardNickName"?: string;
    "cardStatus"?: 'ACTIVE' | 'FROZEN' | 'CANCEL';
    "lastFourDigits"?: string;
    "pageNumber": number;
    "pageSize": number;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireCardSensitiveInfoRequest; property names match the API JSON. */
export interface AlipayInquireCardSensitiveInfoRequest {
    "assetId": string;
}

/** Wire-format AlipayInquireCardTransactionEventRequest; property names match the API JSON. */
export interface AlipayInquireCardTransactionEventRequest {
    "assetIdList"?: Array<string>;
    "endTime"?: string;
    "eventIdList"?: Array<string>;
    "eventTypeList"?: Array<InquireCardTransactionEventModels.CardTransactionEventFilterType>;
    "lifecycleIdList"?: Array<string>;
    "pageNumber": number;
    "pageSize": number;
    "startTime"?: string;
    "statusList"?: Array<InquireCardTransactionEventModels.CardTransactionStatusFilterType>;
    "transactionCurrencyList"?: Array<string>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireCardTransactionLifecycleDetailRequest; property names match the API JSON. */
export interface AlipayInquireCardTransactionLifecycleDetailRequest {
    "lifecycleId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireCardTransactionLifecycleRequest; property names match the API JSON. */
export interface AlipayInquireCardTransactionLifecycleRequest {
    "assetIdList"?: Array<string>;
    "endTime"?: string;
    "lifecycleIdList"?: Array<string>;
    "pageNumber": number;
    "pageSize": number;
    "startTime"?: string;
    "transactionCurrencyList"?: Array<string>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireDirectPaymentRequest; property names match the API JSON. */
export interface AlipayInquireDirectPaymentRequest {
    "paymentId": string;
    "paymentRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireDirectRefundRequest; property names match the API JSON. */
export interface AlipayInquireDirectRefundRequest {
    "refundId": string;
    "refundRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireExchangeRequest; property names match the API JSON. */
export interface AlipayInquireExchangeRequest {
    "exchangeRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquiryBalanceRequest; property names match the API JSON. */
export interface AlipayInquiryBalanceRequest {
    "accesstoken"?: string;
    "currencyList": Array<string>;
    "customerId": string;
}

/** Wire-format AlipayInquiryRateRequest; property names match the API JSON. */
export interface AlipayInquiryRateRequest {
    "rateConditionList": Array<InquiryRateModels.InquiryRateCondition>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquiryStatementDetailRequest; property names match the API JSON. */
export interface AlipayInquiryStatementDetailRequest {
    "statementId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquiryStatementListRequest; property names match the API JSON. */
export interface AlipayInquiryStatementListRequest {
    "accessToken": string;
    "currencyList": Array<string>;
    "customerId": string;
    "endTime": string;
    "fuzzyName"?: string;
    "pageNumber": string;
    "pageSize": string;
    "startTime": string;
    "transactionTypeList": Array<string>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquiryStatementRequest; property names match the API JSON. */
export interface AlipayInquiryStatementRequest {
    "accessToken": string;
    "assetId"?: string;
    "currencyList"?: Array<string>;
    "customerId": string;
    "endTime": string;
    "fuzzyName"?: string;
    "pageNumber": number;
    "pageSize": number;
    "startTime": string;
    "transactionTypeList"?: Array<'PAYMENT' | 'PAYMENT_REFUND' | 'CHARGE' | 'CHARGE_REFUND' | 'TOPUP' | 'SETTLEMENT' | 'WITHDRAW' | 'WITHDRAW_RETURN' | 'TRANSFER' | 'TRANSFER_RETURN' | 'TRANSFER_TO_CHINA' | 'TRANSFER_RECIPIENT' | 'EXCHANGE' | 'CREDIT_LOAN' | 'CREDIT_REPAY' | 'CREDIT_REPAYMENT' | 'DIRECT_PAYMENT' | 'DIRECT_REFUND' | 'CARD_PAYMENT' | 'CARD_REFUND' | 'OVERFLOW_DEBIT' | 'OVERFLOW_CREDIT' | 'CASH_BACK'>;
}

/** Wire-format AlipayUpdateCardRequest; property names match the API JSON. */
export interface AlipayUpdateCardRequest {
    "assetId": string;
    "authorizationControl"?: AuthorizationControl;
    "cardNickName"?: string;
    "metadata"?: {
        [key: string]: string;
    };
    "note"?: string;
    "purpose"?: string;
    "requestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayUpdateCardStatusRequest; property names match the API JSON. */
export interface AlipayUpdateCardStatusRequest {
    "assetId": string;
    "notifyUrl"?: string;
    "operateType": 'FREEZE' | 'UNFREEZE' | 'CANCEL';
    "requestId": string;
}

/** Wire-format AlipayApplyCardResponse; property names match the API JSON. */
export interface AlipayApplyCardResponse {
    "assetId"?: string;
    "cardNo"?: string;
    "cvv"?: string;
    "expiredMonth"?: string;
    "expiredYear"?: string;
    "requestId"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayCreateDirectPaymentResponse; property names match the API JSON. */
export interface AlipayCreateDirectPaymentResponse {
    "payFromAmount": Amount;
    "payToAmount": Amount;
    "payToMethod": PaymentMethod;
    "paymentId": string;
    "paymentRequestId": string;
    "paymentTime": string;
    "result": Result;
}

/** Wire-format AlipayCreateDirectRefundResponse; property names match the API JSON. */
export interface AlipayCreateDirectRefundResponse {
    "paymentId": string;
    "refundFromAmount": Amount;
    "refundFromMethod": RefundFromMethod;
    "refundId": string;
    "refundRequestId": string;
    "refundTime": string;
    "refundToAmount": Amount;
    "result": Result;
}

/** Wire-format AlipayCreateExchangeResponse; property names match the API JSON. */
export interface AlipayCreateExchangeResponse {
    "buyAmount"?: Amount;
    "exchangeEndTime"?: string;
    "exchangeMode"?: string;
    "exchangeRequestId"?: string;
    "exchangeStartTime"?: string;
    "exchangeTradeType"?: string;
    "quote"?: Quote;
    "result": Result;
    "sellAmount"?: Amount;
}

/** Wire-format AlipayCreateQuoteResponse; property names match the API JSON. */
export interface AlipayCreateQuoteResponse {
    "buyAmount"?: Amount;
    "exchangeTradeType"?: string;
    "quote"?: Quote;
    "result": Result;
    "sellAmount"?: Amount;
}

/** Wire-format AlipayInquireAvailableQuotaResponse; property names match the API JSON. */
export interface AlipayInquireAvailableQuotaResponse {
    "availableQuota": Amount;
    "result": Result;
}

/** Wire-format AlipayInquireCardDetailResponse; property names match the API JSON. */
export interface AlipayInquireCardDetailResponse {
    "assetId": string;
    "authorizationControl": AuthorizationControl;
    "cardBrand": 'MASTERCARD';
    "cardNickName"?: string;
    "cardStatus": 'ACTIVE' | 'FROZEN' | 'CANCEL';
    "cardholderinfo": CardholderInfo;
    "createdTime": string;
    "maskedCardNo": string;
    "metadata"?: {
        [key: string]: string;
    };
    "note"?: string;
    "purpose": string;
    "result": Result;
    "updatedTime": string;
}

/** Wire-format AlipayInquireCardResponse; property names match the API JSON. */
export interface AlipayInquireCardResponse {
    "cardList": Array<InquireCardModels.AbaCard>;
    "currentPageNumber"?: number;
    "result": Result;
    "totalCount": number;
    "totalPageNumber": number;
}

/** Wire-format AlipayInquireCardSensitiveInfoResponse; property names match the API JSON. */
export interface AlipayInquireCardSensitiveInfoResponse {
    "assetId"?: string;
    "authorizationControl"?: AuthorizationControl;
    "cardDetail"?: InquireCardSensitiveInfoModels.CardDetail;
    "cardNo"?: string;
    "cvv"?: string;
    "expiredMonth"?: string;
    "expiredYear"?: string;
    "result": Result;
}

/** Wire-format AlipayInquireCardTransactionEventResponse; property names match the API JSON. */
export interface AlipayInquireCardTransactionEventResponse {
    "currentPageNumber"?: number;
    "events"?: Array<CardTransactionEvent>;
    "result": Result;
    "totalCount"?: number;
    "totalPageNumber"?: number;
}

/** Wire-format AlipayInquireCardTransactionLifecycleDetailResponse; property names match the API JSON. */
export interface AlipayInquireCardTransactionLifecycleDetailResponse {
    "lifecycle"?: InquireCardTransactionLifecycleDetailModels.CardTransactionLifecycleDetail;
    "result": Result;
}

/** Wire-format AlipayInquireCardTransactionLifecycleResponse; property names match the API JSON. */
export interface AlipayInquireCardTransactionLifecycleResponse {
    "currentPageNumber"?: number;
    "lifecycles"?: Array<InquireCardTransactionLifecycleModels.CardTransactionLifecycle>;
    "result": Result;
    "totalCount"?: number;
    "totalPageNumber"?: number;
}

/** Wire-format AlipayInquireDirectPaymentResponse; property names match the API JSON. */
export interface AlipayInquireDirectPaymentResponse {
    "payToAmount"?: Amount;
    "payToMethod"?: PaymentMethod;
    "paymentAmount"?: Amount;
    "paymentId": string;
    "paymentRequestId": string;
    "paymentResultCode"?: string;
    "paymentResultMessage"?: string;
    "paymentStatus": TransactionStatusType;
    "paymentTime": string;
    "result": Result;
}

/** Wire-format AlipayInquireDirectRefundResponse; property names match the API JSON. */
export interface AlipayInquireDirectRefundResponse {
    "paymentId": string;
    "refundFromAmount": Amount;
    "refundFromMethod": RefundFromMethod;
    "refundId": string;
    "refundRequestId": string;
    "refundResultCode"?: string;
    "refundResultMessage"?: string;
    "refundStatus": TransactionStatusType;
    "refundTime": string;
    "refundToAmount": Amount;
    "result": Result;
}

/** Wire-format AlipayInquireExchangeResponse; property names match the API JSON. */
export interface AlipayInquireExchangeResponse {
    "buyAmount"?: Amount;
    "exchangeEndTime"?: string;
    "exchangeId"?: string;
    "exchangeMode"?: string;
    "exchangeRequestId"?: string;
    "exchangeResult"?: Result;
    "exchangeStartTime"?: string;
    "exchangeTradeType"?: string;
    "quote"?: Quote;
    "result"?: Result;
    "sellAmount"?: Amount;
}

/** Wire-format AlipayInquiryBalanceResponse; property names match the API JSON. */
export interface AlipayInquiryBalanceResponse {
    "accountBalances": Array<AccountBalance>;
    "result": Result;
}

/** Wire-format AlipayInquiryRateResponse; property names match the API JSON. */
export interface AlipayInquiryRateResponse {
    "rateResultList": Array<InquiryRateModels.RateResult>;
    "result": Result;
}

/** Wire-format AlipayInquiryStatementDetailResponse; property names match the API JSON. */
export interface AlipayInquiryStatementDetailResponse {
    "metadata": {
        [key: string]: string;
    };
    "result": Result;
    "statement"?: Statement;
}

/** Wire-format AlipayInquiryStatementListResponse; property names match the API JSON. */
export interface AlipayInquiryStatementListResponse {
    "result": Result;
    "statementList": Array<Statement>;
    "totalCount"?: InquiryStatementListModels.TotalCount;
}

/** Wire-format AlipayInquiryStatementResponse; property names match the API JSON. */
export interface AlipayInquiryStatementResponse {
    "currentPageNumber"?: number;
    "result"?: InquiryStatementModels.ResultResult;
    "statementList"?: Array<Statement>;
    "totalCount"?: number;
    "totalPageNumber"?: number;
}

/** Wire-format AlipayUpdateCardResponse; property names match the API JSON. */
export interface AlipayUpdateCardResponse {
    "requestId": string;
    "result": Result;
    "status": string;
}

/** Wire-format AlipayUpdateCardStatusResponse; property names match the API JSON. */
export interface AlipayUpdateCardStatusResponse {
    "requestId": string;
    "result": Result;
    "status": string;
}

/** Typed ApplyCard operation for the signed Antom client. */
export const applyCard = /*#__PURE__*/ defineOperation<AlipayApplyCardRequest, AlipayApplyCardResponse>("/ams/api/v1/aba/cards/applyCard");

/** Typed CreateDirectPayment operation for the signed Antom client. */
export const createDirectPayment = /*#__PURE__*/ defineOperation<AlipayCreateDirectPaymentRequest, AlipayCreateDirectPaymentResponse>("/ams/api/v1/aba/funds/createDirectPayment");

/** Typed CreateDirectRefund operation for the signed Antom client. */
export const createDirectRefund = /*#__PURE__*/ defineOperation<AlipayCreateDirectRefundRequest, AlipayCreateDirectRefundResponse>("/ams/api/v1/aba/funds/createDirectRefund");

/** Typed CreateExchange operation for the signed Antom client. */
export const createExchange = /*#__PURE__*/ defineOperation<AlipayCreateExchangeRequest, AlipayCreateExchangeResponse>("/ams/api/v1/aba/funds/createExchange");

/** Typed CreateQuote operation for the signed Antom client. */
export const createQuote = /*#__PURE__*/ defineOperation<AlipayCreateQuoteRequest, AlipayCreateQuoteResponse>("/ams/api/v1/aba/funds/createQuote");

/** Typed InquireAvailableQuota operation for the signed Antom client. */
export const inquireAvailableQuota = /*#__PURE__*/ defineOperation<AlipayInquireAvailableQuotaRequest, AlipayInquireAvailableQuotaResponse>("/ams/api/v1/aba/account/inquireAvailableQuota");

/** Typed InquireCard operation for the signed Antom client. */
export const inquireCard = /*#__PURE__*/ defineOperation<AlipayInquireCardRequest, AlipayInquireCardResponse>("/ams/api/v1/aba/cards/inquireCard");

/** Typed InquireCardDetail operation for the signed Antom client. */
export const inquireCardDetail = /*#__PURE__*/ defineOperation<AlipayInquireCardDetailRequest, AlipayInquireCardDetailResponse>("/ams/api/v1/aba/cards/inquireCardDetail");

/** Typed InquireCardSensitiveInfo operation for the signed Antom client. */
export const inquireCardSensitiveInfo = /*#__PURE__*/ defineOperation<AlipayInquireCardSensitiveInfoRequest, AlipayInquireCardSensitiveInfoResponse>("/ams/api/v1/aba/cards/inquireCardSensitiveInfo");

/** Typed InquireCardTransactionEvent operation for the signed Antom client. */
export const inquireCardTransactionEvent = /*#__PURE__*/ defineOperation<AlipayInquireCardTransactionEventRequest, AlipayInquireCardTransactionEventResponse>("/ams/api/v1/aba/cards/inquireCardTransactionEvent");

/** Typed InquireCardTransactionLifecycle operation for the signed Antom client. */
export const inquireCardTransactionLifecycle = /*#__PURE__*/ defineOperation<AlipayInquireCardTransactionLifecycleRequest, AlipayInquireCardTransactionLifecycleResponse>("/ams/api/v1/aba/cards/inquireCardTransactionLifecycle");

/** Typed InquireCardTransactionLifecycleDetail operation for the signed Antom client. */
export const inquireCardTransactionLifecycleDetail = /*#__PURE__*/ defineOperation<AlipayInquireCardTransactionLifecycleDetailRequest, AlipayInquireCardTransactionLifecycleDetailResponse>("/ams/api/v1/aba/cards/inquireCardTransactionLifecycleDetail");

/** Typed InquireDirectPayment operation for the signed Antom client. */
export const inquireDirectPayment = /*#__PURE__*/ defineOperation<AlipayInquireDirectPaymentRequest, AlipayInquireDirectPaymentResponse>("/ams/api/v1/aba/funds/inquireDirectPayment");

/** Typed InquireDirectRefund operation for the signed Antom client. */
export const inquireDirectRefund = /*#__PURE__*/ defineOperation<AlipayInquireDirectRefundRequest, AlipayInquireDirectRefundResponse>("/ams/api/v1/aba/funds/inquireDirectRefund");

/** Typed InquireExchange operation for the signed Antom client. */
export const inquireExchange = /*#__PURE__*/ defineOperation<AlipayInquireExchangeRequest, AlipayInquireExchangeResponse>("/ams/api/v1/aba/funds/inquireExchange");

/** Typed InquiryBalance operation for the signed Antom client. */
export const inquiryBalance = /*#__PURE__*/ defineOperation<AlipayInquiryBalanceRequest, AlipayInquiryBalanceResponse>("/ams/api/v1/aba/accounts/inquiryBalance");

/** Typed InquiryRate operation for the signed Antom client. */
export const inquiryRate = /*#__PURE__*/ defineOperation<AlipayInquiryRateRequest, AlipayInquiryRateResponse>("/ams/api/v1/aba/funds/inquireRate");

/** Typed InquiryStatement operation for the signed Antom client. */
export const inquiryStatement = /*#__PURE__*/ defineOperation<AlipayInquiryStatementRequest, AlipayInquiryStatementResponse>("/ams/api/v1/aba/accounts/inquiryStatement");

/** Typed InquiryStatementDetail operation for the signed Antom client. */
export const inquiryStatementDetail = /*#__PURE__*/ defineOperation<AlipayInquiryStatementDetailRequest, AlipayInquiryStatementDetailResponse>("/ams/api/v1/aba/accounts/inquiryStatementDetail");

/** Typed InquiryStatementList operation for the signed Antom client. */
export const inquiryStatementList = /*#__PURE__*/ defineOperation<AlipayInquiryStatementListRequest, AlipayInquiryStatementListResponse>("/ams/api/v1/aba/accounts/inquiryStatementList");

/** Typed UpdateCard operation for the signed Antom client. */
export const updateCard = /*#__PURE__*/ defineOperation<AlipayUpdateCardRequest, AlipayUpdateCardResponse>("/ams/api/v1/aba/cards/updateCard");

/** Typed UpdateCardStatus operation for the signed Antom client. */
export const updateCardStatus = /*#__PURE__*/ defineOperation<AlipayUpdateCardStatusRequest, AlipayUpdateCardStatusResponse>("/ams/api/v1/aba/cards/updateCardStatus");

/** Create the immutable aba resource tree. */
export function createAbaResource(execute: OperationExecutor) {
    return Object.freeze({
        accountInquireAvailableQuota: bindOperation(execute, inquireAvailableQuota),
        accountsInquiryBalance: bindOperation(execute, inquiryBalance),
        accountsInquiryStatement: bindOperation(execute, inquiryStatement),
        accountsInquiryStatementDetail: bindOperation(execute, inquiryStatementDetail),
        accountsInquiryStatementList: bindOperation(execute, inquiryStatementList),
        cardsApplyCard: bindOperation(execute, applyCard),
        cardsInquireCard: bindOperation(execute, inquireCard),
        cardsInquireCardDetail: bindOperation(execute, inquireCardDetail),
        cardsInquireCardSensitiveInfo: bindOperation(execute, inquireCardSensitiveInfo),
        cardsInquireCardTransactionEvent: bindOperation(execute, inquireCardTransactionEvent),
        cardsInquireCardTransactionLifecycle: bindOperation(execute, inquireCardTransactionLifecycle),
        cardsInquireCardTransactionLifecycleDetail: bindOperation(execute, inquireCardTransactionLifecycleDetail),
        cardsUpdateCard: bindOperation(execute, updateCard),
        cardsUpdateCardStatus: bindOperation(execute, updateCardStatus),
        fundsCreateDirectPayment: bindOperation(execute, createDirectPayment),
        fundsCreateDirectRefund: bindOperation(execute, createDirectRefund),
        fundsCreateExchange: bindOperation(execute, createExchange),
        fundsCreateQuote: bindOperation(execute, createQuote),
        fundsInquireDirectPayment: bindOperation(execute, inquireDirectPayment),
        fundsInquireDirectRefund: bindOperation(execute, inquireDirectRefund),
        fundsInquireExchange: bindOperation(execute, inquireExchange),
        fundsInquireRate: bindOperation(execute, inquiryRate)
    });
}

/** Public methods available on the aba resource. */
export type AbaResource = ReturnType<typeof createAbaResource>;
