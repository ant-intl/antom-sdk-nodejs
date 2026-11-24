/* Generated public resource tree and internal operation registry. */
/* Generated resource factories for every supported business domain. */
import type { OperationExecutor } from '../../types.js';
import { createAbaResource } from './aba.js';
import { createAgenticResource } from './agentic.js';
import { createAuthResource } from './auth.js';
import { createBillingResource } from './billing.js';
import { createDisputeResource } from './dispute.js';
import { createMarketplaceResource } from './marketplace.js';
import { createNotificationResource } from './notification.js';
import { createPayResource } from './pay.js';
import { createSubscriptionResource } from './subscription.js';
/** Bind every generated resource to one signed operation executor. */
export function createResources(execute: OperationExecutor) {
    return Object.freeze({
        aba: createAbaResource(execute),
        agentic: createAgenticResource(execute),
        auth: createAuthResource(execute),
        billing: createBillingResource(execute),
        dispute: createDisputeResource(execute),
        marketplace: createMarketplaceResource(execute),
        notification: createNotificationResource(execute),
        pay: createPayResource(execute),
        subscription: createSubscriptionResource(execute),
    });
}
/** Complete immutable generated API resource tree. */
export type GeneratedResources = ReturnType<typeof createResources>;
/* Internal operation coverage registry; not exported from the package root. */
import { inquireAvailableQuota } from './aba.js';
import { inquiryBalance } from './aba.js';
import { inquiryStatement } from './aba.js';
import { inquiryStatementDetail } from './aba.js';
import { inquiryStatementList } from './aba.js';
import { applyCard } from './aba.js';
import { inquireCard } from './aba.js';
import { inquireCardDetail } from './aba.js';
import { inquireCardSensitiveInfo } from './aba.js';
import { inquireCardTransactionEvent } from './aba.js';
import { inquireCardTransactionLifecycle } from './aba.js';
import { inquireCardTransactionLifecycleDetail } from './aba.js';
import { updateCard } from './aba.js';
import { updateCardStatus } from './aba.js';
import { createDirectPayment } from './aba.js';
import { createDirectRefund } from './aba.js';
import { createExchange } from './aba.js';
import { createQuote } from './aba.js';
import { inquireDirectPayment } from './aba.js';
import { inquireDirectRefund } from './aba.js';
import { inquireExchange } from './aba.js';
import { inquiryRate } from './aba.js';
import { createAuthenticationSession } from './agentic.js';
import { createBindingSession } from './agentic.js';
import { inquireAccountInfo } from './agentic.js';
import { inquirePaymentToken } from './agentic.js';
import { authApplyToken } from './auth.js';
import { authConsult } from './auth.js';
import { authRevokeToken } from './auth.js';
import { couponCreate } from './billing.js';
import { couponInquireDetails } from './billing.js';
import { couponInquireList } from './billing.js';
import { couponUpdate } from './billing.js';
import { creditNoteCreate } from './billing.js';
import { creditNoteInquireDetails } from './billing.js';
import { creditNoteInquireList } from './billing.js';
import { creditNoteVoid } from './billing.js';
import { customerCreate } from './billing.js';
import { customerCreatePortalLink } from './billing.js';
import { customerDelete } from './billing.js';
import { customerInquireDetails } from './billing.js';
import { customerInquireList } from './billing.js';
import { customerUpdate } from './billing.js';
import { invoiceConfirmPayment } from './billing.js';
import { invoiceCreate } from './billing.js';
import { invoiceCreateViewLink } from './billing.js';
import { invoiceExport } from './billing.js';
import { invoiceFinalize } from './billing.js';
import { invoiceInquireDetails } from './billing.js';
import { invoiceInquireList } from './billing.js';
import { invoiceMarkUncollectible } from './billing.js';
import { invoiceRevise } from './billing.js';
import { invoiceSend } from './billing.js';
import { invoiceUpdate } from './billing.js';
import { invoiceVoid } from './billing.js';
import { meterCreate } from './billing.js';
import { meterCreateSession } from './billing.js';
import { creditGrantCreate } from './billing.js';
import { creditGrantInquireDetails } from './billing.js';
import { creditGrantInquireList } from './billing.js';
import { creditGrantUpdateExpiry } from './billing.js';
import { creditGrantVoid } from './billing.js';
import { meterInquireDetails } from './billing.js';
import { meterInquireList } from './billing.js';
import { meterUpdate } from './billing.js';
import { priceCreate } from './billing.js';
import { priceInquireDetails } from './billing.js';
import { priceInquireList } from './billing.js';
import { priceUpdate } from './billing.js';
import { productCreate } from './billing.js';
import { productInquireDetails } from './billing.js';
import { productInquireList } from './billing.js';
import { productUpdate } from './billing.js';
import { promotionCodeCreate } from './billing.js';
import { promotionCodeInquireDetails } from './billing.js';
import { promotionCodeInquireList } from './billing.js';
import { promotionCodeUpdate } from './billing.js';
import { receiptExport } from './billing.js';
import { receiptInquireDetails } from './billing.js';
import { receiptInquireList } from './billing.js';
import { receiptSend } from './billing.js';
import { billingSubscriptionCancel } from './billing.js';
import { billingSubscriptionCreate } from './billing.js';
import { billingSubscriptionInquireDetails } from './billing.js';
import { billingSubscriptionInquireList } from './billing.js';
import { billingSubscriptionResume } from './billing.js';
import { billingSubscriptionUpdate } from './billing.js';
import { taxCalculate } from './billing.js';
import { taxCancelRegistration } from './billing.js';
import { taxInitializeSettings } from './billing.js';
import { taxInquireCalculation } from './billing.js';
import { taxInquireRegistrationList } from './billing.js';
import { taxInquireSettings } from './billing.js';
import { taxInquireTransactionList } from './billing.js';
import { taxRegister } from './billing.js';
import { taxUpdateRegistrationPeriod } from './billing.js';
import { taxUpdateSettings } from './billing.js';
import { acceptDispute } from './dispute.js';
import { downloadDisputeEvidence } from './dispute.js';
import { supplyDefenseDocument } from './dispute.js';
import { supplyEvidence } from './dispute.js';
import { inquireBalance } from './marketplace.js';
import { submitAttachment } from './marketplace.js';
import { createPayout } from './marketplace.js';
import { createTransfer } from './marketplace.js';
import { register } from './marketplace.js';
import { settlementInfoUpdate } from './marketplace.js';
import { settle } from './marketplace.js';
import { inquireNotification } from './notification.js';
import { inquireNotificationList } from './notification.js';
import { inquirePaymentMethod } from './pay.js';
import { payCancel } from './pay.js';
import { capture } from './pay.js';
import { payConsult } from './pay.js';
import { createMandate } from './pay.js';
import { paymentSession } from './pay.js';
import { inquireExchangeRate } from './pay.js';
import { payQuery } from './pay.js';
import { inquiryRefund } from './pay.js';
import { pay } from './pay.js';
import { refund } from './pay.js';
import { cancelRule } from './pay.js';
import { createHold } from './pay.js';
import { createRelease } from './pay.js';
import { createRule } from './pay.js';
import { inquireHoldList } from './pay.js';
import { inquireRelease } from './pay.js';
import { inquireRuleList } from './pay.js';
import { updateHold } from './pay.js';
import { updateRule } from './pay.js';
import { updateAmount } from './pay.js';
import { verifyAndCompletePayment } from './pay.js';
import { vaultingSession } from './pay.js';
import { vaultsFetchNonce } from './pay.js';
import { vaultingQuery } from './pay.js';
import { vaultingPaymentMethod } from './pay.js';
import { subscriptionCancel } from './subscription.js';
import { subscriptionChange } from './subscription.js';
import { subscriptionCreate } from './subscription.js';
import { inquireSubscription } from './subscription.js';
import { inquireSubscriptionList } from './subscription.js';
import { inquireSubscriptionPayment } from './subscription.js';
import { subscriptionsInquiry } from './subscription.js';
import { subscriptionUpdate } from './subscription.js';
/** Exact descriptors backing each generated resource method. */
export const resourceOperations = /*#__PURE__*/ Object.freeze({
    "aba.accountInquireAvailableQuota": inquireAvailableQuota,
    "aba.accountsInquiryBalance": inquiryBalance,
    "aba.accountsInquiryStatement": inquiryStatement,
    "aba.accountsInquiryStatementDetail": inquiryStatementDetail,
    "aba.accountsInquiryStatementList": inquiryStatementList,
    "aba.cardsApplyCard": applyCard,
    "aba.cardsInquireCard": inquireCard,
    "aba.cardsInquireCardDetail": inquireCardDetail,
    "aba.cardsInquireCardSensitiveInfo": inquireCardSensitiveInfo,
    "aba.cardsInquireCardTransactionEvent": inquireCardTransactionEvent,
    "aba.cardsInquireCardTransactionLifecycle": inquireCardTransactionLifecycle,
    "aba.cardsInquireCardTransactionLifecycleDetail": inquireCardTransactionLifecycleDetail,
    "aba.cardsUpdateCard": updateCard,
    "aba.cardsUpdateCardStatus": updateCardStatus,
    "aba.fundsCreateDirectPayment": createDirectPayment,
    "aba.fundsCreateDirectRefund": createDirectRefund,
    "aba.fundsCreateExchange": createExchange,
    "aba.fundsCreateQuote": createQuote,
    "aba.fundsInquireDirectPayment": inquireDirectPayment,
    "aba.fundsInquireDirectRefund": inquireDirectRefund,
    "aba.fundsInquireExchange": inquireExchange,
    "aba.fundsInquireRate": inquiryRate,
    "agentic.agenticPaymentCreateAuthenticationSession": createAuthenticationSession,
    "agentic.agenticPaymentCreateBindingSession": createBindingSession,
    "agentic.agenticPaymentInquireAccountInfo": inquireAccountInfo,
    "agentic.agenticPaymentInquirePaymentToken": inquirePaymentToken,
    "auth.authorizationsApplyToken": authApplyToken,
    "auth.authorizationsConsult": authConsult,
    "auth.authorizationsRevoke": authRevokeToken,
    "billing.couponCreate": couponCreate,
    "billing.couponInquireDetails": couponInquireDetails,
    "billing.couponInquireList": couponInquireList,
    "billing.couponUpdate": couponUpdate,
    "billing.creditNoteCreate": creditNoteCreate,
    "billing.creditNoteInquireDetails": creditNoteInquireDetails,
    "billing.creditNoteInquireList": creditNoteInquireList,
    "billing.creditNoteVoid": creditNoteVoid,
    "billing.customerCreate": customerCreate,
    "billing.customerCreatePortalLink": customerCreatePortalLink,
    "billing.customerDelete": customerDelete,
    "billing.customerInquireDetails": customerInquireDetails,
    "billing.customerInquireList": customerInquireList,
    "billing.customerUpdate": customerUpdate,
    "billing.invoiceConfirmPayment": invoiceConfirmPayment,
    "billing.invoiceCreate": invoiceCreate,
    "billing.invoiceCreateViewLink": invoiceCreateViewLink,
    "billing.invoiceExport": invoiceExport,
    "billing.invoiceFinalize": invoiceFinalize,
    "billing.invoiceInquireDetails": invoiceInquireDetails,
    "billing.invoiceInquireList": invoiceInquireList,
    "billing.invoiceMarkUncollectible": invoiceMarkUncollectible,
    "billing.invoiceRevise": invoiceRevise,
    "billing.invoiceSend": invoiceSend,
    "billing.invoiceUpdate": invoiceUpdate,
    "billing.invoiceVoid": invoiceVoid,
    "billing.meterCreate": meterCreate,
    "billing.meterCreateSession": meterCreateSession,
    "billing.meterCreditGrantCreate": creditGrantCreate,
    "billing.meterCreditGrantInquireDetails": creditGrantInquireDetails,
    "billing.meterCreditGrantInquireList": creditGrantInquireList,
    "billing.meterCreditGrantUpdateExpiry": creditGrantUpdateExpiry,
    "billing.meterCreditGrantVoid": creditGrantVoid,
    "billing.meterInquireDetails": meterInquireDetails,
    "billing.meterInquireList": meterInquireList,
    "billing.meterUpdate": meterUpdate,
    "billing.priceCreate": priceCreate,
    "billing.priceInquireDetails": priceInquireDetails,
    "billing.priceInquireList": priceInquireList,
    "billing.priceUpdate": priceUpdate,
    "billing.productCreate": productCreate,
    "billing.productInquireDetails": productInquireDetails,
    "billing.productInquireList": productInquireList,
    "billing.productUpdate": productUpdate,
    "billing.promotionCodeCreate": promotionCodeCreate,
    "billing.promotionCodeInquireDetails": promotionCodeInquireDetails,
    "billing.promotionCodeInquireList": promotionCodeInquireList,
    "billing.promotionCodeUpdate": promotionCodeUpdate,
    "billing.receiptExport": receiptExport,
    "billing.receiptInquireDetails": receiptInquireDetails,
    "billing.receiptInquireList": receiptInquireList,
    "billing.receiptSend": receiptSend,
    "billing.subscriptionCancel": billingSubscriptionCancel,
    "billing.subscriptionCreate": billingSubscriptionCreate,
    "billing.subscriptionInquireDetails": billingSubscriptionInquireDetails,
    "billing.subscriptionInquireList": billingSubscriptionInquireList,
    "billing.subscriptionResume": billingSubscriptionResume,
    "billing.subscriptionUpdate": billingSubscriptionUpdate,
    "billing.taxCalculate": taxCalculate,
    "billing.taxCancelRegistration": taxCancelRegistration,
    "billing.taxInitializeSettings": taxInitializeSettings,
    "billing.taxInquireCalculation": taxInquireCalculation,
    "billing.taxInquireRegistrationList": taxInquireRegistrationList,
    "billing.taxInquireSettings": taxInquireSettings,
    "billing.taxInquireTransactionList": taxInquireTransactionList,
    "billing.taxRegister": taxRegister,
    "billing.taxUpdateRegistrationPeriod": taxUpdateRegistrationPeriod,
    "billing.taxUpdateSettings": taxUpdateSettings,
    "dispute.paymentsAcceptDispute": acceptDispute,
    "dispute.paymentsDownloadDisputeEvidence": downloadDisputeEvidence,
    "dispute.paymentsSupplyDefenseDocument": supplyDefenseDocument,
    "dispute.paymentsSupplyEvidence": supplyEvidence,
    "marketplace.accountsInquireBalance": inquireBalance,
    "marketplace.businessAttachmentSubmitAttachment": submitAttachment,
    "marketplace.fundsCreatePayout": createPayout,
    "marketplace.fundsCreateTransfer": createTransfer,
    "marketplace.merchantsRegister": register,
    "marketplace.merchantsSettlementInfoUpdate": settlementInfoUpdate,
    "marketplace.paymentsSettle": settle,
    "notification.inquireNotification": inquireNotification,
    "notification.inquireNotificationList": inquireNotificationList,
    "pay.paymentMethodsInquirePaymentMethod": inquirePaymentMethod,
    "pay.paymentsCancel": payCancel,
    "pay.paymentsCapture": capture,
    "pay.paymentsConsult": payConsult,
    "pay.paymentsCreateMandate": createMandate,
    "pay.paymentsCreatePaymentSession": paymentSession,
    "pay.paymentsInquireExchangeRate": inquireExchangeRate,
    "pay.paymentsInquiryPayment": payQuery,
    "pay.paymentsInquiryRefund": inquiryRefund,
    "pay.paymentsPay": pay,
    "pay.paymentsRefund": refund,
    "pay.paymentsReserveCancelRule": cancelRule,
    "pay.paymentsReserveCreateHold": createHold,
    "pay.paymentsReserveCreateRelease": createRelease,
    "pay.paymentsReserveCreateRule": createRule,
    "pay.paymentsReserveInquireHoldList": inquireHoldList,
    "pay.paymentsReserveInquireRelease": inquireRelease,
    "pay.paymentsReserveInquireRuleList": inquireRuleList,
    "pay.paymentsReserveUpdateHold": updateHold,
    "pay.paymentsReserveUpdateRule": updateRule,
    "pay.paymentsUpdateAmount": updateAmount,
    "pay.paymentsVerifyAndCompletePayment": verifyAndCompletePayment,
    "pay.vaultsCreateVaultingSession": vaultingSession,
    "pay.vaultsFetchNonce": vaultsFetchNonce,
    "pay.vaultsInquireVaulting": vaultingQuery,
    "pay.vaultsVaultPaymentMethod": vaultingPaymentMethod,
    "subscription.cancel": subscriptionCancel,
    "subscription.change": subscriptionChange,
    "subscription.create": subscriptionCreate,
    "subscription.inquireSubscription": inquireSubscription,
    "subscription.inquireSubscriptionList": inquireSubscriptionList,
    "subscription.inquireSubscriptionPayment": inquireSubscriptionPayment,
    "subscription.inquiry": subscriptionsInquiry,
    "subscription.update": subscriptionUpdate,
});
