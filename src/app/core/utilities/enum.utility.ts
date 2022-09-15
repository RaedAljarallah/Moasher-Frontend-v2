export class EnumUtility {
    static map(_enum: any): { [key: string]: string } {
        let result: { [key: string]: string } = {};
        Object.keys(_enum).forEach(key => {
            result[key] = key;
        })
        
        return result;
    }
    
}