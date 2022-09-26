import {Component, Input, OnInit} from '@angular/core';
import {IKpi} from "../core/models/kpi.model";
import {ValidationStatus, validationStatusList} from "../../../core/models/data-types/validation-status.data-type";
import {Polarity, polarityList} from "../../../core/models/data-types/polarity.data-type";
import {Frequency, frequencyList} from "../../../core/models/data-types/frequency.data-type";

@Component({
    selector: 'app-kpi-over-view',
    templateUrl: './kpi-over-view.component.html',
    styles: []
})
export class KpiOverViewComponent implements OnInit {
    @Input() kpi!: IKpi;
    
    constructor() {
    }

    ngOnInit(): void {
    }

    public translateValidationStatus(validationStatus: ValidationStatus): string {
        if (validationStatus) {
            let validationStatusEnum = ValidationStatus[validationStatus.toString() as keyof typeof ValidationStatus];
            const validationStatusName = validationStatusList.find(v => v.value == validationStatusEnum.toString())?.name;
            return (validationStatusName) ? validationStatusName : '';
        }
        return '';
    }

    public translatePolarity(polarity: Polarity): string {
        if (polarity) {
            let polarityEnum = Polarity[polarity.toString() as keyof typeof Polarity];
            const polarityName = polarityList.find(p => p.value == polarityEnum.toString())?.name;
            return (polarityName) ? polarityName : '';
        }
        return '';
    }

    public translateFrequency(frequency: Frequency): string {
        if (frequency) {
            let frequencyEnum = Frequency[frequency.toString() as keyof typeof Frequency];
            const frequencyName = frequencyList.find(f => f.value == frequencyEnum.toString())?.name;
            return (frequencyName) ? frequencyName : '';
        }
        return '';
    }
}
