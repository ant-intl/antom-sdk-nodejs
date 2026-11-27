/**
 * Legacy metadata type retained for existing named imports.
 * Current vaulting metadata is generated as a free-form JSON object; this
 * interface does not replace the current request models.
 */
export interface PaymentMethodMetaData {
    "recurringType"?: 'SCHEDULED' | 'UNSCHEDULED';
}
