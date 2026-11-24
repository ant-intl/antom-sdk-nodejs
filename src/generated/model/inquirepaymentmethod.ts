/* Generated operation-scoped models for inquirepaymentmethod. */
import type { Address, UserName } from '../share.js';

/** Wire-format InquirePaymentMethodCard; property names match the API JSON. */
export interface InquirePaymentMethodCard {
    "billingAddress"?: Address;
    "brand"?: string;
    "cardIssuer"?: string;
    "cardNo"?: string;
    "cardToken"?: string;
    "countryIssue"?: string;
    "expiryMonth"?: string;
    "expiryYear"?: string;
    "instUserName"?: UserName;
    "mask"?: string;
}

/** Wire-format InquirePaymentMethodDetail; property names match the API JSON. */
export interface InquirePaymentMethodDetail {
    "card"?: InquirePaymentMethodCard;
    "paymentMethodDetailType"?: string;
}
