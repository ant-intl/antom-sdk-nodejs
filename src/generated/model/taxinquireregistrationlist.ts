/* Generated operation-scoped models for taxinquireregistrationlist. */
import type { TaxJurisdiction } from '../share.js';

/** Wire-format TaxRegistration; property names match the API JSON. */
export interface TaxRegistration {
    "activeFrom": string;
    "expireAt"?: string;
    "jurisdiction": TaxJurisdiction;
    "registrationType": string;
    "status": string;
    "taxId": string;
    "taxRegistrationId": string;
    "taxType": string;
}
