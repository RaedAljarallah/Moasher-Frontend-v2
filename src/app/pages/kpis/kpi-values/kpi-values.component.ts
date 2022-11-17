import {Component, Input} from '@angular/core';
import {TableComponentBase} from "../../../core/abstracts/table-component-base";
import {IKpiValue} from "../core/models/kpi-value/kpi-value.model";
import {KpiValueCommand} from "../core/models/kpi-value/kpi-value.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {
    schedulableFilterFields,
    schedulableQueryParameters
} from "../../../core/constants/schedulable-query-parameters";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";
import {MeasurementPeriod, measurementPeriodList} from "../../../core/models/data-types/measurement-period.data-type";
import {Frequency} from "../../../core/models/data-types/frequency.data-type";
import {AppRoles} from "../../../core/services/authorize.service";


@Component({
    selector: 'app-kpi-values',
    templateUrl: './kpi-values.component.html',
    styles: []
})
export class KpiValuesComponent extends TableComponentBase<IKpiValue, KpiValueCommand> {
    @Input() kpiId: string = '';
    @Input() frequency!: Frequency;
    
    constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
        super(route, router, api, modal);
    }

    protected _createFormTitle: string = 'إضافة مستهدف';
    protected _updateFormTitle: string = 'تعديل مستهدف';
    protected _deleteFormTitle: string = 'حذف مستهدف';
    protected _modalId: string = 'KpiValueModal';
    public allowedUsers = [AppRoles.KPIsOperator, AppRoles.EntityUser];
    protected override onInit() {
        this.command = new KpiValueCommand(null)
            .setKpiId(this.kpiId)
            .setFrequency(this.frequency);
        this.headers = [
            {value: 'السنة', classes: 'w-5'},
            {value: 'فترة القياس', classes: 'w-28'},
            {value: 'المستهدف', classes: 'w-28'},
            {value: 'الفعلي', classes: 'w-28'},
            {value: 'وحدة القياس', classes: 'w-28'},
            {value: 'تاريخ الإنجاز المخطط', classes: 'w-28'},
            {value: 'تاريخ الإنجاز الفعلي', classes: 'w-28'},
            {value: '', classes: 'w-full'}
        ];
        this.filterFields = schedulableFilterFields;
    }

    protected loadItems(params: HttpParams): Observable<IResponse<IKpiValue[]>> {
        return this.api.get<IKpiValue[]>(`kpi-values?kpiId=${this.kpiId}`, {params: params});
    }

    protected queryParams: { key: string; defaultValue?: string }[] = schedulableQueryParameters;
    protected initCommand(item: IKpiValue | null): void {
        this.command = new KpiValueCommand(item)
            .setKpiId(this.kpiId)
            .setFrequency(this.frequency);
        if (item) {
            this.command.id = item.id;
        }
    }

    public getTranslatedMeasurementPeriod(measurementPeriod: string): string {
        let measurementPeriodEnum = MeasurementPeriod[measurementPeriod as keyof typeof MeasurementPeriod];
        const measurementPeriodName = measurementPeriodList.find(m => m.value == measurementPeriodEnum.toString())?.name;

        return (measurementPeriodName) ? measurementPeriodName : '';
    }
}
