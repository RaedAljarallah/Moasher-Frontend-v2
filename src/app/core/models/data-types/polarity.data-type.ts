export enum Polarity {
    Positive = 1,
    Negative
}

export const polarityList: { name: string, value: string }[] = [
    { name: 'موجب', value: Polarity.Positive.toString() },
    { name: 'سالب', value: Polarity.Negative.toString() }
];