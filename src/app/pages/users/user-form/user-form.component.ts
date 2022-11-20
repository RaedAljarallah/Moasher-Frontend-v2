import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../core/abstracts/form-base";
import {IUser} from "../core/models/user.model";
import {UserCommand} from "../core/models/user.command";
import {ApiService} from "../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IEntity} from "../../entities/core/models/entity.model";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {finalize} from "rxjs/operators";
import {IResponseError} from "../../../core/models/response-error.model";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styles: []
})
export class UserFormComponent extends FormBase<IUser, UserCommand> implements OnInit {

    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'users';

    protected initCommand(): void {
        this.command = new UserCommand(this.form);
        this.command.id = this.inputCommand.id;
    }

    public firstName!: FormControl;
    public lastName!: FormControl;
    public email!: FormControl;
    public phoneNumber!: FormControl;
    public role!: FormControl;
    public entityId!: FormControl;

    public currentEntity: IEntity[] = [];
    public currentRole: { id: string, name: string, localizedName: string }[] = [];

    public showUpdateSection: boolean = false;
    public isSuspensionLoading: boolean = false;
    public isSuspended: boolean = false;
    public isResetPasswordLoading: boolean = false;
    public isPasswordReset: boolean = false;
    public isNotifyByEmail: boolean = false;
    public isNotifyByEmailLoading: boolean = false;
    
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (this.formAction === FormAction.Update) {
            this.currentEntity.push(this.inputCommand.entity);
            this.currentRole.push({
                id: this.inputCommand.role,
                name: this.inputCommand.role,
                localizedName: this.inputCommand.localizedRole
            });
            this.showUpdateSection = true;
            this.isSuspended = this.inputCommand.suspended;
            this.isNotifyByEmail = this.inputCommand.receiveEmailNotification;
        }

        if (!this.isDeleteRequest) {
            this.firstName = new FormControl(this.inputCommand.firstName, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.lastName = new FormControl(this.inputCommand.lastName, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.email = new FormControl(this.inputCommand.email, [
                Validators.required, Validators.email, Validators.maxLength(255)
            ]);
            this.phoneNumber = new FormControl(this.inputCommand.phoneNumber, [
                Validators.required, Validators.pattern('^0[0-9]{9}$')
            ]);
            this.role = new FormControl(this.inputCommand.role, [
                Validators.required
            ]);
            this.entityId = new FormControl(this.inputCommand.entityId, [
                Validators.required
            ]);

            this.form = new FormGroup({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                role: this.role,
                entityId: this.entityId
            });
        }
    }

    public updateSuspensionStatus(): void {
        this.isSuspensionLoading = true;
        this.api.put<{ id: string, suspend: boolean }, boolean>(`users/${this.inputCommand.id}/update-suspension-status`, {
            id: this.inputCommand.id,
            suspend: !this.isSuspended
        }).pipe(finalize(() => this.isSuspensionLoading = false)).subscribe({
            next: (res) => {
                this.isSuspended = res.result;
            },
            error: (failure: IResponseError) => {
                if (failure.statusCode === 400) {
                    this.setServerErrors(failure.errors);
                    this.handelError(failure.errors);
                } else {
                    this.globalErrors.push(failure.errors[''][0])
                }
            }
        });
    }
    
    public updateNotifyByEmailStatus(): void {
        this.isNotifyByEmailLoading = true;
        this.api.put<{id: string, enable: boolean}, boolean>(`users/${this.inputCommand.id}/update-email-notification-status`, {
            id: this.inputCommand.id,
            enable: !this.isNotifyByEmail
        }).pipe(finalize(() => this.isNotifyByEmailLoading = false)).subscribe({
            next: (res) => {
                this.isNotifyByEmail = res.result
            },
            error: (failure: IResponseError) => {
                if (failure.statusCode === 400) {
                    this.setServerErrors(failure.errors);
                    this.handelError(failure.errors);
                } else {
                    this.globalErrors.push(failure.errors[''][0])
                }
            }
        });
    }
    
    public resetPassword(): void {
        this.isResetPasswordLoading = true;
        this.api.post<{id: string}, any>(`users/${this.inputCommand.id}/reset-password`, {
            id: this.inputCommand.id
        }).pipe(finalize(() => this.isResetPasswordLoading = false)).subscribe({
            next: (res) => {
                this.isPasswordReset = true;
            },
            error: (failure: IResponseError) => {
                if (failure.statusCode === 400) {
                    this.setServerErrors(failure.errors);
                    this.handelError(failure.errors);
                } else {
                    this.globalErrors.push(failure.errors[''][0])
                }
            }
        })
    }
}
