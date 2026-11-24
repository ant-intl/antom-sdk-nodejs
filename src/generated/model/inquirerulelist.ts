/* Generated operation-scoped models for inquirerulelist. */
import type { FundsType, PaymentMethodScope, ReleaseType, RuleStatus, TakeType } from '../share.js';

/** Wire-format ReserveRule; property names match the API JSON. */
export interface ReserveRule {
    "createTime": string;
    "fundsType": FundsType;
    "merchantId": string;
    "paymentMethodScope": PaymentMethodScope;
    "ratio"?: number;
    "releaseTime"?: string;
    "releaseType": ReleaseType;
    "retentionTime"?: number;
    "ruleId": string;
    "ruleStatus": RuleStatus;
    "takeType": TakeType;
    "updateTime": string;
}
