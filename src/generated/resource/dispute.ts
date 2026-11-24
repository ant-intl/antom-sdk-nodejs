/* Generated dispute requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { Result } from '../share.js';
import type * as DownloadDisputeEvidenceModels from '../model/downloaddisputeevidence.js';
import type * as SupplyEvidenceModels from '../model/supplyevidence.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayAcceptDisputeRequest; property names match the API JSON. */
export interface AlipayAcceptDisputeRequest {
    "disputeId": string;
}

/** Wire-format AlipayDownloadDisputeEvidenceRequest; property names match the API JSON. */
export interface AlipayDownloadDisputeEvidenceRequest {
    "disputeEvidenceType": DownloadDisputeEvidenceModels.DisputeEvidenceType;
    "disputeId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipaySupplyDefenseDocumentRequest; property names match the API JSON. */
export interface AlipaySupplyDefenseDocumentRequest {
    "disputeEvidence": string;
    "disputeId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipaySupplyEvidenceRequest; property names match the API JSON. */
export interface AlipaySupplyEvidenceRequest {
    "disputeId": string;
    "evidenceContent": {
        [key: string]: object;
    };
}

/** Wire-format AlipayAcceptDisputeResponse; property names match the API JSON. */
export interface AlipayAcceptDisputeResponse {
    "disputeId"?: string;
    "disputeResolutionTime"?: string;
    "result": Result;
}

/** Wire-format AlipayDownloadDisputeEvidenceResponse; property names match the API JSON. */
export interface AlipayDownloadDisputeEvidenceResponse {
    "disputeEvidence"?: string;
    "disputeEvidenceFormat"?: DownloadDisputeEvidenceModels.DisputeEvidenceFormatType;
    "result": Result;
}

/** Wire-format AlipaySupplyDefenseDocumentResponse; property names match the API JSON. */
export interface AlipaySupplyDefenseDocumentResponse {
    "disputeId"?: string;
    "disputeResolutionTime"?: string;
    "result": Result;
}

/** Wire-format AlipaySupplyEvidenceResponse; property names match the API JSON. */
export interface AlipaySupplyEvidenceResponse {
    "disputeId"?: string;
    "evidenceResults"?: Array<SupplyEvidenceModels.DisputeEvidenceResult>;
    "result": Result;
}

/** Typed AcceptDispute operation for the signed Antom client. */
export const acceptDispute = /*#__PURE__*/ defineOperation<AlipayAcceptDisputeRequest, AlipayAcceptDisputeResponse>("/ams/api/v1/payments/acceptDispute");

/** Typed DownloadDisputeEvidence operation for the signed Antom client. */
export const downloadDisputeEvidence = /*#__PURE__*/ defineOperation<AlipayDownloadDisputeEvidenceRequest, AlipayDownloadDisputeEvidenceResponse>("/ams/api/v1/payments/downloadDisputeEvidence");

/** Typed SupplyDefenseDocument operation for the signed Antom client. */
export const supplyDefenseDocument = /*#__PURE__*/ defineOperation<AlipaySupplyDefenseDocumentRequest, AlipaySupplyDefenseDocumentResponse>("/ams/api/v1/payments/supplyDefenseDocument");

/** Typed SupplyEvidence operation for the signed Antom client. */
export const supplyEvidence = /*#__PURE__*/ defineOperation<AlipaySupplyEvidenceRequest, AlipaySupplyEvidenceResponse>("/ams/api/v1/payments/supplyEvidence");

/** Create the immutable dispute resource tree. */
export function createDisputeResource(execute: OperationExecutor) {
    return Object.freeze({
        paymentsAcceptDispute: bindOperation(execute, acceptDispute),
        paymentsDownloadDisputeEvidence: bindOperation(execute, downloadDisputeEvidence),
        paymentsSupplyDefenseDocument: bindOperation(execute, supplyDefenseDocument),
        paymentsSupplyEvidence: bindOperation(execute, supplyEvidence)
    });
}

/** Public methods available on the dispute resource. */
export type DisputeResource = ReturnType<typeof createDisputeResource>;
