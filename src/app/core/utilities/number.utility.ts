export class NumberUtility {
    static range(start: number, last: number): number[] {
        let range: number[] = [];
        for (let i = start; i <= last; i++) {
            range.push(i);
        }
        return range;
    }
}