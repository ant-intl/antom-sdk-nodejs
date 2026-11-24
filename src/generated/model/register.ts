/* Generated operation-scoped models for register. */
import type { Address, SettlementBankAccount, UserName } from '../share.js';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type AssociationType = 'LEGAL_REPRESENTATIVE' | 'UBO' | 'CONTACT' | 'DIRECTOR' | 'AUTHORIZER' | 'BOARD_MEMBER';

/* Generated from the Antom OpenAPI schema. */
/** Wire-format Attachment; property names match the API JSON. */
export interface Attachment {
    "attachmentName": string;
    "attachmentType": string;
    "file"?: string;
    "fileKey": string;
}

/** Wire-format BusinessInfo; property names match the API JSON. */
export interface BusinessInfo {
    "appName"?: string;
    "doingBusinessAs": string;
    "englishName"?: string;
    "mainSalesCountry"?: string;
    "mcc"?: string;
    "serviceDescription"?: string;
    "websites"?: Array<WebSite>;
}

/** Wire-format Certificate; property names match the API JSON. */
export interface Certificate {
    "certificateAuthority"?: string;
    "certificateNo": string;
    "certificateType": CertificateType;
    "fileKeys"?: Array<string>;
    "holderName"?: UserName;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CertificateType = 'ENTERPRISE_REGISTRATION' | 'LICENSE_INFO' | 'ID_CARD' | 'PASSPORT' | 'DRIVING_LICENSE' | 'CPF' | 'CNPJ';

/** Wire-format Company; property names match the API JSON. */
export interface Company {
    "attachments"?: Array<Attachment>;
    "certificates"?: Certificate;
    "companyType": CompanyType;
    "companyUnit"?: CompanyUnitType;
    "contacts"?: Array<Contact>;
    "incorporationDate"?: string;
    "legalName": string;
    "operatingAddress": Address;
    "registeredAddress": Address;
    "stockInfo"?: StockInfo;
    "vatNo"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CompanyType = 'ENTERPRISE' | 'PARTNERSHIP' | 'SOLE_PROPRIETORSHIP' | 'STATE_OWNED_BUSINESS' | 'PRIVATELY_OWNED_BUSINESS' | 'PUBLICLY_LISTED_BUSINESS' | 'LTDA' | 'SA' | 'EIRELI' | 'BOFC' | 'MEI' | 'EI';

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type CompanyUnitType = 'HEADQUARTER' | 'BRANCH';

/** Wire-format Contact; property names match the API JSON. */
export interface Contact {
    "home"?: string;
    "info"?: string;
    "mobile"?: string;
    "type": ContactType;
    "work"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type ContactType = 'EMAIL' | 'PHONE_NO' | 'COMMERCIAL_PHONE_NO';

/** Wire-format EntityAssociations; property names match the API JSON. */
export interface EntityAssociations {
    "associationType": AssociationType;
    "company"?: Company;
    "individual"?: Individual;
    "legalEntityType": LegalEntityType;
    "shareholdingRatio"?: string;
}

/** Wire-format Individual; property names match the API JSON. */
export interface Individual {
    "certificates"?: Certificate;
    "contacts"?: Array<Contact>;
    "dateOfBirth"?: string;
    "englishName"?: UserName;
    "name": UserName;
    "nationality"?: string;
    "placeOfBirth"?: Address;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire values accepted by the API. */
export type LegalEntityType = 'COMPANY' | 'INDIVIDUAL';

/** Wire-format MerchantInfo; property names match the API JSON. */
export interface MerchantInfo {
    "businessInfo": BusinessInfo;
    "company"?: Company;
    "entityAssociations"?: Array<EntityAssociations>;
    "legalEntityType": LegalEntityType;
    "loginId": string;
    "referenceMerchantId": string;
}

/** Wire-format SettlementInfo; property names match the API JSON. */
export interface SettlementInfo {
    "settlementBankAccount"?: SettlementBankAccount;
    "settlementCurrency": string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format StockInfo; property names match the API JSON. */
export interface StockInfo {
    "listedRegion": string;
    "tickerSymbol"?: string;
}

/* Generated from the Antom OpenAPI schema. */
/** Wire-format WebSite; property names match the API JSON. */
export interface WebSite {
    "desc"?: string;
    "name"?: string;
    "type"?: string;
    "url": string;
}
