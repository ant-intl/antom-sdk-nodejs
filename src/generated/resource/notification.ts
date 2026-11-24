/* Generated notification requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { NotificationEvent, Result } from '../share.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireNotificationListRequest; property names match the API JSON. */
export interface AlipayInquireNotificationListRequest {
    "eventCreateTimeFrom"?: string;
    "eventCreateTimeTo"?: string;
    "limit"?: number;
    "notifyType"?: Array<string>;
    "startingAfter"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInquireNotificationRequest; property names match the API JSON. */
export interface AlipayInquireNotificationRequest {
    "eventId": string;
}

/** Wire-format AlipayInquireNotificationListResponse; property names match the API JSON. */
export interface AlipayInquireNotificationListResponse {
    "hasMore"?: boolean;
    "nextStartingAfter"?: string;
    "notifications"?: Array<NotificationEvent>;
    "result": Result;
}

/** Wire-format AlipayInquireNotificationResponse; property names match the API JSON. */
export interface AlipayInquireNotificationResponse {
    "notification"?: NotificationEvent;
    "result": Result;
}

/** Typed InquireNotification operation for the signed Antom client. */
export const inquireNotification = /*#__PURE__*/ defineOperation<AlipayInquireNotificationRequest, AlipayInquireNotificationResponse>("/ams/api/v1/notification/inquireNotification");

/** Typed InquireNotificationList operation for the signed Antom client. */
export const inquireNotificationList = /*#__PURE__*/ defineOperation<AlipayInquireNotificationListRequest, AlipayInquireNotificationListResponse>("/ams/api/v1/notification/inquireNotificationList");

/** Create the immutable notification resource tree. */
export function createNotificationResource(execute: OperationExecutor) {
    return Object.freeze({
        inquireNotification: bindOperation(execute, inquireNotification),
        inquireNotificationList: bindOperation(execute, inquireNotificationList)
    });
}

/** Public methods available on the notification resource. */
export type NotificationResource = ReturnType<typeof createNotificationResource>;
