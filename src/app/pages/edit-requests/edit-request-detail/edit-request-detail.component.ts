import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IEditRequestDetails} from "../core/models/edit-request-details.model";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {IEditRequest} from "../core/models/edit-request.model";
import {finalize} from "rxjs/operators";
import {EditRequestStatus} from "../../../core/models/data-types/edit-request-status.data-type";

@Component({
    selector: 'app-edit-request-detail',
    templateUrl: './edit-request-detail.component.html',
    styles: []
})
export class EditRequestDetailComponent implements OnInit, OnDestroy {
    @Input() details!: IEditRequestDetails;
    @Input() status!: EditRequestStatus;
    @Output() onSubmitted: EventEmitter<IEditRequest> = new EventEmitter<IEditRequest>();
    public isAcceptingLoading: boolean = false;
    public isRejectionLoading: boolean = false;
    public isPending: boolean = false;
    public justification: string | null = null;

    constructor(private api: ApiService, private modal: ModalService) {
    }

    public ngOnInit(): void {
        this.modal.register('EditRequestRejectionModal');

        this.isPending = this.status.toString() === EditRequestStatus[EditRequestStatus.Pending].toString()
    }

    public getKeys(data: { [key: string]: any }): string[] {
        return Object.keys(data);
    }

    public accept(): void {
        this.isAcceptingLoading = true;
        this.api.post<{ id: string }, IEditRequest>('edit-requests/accept', {id: this.details.editRequestId})
            .pipe(finalize(() => this.isAcceptingLoading = false))
            .subscribe(res => {
                this.onSubmitted.emit(res.result);
            });
    }

    public reject(): void {
        this.isRejectionLoading = true;
        this.api.post<{ id: string, justification: string | null }, IEditRequest>('edit-requests/reject', {
            id: this.details.editRequestId,
            justification: this.justification,
        })
        .pipe(finalize(() => this.isRejectionLoading = false))
        .subscribe(res => {
            this.modal.close("EditRequestRejectionModal");
            this.onSubmitted.emit(res.result);
        });
    }

    public showRejectionModal(): void {
        this.modal.open("EditRequestRejectionModal");
    }

    public ngOnDestroy(): void {
        this.modal.unregister("EditRequestRejectionModal");
    }

    public get editRequestStatus(): typeof EditRequestStatus {
        return EditRequestStatus;
    }
}
