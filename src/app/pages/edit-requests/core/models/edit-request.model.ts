import {EditRequestType} from "../../../../core/models/data-types/edit-request-type.data-type";
import {EditRequestStatus} from "../../../../core/models/data-types/edit-request-status.data-type";

export interface IEditRequest {
    id: string;
    code: string;
    type: EditRequestType;
    status: EditRequestStatus;
    scopes: string[];
    requestedAt : Date;
    requestedBy: string;
    justification?: string;
}