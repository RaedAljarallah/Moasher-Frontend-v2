export interface IResponseError {
    statusCode: number;
    errors: {
        [key:string]: string[]
    }
}