/* Shared wire types with equivalent dependency graphs. */
/** Wire-format AccountBalance; property names match the API JSON. */
export interface AccountBalance {
    "accountNo"?: string;
    "availableBalance": Amount;
    "currency": string;
    "frozenBalance": Amount;
    "totalBalance": Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type AccountHolderType = 'INDIVIDUAL' | 'ENTERPRISE';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AccountLastModified; property names match the API JSON. */
export interface AccountLastModified {
    "addressChangeDate"?: string;
    "emailChangeDate"?: string;
    "listingChangeDate"?: string;
    "loginDate"?: string;
    "passwordChangeDate"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type AccountType = 'CHECKING' | 'FIXED_DEPOSIT';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AcquirerInfo; property names match the API JSON. */
export interface AcquirerInfo {
    "acquirerAccountName"?: string;
    "acquirerCardToken"?: string;
    "acquirerFingerprint"?: string;
    "acquirerMerchantId"?: string;
    "acquirerMerchantName"?: string;
    "acquirerName"?: string;
    "acquirerReasonDescription"?: string;
    "acquirerResultCode"?: string;
    "acquirerResultMessage"?: string;
    "acquirerTransactionId"?: string;
    "ptspTransactionId"?: string;
    "referenceRequestId"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Address; property names match the API JSON. */
export interface Address {
    "address1"?: string;
    "address2"?: string;
    "address3"?: string;
    "city"?: string;
    "country"?: string;
    "label"?: string;
    "region": string;
    "state"?: string;
    "zipCode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AgenticAgentInfo; property names match the API JSON. */
export interface AgenticAgentInfo {
    "agentId": string;
    "agentJwk"?: string;
    "agentName"?: string;
    "agentUrl"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AgenticDeclineThreshold; property names match the API JSON. */
export interface AgenticDeclineThreshold {
    "currency"?: string;
    "value"?: string;
}

/** Wire-format AgenticMandate; property names match the API JSON. */
export interface AgenticMandate {
    "intent"?: AgenticMandateIntent;
    "mandateId"?: string;
    "order"?: Order;
}

/** Wire-format AgenticMandateIntent; property names match the API JSON. */
export interface AgenticMandateIntent {
    "allowedMerchant"?: Array<Merchant>;
    "consumerPrompt"?: string;
    "declineThreshold"?: AgenticDeclineThreshold;
    "effectiveFromTime"?: string;
    "effectiveUntilTime"?: string;
    "intentDesc"?: string;
    "preferredMerchant"?: Merchant;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AgenticPaymentMethod; property names match the API JSON. */
export interface AgenticPaymentMethod {
    "paymentMethodId"?: string;
    "paymentMethodType": string;
    "selectedCardBrand"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AgreementInfo; property names match the API JSON. */
export interface AgreementInfo {
    "authState"?: string;
    "displayUserLoginId"?: string;
    "userLoginId"?: string;
    "userLoginType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Amount; property names match the API JSON. */
export interface Amount {
    "currency": string;
    "value": string;
}

/** Wire-format AncillaryData; property names match the API JSON. */
export interface AncillaryData {
    "connectedTicketNumber"?: string;
    "services"?: Array<Service>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Applicability; property names match the API JSON. */
export interface Applicability {
    "priceIds"?: Array<string>;
    "scope": string;
}

/** Wire-format AuthorizationControl; property names match the API JSON. */
export interface AuthorizationControl {
    "allowedAuthTimes"?: number;
    "allowedCurrencies"?: Array<string>;
    "allowedMerchantCategoryList"?: Array<string>;
    "cardActiveTime"?: string;
    "cardCancelTime"?: string;
    "cardLimitDetail": CardLimitDetail;
    "cardLimitInfo"?: CardLimitInfo;
    "email"?: string;
    "paymentPreferenceCurrencies"?: Array<string>;
    "phoneNo"?: string;
    "refundPreference"?: RefundPreference;
    "sameCurrencyPreference"?: boolean;
    "threeDSMode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format AutomaticTax; property names match the API JSON. */
export interface AutomaticTax {
    "enabled"?: boolean;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format BillingDiscount; property names match the API JSON. */
export interface BillingDiscount {
    "couponId"?: string;
    "promotionCodeId"?: string;
}

/** Wire-format BillingSubscriptionPriceItem; property names match the API JSON. */
export interface BillingSubscriptionPriceItem {
    "currentPeriodEnd"?: string;
    "currentPeriodStart"?: string;
    "itemAmount"?: Amount;
    "itemId"?: string;
    "meterId"?: string;
    "nickname"?: string;
    "priceId"?: string;
    "priceType"?: string;
    "pricingModel"?: string;
    "productDescription"?: string;
    "productId"?: string;
    "productName"?: string;
    "quantity"?: number;
    "recurringInterval"?: string;
    "recurringIntervalCount"?: number;
    "tiers"?: Array<Tier>;
    "tiersMode"?: string;
    "unitAmount"?: Amount;
    "usageType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format BillingTrialSettings; property names match the API JSON. */
export interface BillingTrialSettings {
    "trialEnd"?: string;
    "trialEndBehavior"?: string;
    "trialPeriodDays"?: number;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format BrowserInfo; property names match the API JSON. */
export interface BrowserInfo {
    "acceptHeader"?: string;
    "javaEnabled"?: boolean;
    "javaScriptEnabled"?: boolean;
    "language"?: string;
    "userAgent"?: string;
}

/** Wire-format Buyer; property names match the API JSON. */
export interface Buyer {
    "businessAddress"?: Address;
    "businessName"?: string;
    "buyerEmail"?: string;
    "buyerName"?: UserName;
    "buyerPhoneNo"?: string;
    "buyerPhoneNoContryCode"?: string;
    "buyerRegistrationTime"?: string;
    "buyerType"?: string;
    "dateOfFirstPaidPurchase"?: string;
    "dateOfLastPaidPurchase"?: string;
    "isAccountVerified"?: boolean;
    "preferredLocales"?: Array<string>;
    "referenceBuyerId"?: string;
    "successfulOrderAmount"?: Amount;
    "successfulOrderCount"?: number;
    "taxIds"?: Array<BuyerTaxId>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format BuyerTaxId; property names match the API JSON. */
export interface BuyerTaxId {
    "country": string;
    "region"?: string;
    "value": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CardBrand = 'AMEX' | 'BC' | 'CARNET' | 'CARTES_BANCAIRES' | 'CITI' | 'CUP' | 'DINERS' | 'DISCOVER' | 'ELO' | 'GWANGJUBANK' | 'HIPERCARD' | 'HYUNDAI' | 'IBK_BC' | 'JCB' | 'JEJUBANK' | 'JEONBUKBANK' | 'KAKAOBANK' | 'KBANK' | 'KDBBANK' | 'KEBHANA' | 'KOOKMIN' | 'LOTTE' | 'MAESTRO' | 'MASTERCARD' | 'MIR' | 'NONGHYUP' | 'POST' | 'SAEMAUL' | 'SAMSUNG' | 'SAVINGBANK' | 'SHINHAN' | 'SHINHYEOP' | 'SUHYEOP' | 'TOSSBANK' | 'TROY' | 'VISA' | 'WOORI';

/** Wire-format CardholderInfo; property names match the API JSON. */
export interface CardholderInfo {
    "billAddress": Address;
    "cardHolderName": UserName;
    "displayName"?: string;
}

/** Wire-format CardLimitDetail; property names match the API JSON. */
export interface CardLimitDetail {
    "dailyLimit": Limit;
    "dailyLimitMax"?: string;
    "monthlyLimit": Limit;
    "monthlyLimitMax"?: string;
    "perCardLimit"?: Limit;
    "perCardLimitMax"?: string;
    "perTransactionLimit": Amount;
    "perTransactionLimitMax"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CardLimitInfo; property names match the API JSON. */
export interface CardLimitInfo {
    "currency"?: string;
    "dailyLimitMax"?: string;
    "monthlyLimitMax"?: string;
    "perCardLimitMax"?: string;
    "perTransactionLimitMax"?: string;
}

/** Wire-format CardPaymentMethodDetail; property names match the API JSON. */
export interface CardPaymentMethodDetail {
    "authenticationFlow"?: string;
    "avsResultRaw"?: string;
    "billingAddress"?: Address;
    "bin"?: string;
    "brand"?: CardBrand;
    "businessNo"?: string;
    "cardIssuer"?: string;
    "cardNo"?: string;
    "cardPasswordDigest"?: string;
    "cardToken"?: string;
    "cardholderName"?: UserName;
    "countryIssue"?: string;
    "cpf"?: string;
    "cvv"?: string;
    "cvvResultRaw"?: string;
    "dateOfBirth"?: string;
    "enableAuthenticationUpgrade"?: string;
    "expiryMonth"?: string;
    "expiryYear"?: string;
    "fingerprint"?: string;
    "funding"?: 'CREDIT' | 'DEBIT' | 'PREPAID' | 'CHARGE' | 'DEFERRED_DEBIT';
    "instUserName"?: UserName;
    "is3DSAuthentication"?: boolean;
    "issuerName"?: string;
    "issuingCountry"?: string;
    "last4"?: string;
    "lastFour"?: string;
    "mask"?: string;
    "maskedCardNo"?: string;
    "mpiData"?: MpiData;
    "networkTransactionId"?: string;
    "payerEmail"?: string;
    "paymentMethodDetailMetadata"?: string;
    "request3DS"?: string;
    "scaExemptionIndicator"?: string;
    "selectedCardBrand"?: CardBrand;
    "supportedBrands"?: Array<string>;
}

/** Wire-format CardTransactionEvent; property names match the API JSON. */
export interface CardTransactionEvent {
    "assetId": string;
    "authCode"?: string;
    "authExpireTime"?: string;
    "authTime"?: string;
    "authType"?: string;
    "balanceType"?: string;
    "billType": string;
    "cardProduct"?: string;
    "eventId": string;
    "eventType": string;
    "exchangeCurrencyPair"?: string;
    "exchangeRate"?: string;
    "failureReason"?: string;
    "inAmount"?: Amount;
    "lifecycleId": string;
    "maskedCardNo"?: string;
    "merchantInfo"?: EventMerchantInfo;
    "metadata"?: {
        [key: string]: string;
    };
    "outAmount"?: Amount;
    "status": string;
    "transactionAmount": Amount;
    "transactionTime": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ClassType = 'FIRSTLEVEL' | 'SECONDLEVEL' | 'THIRDLEVEL';

/** Wire-format CodeDetail; property names match the API JSON. */
export interface CodeDetail {
    "codeValue": string;
    "codeValueType"?: CodeValueType;
    "displayType": DisplayType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CodeValueType = 'BARCODE' | 'QRCODE';

/** Wire-format CouponPaymentMethodDetail; property names match the API JSON. */
export interface CouponPaymentMethodDetail {
    "availableAmount"?: Amount;
    "couponDescription"?: string;
    "couponExpireTime"?: string;
    "couponId"?: string;
    "couponName"?: string;
    "paymentMethodDetailMetadata"?: string;
}

/** Wire-format CreditGrant; property names match the API JSON. */
export interface CreditGrant {
    "amount": Amount;
    "applicability": Applicability;
    "availableAmount": Amount;
    "category": string;
    "createdDateTime": string;
    "creditGrantId": string;
    "creditGrantName": string;
    "customerId": string;
    "effectiveDateTime"?: string;
    "expiryDateTime"?: string;
    "priority": number;
    "status": string;
    "updatedDateTime": string;
}

/** Wire-format CreditNoteItem; property names match the API JSON. */
export interface CreditNoteItem {
    "creditNoteItemId"?: string;
    "description"?: string;
    "invoiceItemId"?: string;
    "itemAmount"?: Amount;
    "quantity"?: number;
    "type"?: string;
    "unitAmount"?: Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CreditPayFeeType = 'PERCENTAGE';

/** Wire-format CreditPayPlan; property names match the API JSON. */
export interface CreditPayPlan {
    "creditPayFeeType"?: CreditPayFeeType;
    "feePercentage"?: number;
    "filteredInstallmentPeriods"?: Array<number>;
    "installmentNum"?: number;
    "interestRate"?: string;
    "interval"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CustomerBelongsTo = 'ALIPAY_CN' | 'ALIPAY_HK' | 'MPAY' | 'DANA' | 'PAYPAY' | 'BOOST' | 'TNG' | 'GRABPAY_MY' | 'HIPAY' | 'GCASH' | 'MAYA' | 'GRABPAY_PH' | 'GRABPAY_SG' | 'KAKAOPAY' | 'NAVERPAY' | 'TOSSPAY' | 'RABBIT_LINE_PAY' | 'TRUEMONEY' | 'KPLUS' | 'DIRECT_DEBIT_SIAMCOMMERCIALBANK' | 'DIRECT_DEBIT_KRUNGTHAIBANK' | 'ACH_DIRECT_DEBIT' | 'ZALOPAY' | 'MOMO' | 'VIETTELMONEY' | 'JKOPAY' | 'BKASH' | 'EASYPAISA' | 'DIRECTDEBIT_YAPILY' | 'ANTOM_BIZ_ACCOUNT';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format CustomizedInfo; property names match the API JSON. */
export interface CustomizedInfo {
    "customizedField1"?: string;
    "customizedField2"?: string;
    "customizedField3"?: string;
    "customizedField4"?: string;
    "customizedField5"?: string;
}

/** Wire-format Declaration; property names match the API JSON. */
export interface Declaration {
    "declarationBeneficiaryId"?: string;
    "declarationBizScene"?: DeclarationBizSceneType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type DeclarationBizSceneType = 'AIRLINE' | 'HOTEL';

/** Wire-format DeliveryEstimate; property names match the API JSON. */
export interface DeliveryEstimate {
    "maximum"?: DeliveryEstimateInfo;
    "minimum"?: DeliveryEstimateInfo;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format DeliveryEstimateInfo; property names match the API JSON. */
export interface DeliveryEstimateInfo {
    "unit": string;
    "value": number;
}

/** Wire-format Discount; property names match the API JSON. */
export interface Discount {
    "discountName"?: string;
    "discountTag"?: string;
    "estimateSavingsAmount"?: Amount;
    "savingsAmount"?: Amount;
}

/** Wire-format DiscountPaymentMethodDetail; property names match the API JSON. */
export interface DiscountPaymentMethodDetail {
    "availableAmount"?: Amount;
    "discountDescription"?: string;
    "discountId"?: string;
    "discountName"?: string;
    "paymentMethodDetailMetadata"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type DisplayType = 'TEXT' | 'MIDDLEIMAGE' | 'SMALLIMAGE' | 'BIGIMAGE' | 'IMAGE';

/** Wire-format Env; property names match the API JSON. */
export interface Env {
    "browserInfo"?: BrowserInfo;
    "clientIp"?: string;
    "colorDepth"?: string;
    "cookieId"?: string;
    "deviceBrand"?: string;
    "deviceId"?: string;
    "deviceLanguage"?: string;
    "deviceModel"?: string;
    "deviceTokenId"?: string;
    "extendInfo"?: string;
    "osType"?: OsType;
    "osVersion"?: string;
    "screenHeight"?: string;
    "screenWidth"?: string;
    "storeTerminalId"?: string;
    "storeTerminalRequestTime"?: string;
    "terminalType"?: TerminalType;
    "timeZoneOffset"?: number;
    "userAgent"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format EventMerchantInfo; property names match the API JSON. */
export interface EventMerchantInfo {
    "mcc"?: string;
    "name"?: string;
    "region"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format ExternalPaymentMethodDetail; property names match the API JSON. */
export interface ExternalPaymentMethodDetail {
    "accountDisplayName"?: string;
    "assetToken"?: string;
    "disableReason"?: string;
    "paymentMethodDetailMetadata"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format ForeignExchangeQuote; property names match the API JSON. */
export interface ForeignExchangeQuote {
    "exchangeRate"?: string;
    "quotePrice"?: string;
    "quoteTime"?: string;
    "sourceCurrency"?: string;
    "targetCurrency"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type FundingType = 'CREDIT' | 'DEBIT' | 'PREPAID' | 'CHARGE' | 'DEFERRED_DEBIT';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format FundMoveDetail; property names match the API JSON. */
export interface FundMoveDetail {
    "beneficiaryAccountType"?: string;
    "beneficiaryAssetId"?: string;
    "beneficiaryBankCountry"?: string;
    "beneficiaryBankName"?: string;
    "beneficiaryName": string;
    "description"?: string;
    "memo"?: string;
    "payerAccountNo": string;
    "payerAccountType"?: string;
    "payerAssetId"?: string;
    "payerChaneelAccountnumber"?: string;
    "payerName": string;
    "referenceTransactionId": string;
    "remarks"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type FundsType = 'COLLATERAL';

/** Wire-format FundTransferInfo; property names match the API JSON. */
export interface FundTransferInfo {
    "fundTransferType"?: string;
    "sellerMcc"?: string;
    "sellerName"?: string;
    "transferRecipient"?: FundTransferRecipient;
    "transferSender"?: FundTransferSender;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format FundTransferPartyAddress; property names match the API JSON. */
export interface FundTransferPartyAddress {
    "address1"?: string;
    "city"?: string;
    "region"?: string;
    "state"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format FundTransferPartyName; property names match the API JSON. */
export interface FundTransferPartyName {
    "firstName"?: string;
    "lastName"?: string;
}

/** Wire-format FundTransferRecipient; property names match the API JSON. */
export interface FundTransferRecipient {
    "address"?: FundTransferPartyAddress;
    "recipientAccountNumber"?: string;
    "recipientName"?: FundTransferPartyName;
}

/** Wire-format FundTransferSender; property names match the API JSON. */
export interface FundTransferSender {
    "address"?: FundTransferPartyAddress;
    "senderName"?: FundTransferPartyName;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Gaming; property names match the API JSON. */
export interface Gaming {
    "gameName"?: string;
    "toppedUpEmail"?: string;
    "toppedUpPhoneNo"?: string;
    "toppedUpUser"?: string;
}

/** Wire-format Goods; property names match the API JSON. */
export interface Goods {
    "crossSell"?: Goods;
    "deliveryMethodType"?: string;
    "goodsBrand"?: string;
    "goodsCategory"?: string;
    "goodsDiscountAmount"?: Amount;
    "goodsEndsOnTime"?: string;
    "goodsImageUrl"?: string;
    "goodsName": string;
    "goodsQuantity"?: string;
    "goodsSkuName"?: string;
    "goodsUnitAmount"?: Amount;
    "goodsUrl"?: string;
    "priceId"?: string;
    "referenceGoodsId": string;
    "taxBehavior"?: string;
    "taxCode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type InStorePaymentScenario = 'PaymentCode' | 'OrderCode' | 'EntryCode';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format InvoiceAddress; property names match the API JSON. */
export interface InvoiceAddress {
    "address1"?: string;
    "address2"?: string;
    "city"?: string;
    "country"?: string;
    "postalCode"?: string;
    "state"?: string;
}

/** Wire-format InvoicePayment; property names match the API JSON. */
export interface InvoicePayment {
    "attemptNo": number;
    "errorCode"?: string;
    "errorMessage"?: string;
    "gmtCreate": string;
    "gmtUpdate": string;
    "invoicePaymentId": string;
    "nextRetryAt"?: string;
    "payToId"?: string;
    "payToRequestId"?: string;
    "paymentAmount"?: Amount;
    "paymentId"?: string;
    "paymentMethod"?: string;
    "paymentOrderStatus": string;
    "paymentRequestId"?: string;
    "paymentTime"?: string;
    "retryReason"?: string;
}

/** Wire-format InvoiceShipping; property names match the API JSON. */
export interface InvoiceShipping {
    "deliveryEstimate"?: DeliveryEstimate;
    "notes"?: string;
    "shipToEmail"?: string;
    "shippingAddress"?: InvoiceAddress;
    "shippingCarrier"?: string;
    "shippingDescription"?: string;
    "shippingFee"?: Amount;
    "shippingFeeId"?: string;
    "shippingMethodIndicator"?: string;
    "shippingName"?: UserName;
    "shippingNumber"?: string;
    "shippingPhoneNo"?: string;
    "trackingUrl"?: string;
}

/** Wire-format Leg; property names match the API JSON. */
export interface Leg {
    "arrivalAddress"?: Address;
    "arrivalAirportCode"?: string;
    "arrivalTime"?: string;
    "carrierName"?: string;
    "carrierNo"?: string;
    "classType"?: ClassType;
    "couponNumber"?: string;
    "departureAddress"?: Address;
    "departureAirportCode"?: string;
    "departureTime"?: string;
    "fareBasis"?: string;
    "flightNumber"?: string;
    "passengerNameRecord"?: string;
    "ticketDeliveryMethod"?: string;
    "ticketDeliveryRecipient"?: string;
}

/** Wire-format Limit; property names match the API JSON. */
export interface Limit {
    "rangeLimit": Amount;
    "remainingLimit": Amount;
    "usedLimit": Amount;
}

/** Wire-format Lodging; property names match the API JSON. */
export interface Lodging {
    "checkInDate"?: string;
    "checkOutDate"?: string;
    "guestNames"?: Array<UserName>;
    "hotelAddress"?: Address;
    "hotelName"?: string;
    "numberOfNights"?: number;
    "numberOfRooms"?: number;
    "roomClass"?: string;
    "ticketDeliveryMethod"?: string;
    "ticketDeliveryRecipient"?: string;
}

/** Wire-format Merchant; property names match the API JSON. */
export interface Merchant {
    "accountLastModified"?: AccountLastModified;
    "merchantAddress"?: Address;
    "merchantCountryCode"?: string;
    "merchantDisplayName"?: string;
    "merchantMCC"?: string;
    "merchantName"?: string;
    "merchantRegisterDate"?: string;
    "merchantType"?: MerchantType;
    "merchantUrl"?: string;
    "numberOfTrades"?: number;
    "referenceMerchantId": string;
    "store"?: Store;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type MerchantType = 'INDIVIDUAL' | 'ENTERPRISE';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Meter; property names match the API JSON. */
export interface Meter {
    "aggregationMethod": string;
    "createdDateTime": string;
    "eventName": string;
    "eventTimeWindow"?: string;
    "meterId": string;
    "meterName": string;
    "status": string;
    "updatedDateTime": string;
    "valueKeyOverride": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format MpiData; property names match the API JSON. */
export interface MpiData {
    "cavv"?: string;
    "credentialType"?: string;
    "dsTransactionId"?: string;
    "eci"?: string;
    "threeDSVersion"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format NotificationEvent; property names match the API JSON. */
export interface NotificationEvent {
    "deliveryStatus": string;
    "eventCreateTime": string;
    "eventId": string;
    "notificationData"?: {
        [key: string]: any | null;
    };
    "notifyType"?: string;
    "referenceMerchantId"?: string;
}

/** Wire-format Order; property names match the API JSON. */
export interface Order {
    "buyer"?: Buyer;
    "checkoutJwt"?: string;
    "declaration"?: Declaration;
    "env"?: Env;
    "extendInfo"?: string;
    "gaming"?: Gaming;
    "goods"?: Array<Goods>;
    "lodging"?: Lodging;
    "merchant"?: Merchant;
    "needDeclaration"?: boolean;
    "orderAmount": Amount;
    "orderDescription"?: string;
    "orderDiscountAmount"?: Amount;
    "orderType"?: string;
    "paymentAmount"?: Amount;
    "referenceOrderId": string;
    "sendReceipt"?: boolean;
    "shipping"?: Shipping;
    "subTotalOrderAmount"?: Amount;
    "taxCalculationId"?: string;
    "transit"?: Transit;
}

/** Wire-format OrderInfo; property names match the API JSON. */
export interface OrderInfo {
    "orderAmount"?: Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type OsType = 'IOS' | 'ANDROID';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Paginator; property names match the API JSON. */
export interface Paginator {
    "currentPage": number;
    "pageSize": number;
    "totalCount": number;
    "totalPage": number;
}

/** Wire-format Passenger; property names match the API JSON. */
export interface Passenger {
    "passengerCode"?: string;
    "passengerEmail"?: string;
    "passengerId"?: string;
    "passengerIdType"?: PassengerIdType;
    "passengerName"?: UserName;
    "passengerPhoneNo"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PassengerIdType = 'PASSPORT' | 'NATIONAL_ID_CARD' | 'DRIVER_LICENSE' | 'MILITARY_ID' | 'GREEN_CARD' | 'TRAVEL_DOCUMENT' | 'ALIEN_REGISTRATION_CARD' | 'BIRTH_CERTIFICATE' | 'OTHERS';

/** Wire-format PaymentFactor; property names match the API JSON. */
export interface PaymentFactor {
    "captureMode"?: string;
    "inStorePaymentScenario"?: InStorePaymentScenario;
    "isAuthorization"?: boolean;
    "isPaymentEvaluation"?: boolean;
    "presentmentMode"?: PresentmentMode;
    "storePaymentMethodForBuyer"?: boolean;
}

/** Wire-format PaymentMethod; property names match the API JSON. */
export interface PaymentMethod {
    "cardBrand"?: string;
    "customerId"?: string;
    "extendInfo"?: string;
    "funding"?: FundingType;
    "paymentMethodId"?: string;
    "paymentMethodMetaData"?: {
        [key: string]: object;
    };
    "paymentMethodType": string;
    "requireIssuerAuthentication"?: boolean;
}

/** Wire-format PaymentMethodDetail; property names match the API JSON. */
export interface PaymentMethodDetail {
    "card"?: CardPaymentMethodDetail;
    "coupon"?: CouponPaymentMethodDetail;
    "discount"?: DiscountPaymentMethodDetail;
    "extendInfo"?: string;
    "externalAccount"?: ExternalPaymentMethodDetail;
    "interactionType"?: string;
    "paymentMethodDetailType"?: PaymentMethodDetailType;
    "paymentMethodMetaData"?: PaymentMethodMetaData;
    "paymentMethodType": string;
    "wallet"?: Wallet;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PaymentMethodDetailType = 'CARD' | 'EXTERNALACCOUNT' | 'COUPON' | 'DISCOUNT';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PaymentMethodMetaData; property names match the API JSON. */
export interface PaymentMethodMetaData {
    "recurringType"?: 'SCHEDULED' | 'UNSCHEDULED';
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PaymentMethodScope = 'ALL' | 'CARD';

/** Wire-format PaymentResultInfo; property names match the API JSON. */
export interface PaymentResultInfo {
    "accountNo"?: string;
    "acquirerInfo"?: AcquirerInfo;
    "authorizationCode"?: string;
    "avsResultRaw"?: string;
    "cardBin"?: string;
    "cardBrand"?: string;
    "cardCategory"?: string;
    "cardNo"?: string;
    "cardToken"?: string;
    "cardholderName"?: string;
    "credentialTypeUsed"?: string;
    "creditPayPlan"?: CreditPayPlan;
    "cvvResultRaw"?: string;
    "exemptionRequested"?: string;
    "expiryMonth"?: string;
    "expiryYear"?: string;
    "extendedAuthorizationAvailable"?: boolean;
    "fingerprint"?: string;
    "funding"?: string;
    "incrementalAuthorizationAvailable"?: boolean;
    "issuerName"?: string;
    "issuingCountry"?: string;
    "lastFour"?: string;
    "merchantAdviceCode"?: string;
    "networkTransactionId"?: string;
    "paymentMethodRegion"?: string;
    "refundOnAuthorizationAvailable"?: boolean;
    "refusalCodeRaw"?: string;
    "refusalReasonRaw"?: string;
    "rrn"?: string;
    "threeDSResult"?: ThreeDSResult;
    "userAuthorizationStatus"?: string;
}

/** Wire-format PeriodRule; property names match the API JSON. */
export interface PeriodRule {
    "period"?: number;
    "periodCount": number;
    "periodType": string;
    "price"?: Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PeriodType = 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'HALF_YEAR' | 'YEAR';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PresentmentMode = 'BUNDLE' | 'TILE' | 'UNIFIED';

/** Wire-format Price; property names match the API JSON. */
export interface Price {
    "active": boolean;
    "createdAt": string;
    "deactivatedAt"?: string;
    "defaultPrice"?: boolean;
    "includedQuantity"?: number;
    "metadata"?: string;
    "meterId"?: string;
    "name"?: string;
    "priceId": string;
    "pricingModel": string;
    "productId": string;
    "recurring"?: RecurringSettings;
    "tiers"?: Array<Tier>;
    "tiersMode"?: string;
    "unitAmount"?: Amount;
    "unitLabel"?: string;
    "updatedAt"?: string;
    "usageType"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ProductCodeType = 'CASHIER_PAYMENT' | 'AGREEMENT_PAYMENT' | 'IN_STORE_PAYMENT';

/** Wire-format PromotionResult; property names match the API JSON. */
export interface PromotionResult {
    "discount"?: Discount;
    "promotionType": PromotionType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type PromotionType = 'DISCOUNT' | 'INTEREST_FREE';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format PspCustomerInfo; property names match the API JSON. */
export interface PspCustomerInfo {
    "customer2088Id"?: string;
    "displayCustomerId"?: string;
    "displayCustomerName"?: string;
    "extendInfo"?: string;
    "pspCustomerId"?: string;
    "pspName"?: string;
}

/** Wire-format Quote; property names match the API JSON. */
export interface Quote {
    "exchangeAmount"?: Amount;
    "guaranteed"?: boolean;
    "quoteCurrencyPair": string;
    "quoteExpiryTime"?: string;
    "quoteId"?: string;
    "quotePrice": number;
    "quoteStartTime"?: string;
}

/** Wire-format RecurringSettings; property names match the API JSON. */
export interface RecurringSettings {
    "periodRule"?: PeriodRule;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RedirectActionForm; property names match the API JSON. */
export interface RedirectActionForm {
    "actionFormType"?: string;
    "method"?: string;
    "parameters"?: string;
    "redirectUrl"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RefundFromMethod; property names match the API JSON. */
export interface RefundFromMethod {
    "customerId": string;
    "grantToken": string;
    "refundFromMethodType": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format RefundPreference; property names match the API JSON. */
export interface RefundPreference {
    "preferenceType": 'NO_PREFERENCE' | 'ORIGINAL_CURRENCY';
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ReleaseType = 'FIXED_TIME' | 'INTERVAL_TIME';

/** Wire-format Result; property names match the API JSON. */
export interface Result {
    "resultCode": string;
    "resultMessage"?: string;
    "resultStatus"?: ResultStatusType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format ResultInfo; property names match the API JSON. */
export interface ResultInfo {
    "resultCode": string;
    "resultMessage": string;
    "resultStatus": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ResultStatusType = 'S' | 'F' | 'U';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type RuleStatus = 'ACTIVE' | 'DISABLED';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Service; property names match the API JSON. */
export interface Service {
    "categoryCode"?: string;
    "subCategoryCode"?: string;
}

/** Wire-format SettlementBankAccount; property names match the API JSON. */
export interface SettlementBankAccount {
    "accountHolderAddress"?: Address;
    "accountHolderName": string;
    "accountHolderTIN"?: string;
    "accountHolderType": AccountHolderType;
    "accountType"?: AccountType;
    "bankAccountNo": string;
    "bankName"?: string;
    "bankRegion": string;
    "branchCode"?: string;
    "iban"?: string;
    "routingNumber"?: string;
    "swiftCode"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format SettlementStrategy; property names match the API JSON. */
export interface SettlementStrategy {
    "settlementCurrency"?: string;
}

/** Wire-format Shipping; property names match the API JSON. */
export interface Shipping {
    "deliveryEstimate"?: DeliveryEstimate;
    "notes"?: string;
    "shipToEmail"?: string;
    "shippingAddress"?: Address;
    "shippingCarrier"?: string;
    "shippingDescription"?: string;
    "shippingFee"?: Amount;
    "shippingFeeId"?: string;
    "shippingName"?: UserName;
    "shippingNumber"?: string;
    "shippingPhoneNo"?: string;
    "taxBehavior"?: string;
    "taxCode"?: string;
    "trackingUrl"?: string;
}

/** Wire-format SplitDetail; property names match the API JSON. */
export interface SplitDetail {
    "actualSplitAmount"?: Amount;
    "description"?: string;
    "splitAmount": Amount;
    "splitTo": string;
}

/** Wire-format Statement; property names match the API JSON. */
export interface Statement {
    "accountBalance"?: Amount;
    "beneficiaryAssetId"?: string;
    "extTransactionId"?: string;
    "feeAmount"?: Amount;
    "foreignExchangeQuote"?: ForeignExchangeQuote;
    "fundMoveDetail": FundMoveDetail;
    "netAmount"?: Amount;
    "originalTransactionAmount"?: Amount;
    "statementId": string;
    "transactionAmount"?: Amount;
    "transactionId"?: string;
    "transactionStatus"?: string;
    "transactionTime"?: string;
    "transactionType"?: 'PAYMENT' | 'PAYMENT_REFUND' | 'CHARGE' | 'CHARGE_REFUND' | 'TOPUP' | 'SETTLEMENT' | 'WITHDRAW' | 'WITHDRAW_RETURN' | 'TRANSFER' | 'TRANSFER_RETURN' | 'TRANSFER_TO_CHINA' | 'TRANSFER_RECIPIENT' | 'EXCHANGE' | 'CREDIT_LOAN' | 'CREDIT_REPAY' | 'CREDIT_REPAYMENT' | 'DIRECT_PAYMENT' | 'DIRECT_REFUND' | 'CARD_PAYMENT' | 'CARD_REFUND' | 'OVERFLOW_DEBIT' | 'OVERFLOW_CREDIT' | 'CASH_BACK';
}

/** Wire-format Store; property names match the API JSON. */
export interface Store {
    "referenceStoreId"?: string;
    "storeAddress"?: Address;
    "storeDisplayName"?: string;
    "storeMCC"?: string;
    "storeName"?: string;
    "storeOperatorId"?: string;
    "storePhoneNo"?: string;
    "storeTerminalId"?: string;
}

/** Wire-format SubscriptionInfo; property names match the API JSON. */
export interface SubscriptionInfo {
    "allowRetry"?: boolean;
    "currentPeriodEnd"?: string;
    "currentPeriodStart"?: string;
    "currentPhaseNo"?: number;
    "description"?: string;
    "fixedAmount"?: Amount;
    "lastUpdateTime"?: string;
    "maxAmountFloor"?: Amount;
    "paymentAmount"?: Amount;
    "paymentMethod"?: PaymentMethod;
    "periodCount"?: number;
    "periodRule"?: PeriodRule;
    "periodType"?: PeriodType;
    "relatedSubscriptionId"?: string;
    "retryMode"?: string;
    "status"?: SubscriptionStatus;
    "subscriptionDescription"?: string;
    "subscriptionEndTime"?: string;
    "subscriptionExpiryTime"?: string;
    "subscriptionId"?: string;
    "subscriptionNotifyUrl"?: string;
    "subscriptionOrderId"?: string;
    "subscriptionStartTime": string;
    "trialPlan"?: TrialPlan;
    "trials"?: Array<Trial>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format SubscriptionItem; property names match the API JSON. */
export interface SubscriptionItem {
    "currentPeriodEnd"?: string;
    "currentPeriodStart"?: string;
    "itemId": string;
    "priceId": string;
    "quantity": number;
    "recurringIntervalCount"?: number;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'TERMINATED';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type TakeType = 'ROLLING';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxAddress; property names match the API JSON. */
export interface TaxAddress {
    "city"?: string;
    "country": string;
    "county"?: string;
    "district"?: string;
    "line1"?: string;
    "line2"?: string;
    "postalCode"?: string;
    "region"?: string;
}

/** Wire-format TaxBreakdown; property names match the API JSON. */
export interface TaxBreakdown {
    "inclusive": boolean;
    "taxAmount": Amount;
    "taxRate": string;
    "taxType": string;
    "taxabilityReason": string;
    "taxableAmount": Amount;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxCalculatedAddress; property names match the API JSON. */
export interface TaxCalculatedAddress {
    "city"?: string;
    "country": string;
    "county"?: string;
    "district"?: string;
    "line1"?: string;
    "line2"?: string;
    "postalCode"?: string;
    "region"?: string;
}

/** Wire-format TaxCalculatedBusinessDetails; property names match the API JSON. */
export interface TaxCalculatedBusinessDetails {
    "address"?: TaxCalculatedAddress;
}

/** Wire-format TaxCalculatedCustomerDetails; property names match the API JSON. */
export interface TaxCalculatedCustomerDetails {
    "billingAddress"?: TaxCalculatedAddress;
    "businessDetails"?: TaxCalculatedBusinessDetails;
    "name"?: string;
    "shippingAddress"?: TaxCalculatedAddress;
    "taxExemptions"?: Array<TaxCalculatedExemption>;
    "taxIds"?: Array<TaxCalculatedTaxId>;
}

/** Wire-format TaxCalculatedExemption; property names match the API JSON. */
export interface TaxCalculatedExemption {
    "certificateNumber": string;
    "effectiveFrom"?: string;
    "exemptionType": string;
    "jurisdiction": TaxCalculatedExemptionJurisdiction;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxCalculatedExemptionJurisdiction; property names match the API JSON. */
export interface TaxCalculatedExemptionJurisdiction {
    "city"?: string;
    "country": string;
    "region"?: string;
}

/** Wire-format TaxCalculatedLineItem; property names match the API JSON. */
export interface TaxCalculatedLineItem {
    "amount": Amount;
    "goodsReferenceId": string;
    "quantity": number;
    "taxAmount": Amount;
    "taxBehavior": string;
    "taxBreakdown": Array<TaxBreakdown>;
    "taxCode"?: string;
}

/** Wire-format TaxCalculatedShipFromDetails; property names match the API JSON. */
export interface TaxCalculatedShipFromDetails {
    "address": TaxCalculatedAddress;
}

/** Wire-format TaxCalculatedShippingCost; property names match the API JSON. */
export interface TaxCalculatedShippingCost {
    "amount": Amount;
    "taxAmount"?: Amount;
    "taxBreakdown"?: Array<TaxBreakdown>;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxCalculatedTaxId; property names match the API JSON. */
export interface TaxCalculatedTaxId {
    "country": string;
    "region"?: string;
    "value": string;
}

/** Wire-format TaxHeadOffice; property names match the API JSON. */
export interface TaxHeadOffice {
    "address": TaxAddress;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format TaxJurisdiction; property names match the API JSON. */
export interface TaxJurisdiction {
    "city"?: string;
    "country": string;
    "region"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type TerminalType = 'WEB' | 'WAP' | 'APP' | 'MINI_APP';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format ThreeDSResult; property names match the API JSON. */
export interface ThreeDSResult {
    "cavv"?: string;
    "challengeCancel"?: string;
    "challenged"?: boolean;
    "dsTransactionId"?: string;
    "eci"?: string;
    "exemptionType"?: string;
    "liabilityShift"?: number;
    "paResStatus"?: string;
    "threeDSOffered"?: boolean;
    "threeDSVersion"?: string;
    "threeDStransactionStatusReason"?: string;
    "xid"?: string;
}

/** Wire-format Tier; property names match the API JSON. */
export interface Tier {
    "flatAmount"?: Amount;
    "unitAmount"?: Amount;
    "upTo"?: number;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type TransactionStatusType = 'SUCCESS' | 'FAIL' | 'PROCESSING' | 'CANCELLED' | 'PENDING';

/** Wire-format TransferFromDetail; property names match the API JSON. */
export interface TransferFromDetail {
    "transferFromAmount": Amount;
    "transferFromMethod": PaymentMethod;
}

/** Wire-format TransferToDetail; property names match the API JSON. */
export interface TransferToDetail {
    "actualTransferToAmount"?: Amount;
    "feeAmount"?: Amount;
    "purposeCode": string;
    "transferNotifyUrl"?: string;
    "transferRemark"?: string;
    "transferToCurrency": string;
    "transferToMethod": PaymentMethod;
}

/** Wire-format Transit; property names match the API JSON. */
export interface Transit {
    "agentCode"?: string;
    "agentName"?: string;
    "ancillaryData"?: AncillaryData;
    "legs"?: Array<Leg>;
    "passengers"?: Array<Passenger>;
    "restrictedTicketIndicator"?: string;
    "ticketIssuerCode"?: string;
    "ticketNumber"?: string;
    "transitType"?: TransitType;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type TransitType = 'FLIGHT' | 'TRAIN' | 'CRUISE' | 'COACH';

/** Wire-format Trial; property names match the API JSON. */
export interface Trial {
    "trialAmount"?: Amount;
    "trialEndPeriod"?: number;
    "trialPeriod"?: number;
    "trialStartPeriod"?: number;
}

/** Wire-format TrialPhase; property names match the API JSON. */
export interface TrialPhase {
    "phaseNo": number;
    "trialAmount": Amount;
}

/** Wire-format TrialPlan; property names match the API JSON. */
export interface TrialPlan {
    "freeTrialDays"?: number;
    "phases"?: Array<TrialPhase>;
    "trialEndTime"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format UserName; property names match the API JSON. */
export interface UserName {
    "firstName"?: string;
    "fullName"?: string;
    "lastName"?: string;
    "middleName"?: string;
}

/** Wire-format Wallet; property names match the API JSON. */
export interface Wallet {
    "accountHolderName"?: UserName;
    "accountNo"?: string;
    "billingAddress"?: Address;
    "email"?: string;
    "phoneNo"?: string;
    "token"?: string;
    "tokenExpiryTime"?: string;
}
