export interface IEditRequestDetails {
    currentValues?: IEditRequestValue[];
    originalValues?: IEditRequestValue[];
    editRequestId: string;
}

export interface IEditRequestValue {
    modelName: string;
    values: { [key: string]: any } []
}