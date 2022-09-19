export enum Frequency {
    Annually = 1,
    SemiAnnually,
    Quarterly,
    Monthly
}

export const frequencyList: { name: string, value: string }[] = [
    { name: 'سنوي', value: Frequency.Annually.toString() },
    { name: 'نصف سنوي', value: Frequency.SemiAnnually.toString() },
    { name: 'ربع سنوي', value: Frequency.Quarterly.toString() },
    { name: 'شهري', value: Frequency.Monthly.toString() },
];