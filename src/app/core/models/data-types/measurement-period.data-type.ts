import {Frequency} from "./frequency.data-type";

export enum MeasurementPeriod {
    MonthOne = 1,
    MonthTwo,
    MonthThree,
    MonthFour,
    MonthFive,
    MonthSix,
    MonthSeven,
    MonthEight,
    MonthNine,
    MonthTen,
    MonthEleven,
    MonthTwelve,
    QuarterOne,
    QuarterTwo,
    QuarterThree,
    QuarterFour,
    FirstHalf,
    SecondHalf,
    EndOfYear
}

export const measurementPeriodList: { name: string, value: string }[] = [
    { name: 'نهاية السنة', value: MeasurementPeriod.EndOfYear.toString() },
    { name: 'النصف الأول', value: MeasurementPeriod.FirstHalf.toString() },
    { name: 'النصف الثاني', value: MeasurementPeriod.SecondHalf.toString() },
    { name: 'الربع الأول', value: MeasurementPeriod.QuarterOne.toString() },
    { name: 'الربع الثاني', value: MeasurementPeriod.QuarterTwo.toString() },
    { name: 'الربع الثالث', value: MeasurementPeriod.QuarterThree.toString() },
    { name: 'الربع الرابع', value: MeasurementPeriod.QuarterFour.toString() },
    { name: 'شهر 1', value: MeasurementPeriod.MonthOne.toString() },
    { name: 'شهر 2', value: MeasurementPeriod.MonthTwo.toString() },
    { name: 'شهر 3', value: MeasurementPeriod.MonthThree.toString() },
    { name: 'شهر 4', value: MeasurementPeriod.MonthFour.toString() },
    { name: 'شهر 5', value: MeasurementPeriod.MonthFive.toString() },
    { name: 'شهر 6', value: MeasurementPeriod.MonthSix.toString() },
    { name: 'شهر 7', value: MeasurementPeriod.MonthSeven.toString() },
    { name: 'شهر 8', value: MeasurementPeriod.MonthEight.toString() },
    { name: 'شهر 9', value: MeasurementPeriod.MonthNine.toString() },
    { name: 'شهر 10', value: MeasurementPeriod.MonthTen.toString() },
    { name: 'شهر 11', value: MeasurementPeriod.MonthEleven.toString() },
    { name: 'شهر 12', value: MeasurementPeriod.MonthTwelve.toString() }
];

export function getMeasurementPeriodList(frequency: Frequency): { name: string, value: string }[] {
    let frequencyEnum = Frequency[frequency];
    switch (frequencyEnum.toString()) {
        case Frequency.Annually.toString():
            return [
                { name: 'نهاية السنة', value: MeasurementPeriod.EndOfYear.toString() }
            ]
        case Frequency.SemiAnnually.toString():
            return [
                { name: 'النصف الأول', value: MeasurementPeriod.FirstHalf.toString() },
                { name: 'النصف الثاني', value: MeasurementPeriod.SecondHalf.toString() }
            ]
        case Frequency.Quarterly.toString():
            return [
                { name: 'الربع الأول', value: MeasurementPeriod.QuarterOne.toString() },
                { name: 'الربع الثاني', value: MeasurementPeriod.QuarterTwo.toString() },
                { name: 'الربع الثالث', value: MeasurementPeriod.QuarterThree.toString() },
                { name: 'الربع الرابع', value: MeasurementPeriod.QuarterFour.toString() }
            ]
        case Frequency.Monthly.toString():
            return [
                { name: 'شهر 1', value: MeasurementPeriod.MonthOne.toString() },
                { name: 'شهر 2', value: MeasurementPeriod.MonthTwo.toString() },
                { name: 'شهر 3', value: MeasurementPeriod.MonthThree.toString() },
                { name: 'شهر 4', value: MeasurementPeriod.MonthFour.toString() },
                { name: 'شهر 5', value: MeasurementPeriod.MonthFive.toString() },
                { name: 'شهر 6', value: MeasurementPeriod.MonthSix.toString() },
                { name: 'شهر 7', value: MeasurementPeriod.MonthSeven.toString() },
                { name: 'شهر 8', value: MeasurementPeriod.MonthEight.toString() },
                { name: 'شهر 9', value: MeasurementPeriod.MonthNine.toString() },
                { name: 'شهر 10', value: MeasurementPeriod.MonthTen.toString() },
                { name: 'شهر 11', value: MeasurementPeriod.MonthEleven.toString() },
                { name: 'شهر 12', value: MeasurementPeriod.MonthTwelve.toString() }
            ]
        default:
            return [];
    }
}