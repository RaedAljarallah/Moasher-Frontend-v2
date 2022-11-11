export interface IEditRequestDetails {
    modelName: string;
    currentValues?: string;
    originalValues?: { [key:string]: any };
    editRequestId: string;
}