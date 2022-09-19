export enum ValidationStatus {
    Verified = 1,
    Unverified,
    Unmeasured
}

export const validationStatusList: { name: string, value: string }[] = [
    { name: 'موثق', value: ValidationStatus.Verified.toString() },
    { name: 'غير موثق', value: ValidationStatus.Unverified.toString() },
    { name: 'لم يتم قياسة', value: ValidationStatus.Unmeasured.toString() }
];