/* Generated operation-scoped models for inquirecard. */
/* Generated from the Antom OpenAPI schema. */
/** Wire-format AbaCard; property names match the API JSON. */
export interface AbaCard {
    "assetId": string;
    "cardBrand": 'MASTERCARD';
    "cardNickName"?: string;
    "cardStatus": 'ACTIVE' | 'FROZEN' | 'CANCEL';
    "createdTime": string;
    "maskedCardNo": string;
    "updatedTime": string;
}
