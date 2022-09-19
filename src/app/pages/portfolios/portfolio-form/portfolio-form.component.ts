import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../core/abstracts/form-base";
import {IPortfolio} from "../core/models/portfolio.model";
import {PortfolioCommand} from "../core/models/portfolio.command";
import {ApiService} from "../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {IInitiative} from "../../initiatives/core/models/initiative.model";

@Component({
    selector: 'app-portfolio-form',
    templateUrl: './portfolio-form.component.html',
    styles: []
})
export class PortfolioFormComponent extends FormBase<IPortfolio, PortfolioCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'portfolios';
    protected initCommand(): void {
        this.command = new PortfolioCommand(this.form);
        this.command.id = this.inputCommand.id;
        this.command.initiativeIds = this.relatedInitiatives.map(i => i.id);
    }

    public code!: FormControl;
    public name!: FormControl;
    public initiativeIds!: FormControl;
    
    public relatedInitiatives: IInitiative[] = [];
    
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (this.formAction === FormAction.Update) {
            this.relatedInitiatives.push(...this.inputCommand.relatedInitiatives);
        }
        if (!this.isDeleteRequest) {
            this.code = new FormControl(this.inputCommand.code, [
                Validators.required, Validators.maxLength(50)
            ]);

            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            
            this.initiativeIds = new FormControl([]);
            
            this.form = new FormGroup({
                code: this.code,
                name: this.name,
                initiativeIds: this.initiativeIds
            })
        }
    }
    
    public addInitiative(initiative: IInitiative | undefined): void {
        if (initiative) {
            if (!this.relatedInitiatives.find(m => m.id == initiative.id)) {
                this.relatedInitiatives.push(initiative);
            }
        }
    }

    public removeInitiative(initiative: IInitiative): void {
        const index = this.relatedInitiatives.findIndex(i => i.id === initiative.id);
        if (index > -1) {
            this.relatedInitiatives.splice(index, 1);
        }
    }
}
