/* Generated operation-scoped models for productinquirelist. */
/* Generated from the Antom OpenAPI schema. */
/** Wire-format Product; property names match the API JSON. */
export interface Product {
    "active": boolean;
    "createdAt": string;
    "deactivatedAt"?: string;
    "description"?: string;
    "images"?: Array<string>;
    "metadata"?: string;
    "name": string;
    "productId": string;
    "productRequestId"?: string;
    "type": string;
    "unitLabel"?: string;
    "updatedAt"?: string;
}
