import {EditRequestType} from "../../../../core/models/data-types/edit-request-type.data-type";

export interface IEditRequestDetails {
    originalValues?: IEditRequestValue[];
    editRequestId: string;
}

export interface IEditRequestValue {
    modelName: string;
    type: EditRequestType;
    values: { [key: string]: any }
}