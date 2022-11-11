import {EditRequestStatus} from "../models/data-types/edit-request-status.data-type";
import {EditRequestType} from "../models/data-types/edit-request-type.data-type";

export class EditRequestUtility {
    static translateStatus(status: EditRequestStatus): string {
        switch (status.toString()) {
            case EditRequestStatus[EditRequestStatus.Pending]:
            case '1':
                return 'قيد الإجراء';
            case EditRequestStatus[EditRequestStatus.Approved]:
            case '2':
                return 'مقبول';
            case EditRequestStatus[EditRequestStatus.Rejected]:
            case '3':
                return 'مرفوض';
            default:
                return '';
        }
    }
    
    static translateType(type: EditRequestType): string {
        switch (type.toString()) {
            case EditRequestType[EditRequestType.Create]:
            case '1':
                return 'إضافة';
            case EditRequestType[EditRequestType.Update]:
            case '2':
                return 'تعديل';
            case EditRequestType[EditRequestType.Delete]:
            case '3':
                return 'حذف';
            default:
                return '';
        }
    }
}