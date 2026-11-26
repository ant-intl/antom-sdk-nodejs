/* Generated operation-scoped models for vaultingpaymentmethod. */
import type { CardPaymentMethodDetail, CouponPaymentMethodDetail, DiscountPaymentMethodDetail, ExternalPaymentMethodDetail, PaymentMethodDetailType, Wallet } from '../share.js';

/** Wire-format VaultingRequestPaymentMethodDetail; property names match the API JSON. */
export interface VaultingRequestPaymentMethodDetail {
    "card"?: CardPaymentMethodDetail;
    "coupon"?: CouponPaymentMethodDetail;
    "discount"?: DiscountPaymentMethodDetail;
    "extendInfo"?: string;
    "externalAccount"?: ExternalPaymentMethodDetail;
    "interactionType"?: string;
    "paymentMethodDetailType"?: PaymentMethodDetailType;
    "paymentMethodMetaData"?: {
        [key: string]: any | null;
    };
    "paymentMethodType": string;
    "wallet"?: Wallet;
}
