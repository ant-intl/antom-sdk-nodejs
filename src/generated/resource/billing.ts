/* Generated billing requests, responses, operations, and resource factories. */
import { defineOperation } from '../../types.js';
import type { OperationExecutor } from '../../types.js';
import { bindOperation } from '../../resources.js';
import type { Amount, Applicability, AutomaticTax, BillingDiscount, BillingSubscriptionPriceItem, BillingTrialSettings, CreditGrant, CreditNoteItem, InvoicePayment, InvoiceShipping, Meter, Paginator, PaymentMethod, Price, RecurringSettings, Result, ResultInfo, SubscriptionItem, TaxBreakdown, TaxCalculatedCustomerDetails, TaxCalculatedLineItem, TaxCalculatedShipFromDetails, TaxCalculatedShippingCost, TaxHeadOffice, TaxJurisdiction, Tier } from '../share.js';
import type * as BillingSubscriptionCancelModels from '../model/billingsubscriptioncancel.js';
import type * as BillingSubscriptionCreateModels from '../model/billingsubscriptioncreate.js';
import type * as BillingSubscriptionInquireDetailsModels from '../model/billingsubscriptioninquiredetails.js';
import type * as BillingSubscriptionInquireListModels from '../model/billingsubscriptioninquirelist.js';
import type * as BillingSubscriptionUpdateModels from '../model/billingsubscriptionupdate.js';
import type * as CouponCreateModels from '../model/couponcreate.js';
import type * as CouponInquireDetailsModels from '../model/couponinquiredetails.js';
import type * as CouponInquireListModels from '../model/couponinquirelist.js';
import type * as CreditNoteCreateModels from '../model/creditnotecreate.js';
import type * as CreditNoteInquireListModels from '../model/creditnoteinquirelist.js';
import type * as CustomerInquireListModels from '../model/customerinquirelist.js';
import type * as InvoiceCreateModels from '../model/invoicecreate.js';
import type * as InvoiceInquireDetailsModels from '../model/invoiceinquiredetails.js';
import type * as InvoiceInquireListModels from '../model/invoiceinquirelist.js';
import type * as InvoiceUpdateModels from '../model/invoiceupdate.js';
import type * as ProductInquireListModels from '../model/productinquirelist.js';
import type * as PromotionCodeCreateModels from '../model/promotioncodecreate.js';
import type * as PromotionCodeInquireDetailsModels from '../model/promotioncodeinquiredetails.js';
import type * as PromotionCodeInquireListModels from '../model/promotioncodeinquirelist.js';
import type * as ReceiptInquireDetailsModels from '../model/receiptinquiredetails.js';
import type * as ReceiptInquireListModels from '../model/receiptinquirelist.js';
import type * as TaxCalculateModels from '../model/taxcalculate.js';
import type * as TaxInquireRegistrationListModels from '../model/taxinquireregistrationlist.js';
import type * as TaxInquireTransactionListModels from '../model/taxinquiretransactionlist.js';

/** Wire-format AlipayBillingSubscriptionCancelRequest; property names match the API JSON. */
export interface AlipayBillingSubscriptionCancelRequest {
    "cancellationDetails"?: BillingSubscriptionCancelModels.BillingSubscriptionCancelCancellationDetails;
    "cancellationReason"?: string;
    "cancellationType"?: string;
    "prorationBehavior"?: string;
    "subscriptionId": string;
}

