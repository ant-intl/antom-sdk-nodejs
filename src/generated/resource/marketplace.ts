/* Generated marketplace requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { AccountBalance, PaymentMethod, Result, SettlementBankAccount, TransferFromDetail, TransferToDetail } from '../share.js';
import type * as RegisterModels from '../model/register.js';
import type * as SettleModels from '../model/settle.js';
import type * as SubmitAttachmentModels from '../model/submitattachment.js';

/** Wire-format AlipayCreatePayoutRequest; property names match the API JSON. */
export interface AlipayCreatePayoutRequest {
    "transferFromDetail": TransferFromDetail;
    "transferRequestId": string;
    "transferToDetail": TransferToDetail;
}

/** Wire-format AlipayCreateTransferRequest; property names match the API JSON. */
export interface AlipayCreateTransferRequest {
    "transferFromDetail": TransferFromDetail;
    "transferRequestId": string;
    "transferToDetail": TransferToDetail;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireBalanceRequest; property names match the API JSON. */
export interface AlipayInquireBalanceRequest {
    "referenceMerchantId"?: string;
}

/** Wire-format AlipayRegisterRequest; property names match the API JSON. */
export interface AlipayRegisterRequest {
    "merchantInfo": RegisterModels.MerchantInfo;
    "paymentMethods": Array<PaymentMethod>;
    "registrationRequestId": string;
    "settlementInfos": Array<RegisterModels.SettlementInfo>;
}

/** Wire-format AlipaySettlementInfoUpdateRequest; property names match the API JSON. */
export interface AlipaySettlementInfoUpdateRequest {
    "referenceMerchantId": string;
    "settlementBankAccount": SettlementBankAccount;
    "settlementCurrency": string;
    "updateRequestId": string;
}

/** Wire-format AlipaySettleRequest; property names match the API JSON. */
export interface AlipaySettleRequest {
    "paymentId": string;
    "settlementDetails": Array<SettleModels.SettlementDetail>;
    "settlementRequestId": string;
}

/** Wire-format AlipaySubmitAttachmentRequest; property names match the API JSON. */
export interface AlipaySubmitAttachmentRequest {
    "attachmentType": SubmitAttachmentModels.AttachmentType;
    "fileSha256": string;
    "submitAttachmentRequestId": string;
}

/** Wire-format AlipayCreatePayoutResponse; property names match the API JSON. */
export interface AlipayCreatePayoutResponse {
    "result": Result;
    "transferFromDetail"?: TransferFromDetail;
    "transferId"?: string;
    "transferRequestId"?: string;
    "transferToDetail"?: TransferToDetail;
}

/** Wire-format AlipayCreateTransferResponse; property names match the API JSON. */
export interface AlipayCreateTransferResponse {
    "result": Result;
    "transferFromDetail"?: TransferFromDetail;
    "transferId"?: string;
    "transferRequestId"?: string;
    "transferToDetail": TransferToDetail;
}

/** Wire-format AlipayInquireBalanceResponse; property names match the API JSON. */
export interface AlipayInquireBalanceResponse {
    "accountBalances": Array<AccountBalance>;
    "result": Result;
}

/** Wire-format AlipayRegisterResponse; property names match the API JSON. */
export interface AlipayRegisterResponse {
    "registrationStatus"?: string;
    "result"?: Result;
}

/** Wire-format AlipaySettlementInfoUpdateResponse; property names match the API JSON. */
export interface AlipaySettlementInfoUpdateResponse {
    "result"?: Result;
    "updateStatus"?: string;
}

/** Wire-format AlipaySettleResponse; property names match the API JSON. */
export interface AlipaySettleResponse {
    "result"?: Result;
    "settlementId": string;
    "settlementRequestId": string;
}

/** Wire-format AlipaySubmitAttachmentResponse; property names match the API JSON. */
export interface AlipaySubmitAttachmentResponse {
    "attachmentKey"?: string;
    "attachmentType"?: SubmitAttachmentModels.AttachmentType;
    "result": Result;
    "submitAttachmentRequestId"?: string;
}

/** Typed CreatePayout operation for the signed Antom client. */
export const createPayout = /*#__PURE__*/ defineOperation<AlipayCreatePayoutRequest, AlipayCreatePayoutResponse>("/ams/api/v1/funds/createPayout");

/** Typed CreateTransfer operation for the signed Antom client. */
export const createTransfer = /*#__PURE__*/ defineOperation<AlipayCreateTransferRequest, AlipayCreateTransferResponse>("/ams/api/v1/funds/createTransfer");

/** Typed InquireBalance operation for the signed Antom client. */
export const inquireBalance = /*#__PURE__*/ defineOperation<AlipayInquireBalanceRequest, AlipayInquireBalanceResponse>("/ams/api/v1/accounts/inquireBalance");

/** Typed Register operation for the signed Antom client. */
export const register = /*#__PURE__*/ defineOperation<AlipayRegisterRequest, AlipayRegisterResponse>("/ams/api/v1/merchants/register");

/** Typed Settle operation for the signed Antom client. */
export const settle = /*#__PURE__*/ defineOperation<AlipaySettleRequest, AlipaySettleResponse>("/ams/api/v1/payments/settle");

/** Typed SettlementInfoUpdate operation for the signed Antom client. */
export const settlementInfoUpdate = /*#__PURE__*/ defineOperation<AlipaySettlementInfoUpdateRequest, AlipaySettlementInfoUpdateResponse>("/ams/api/v1/merchants/settlementInfo/update");

/** Typed SubmitAttachment operation for the signed Antom client. */
export const submitAttachment = /*#__PURE__*/ defineOperation<AlipaySubmitAttachmentRequest, AlipaySubmitAttachmentResponse>("/ams/api/open/openapiv2_file/v1/business/attachment/submitAttachment");

/** Create the immutable marketplace resource tree. */
export function createMarketplaceResource(execute: OperationExecutor) {
    return Object.freeze({
        accountsInquireBalance: bindOperation(execute, inquireBalance),
        businessAttachmentSubmitAttachment: bindOperation(execute, submitAttachment),
        fundsCreatePayout: bindOperation(execute, createPayout),
        fundsCreateTransfer: bindOperation(execute, createTransfer),
        merchantsRegister: bindOperation(execute, register),
        merchantsSettlementInfoUpdate: bindOperation(execute, settlementInfoUpdate),
        paymentsSettle: bindOperation(execute, settle)
    });
}

/** Public methods available on the marketplace resource. */
export type MarketplaceResource = ReturnType<typeof createMarketplaceResource>;
