import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {TeamCommand} from "../../core/models/team/team.command";
import {ITeam} from "../../core/models/team/team.model";
import {ApiService} from "../../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {EnumTypeCategory} from "../../../../core/models/data-types/eum-type-category.data-type";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";

@Component({
    selector: 'app-initiative-team-form',
    templateUrl: './initiative-team-form.component.html',
    styles: []
})
export class InitiativeTeamFormComponent extends FormBase<ITeam, TeamCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'initiative-teams';
    protected initCommand(): void {
        this.command = new TeamCommand(this.form)
            .setInitiativeId(this.inputCommand.initiativeId);
        this.command.id = this.inputCommand.id;
    }
    
    public name!: FormControl;
    public email!: FormControl;
    public phone!: FormControl;
    public roleEnumId!: FormControl;
    
    public roleUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeTeamRole}`;
    
    public currentRole: IEnumType[] = [];

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (this.formAction === FormAction.Update) {
            this.currentRole.push(this.inputCommand.role);
        }

        if (!this.isDeleteRequest) {
            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.email = new FormControl(this.inputCommand.email, [
                Validators.required, Validators.email
            ]);
            this.phone = new FormControl(this.inputCommand.phone, [
                Validators.required, Validators.pattern('^0[0-9]{9}$')
            ]);
            this.roleEnumId = new FormControl(this.inputCommand.roleEnumId, [
                Validators.required
            ]);
            
            this.form = new FormGroup({
                name: this.name,
                email: this.email,
                phone: this.phone,
                roleEnumId: this.roleEnumId
            })
        }
    }
}