/** Wire-format AlipayBillingSubscriptionCreateRequest; property names match the API JSON. */
export interface AlipayBillingSubscriptionCreateRequest {
    "cancelAt"?: string;
    "cancelAtPeriodEnd"?: boolean;
    "collectionMethod"?: string;
    "customerEmail"?: string;
    "customerId"?: string;
    "daysUntilDue"?: number;
    "description"?: string;
    "discounts"?: Array<BillingDiscount>;
    "metadata"?: string;
    "paymentBehavior"?: string;
    "priceItems": Array<BillingSubscriptionCreateModels.PriceItem>;
    "subscriptionNotifyUrl"?: string;
    "subscriptionRequestId": string;
    "trialSettings"?: BillingTrialSettings;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayBillingSubscriptionInquireDetailsRequest; property names match the API JSON. */
export interface AlipayBillingSubscriptionInquireDetailsRequest {
    "subscriptionId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayBillingSubscriptionInquireListRequest; property names match the API JSON. */
export interface AlipayBillingSubscriptionInquireListRequest {
    "customerId"?: string;
    "endingBefore"?: string;
    "gmtCreateEnd"?: string;
    "gmtCreateStart"?: string;
    "limit"?: number;
    "sortOrder"?: string;
    "startingAfter"?: string;
    "status"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayBillingSubscriptionResumeRequest; property names match the API JSON. */
export interface AlipayBillingSubscriptionResumeRequest {
    "reasonCode": string;
    "subscriptionId": string;
}

/** Wire-format AlipayBillingSubscriptionUpdateRequest; property names match the API JSON. */
export interface AlipayBillingSubscriptionUpdateRequest {
    "cancelAt"?: string;
    "cancelAtPeriodEnd"?: boolean;
    "cancellationDetails"?: BillingSubscriptionUpdateModels.BillingSubscriptionCancellationDetails;
    "collectionMethod"?: string;
    "daysUntilDue"?: number;
    "description"?: string;
    "metadata"?: string;
    "priceItemChanges"?: Array<BillingSubscriptionUpdateModels.PriceItemChange>;
    "prorationBehavior"?: string;
    "resetBillingCycleAnchor"?: boolean;
    "statusChange"?: BillingSubscriptionUpdateModels.BillingSubscriptionStatusChange;
    "subscriptionId": string;
    "trialSettings"?: BillingTrialSettings;
}

/** Wire-format AlipayCouponCreateRequest; property names match the API JSON. */
export interface AlipayCouponCreateRequest {
    "amountOff"?: Amount;
    "appliesTo"?: CouponCreateModels.CouponCreateAppliesTo;
    "couponName"?: string;
    "couponRequestId": string;
    "discountType": string;
    "durationType": string;
    "durationUnit"?: string;
    "durationValue"?: number;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "percentOff"?: string;
    "promotionCodes"?: Array<CouponCreateModels.PromotionCode>;
    "redeemBy"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCouponInquireDetailsRequest; property names match the API JSON. */
export interface AlipayCouponInquireDetailsRequest {
    "couponId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCouponInquireListRequest; property names match the API JSON. */
export interface AlipayCouponInquireListRequest {
    "discountType"?: string;
    "endingBefore"?: string;
    "includeTotal"?: boolean;
    "limit"?: number;
    "startingAfter"?: string;
    "status"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCouponUpdateRequest; property names match the API JSON. */
export interface AlipayCouponUpdateRequest {
    "couponId": string;
    "couponName"?: string;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "redeemBy"?: string;
    "status"?: string;
}

/** Wire-format AlipayCreditGrantCreateRequest; property names match the API JSON. */
export interface AlipayCreditGrantCreateRequest {
    "amount": Amount;
    "applicability": Applicability;
    "category": string;
    "creditGrantName": string;
    "customerId": string;
    "effectiveDateTime"?: string;
    "expiryDateTime"?: string;
    "priority"?: number;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditGrantInquireDetailsRequest; property names match the API JSON. */
export interface AlipayCreditGrantInquireDetailsRequest {
    "creditGrantId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditGrantInquireListRequest; property names match the API JSON. */
export interface AlipayCreditGrantInquireListRequest {
    "customerId"?: string;
    "pageNum"?: number;
    "pageSize"?: number;
    "status"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditGrantUpdateExpiryRequest; property names match the API JSON. */
export interface AlipayCreditGrantUpdateExpiryRequest {
    "creditGrantId": string;
    "expiryDateTime"?: string;
    "expiryMode": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditGrantVoidRequest; property names match the API JSON. */
export interface AlipayCreditGrantVoidRequest {
    "creditGrantId": string;
    "voidReason"?: string;
}

/** Wire-format AlipayCreditNoteCreateRequest; property names match the API JSON. */
export interface AlipayCreditNoteCreateRequest {
    "creditNoteNotifyUrl"?: string;
    "creditNoteRequestId": string;
    "effectiveDate"?: string;
    "emailType"?: string;
    "invoiceId": string;
    "items"?: Array<CreditNoteCreateModels.CreditNoteCreateItem>;
    "language"?: string;
    "memo"?: string;
    "metadata"?: string;
    "reason"?: string;
    "reasonDescription"?: string;
    "refundAmount"?: Amount;
    "refundDestination"?: string;
    "totalAmount": Amount;
    "type": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditNoteInquireDetailsRequest; property names match the API JSON. */
export interface AlipayCreditNoteInquireDetailsRequest {
    "creditNoteId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditNoteInquireListRequest; property names match the API JSON. */
export interface AlipayCreditNoteInquireListRequest {
    "customerId"?: string;
    "endDate"?: string;
    "endingBefore"?: string;
    "includeTotal"?: boolean;
    "invoiceId"?: string;
    "limit"?: number;
    "reason"?: string;
    "startDate"?: string;
    "startingAfter"?: string;
    "status"?: string;
    "type"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCreditNoteVoidRequest; property names match the API JSON. */
export interface AlipayCreditNoteVoidRequest {
    "creditNoteId": string;
    "reason"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCustomerCreatePortalLinkRequest; property names match the API JSON. */
export interface AlipayCustomerCreatePortalLinkRequest {
    "autoSend"?: boolean;
    "customerId"?: string;
    "email"?: string;
    "features"?: Array<string>;
    "settingId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCustomerCreateRequest; property names match the API JSON. */
export interface AlipayCustomerCreateRequest {
    "address"?: string;
    "addressDetail"?: string;
    "alipayUserId"?: string;
    "billingEmail"?: string;
    "city"?: string;
    "country"?: string;
    "currency"?: string;
    "customerRequestId": string;
    "defaultPaymentMethod"?: string;
    "description"?: string;
    "email": string;
    "firstName"?: string;
    "lastName"?: string;
    "metadata"?: string;
    "preferredLocales"?: Array<string>;
    "referenceCustomerId"?: string;
    "shippingAddress"?: string;
    "shippingAddressDetail"?: string;
    "shippingCity"?: string;
    "shippingCountry"?: string;
    "shippingFirstName"?: string;
    "shippingLastName"?: string;
    "shippingState"?: string;
    "shippingZipcode"?: string;
    "state"?: string;
    "zipcode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCustomerDeleteRequest; property names match the API JSON. */
export interface AlipayCustomerDeleteRequest {
    "customerId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCustomerInquireDetailsRequest; property names match the API JSON. */
export interface AlipayCustomerInquireDetailsRequest {
    "customerId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCustomerInquireListRequest; property names match the API JSON. */
export interface AlipayCustomerInquireListRequest {
    "country"?: Array<string>;
    "customerId"?: string;
    "email"?: string;
    "emailPrefix"?: string;
    "endingBefore"?: string;
    "gmtCreateEnd"?: string;
    "gmtCreateStart"?: string;
    "includeTotal"?: boolean;
    "limit"?: number;
    "startingAfter"?: string;
    "status"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayCustomerUpdateRequest; property names match the API JSON. */
export interface AlipayCustomerUpdateRequest {
    "address"?: string;
    "addressDetail"?: string;
    "alipayUserId"?: string;
    "billingEmail"?: string;
    "city"?: string;
    "country"?: string;
    "currency"?: string;
    "customerId": string;
    "defaultPaymentMethod"?: string;
    "description"?: string;
    "email"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "metadata"?: string;
    "preferredLocales"?: Array<string>;
    "referenceCustomerId"?: string;
    "shippingAddress"?: string;
    "shippingAddressDetail"?: string;
    "shippingCity"?: string;
    "shippingCountry"?: string;
    "shippingFirstName"?: string;
    "shippingLastName"?: string;
    "shippingState"?: string;
    "shippingZipcode"?: string;
    "state"?: string;
    "zipcode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceConfirmPaymentRequest; property names match the API JSON. */
export interface AlipayInvoiceConfirmPaymentRequest {
    "autoSend"?: boolean;
    "ccEmails"?: Array<string>;
    "confirmationType": string;
    "invoiceId": string;
    "invoiceNote"?: string;
    "paymentMethod"?: string;
    "reference"?: string;
}

/** Wire-format AlipayInvoiceCreateRequest; property names match the API JSON. */
export interface AlipayInvoiceCreateRequest {
    "autoSend"?: boolean;
    "automaticTax"?: AutomaticTax;
    "ccEmails"?: Array<string>;
    "collectionMethod"?: string;
    "currency": string;
    "customerDetails"?: InvoiceCreateModels.InvoiceCustomerDetails;
    "customerId"?: string;
    "description"?: string;
    "discounts"?: Array<BillingDiscount>;
    "dueDate"?: string;
    "includePaymentLink"?: boolean;
    "invoiceNotifyUrl"?: string;
    "invoiceRequestId": string;
    "items": Array<InvoiceCreateModels.InvoiceCreateItem>;
    "paymentMethod"?: PaymentMethod;
    "shipping"?: InvoiceShipping;
    "status"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceCreateViewLinkRequest; property names match the API JSON. */
export interface AlipayInvoiceCreateViewLinkRequest {
    "invoiceId"?: string;
    "invoiceRequestId"?: string;
    "linkExpiryDays"?: number;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceExportRequest; property names match the API JSON. */
export interface AlipayInvoiceExportRequest {
    "columnPreset"?: string;
    "customerId"?: string;
    "downloadType": string;
    "endDate"?: string;
    "fileFormat"?: string;
    "invoiceIds"?: Array<string>;
    "language"?: string;
    "startDate"?: string;
    "status"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceFinalizeRequest; property names match the API JSON. */
export interface AlipayInvoiceFinalizeRequest {
    "autoSend"?: boolean;
    "invoiceId": string;
    "invoiceNote"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceInquireDetailsRequest; property names match the API JSON. */
export interface AlipayInvoiceInquireDetailsRequest {
    "invoiceId"?: string;
    "invoiceRequestId"?: string;
}

/** Wire-format AlipayInvoiceInquireListRequest; property names match the API JSON. */
export interface AlipayInvoiceInquireListRequest {
    "customerId"?: string;
    "endDate"?: string;
    "endingBefore"?: string;
    "excludeDraft"?: boolean;
    "includeTotal"?: boolean;
    "invoiceId"?: string;
    "limit"?: number;
    "maxAmount"?: Amount;
    "minAmount"?: Amount;
    "reason"?: string;
    "startDate"?: string;
    "startingAfter"?: string;
    "status"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceMarkUncollectibleRequest; property names match the API JSON. */
export interface AlipayInvoiceMarkUncollectibleRequest {
    "invoiceId": string;
    "invoiceNote"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceReviseRequest; property names match the API JSON. */
export interface AlipayInvoiceReviseRequest {
    "invoiceId"?: string;
    "invoiceNotifyUrl"?: string;
    "invoiceRequestId"?: string;
    "invoiceRevisionRequestId": string;
    "void": boolean;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceSendRequest; property names match the API JSON. */
export interface AlipayInvoiceSendRequest {
    "ccEmails"?: Array<string>;
    "includePaymentLink"?: boolean;
    "internalNote"?: string;
    "invoiceId": string;
}

/** Wire-format AlipayInvoiceUpdateRequest; property names match the API JSON. */
export interface AlipayInvoiceUpdateRequest {
    "collectionMethod"?: string;
    "customFields"?: Array<InvoiceUpdateModels.InvoiceCustomField>;
    "customerId"?: string;
    "description"?: string;
    "dueDate"?: string;
    "footer"?: string;
    "includePaymentLink"?: boolean;
    "invoiceId": string;
    "invoiceNotifyUrl"?: string;
    "memo"?: string;
    "paymentMethod"?: PaymentMethod;
    "shipping"?: InvoiceShipping;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayInvoiceVoidRequest; property names match the API JSON. */
export interface AlipayInvoiceVoidRequest {
    "invoiceId": string;
    "invoiceNote"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayMeterCreateRequest; property names match the API JSON. */
export interface AlipayMeterCreateRequest {
    "aggregationMethod": string;
    "eventName": string;
    "eventTimeWindow"?: string;
    "meterName": string;
    "valueKeyOverride"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayMeterCreateSessionRequest; property names match the API JSON. */
export interface AlipayMeterCreateSessionRequest {
    "requestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayMeterInquireDetailsRequest; property names match the API JSON. */
export interface AlipayMeterInquireDetailsRequest {
    "meterId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayMeterInquireListRequest; property names match the API JSON. */
export interface AlipayMeterInquireListRequest {
    "endDateTime"?: string;
    "eventName"?: string;
    "meterName"?: string;
    "pageNum"?: number;
    "pageSize"?: number;
    "startDateTime"?: string;
    "status"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayMeterUpdateRequest; property names match the API JSON. */
export interface AlipayMeterUpdateRequest {
    "meterId": string;
    "meterName"?: string;
    "status"?: string;
}

/** Wire-format AlipayPriceCreateRequest; property names match the API JSON. */
export interface AlipayPriceCreateRequest {
    "defaultPrice"?: boolean;
    "includedQuantity"?: number;
    "metadata"?: string;
    "meterId"?: string;
    "name"?: string;
    "priceRequestId"?: string;
    "pricingModel"?: string;
    "productId": string;
    "recurring"?: RecurringSettings;
    "tiers"?: Array<Tier>;
    "tiersMode"?: string;
    "unitAmount"?: Amount;
    "unitLabel"?: string;
    "usageType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPriceInquireDetailsRequest; property names match the API JSON. */
export interface AlipayPriceInquireDetailsRequest {
    "priceId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPriceInquireListRequest; property names match the API JSON. */
export interface AlipayPriceInquireListRequest {
    "active"?: boolean;
    "endingBefore"?: string;
    "includeTotal"?: boolean;
    "limit"?: number;
    "pricingModel"?: string;
    "productId": string;
    "startingAfter"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPriceUpdateRequest; property names match the API JSON. */
export interface AlipayPriceUpdateRequest {
    "active"?: boolean;
    "defaultPrice"?: boolean;
    "metadata"?: string;
    "name"?: string;
    "priceId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayProductCreateRequest; property names match the API JSON. */
export interface AlipayProductCreateRequest {
    "description"?: string;
    "images"?: Array<string>;
    "metadata"?: string;
    "name": string;
    "productRequestId"?: string;
    "type"?: string;
    "unitLabel"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayProductInquireDetailsRequest; property names match the API JSON. */
export interface AlipayProductInquireDetailsRequest {
    "productId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayProductInquireListRequest; property names match the API JSON. */
export interface AlipayProductInquireListRequest {
    "active"?: boolean;
    "endingBefore"?: string;
    "includeTotal"?: boolean;
    "keyword"?: string;
    "limit"?: number;
    "startingAfter"?: string;
    "type"?: string;
    "usageType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayProductUpdateRequest; property names match the API JSON. */
export interface AlipayProductUpdateRequest {
    "active"?: boolean;
    "description"?: string;
    "images"?: Array<string>;
    "metadata"?: string;
    "name"?: string;
    "productId": string;
    "unitLabel"?: string;
}

/** Wire-format AlipayPromotionCodeCreateRequest; property names match the API JSON. */
export interface AlipayPromotionCodeCreateRequest {
    "code"?: string;
    "couponId": string;
    "customerId"?: string;
    "expiryTime"?: string;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "minAmount"?: PromotionCodeCreateModels.PromotionCodeCreateMinAmount;
    "oneTimeOnly"?: boolean;
    "promotionCodeRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPromotionCodeInquireDetailsRequest; property names match the API JSON. */
export interface AlipayPromotionCodeInquireDetailsRequest {
    "promotionCodeId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPromotionCodeInquireListRequest; property names match the API JSON. */
export interface AlipayPromotionCodeInquireListRequest {
    "couponId": string;
    "endingBefore"?: string;
    "includeTotal"?: boolean;
    "limit"?: number;
    "startingAfter"?: string;
    "status"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayPromotionCodeUpdateRequest; property names match the API JSON. */
export interface AlipayPromotionCodeUpdateRequest {
    "expiryTime"?: string;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "promotionCodeId": string;
    "status"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayReceiptExportRequest; property names match the API JSON. */
export interface AlipayReceiptExportRequest {
    "columnPreset"?: string;
    "customerId"?: string;
    "downloadType": string;
    "endDate"?: string;
    "fileFormat"?: string;
    "language"?: string;
    "receiptIds"?: Array<string>;
    "startDate"?: string;
    "status"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayReceiptInquireDetailsRequest; property names match the API JSON. */
export interface AlipayReceiptInquireDetailsRequest {
    "invoiceId"?: string;
    "receiptId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayReceiptInquireListRequest; property names match the API JSON. */
export interface AlipayReceiptInquireListRequest {
    "customerId"?: string;
    "endDate"?: string;
    "endingBefore"?: string;
    "includeTotal"?: boolean;
    "invoiceId"?: string;
    "limit"?: number;
    "receiptType"?: string;
    "startDate"?: string;
    "startingAfter"?: string;
    "status"?: string;
    "subscriptionId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayReceiptSendRequest; property names match the API JSON. */
export interface AlipayReceiptSendRequest {
    "ccEmails"?: Array<string>;
    "receiptId": string;
}

/** Wire-format AlipayTaxCalculateRequest; property names match the API JSON. */
export interface AlipayTaxCalculateRequest {
    "customerDetails"?: TaxCalculateModels.TaxCustomerDetails;
    "customerId"?: string;
    "lineItems": Array<TaxCalculateModels.TaxCalculationLineItem>;
    "shipFromDetails"?: TaxCalculateModels.TaxShipFromDetails;
    "shippingCost"?: TaxCalculateModels.TaxShippingCost;
    "taxCalculationRequestId": string;
    "taxDate"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayTaxCancelRegistrationRequest; property names match the API JSON. */
export interface AlipayTaxCancelRegistrationRequest {
    "registrationCancelRequestId": string;
    "taxRegistrationId": string;
}

/** Wire-format AlipayTaxInitializeSettingsRequest; property names match the API JSON. */
export interface AlipayTaxInitializeSettingsRequest {
    "defaultTaxBehavior": string;
    "defaultTaxCode": string;
    "headOffice": TaxHeadOffice;
    "settingsRequestId": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayTaxInquireCalculationRequest; property names match the API JSON. */
export interface AlipayTaxInquireCalculationRequest {
    "paymentRequestId"?: string;
    "taxCalculationId"?: string;
    "taxCalculationRequestId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayTaxInquireRegistrationListRequest; property names match the API JSON. */
export interface AlipayTaxInquireRegistrationListRequest {
    "currentPage"?: number;
    "pageSize"?: number;
    "status"?: string;
}

/** Empty wire object declared by this operation schema. */
export type AlipayTaxInquireSettingsRequest = Record<string, never>;

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayTaxInquireTransactionListRequest; property names match the API JSON. */
export interface AlipayTaxInquireTransactionListRequest {
    "currentPage"?: number;
    "pageSize"?: number;
    "paymentId"?: string;
    "refundId"?: string;
    "taxCalculationId"?: string;
}

/** Wire-format AlipayTaxRegisterRequest; property names match the API JSON. */
export interface AlipayTaxRegisterRequest {
    "activeFrom": string;
    "expireAt"?: string;
    "jurisdiction": TaxJurisdiction;
    "registrationRequestId": string;
    "registrationType": string;
    "taxId": string;
    "taxType": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AlipayTaxUpdateRegistrationPeriodRequest; property names match the API JSON. */
export interface AlipayTaxUpdateRegistrationPeriodRequest {
    "activeFrom"?: string;
    "expireAt"?: string;
    "registrationUpdatePeriodRequestId": string;
    "taxRegistrationId": string;
}

/** Wire-format AlipayTaxUpdateSettingsRequest; property names match the API JSON. */
export interface AlipayTaxUpdateSettingsRequest {
    "defaultTaxBehavior"?: string;
    "defaultTaxCode"?: string;
    "headOffice"?: TaxHeadOffice;
    "settingsUpdateRequestId": string;
}

/** Wire-format AlipayBillingSubscriptionCancelResponse; property names match the API JSON. */
export interface AlipayBillingSubscriptionCancelResponse {
    "cancelAtPeriodEnd": boolean;
    "canceledAt": string;
    "creditNoteAmount"?: number;
    "creditNoteCurrency"?: string;
    "creditNoteId"?: string;
    "result": ResultInfo;
    "status": string;
    "subscriptionId": string;
}

/** Wire-format AlipayBillingSubscriptionCreateResponse; property names match the API JSON. */
export interface AlipayBillingSubscriptionCreateResponse {
    "billingCycleAnchor"?: string;
    "cancelAt"?: string;
    "collectionMethod"?: string;
    "currentPeriodEnd"?: string;
    "currentPeriodStart"?: string;
    "customerId"?: string;
    "daysUntilDue"?: number;
    "description"?: string;
    "discounts"?: Array<BillingDiscount>;
    "invoiceId"?: string;
    "result": Result;
    "status"?: string;
    "subscriptionId"?: string;
    "subscriptionItems"?: Array<SubscriptionItem>;
    "subscriptionNotifyUrl"?: string;
    "subscriptionRequestId"?: string;
    "trialEnd"?: string;
    "trialStart"?: string;
}

/** Wire-format AlipayBillingSubscriptionInquireDetailsResponse; property names match the API JSON. */
export interface AlipayBillingSubscriptionInquireDetailsResponse {
    "billingCycleAnchor"?: string;
    "billingMode"?: string;
    "cancelAt"?: string;
    "cancelAtPeriodEnd"?: boolean;
    "canceledAt"?: string;
    "cancellationDetails"?: BillingSubscriptionInquireDetailsModels.BillingSubscriptionInquireDetailsCancellationDetails;
    "collectionMethod"?: string;
    "createTime"?: string;
    "currentPeriodEnd"?: string;
    "currentPeriodStart"?: string;
    "daysUntilDue"?: number;
    "defaultPaymentMethod"?: string;
    "description"?: string;
    "discountAmount"?: Amount;
    "discounts"?: Array<BillingSubscriptionInquireDetailsModels.BillingSubscriptionDiscountInfo>;
    "metadata"?: string;
    "paymentBehavior"?: string;
    "priceItems"?: Array<BillingSubscriptionPriceItem>;
    "result": ResultInfo;
    "status"?: string;
    "subscriptionId"?: string;
    "subscriptionRequestId"?: string;
    "subtotal"?: Amount;
    "terminationReason"?: string;
    "totalAmount"?: Amount;
    "trialEnd"?: string;
    "trialStart"?: string;
}

/** Wire-format AlipayBillingSubscriptionInquireListResponse; property names match the API JSON. */
export interface AlipayBillingSubscriptionInquireListResponse {
    "hasMore": boolean;
    "nextCursor"?: string;
    "previousCursor"?: string;
    "result": ResultInfo;
    "subscriptions": Array<BillingSubscriptionInquireListModels.Subscription>;
}

/** Wire-format AlipayBillingSubscriptionResumeResponse; property names match the API JSON. */
export interface AlipayBillingSubscriptionResumeResponse {
    "billingCycleAnchor"?: string;
    "result": ResultInfo;
    "status": string;
    "subscriptionId": string;
}

/** Wire-format AlipayBillingSubscriptionUpdateResponse; property names match the API JSON. */
export interface AlipayBillingSubscriptionUpdateResponse {
    "creditNoteAmount"?: number;
    "creditNoteCurrency"?: string;
    "creditNoteId"?: string;
    "creditNoteIds"?: Array<string>;
    "pendingUpdate"?: boolean;
    "prorationInvoiceAmount"?: number;
    "prorationInvoiceCurrency"?: string;
    "prorationInvoiceId"?: string;
    "result": ResultInfo;
    "status"?: string;
    "subscriptionId"?: string;
    "subscriptionItems"?: Array<SubscriptionItem>;
}

/** Wire-format AlipayCouponCreateResponse; property names match the API JSON. */
export interface AlipayCouponCreateResponse {
    "couponId"?: string;
    "couponName"?: string;
    "discountType"?: string;
    "promotionCodes"?: Array<CouponCreateModels.CouponPromotionCode>;
    "result": ResultInfo;
    "status"?: string;
}

/** Wire-format AlipayCouponInquireDetailsResponse; property names match the API JSON. */
export interface AlipayCouponInquireDetailsResponse {
    "amountOff"?: Amount;
    "appliesTo"?: CouponInquireDetailsModels.CouponInquireDetailsAppliesTo;
    "couponId"?: string;
    "couponName"?: string;
    "couponRequestId"?: string;
    "discountType"?: string;
    "durationType"?: string;
    "durationUnit"?: string;
    "durationValue"?: number;
    "gmtCreate"?: string;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "percentOff"?: string;
    "redeemBy"?: string;
    "redeemedCount"?: number;
    "result": ResultInfo;
    "status"?: string;
}

/** Wire-format AlipayCouponInquireListResponse; property names match the API JSON. */
export interface AlipayCouponInquireListResponse {
    "coupons"?: Array<CouponInquireListModels.Coupon>;
    "hasMore"?: boolean;
    "nextCursor"?: string;
    "previousCursor"?: string;
    "result": ResultInfo;
    "total"?: number;
}

/** Wire-format AlipayCouponUpdateResponse; property names match the API JSON. */
export interface AlipayCouponUpdateResponse {
    "couponId"?: string;
    "result": ResultInfo;
    "status"?: string;
}

/** Wire-format AlipayCreditGrantCreateResponse; property names match the API JSON. */
export interface AlipayCreditGrantCreateResponse {
    "creditGrant"?: CreditGrant;
    "result": Result;
}

/** Wire-format AlipayCreditGrantInquireDetailsResponse; property names match the API JSON. */
export interface AlipayCreditGrantInquireDetailsResponse {
    "creditGrant"?: CreditGrant;
    "result": Result;
}

/** Wire-format AlipayCreditGrantInquireListResponse; property names match the API JSON. */
export interface AlipayCreditGrantInquireListResponse {
    "creditGrants": Array<CreditGrant>;
    "pageNum": number;
    "pageSize": number;
    "result": Result;
    "totalCount": number;
}

/** Wire-format AlipayCreditGrantUpdateExpiryResponse; property names match the API JSON. */
export interface AlipayCreditGrantUpdateExpiryResponse {
    "creditGrant"?: CreditGrant;
    "result": Result;
}

/** Wire-format AlipayCreditGrantVoidResponse; property names match the API JSON. */
export interface AlipayCreditGrantVoidResponse {
    "creditGrant"?: CreditGrant;
    "result": Result;
}

/** Wire-format AlipayCreditNoteCreateResponse; property names match the API JSON. */
export interface AlipayCreditNoteCreateResponse {
    "createdAt"?: string;
    "creditNoteId"?: string;
    "creditNoteRequestId"?: string;
    "customerId"?: string;
    "effectiveDate"?: string;
    "invoiceId"?: string;
    "issuedAt"?: string;
    "items"?: Array<CreditNoteItem>;
    "memo"?: string;
    "reason"?: string;
    "reasonDescription"?: string;
    "refundAmount"?: Amount;
    "refundDestination"?: string;
    "refundId"?: string;
    "refundStatus"?: string;
    "refundedAt"?: string;
    "result": Result;
    "status"?: string;
    "totalAmount"?: Amount;
    "type"?: string;
}

/** Wire-format AlipayCreditNoteInquireDetailsResponse; property names match the API JSON. */
export interface AlipayCreditNoteInquireDetailsResponse {
    "createdAt"?: string;
    "creditNoteId"?: string;
    "creditNoteRequestId"?: string;
    "customerId"?: string;
    "effectiveDate"?: string;
    "invoiceId"?: string;
    "issuedAt"?: string;
    "items"?: Array<CreditNoteItem>;
    "memo"?: string;
    "reason"?: string;
    "reasonDescription"?: string;
    "refundAmount"?: Amount;
    "refundDestination"?: string;
    "refundId"?: string;
    "refundStatus"?: string;
    "refundedAt"?: string;
    "result": Result;
    "status"?: string;
    "totalAmount"?: Amount;
    "type"?: string;
    "voidedAt"?: string;
}

/** Wire-format AlipayCreditNoteInquireListResponse; property names match the API JSON. */
export interface AlipayCreditNoteInquireListResponse {
    "hasMore": boolean;
    "list"?: Array<CreditNoteInquireListModels.CreditNoteSummary>;
    "result": Result;
    "totalCount"?: number;
}

/** Wire-format AlipayCreditNoteVoidResponse; property names match the API JSON. */
export interface AlipayCreditNoteVoidResponse {
    "creditNoteId"?: string;
    "result": Result;
    "status"?: string;
    "voidedAt"?: string;
}

/** Wire-format AlipayCustomerCreatePortalLinkResponse; property names match the API JSON. */
export interface AlipayCustomerCreatePortalLinkResponse {
    "expiresAt"?: string;
    "portalUrl"?: string;
    "result": Result;
    "sendStatus"?: string;
    "token"?: string;
}

/** Wire-format AlipayCustomerCreateResponse; property names match the API JSON. */
export interface AlipayCustomerCreateResponse {
    "customerId"?: string;
    "customerRequestId"?: string;
    "email"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayCustomerDeleteResponse; property names match the API JSON. */
export interface AlipayCustomerDeleteResponse {
    "customerId"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayCustomerInquireDetailsResponse; property names match the API JSON. */
export interface AlipayCustomerInquireDetailsResponse {
    "address"?: string;
    "addressDetail"?: string;
    "alipayUserId"?: string;
    "billingEmail"?: string;
    "city"?: string;
    "country"?: string;
    "currency"?: string;
    "customerId"?: string;
    "customerRequestId"?: string;
    "defaultPaymentMethod"?: string;
    "description"?: string;
    "email"?: string;
    "firstName"?: string;
    "gmtCreate"?: string;
    "lastName"?: string;
    "metadata"?: string;
    "preferredLocales"?: Array<string>;
    "referenceCustomerId"?: string;
    "result": Result;
    "shippingAddress"?: string;
    "shippingAddressDetail"?: string;
    "shippingCity"?: string;
    "shippingCountry"?: string;
    "shippingFirstName"?: string;
    "shippingLastName"?: string;
    "shippingState"?: string;
    "shippingZipcode"?: string;
    "state"?: string;
    "status"?: string;
    "zipcode"?: string;
}

/** Wire-format AlipayCustomerInquireListResponse; property names match the API JSON. */
export interface AlipayCustomerInquireListResponse {
    "customers"?: Array<CustomerInquireListModels.Customer>;
    "hasMore"?: boolean;
    "nextCursor"?: string;
    "previousCursor"?: string;
    "result": Result;
    "total"?: number;
}

/** Wire-format AlipayCustomerUpdateResponse; property names match the API JSON. */
export interface AlipayCustomerUpdateResponse {
    "customerId"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayInvoiceConfirmPaymentResponse; property names match the API JSON. */
export interface AlipayInvoiceConfirmPaymentResponse {
    "invoiceId"?: string;
    "invoiceNote"?: string;
    "paidAt"?: string;
    "receiptId"?: string;
    "result": Result;
    "sendStatus"?: string;
    "status"?: string;
}

/** Wire-format AlipayInvoiceCreateResponse; property names match the API JSON. */
export interface AlipayInvoiceCreateResponse {
    "hostedInvoiceUrl"?: string;
    "invoiceId"?: string;
    "invoiceRequestId"?: string;
    "result": Result;
    "sendStatus"?: string;
    "status"?: string;
}

/** Wire-format AlipayInvoiceCreateViewLinkResponse; property names match the API JSON. */
export interface AlipayInvoiceCreateViewLinkResponse {
    "expiresAt"?: string;
    "result": Result;
    "token"?: string;
    "viewUrl"?: string;
}

/** Wire-format AlipayInvoiceExportResponse; property names match the API JSON. */
export interface AlipayInvoiceExportResponse {
    "expiresAt"?: string;
    "fileFormat"?: string;
    "fileName"?: string;
    "fileSize"?: number;
    "fileUrl"?: string;
    "mode"?: string;
    "result": Result;
}

/** Wire-format AlipayInvoiceFinalizeResponse; property names match the API JSON. */
export interface AlipayInvoiceFinalizeResponse {
    "finalizedAt"?: string;
    "hostedInvoiceUrl"?: string;
    "invoiceId"?: string;
    "invoiceNote"?: string;
    "result": Result;
    "sendStatus"?: string;
    "status"?: string;
}

/** Wire-format AlipayInvoiceInquireDetailsResponse; property names match the API JSON. */
export interface AlipayInvoiceInquireDetailsResponse {
    "collectionMethod"?: string;
    "currency"?: string;
    "customerEmail"?: string;
    "customerFirstName"?: string;
    "customerId"?: string;
    "customerLastName"?: string;
    "description"?: string;
    "discountAmount"?: Amount;
    "discounts"?: Array<BillingDiscount>;
    "dueDate"?: string;
    "gmtCreate"?: string;
    "gmtUpdate"?: string;
    "hostedInvoiceUrl"?: string;
    "invoiceId"?: string;
    "invoiceNotes"?: Array<InvoiceInquireDetailsModels.InvoiceNote>;
    "invoiceNumber"?: string;
    "invoiceRequestId"?: string;
    "items"?: Array<InvoiceInquireDetailsModels.InvoiceItem>;
    "paidAmount"?: Amount;
    "paidTime"?: string;
    "paymentDeducted"?: Amount;
    "paymentMethod"?: PaymentMethod;
    "payments"?: Array<InvoicePayment>;
    "periodEnd"?: string;
    "periodStart"?: string;
    "phaseNo"?: string;
    "postPaymentCreditNotesAmount"?: Amount;
    "prePaymentCreditNotesAmount"?: Amount;
    "reason"?: string;
    "remainAmount"?: Amount;
    "result": Result;
    "shipping"?: InvoiceShipping;
    "status"?: string;
    "subscriptionId"?: string;
    "subtotal"?: Amount;
    "taxAmount"?: Amount;
    "totalAmount"?: Amount;
}

/** Wire-format AlipayInvoiceInquireListResponse; property names match the API JSON. */
export interface AlipayInvoiceInquireListResponse {
    "degrade"?: boolean;
    "hasMore"?: boolean;
    "invoices"?: Array<InvoiceInquireListModels.Invoice>;
    "nextCursor"?: string;
    "previousCursor"?: string;
    "result": Result;
    "total"?: string;
}

/** Wire-format AlipayInvoiceMarkUncollectibleResponse; property names match the API JSON. */
export interface AlipayInvoiceMarkUncollectibleResponse {
    "invoiceId"?: string;
    "invoiceNote"?: string;
    "markedUncollectibleAt"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayInvoiceReviseResponse; property names match the API JSON. */
export interface AlipayInvoiceReviseResponse {
    "newInvoiceId"?: string;
    "result": Result;
    "voidedInvoiceId"?: string;
}

/** Wire-format AlipayInvoiceSendResponse; property names match the API JSON. */
export interface AlipayInvoiceSendResponse {
    "hostedInvoiceUrl"?: string;
    "invoiceId"?: string;
    "result": Result;
    "sendStatus"?: string;
}

/** Wire-format AlipayInvoiceUpdateResponse; property names match the API JSON. */
export interface AlipayInvoiceUpdateResponse {
    "invoiceId"?: string;
    "previousInvoiceId"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayInvoiceVoidResponse; property names match the API JSON. */
export interface AlipayInvoiceVoidResponse {
    "invoiceId"?: string;
    "invoiceNote"?: string;
    "result": Result;
    "status"?: string;
    "voidedAt"?: string;
}

/** Wire-format AlipayMeterCreateResponse; property names match the API JSON. */
export interface AlipayMeterCreateResponse {
    "meter"?: Meter;
    "result": Result;
}

/** Wire-format AlipayMeterCreateSessionResponse; property names match the API JSON. */
export interface AlipayMeterCreateSessionResponse {
    "result": Result;
    "sessionExpiryTime"?: string;
    "sessionId"?: string;
}

/** Wire-format AlipayMeterInquireDetailsResponse; property names match the API JSON. */
export interface AlipayMeterInquireDetailsResponse {
    "meter"?: Meter;
    "result": Result;
}

/** Wire-format AlipayMeterInquireListResponse; property names match the API JSON. */
export interface AlipayMeterInquireListResponse {
    "meters": Array<Meter>;
    "pageNum": number;
    "pageSize": number;
    "result": Result;
    "totalCount": number;
}

/** Wire-format AlipayMeterUpdateResponse; property names match the API JSON. */
export interface AlipayMeterUpdateResponse {
    "meter"?: Meter;
    "result": Result;
}

/** Wire-format AlipayPriceCreateResponse; property names match the API JSON. */
export interface AlipayPriceCreateResponse {
    "active"?: boolean;
    "createdAt"?: string;
    "defaultPrice"?: boolean;
    "includedQuantity"?: number;
    "metadata"?: string;
    "meterId"?: string;
    "name"?: string;
    "priceId"?: string;
    "priceRequestId"?: string;
    "pricingModel"?: string;
    "productId"?: string;
    "recurring"?: RecurringSettings;
    "result": Result;
    "tiers"?: Array<Tier>;
    "tiersMode"?: string;
    "unitAmount"?: Amount;
    "unitLabel"?: string;
    "updatedAt"?: string;
    "usageType"?: string;
}

/** Wire-format AlipayPriceInquireDetailsResponse; property names match the API JSON. */
export interface AlipayPriceInquireDetailsResponse {
    "active"?: boolean;
    "createdAt"?: string;
    "deactivatedAt"?: string;
    "defaultPrice"?: boolean;
    "includedQuantity"?: number;
    "metadata"?: string;
    "meterId"?: string;
    "name"?: string;
    "priceId"?: string;
    "pricingModel"?: string;
    "productId"?: string;
    "recurring"?: RecurringSettings;
    "result": Result;
    "tiers"?: Array<Tier>;
    "tiersMode"?: string;
    "unitAmount"?: Amount;
    "unitLabel"?: string;
    "updatedAt"?: string;
    "usageType"?: string;
}

/** Wire-format AlipayPriceInquireListResponse; property names match the API JSON. */
export interface AlipayPriceInquireListResponse {
    "hasMore"?: boolean;
    "prices"?: Array<Price>;
    "result": Result;
    "total"?: number;
}

/** Wire-format AlipayPriceUpdateResponse; property names match the API JSON. */
export interface AlipayPriceUpdateResponse {
    "active"?: boolean;
    "createdAt"?: string;
    "deactivatedAt"?: string;
    "defaultPrice"?: boolean;
    "includedQuantity"?: number;
    "metadata"?: string;
    "meterId"?: string;
    "name"?: string;
    "priceId"?: string;
    "pricingModel"?: string;
    "productId"?: string;
    "recurring"?: RecurringSettings;
    "result": Result;
    "tiers"?: Array<Tier>;
    "tiersMode"?: string;
    "unitAmount"?: Amount;
    "unitLabel"?: string;
    "updatedAt"?: string;
    "usageType"?: string;
}

/** Wire-format AlipayProductCreateResponse; property names match the API JSON. */
export interface AlipayProductCreateResponse {
    "active"?: boolean;
    "createdAt"?: string;
    "deactivatedAt"?: string;
    "description"?: string;
    "images"?: Array<string>;
    "metadata"?: string;
    "name"?: string;
    "productId"?: string;
    "productRequestId"?: string;
    "result": Result;
    "type"?: string;
    "unitLabel"?: string;
    "updatedAt"?: string;
}

/** Wire-format AlipayProductInquireDetailsResponse; property names match the API JSON. */
export interface AlipayProductInquireDetailsResponse {
    "active"?: boolean;
    "createdAt"?: string;
    "deactivatedAt"?: string;
    "description"?: string;
    "images"?: Array<string>;
    "metadata"?: string;
    "name"?: string;
    "prices"?: Array<Price>;
    "productId"?: string;
    "productRequestId"?: string;
    "result": Result;
    "type"?: string;
    "unitLabel"?: string;
    "updatedAt"?: string;
}

/** Wire-format AlipayProductInquireListResponse; property names match the API JSON. */
export interface AlipayProductInquireListResponse {
    "hasMore"?: boolean;
    "products"?: Array<ProductInquireListModels.Product>;
    "result": Result;
    "total"?: number;
}

/** Wire-format AlipayProductUpdateResponse; property names match the API JSON. */
export interface AlipayProductUpdateResponse {
    "active"?: boolean;
    "createdAt"?: string;
    "deactivatedAt"?: string;
    "description"?: string;
    "images"?: Array<string>;
    "metadata"?: string;
    "name"?: string;
    "productId"?: string;
    "productRequestId"?: string;
    "result": Result;
    "type"?: string;
    "unitLabel"?: string;
    "updatedAt"?: string;
}

/** Wire-format AlipayPromotionCodeCreateResponse; property names match the API JSON. */
export interface AlipayPromotionCodeCreateResponse {
    "code"?: string;
    "promotionCodeId"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayPromotionCodeInquireDetailsResponse; property names match the API JSON. */
export interface AlipayPromotionCodeInquireDetailsResponse {
    "code"?: string;
    "couponId"?: string;
    "createTime"?: string;
    "customerId"?: string;
    "expiryTime"?: string;
    "maxRedemptions"?: number;
    "metadata"?: string;
    "minAmount"?: PromotionCodeInquireDetailsModels.PromotionCodeInquireDetailsMinAmount;
    "oneTimeOnly"?: boolean;
    "promotionCodeId"?: string;
    "promotionCodeRequestId"?: string;
    "redeemedCount"?: number;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayPromotionCodeInquireListResponse; property names match the API JSON. */
export interface AlipayPromotionCodeInquireListResponse {
    "hasMore"?: boolean;
    "nextCursor"?: string;
    "previousCursor"?: string;
    "promotionCodes"?: Array<PromotionCodeInquireListModels.PromotionCodeInfo>;
    "result": Result;
    "total"?: number;
}

/** Wire-format AlipayPromotionCodeUpdateResponse; property names match the API JSON. */
export interface AlipayPromotionCodeUpdateResponse {
    "promotionCodeId"?: string;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayReceiptExportResponse; property names match the API JSON. */
export interface AlipayReceiptExportResponse {
    "expiresAt"?: string;
    "fileFormat"?: string;
    "fileName"?: string;
    "fileSize"?: number;
    "fileUrl"?: string;
    "mode"?: string;
    "result": Result;
}

/** Wire-format AlipayReceiptInquireDetailsResponse; property names match the API JSON. */
export interface AlipayReceiptInquireDetailsResponse {
    "collectionMethod"?: string;
    "customerEmail"?: string;
    "customerFirstName"?: string;
    "customerId"?: string;
    "customerLastName"?: string;
    "description"?: string;
    "discountAmount"?: Amount;
    "dueDate"?: string;
    "fileUrl"?: string;
    "fxRate"?: string;
    "fxRateId"?: string;
    "gmtCreate"?: string;
    "gmtUpdate"?: string;
    "invoiceId"?: string;
    "items"?: Array<ReceiptInquireDetailsModels.ReceiptItem>;
    "originalReceiptId"?: string;
    "paidAmount"?: Amount;
    "paidTime"?: string;
    "payToId"?: string;
    "payToRequestId"?: string;
    "paymentDeductedAmount"?: Amount;
    "paymentId"?: string;
    "paymentMethod"?: string;
    "paymentMethodType"?: string;
    "paymentRequestId"?: string;
    "payments"?: Array<InvoicePayment>;
    "periodEnd"?: string;
    "periodStart"?: string;
    "reason"?: string;
    "receiptId"?: string;
    "receiptType"?: string;
    "refundAmount"?: Amount;
    "refundId"?: string;
    "refundedAmount"?: Amount;
    "remainingAmount"?: Amount;
    "result": Result;
    "settlementAmount"?: Amount;
    "shippingFeeAmount"?: Amount;
    "status"?: string;
    "subscriptionId"?: string;
    "subtotal"?: Amount;
    "taxAmount"?: Amount;
    "totalAmount"?: Amount;
}

/** Wire-format AlipayReceiptInquireListResponse; property names match the API JSON. */
export interface AlipayReceiptInquireListResponse {
    "hasMore"?: boolean;
    "nextCursor"?: string;
    "previousCursor"?: string;
    "receipts"?: Array<ReceiptInquireListModels.Receipt>;
    "result": Result;
    "total"?: number;
}

/** Wire-format AlipayReceiptSendResponse; property names match the API JSON. */
export interface AlipayReceiptSendResponse {
    "hostedReceiptUrl"?: string;
    "receiptId"?: string;
    "result": Result;
    "sendStatus"?: string;
}

/** Wire-format AlipayTaxCalculateResponse; property names match the API JSON. */
export interface AlipayTaxCalculateResponse {
    "customerDetails"?: TaxCalculatedCustomerDetails;
    "exclusiveTaxAmount"?: Amount;
    "expireAt"?: string;
    "inclusiveTaxAmount"?: Amount;
    "lineItems"?: Array<TaxCalculatedLineItem>;
    "result": Result;
    "shipFromDetails"?: TaxCalculatedShipFromDetails;
    "shippingCost"?: TaxCalculatedShippingCost;
    "taxBreakdown"?: Array<TaxBreakdown>;
    "taxCalculationId"?: string;
    "taxDate"?: string;
    "totalAmount"?: Amount;
}

/** Wire-format AlipayTaxCancelRegistrationResponse; property names match the API JSON. */
export interface AlipayTaxCancelRegistrationResponse {
    "activeFrom"?: string;
    "expireAt"?: string;
    "jurisdiction"?: TaxJurisdiction;
    "registrationType"?: string;
    "result": Result;
    "status"?: string;
    "taxId"?: string;
    "taxRegistrationId"?: string;
    "taxType"?: string;
}

/** Wire-format AlipayTaxInitializeSettingsResponse; property names match the API JSON. */
export interface AlipayTaxInitializeSettingsResponse {
    "defaultTaxBehavior"?: string;
    "defaultTaxCode"?: string;
    "headOffice"?: TaxHeadOffice;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayTaxInquireCalculationResponse; property names match the API JSON. */
export interface AlipayTaxInquireCalculationResponse {
    "customerDetails"?: TaxCalculatedCustomerDetails;
    "exclusiveTaxAmount"?: Amount;
    "expireAt"?: string;
    "inclusiveTaxAmount"?: Amount;
    "lineItems"?: Array<TaxCalculatedLineItem>;
    "result": Result;
    "shipFromDetails"?: TaxCalculatedShipFromDetails;
    "shippingCost"?: TaxCalculatedShippingCost;
    "taxBreakdown"?: Array<TaxBreakdown>;
    "taxCalculationId"?: string;
    "taxDate"?: string;
    "totalAmount"?: Amount;
}

/** Wire-format AlipayTaxInquireRegistrationListResponse; property names match the API JSON. */
export interface AlipayTaxInquireRegistrationListResponse {
    "paginator"?: Paginator;
    "registrations"?: Array<TaxInquireRegistrationListModels.TaxRegistration>;
    "result": Result;
}

/** Wire-format AlipayTaxInquireSettingsResponse; property names match the API JSON. */
export interface AlipayTaxInquireSettingsResponse {
    "defaultTaxBehavior"?: string;
    "defaultTaxCode"?: string;
    "headOffice"?: TaxHeadOffice;
    "result": Result;
    "status"?: string;
}

/** Wire-format AlipayTaxInquireTransactionListResponse; property names match the API JSON. */
export interface AlipayTaxInquireTransactionListResponse {
    "paginator"?: Paginator;
    "result": Result;
    "transactions"?: Array<TaxInquireTransactionListModels.TaxTransaction>;
}

/** Wire-format AlipayTaxRegisterResponse; property names match the API JSON. */
export interface AlipayTaxRegisterResponse {
    "activeFrom"?: string;
    "expireAt"?: string;
    "jurisdiction"?: TaxJurisdiction;
    "registrationType"?: string;
    "result": Result;
    "status"?: string;
    "taxId"?: string;
    "taxRegistrationId"?: string;
    "taxType"?: string;
}

/** Wire-format AlipayTaxUpdateRegistrationPeriodResponse; property names match the API JSON. */
export interface AlipayTaxUpdateRegistrationPeriodResponse {
    "activeFrom"?: string;
    "expireAt"?: string;
    "jurisdiction"?: TaxJurisdiction;
    "registrationType"?: string;
    "result": Result;
    "status"?: string;
    "taxId"?: string;
    "taxRegistrationId"?: string;
    "taxType"?: string;
}

/** Wire-format AlipayTaxUpdateSettingsResponse; property names match the API JSON. */
export interface AlipayTaxUpdateSettingsResponse {
    "defaultTaxBehavior"?: string;
    "defaultTaxCode"?: string;
    "headOffice"?: TaxHeadOffice;
    "result": Result;
    "status"?: string;
}

/** Typed BillingSubscriptionCancel operation for the signed Antom client. */
export const billingSubscriptionCancel = /*#__PURE__*/ defineOperation<AlipayBillingSubscriptionCancelRequest, AlipayBillingSubscriptionCancelResponse>("/ams/api/v1/billing/subscription/cancel");

/** Typed BillingSubscriptionCreate operation for the signed Antom client. */
export const billingSubscriptionCreate = /*#__PURE__*/ defineOperation<AlipayBillingSubscriptionCreateRequest, AlipayBillingSubscriptionCreateResponse>("/ams/api/v1/billing/subscription/create");

/** Typed BillingSubscriptionInquireDetails operation for the signed Antom client. */
export const billingSubscriptionInquireDetails = /*#__PURE__*/ defineOperation<AlipayBillingSubscriptionInquireDetailsRequest, AlipayBillingSubscriptionInquireDetailsResponse>("/ams/api/v1/billing/subscription/inquireDetails");

/** Typed BillingSubscriptionInquireList operation for the signed Antom client. */
export const billingSubscriptionInquireList = /*#__PURE__*/ defineOperation<AlipayBillingSubscriptionInquireListRequest, AlipayBillingSubscriptionInquireListResponse>("/ams/api/v1/billing/subscription/inquireList");

/** Typed BillingSubscriptionResume operation for the signed Antom client. */
export const billingSubscriptionResume = /*#__PURE__*/ defineOperation<AlipayBillingSubscriptionResumeRequest, AlipayBillingSubscriptionResumeResponse>("/ams/api/v1/billing/subscription/resume");

/** Typed BillingSubscriptionUpdate operation for the signed Antom client. */
export const billingSubscriptionUpdate = /*#__PURE__*/ defineOperation<AlipayBillingSubscriptionUpdateRequest, AlipayBillingSubscriptionUpdateResponse>("/ams/api/v1/billing/subscription/update");

/** Typed CouponCreate operation for the signed Antom client. */
export const couponCreate = /*#__PURE__*/ defineOperation<AlipayCouponCreateRequest, AlipayCouponCreateResponse>("/ams/api/v1/billing/coupon/create");

/** Typed CouponInquireDetails operation for the signed Antom client. */
export const couponInquireDetails = /*#__PURE__*/ defineOperation<AlipayCouponInquireDetailsRequest, AlipayCouponInquireDetailsResponse>("/ams/api/v1/billing/coupon/inquireDetails");

/** Typed CouponInquireList operation for the signed Antom client. */
export const couponInquireList = /*#__PURE__*/ defineOperation<AlipayCouponInquireListRequest, AlipayCouponInquireListResponse>("/ams/api/v1/billing/coupon/inquireList");

/** Typed CouponUpdate operation for the signed Antom client. */
export const couponUpdate = /*#__PURE__*/ defineOperation<AlipayCouponUpdateRequest, AlipayCouponUpdateResponse>("/ams/api/v1/billing/coupon/update");

/** Typed CreditGrantCreate operation for the signed Antom client. */
export const creditGrantCreate = /*#__PURE__*/ defineOperation<AlipayCreditGrantCreateRequest, AlipayCreditGrantCreateResponse>("/ams/api/v1/meter/creditGrant/create");

/** Typed CreditGrantInquireDetails operation for the signed Antom client. */
export const creditGrantInquireDetails = /*#__PURE__*/ defineOperation<AlipayCreditGrantInquireDetailsRequest, AlipayCreditGrantInquireDetailsResponse>("/ams/api/v1/meter/creditGrant/inquireDetails");

/** Typed CreditGrantInquireList operation for the signed Antom client. */
export const creditGrantInquireList = /*#__PURE__*/ defineOperation<AlipayCreditGrantInquireListRequest, AlipayCreditGrantInquireListResponse>("/ams/api/v1/meter/creditGrant/inquireList");

/** Typed CreditGrantUpdateExpiry operation for the signed Antom client. */
export const creditGrantUpdateExpiry = /*#__PURE__*/ defineOperation<AlipayCreditGrantUpdateExpiryRequest, AlipayCreditGrantUpdateExpiryResponse>("/ams/api/v1/meter/creditGrant/updateExpiry");

/** Typed CreditGrantVoid operation for the signed Antom client. */
export const creditGrantVoid = /*#__PURE__*/ defineOperation<AlipayCreditGrantVoidRequest, AlipayCreditGrantVoidResponse>("/ams/api/v1/meter/creditGrant/void");

/** Typed CreditNoteCreate operation for the signed Antom client. */
export const creditNoteCreate = /*#__PURE__*/ defineOperation<AlipayCreditNoteCreateRequest, AlipayCreditNoteCreateResponse>("/ams/api/v1/billing/creditNote/create");

/** Typed CreditNoteInquireDetails operation for the signed Antom client. */
export const creditNoteInquireDetails = /*#__PURE__*/ defineOperation<AlipayCreditNoteInquireDetailsRequest, AlipayCreditNoteInquireDetailsResponse>("/ams/api/v1/billing/creditNote/inquireDetails");

/** Typed CreditNoteInquireList operation for the signed Antom client. */
export const creditNoteInquireList = /*#__PURE__*/ defineOperation<AlipayCreditNoteInquireListRequest, AlipayCreditNoteInquireListResponse>("/ams/api/v1/billing/creditNote/inquireList");

/** Typed CreditNoteVoid operation for the signed Antom client. */
export const creditNoteVoid = /*#__PURE__*/ defineOperation<AlipayCreditNoteVoidRequest, AlipayCreditNoteVoidResponse>("/ams/api/v1/billing/creditNote/void");

/** Typed CustomerCreate operation for the signed Antom client. */
export const customerCreate = /*#__PURE__*/ defineOperation<AlipayCustomerCreateRequest, AlipayCustomerCreateResponse>("/ams/api/v1/billing/customer/create");

/** Typed CustomerCreatePortalLink operation for the signed Antom client. */
export const customerCreatePortalLink = /*#__PURE__*/ defineOperation<AlipayCustomerCreatePortalLinkRequest, AlipayCustomerCreatePortalLinkResponse>("/ams/api/v1/billing/customer/createPortalLink");

/** Typed CustomerDelete operation for the signed Antom client. */
export const customerDelete = /*#__PURE__*/ defineOperation<AlipayCustomerDeleteRequest, AlipayCustomerDeleteResponse>("/ams/api/v1/billing/customer/delete");

/** Typed CustomerInquireDetails operation for the signed Antom client. */
export const customerInquireDetails = /*#__PURE__*/ defineOperation<AlipayCustomerInquireDetailsRequest, AlipayCustomerInquireDetailsResponse>("/ams/api/v1/billing/customer/inquireDetails");

/** Typed CustomerInquireList operation for the signed Antom client. */
export const customerInquireList = /*#__PURE__*/ defineOperation<AlipayCustomerInquireListRequest, AlipayCustomerInquireListResponse>("/ams/api/v1/billing/customer/inquireList");

/** Typed CustomerUpdate operation for the signed Antom client. */
export const customerUpdate = /*#__PURE__*/ defineOperation<AlipayCustomerUpdateRequest, AlipayCustomerUpdateResponse>("/ams/api/v1/billing/customer/update");

/** Typed InvoiceConfirmPayment operation for the signed Antom client. */
export const invoiceConfirmPayment = /*#__PURE__*/ defineOperation<AlipayInvoiceConfirmPaymentRequest, AlipayInvoiceConfirmPaymentResponse>("/ams/api/v1/billing/invoice/confirmPayment");

/** Typed InvoiceCreate operation for the signed Antom client. */
export const invoiceCreate = /*#__PURE__*/ defineOperation<AlipayInvoiceCreateRequest, AlipayInvoiceCreateResponse>("/ams/api/v1/billing/invoice/create");

/** Typed InvoiceCreateViewLink operation for the signed Antom client. */
export const invoiceCreateViewLink = /*#__PURE__*/ defineOperation<AlipayInvoiceCreateViewLinkRequest, AlipayInvoiceCreateViewLinkResponse>("/ams/api/v1/billing/invoice/createViewLink");

/** Typed InvoiceExport operation for the signed Antom client. */
export const invoiceExport = /*#__PURE__*/ defineOperation<AlipayInvoiceExportRequest, AlipayInvoiceExportResponse>("/ams/api/v1/billing/invoice/export");

/** Typed InvoiceFinalize operation for the signed Antom client. */
export const invoiceFinalize = /*#__PURE__*/ defineOperation<AlipayInvoiceFinalizeRequest, AlipayInvoiceFinalizeResponse>("/ams/api/v1/billing/invoice/finalize");

/** Typed InvoiceInquireDetails operation for the signed Antom client. */
export const invoiceInquireDetails = /*#__PURE__*/ defineOperation<AlipayInvoiceInquireDetailsRequest, AlipayInvoiceInquireDetailsResponse>("/ams/api/v1/billing/invoice/inquireDetails");

/** Typed InvoiceInquireList operation for the signed Antom client. */
export const invoiceInquireList = /*#__PURE__*/ defineOperation<AlipayInvoiceInquireListRequest, AlipayInvoiceInquireListResponse>("/ams/api/v1/billing/invoice/inquireList");

/** Typed InvoiceMarkUncollectible operation for the signed Antom client. */
export const invoiceMarkUncollectible = /*#__PURE__*/ defineOperation<AlipayInvoiceMarkUncollectibleRequest, AlipayInvoiceMarkUncollectibleResponse>("/ams/api/v1/billing/invoice/markUncollectible");

/** Typed InvoiceRevise operation for the signed Antom client. */
export const invoiceRevise = /*#__PURE__*/ defineOperation<AlipayInvoiceReviseRequest, AlipayInvoiceReviseResponse>("/ams/api/v1/billing/invoice/revise");

/** Typed InvoiceSend operation for the signed Antom client. */
export const invoiceSend = /*#__PURE__*/ defineOperation<AlipayInvoiceSendRequest, AlipayInvoiceSendResponse>("/ams/api/v1/billing/invoice/send");

/** Typed InvoiceUpdate operation for the signed Antom client. */
export const invoiceUpdate = /*#__PURE__*/ defineOperation<AlipayInvoiceUpdateRequest, AlipayInvoiceUpdateResponse>("/ams/api/v1/billing/invoice/update");

/** Typed InvoiceVoid operation for the signed Antom client. */
export const invoiceVoid = /*#__PURE__*/ defineOperation<AlipayInvoiceVoidRequest, AlipayInvoiceVoidResponse>("/ams/api/v1/billing/invoice/void");

/** Typed MeterCreate operation for the signed Antom client. */
export const meterCreate = /*#__PURE__*/ defineOperation<AlipayMeterCreateRequest, AlipayMeterCreateResponse>("/ams/api/v1/meter/create");

/** Typed MeterCreateSession operation for the signed Antom client. */
export const meterCreateSession = /*#__PURE__*/ defineOperation<AlipayMeterCreateSessionRequest, AlipayMeterCreateSessionResponse>("/ams/api/v1/meter/createSession");

/** Typed MeterInquireDetails operation for the signed Antom client. */
export const meterInquireDetails = /*#__PURE__*/ defineOperation<AlipayMeterInquireDetailsRequest, AlipayMeterInquireDetailsResponse>("/ams/api/v1/meter/inquireDetails");

/** Typed MeterInquireList operation for the signed Antom client. */
export const meterInquireList = /*#__PURE__*/ defineOperation<AlipayMeterInquireListRequest, AlipayMeterInquireListResponse>("/ams/api/v1/meter/inquireList");

/** Typed MeterUpdate operation for the signed Antom client. */
export const meterUpdate = /*#__PURE__*/ defineOperation<AlipayMeterUpdateRequest, AlipayMeterUpdateResponse>("/ams/api/v1/meter/update");

/** Typed PriceCreate operation for the signed Antom client. */
export const priceCreate = /*#__PURE__*/ defineOperation<AlipayPriceCreateRequest, AlipayPriceCreateResponse>("/ams/api/v1/billing/price/create");

/** Typed PriceInquireDetails operation for the signed Antom client. */
export const priceInquireDetails = /*#__PURE__*/ defineOperation<AlipayPriceInquireDetailsRequest, AlipayPriceInquireDetailsResponse>("/ams/api/v1/billing/price/inquireDetails");

/** Typed PriceInquireList operation for the signed Antom client. */
export const priceInquireList = /*#__PURE__*/ defineOperation<AlipayPriceInquireListRequest, AlipayPriceInquireListResponse>("/ams/api/v1/billing/price/inquireList");

/** Typed PriceUpdate operation for the signed Antom client. */
export const priceUpdate = /*#__PURE__*/ defineOperation<AlipayPriceUpdateRequest, AlipayPriceUpdateResponse>("/ams/api/v1/billing/price/update");

/** Typed ProductCreate operation for the signed Antom client. */
export const productCreate = /*#__PURE__*/ defineOperation<AlipayProductCreateRequest, AlipayProductCreateResponse>("/ams/api/v1/billing/product/create");

/** Typed ProductInquireDetails operation for the signed Antom client. */
export const productInquireDetails = /*#__PURE__*/ defineOperation<AlipayProductInquireDetailsRequest, AlipayProductInquireDetailsResponse>("/ams/api/v1/billing/product/inquireDetails");

/** Typed ProductInquireList operation for the signed Antom client. */
export const productInquireList = /*#__PURE__*/ defineOperation<AlipayProductInquireListRequest, AlipayProductInquireListResponse>("/ams/api/v1/billing/product/inquireList");

/** Typed ProductUpdate operation for the signed Antom client. */
export const productUpdate = /*#__PURE__*/ defineOperation<AlipayProductUpdateRequest, AlipayProductUpdateResponse>("/ams/api/v1/billing/product/update");

/** Typed PromotionCodeCreate operation for the signed Antom client. */
export const promotionCodeCreate = /*#__PURE__*/ defineOperation<AlipayPromotionCodeCreateRequest, AlipayPromotionCodeCreateResponse>("/ams/api/v1/billing/promotionCode/create");

/** Typed PromotionCodeInquireDetails operation for the signed Antom client. */
export const promotionCodeInquireDetails = /*#__PURE__*/ defineOperation<AlipayPromotionCodeInquireDetailsRequest, AlipayPromotionCodeInquireDetailsResponse>("/ams/api/v1/billing/promotionCode/inquireDetails");

/** Typed PromotionCodeInquireList operation for the signed Antom client. */
export const promotionCodeInquireList = /*#__PURE__*/ defineOperation<AlipayPromotionCodeInquireListRequest, AlipayPromotionCodeInquireListResponse>("/ams/api/v1/billing/promotionCode/inquireList");

/** Typed PromotionCodeUpdate operation for the signed Antom client. */
export const promotionCodeUpdate = /*#__PURE__*/ defineOperation<AlipayPromotionCodeUpdateRequest, AlipayPromotionCodeUpdateResponse>("/ams/api/v1/billing/promotionCode/update");

/** Typed ReceiptExport operation for the signed Antom client. */
export const receiptExport = /*#__PURE__*/ defineOperation<AlipayReceiptExportRequest, AlipayReceiptExportResponse>("/ams/api/v1/billing/receipt/export");

/** Typed ReceiptInquireDetails operation for the signed Antom client. */
export const receiptInquireDetails = /*#__PURE__*/ defineOperation<AlipayReceiptInquireDetailsRequest, AlipayReceiptInquireDetailsResponse>("/ams/api/v1/billing/receipt/inquireDetails");

/** Typed ReceiptInquireList operation for the signed Antom client. */
export const receiptInquireList = /*#__PURE__*/ defineOperation<AlipayReceiptInquireListRequest, AlipayReceiptInquireListResponse>("/ams/api/v1/billing/receipt/inquireList");

/** Typed ReceiptSend operation for the signed Antom client. */
export const receiptSend = /*#__PURE__*/ defineOperation<AlipayReceiptSendRequest, AlipayReceiptSendResponse>("/ams/api/v1/billing/receipt/send");

/** Typed TaxCalculate operation for the signed Antom client. */
export const taxCalculate = /*#__PURE__*/ defineOperation<AlipayTaxCalculateRequest, AlipayTaxCalculateResponse>("/ams/api/v1/tax/calculate");

/** Typed TaxCancelRegistration operation for the signed Antom client. */
export const taxCancelRegistration = /*#__PURE__*/ defineOperation<AlipayTaxCancelRegistrationRequest, AlipayTaxCancelRegistrationResponse>("/ams/api/v1/tax/cancelRegistration");

/** Typed TaxInitializeSettings operation for the signed Antom client. */
export const taxInitializeSettings = /*#__PURE__*/ defineOperation<AlipayTaxInitializeSettingsRequest, AlipayTaxInitializeSettingsResponse>("/ams/api/v1/tax/initializeSettings");

/** Typed TaxInquireCalculation operation for the signed Antom client. */
export const taxInquireCalculation = /*#__PURE__*/ defineOperation<AlipayTaxInquireCalculationRequest, AlipayTaxInquireCalculationResponse>("/ams/api/v1/tax/inquireCalculation");

/** Typed TaxInquireRegistrationList operation for the signed Antom client. */
export const taxInquireRegistrationList = /*#__PURE__*/ defineOperation<AlipayTaxInquireRegistrationListRequest, AlipayTaxInquireRegistrationListResponse>("/ams/api/v1/tax/inquireRegistrationList");

/** Typed TaxInquireSettings operation for the signed Antom client. */
export const taxInquireSettings = /*#__PURE__*/ defineOperation<AlipayTaxInquireSettingsRequest, AlipayTaxInquireSettingsResponse>("/ams/api/v1/tax/inquireSettings");

/** Typed TaxInquireTransactionList operation for the signed Antom client. */
export const taxInquireTransactionList = /*#__PURE__*/ defineOperation<AlipayTaxInquireTransactionListRequest, AlipayTaxInquireTransactionListResponse>("/ams/api/v1/tax/inquireTransactionList");

/** Typed TaxRegister operation for the signed Antom client. */
export const taxRegister = /*#__PURE__*/ defineOperation<AlipayTaxRegisterRequest, AlipayTaxRegisterResponse>("/ams/api/v1/tax/register");

/** Typed TaxUpdateRegistrationPeriod operation for the signed Antom client. */
export const taxUpdateRegistrationPeriod = /*#__PURE__*/ defineOperation<AlipayTaxUpdateRegistrationPeriodRequest, AlipayTaxUpdateRegistrationPeriodResponse>("/ams/api/v1/tax/updateRegistrationPeriod");

/** Typed TaxUpdateSettings operation for the signed Antom client. */
export const taxUpdateSettings = /*#__PURE__*/ defineOperation<AlipayTaxUpdateSettingsRequest, AlipayTaxUpdateSettingsResponse>("/ams/api/v1/tax/updateSettings");

/** Create the immutable billing resource tree. */
export function createBillingResource(execute: OperationExecutor) {
    return Object.freeze({
        couponCreate: bindOperation(execute, couponCreate),
        couponInquireDetails: bindOperation(execute, couponInquireDetails),
        couponInquireList: bindOperation(execute, couponInquireList),
        couponUpdate: bindOperation(execute, couponUpdate),
        creditNoteCreate: bindOperation(execute, creditNoteCreate),
        creditNoteInquireDetails: bindOperation(execute, creditNoteInquireDetails),
        creditNoteInquireList: bindOperation(execute, creditNoteInquireList),
        creditNoteVoid: bindOperation(execute, creditNoteVoid),
        customerCreate: bindOperation(execute, customerCreate),
        customerCreatePortalLink: bindOperation(execute, customerCreatePortalLink),
        customerDelete: bindOperation(execute, customerDelete),
        customerInquireDetails: bindOperation(execute, customerInquireDetails),
        customerInquireList: bindOperation(execute, customerInquireList),
        customerUpdate: bindOperation(execute, customerUpdate),
        invoiceConfirmPayment: bindOperation(execute, invoiceConfirmPayment),
        invoiceCreate: bindOperation(execute, invoiceCreate),
        invoiceCreateViewLink: bindOperation(execute, invoiceCreateViewLink),
        invoiceExport: bindOperation(execute, invoiceExport),
        invoiceFinalize: bindOperation(execute, invoiceFinalize),
        invoiceInquireDetails: bindOperation(execute, invoiceInquireDetails),
        invoiceInquireList: bindOperation(execute, invoiceInquireList),
        invoiceMarkUncollectible: bindOperation(execute, invoiceMarkUncollectible),
        invoiceRevise: bindOperation(execute, invoiceRevise),
        invoiceSend: bindOperation(execute, invoiceSend),
        invoiceUpdate: bindOperation(execute, invoiceUpdate),
        invoiceVoid: bindOperation(execute, invoiceVoid),
        meterCreate: bindOperation(execute, meterCreate),
        meterCreateSession: bindOperation(execute, meterCreateSession),
        meterCreditGrantCreate: bindOperation(execute, creditGrantCreate),
        meterCreditGrantInquireDetails: bindOperation(execute, creditGrantInquireDetails),
        meterCreditGrantInquireList: bindOperation(execute, creditGrantInquireList),
        meterCreditGrantUpdateExpiry: bindOperation(execute, creditGrantUpdateExpiry),
        meterCreditGrantVoid: bindOperation(execute, creditGrantVoid),
        meterInquireDetails: bindOperation(execute, meterInquireDetails),
        meterInquireList: bindOperation(execute, meterInquireList),
        meterUpdate: bindOperation(execute, meterUpdate),
        priceCreate: bindOperation(execute, priceCreate),
        priceInquireDetails: bindOperation(execute, priceInquireDetails),
        priceInquireList: bindOperation(execute, priceInquireList),
        priceUpdate: bindOperation(execute, priceUpdate),
        productCreate: bindOperation(execute, productCreate),
        productInquireDetails: bindOperation(execute, productInquireDetails),
        productInquireList: bindOperation(execute, productInquireList),
        productUpdate: bindOperation(execute, productUpdate),
        promotionCodeCreate: bindOperation(execute, promotionCodeCreate),
        promotionCodeInquireDetails: bindOperation(execute, promotionCodeInquireDetails),
        promotionCodeInquireList: bindOperation(execute, promotionCodeInquireList),
        promotionCodeUpdate: bindOperation(execute, promotionCodeUpdate),
        receiptExport: bindOperation(execute, receiptExport),
        receiptInquireDetails: bindOperation(execute, receiptInquireDetails),
        receiptInquireList: bindOperation(execute, receiptInquireList),
        receiptSend: bindOperation(execute, receiptSend),
        subscriptionCancel: bindOperation(execute, billingSubscriptionCancel),
        subscriptionCreate: bindOperation(execute, billingSubscriptionCreate),
        subscriptionInquireDetails: bindOperation(execute, billingSubscriptionInquireDetails),
        subscriptionInquireList: bindOperation(execute, billingSubscriptionInquireList),
        subscriptionResume: bindOperation(execute, billingSubscriptionResume),
        subscriptionUpdate: bindOperation(execute, billingSubscriptionUpdate),
        taxCalculate: bindOperation(execute, taxCalculate),
        taxCancelRegistration: bindOperation(execute, taxCancelRegistration),
        taxInitializeSettings: bindOperation(execute, taxInitializeSettings),
        taxInquireCalculation: bindOperation(execute, taxInquireCalculation),
        taxInquireRegistrationList: bindOperation(execute, taxInquireRegistrationList),
        taxInquireSettings: bindOperation(execute, taxInquireSettings),
        taxInquireTransactionList: bindOperation(execute, taxInquireTransactionList),
        taxRegister: bindOperation(execute, taxRegister),
        taxUpdateRegistrationPeriod: bindOperation(execute, taxUpdateRegistrationPeriod),
        taxUpdateSettings: bindOperation(execute, taxUpdateSettings)
    });
}

/** Public methods available on the billing resource. */
export type BillingResource = ReturnType<typeof createBillingResource>;
