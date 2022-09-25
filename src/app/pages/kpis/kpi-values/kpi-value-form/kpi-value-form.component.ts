import {Component, OnInit} from '@angular/core';
import {FormBase} from "../../../../core/abstracts/form-base";
import {IKpiValue} from "../../core/models/kpi-value/kpi-value.model";
import {KpiValueCommand} from "../../core/models/kpi-value/kpi-value.command";
import {ApiService} from "../../../../core/services/api.service";
import {FormAction} from "../../../../core/models/data-types/form-action.data-type";
import {
    getMeasurementPeriodList,
    MeasurementPeriod
} from "../../../../core/models/data-types/measurement-period.data-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-kpi-value-form',
    templateUrl: './kpi-value-form.component.html',
    styles: []
})
export class KpiValueFormComponent extends FormBase<IKpiValue, KpiValueCommand> implements OnInit {
    constructor(api: ApiService) {
        super(api);
    }

    protected _url: string = 'kpi-values';
    protected initCommand(): void {
        this.command = new KpiValueCommand(this.form)
            .setKpiId(this.inputCommand.kpiId);
        this.command.id = this.inputCommand.id;
    }

    public measurementPeriod!: FormControl;
    public year!: FormControl;
    public targetValue!: FormControl;
    public actualValue!: FormControl;
    public plannedFinish!: FormControl;
    public actualFinish!: FormControl;
    
    public measurementPeriods: { name: string, value: string }[] = [];
    
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);
        if (!this.isDeleteRequest) {
            this.measurementPeriods = getMeasurementPeriodList(this.inputCommand.frequency);
            this.measurementPeriod = new FormControl(MeasurementPeriod[this.inputCommand.measurementPeriod]?.toString(), [
                Validators.required
            ]);
            this.year = new FormControl(this.inputCommand.year, [
                Validators.pattern('^(19[8-9]\\d|20[0-8]\\d)?$'), Validators.required
            ]);
            this.targetValue = new FormControl(this.inputCommand.targetValue, [
                Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.actualValue = new FormControl(this.inputCommand.actualValue, [
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.plannedFinish = new FormControl(this.getDate(this.inputCommand.plannedFinish), [
                Validators.required
            ]);
            this.actualFinish = new FormControl(this.getDate(this.inputCommand.actualFinish));
            
            this.form = new FormGroup({
                measurementPeriod: this.measurementPeriod,
                year: this.year,
                targetValue: this.targetValue,
                actualValue: this.actualValue,
                plannedFinish: this.plannedFinish,
                actualFinish: this.actualFinish
            })
        }
    }
}
