import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBase} from "../../../core/abstracts/form-base";
import {IKpi} from "../core/models/kpi.model";
import {KpiCommand} from "../core/models/kpi.command";
import {ApiService} from "../../../core/services/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {Frequency, frequencyList} from "../../../core/models/data-types/frequency.data-type";
import {Polarity, polarityList} from "../../../core/models/data-types/polarity.data-type";
import {ValidationStatus, validationStatusList} from "../../../core/models/data-types/validation-status.data-type";
import {IEnumType} from "../../settings/enum-type/core/models/enum-type.model";
import {ILevelThreeObjective} from "../../strategic-objectives/core/models/level-three-objective.model";
import {ILevelFourObjective} from "../../strategic-objectives/core/models/level-four-objective.model";
import {Subscription} from "rxjs";
import {IStrategicObjectiveBase} from "../../strategic-objectives/core/models/strategic-objective-base.model";
import {stepper} from "../../../shared/animations/app-animations.animation";
import {IEntity} from "../../entities/core/models/entity.model";

@Component({
    selector: 'app-kpi-form',
    templateUrl: './kpi-form.component.html',
    animations: [
        stepper
    ]
})
export class KpiFormComponent extends FormBase<IKpi, KpiCommand> implements OnInit, OnDestroy {
    constructor(api: ApiService, private cd: ChangeDetectorRef) {
        super(api);
    }

    protected _url: string = 'kpis';

    protected initCommand(): void {
        this.command = new KpiCommand(this.form);
        this.command.id = this.inputCommand.id;
    }

    public code!: FormControl;
    public name!: FormControl;
    public ownerName!: FormControl;
    public ownerEmail!: FormControl;
    public ownerPosition!: FormControl;
    public ownerPhoneNumber!: FormControl;
    public frequency!: FormControl;
    public polarity!: FormControl;
    public validationStatus!: FormControl;
    public formula!: FormControl;
    public baselineValue!: FormControl;
    public baselineYear!: FormControl;
    public measurementUnit!: FormControl;
    public dataSource!: FormControl;
    public description!: FormControl;
    public visible!: FormControl;
    public visibleOnDashboard!: FormControl;
    public calculateStatus!: FormControl;
    public statusEnumId!: FormControl;
    public entityId!: FormControl;
    public levelThreeStrategicObjectiveId!: FormControl;
    public levelFourStrategicObjectiveId!: FormControl;

    public step: number = 1;
    public stepControls: { stepCount: number, controls: FormControl[] }[] = [];
    public showStatus: boolean = false;
    public statusSubscription?: Subscription;
    
    public statusUrl: string = `enum-types?category=${EnumTypeCategory.KPIStatus}`;
    public levelFourUrl: string = '';

    public currentStatus: IEnumType[] = [];
    public currentEntity: IEntity[] = [];
    public currentLevelThreeObjective: ILevelThreeObjective[] = [];
    public currentLevelFourObjective: ILevelFourObjective[] = [];
    
    public frequencySelectList = frequencyList;
    public polaritySelectList = polarityList;
    public validationStatusSelectList = validationStatusList;
    
    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);

        if (this.formAction === FormAction.Update) {
            this.currentEntity.push(this.inputCommand.entity);
            this.currentLevelThreeObjective.push(this.inputCommand.levelThreeStrategicObjective);
            if (this.inputCommand.levelFourStrategicObjective) {
                this.currentLevelFourObjective.push(this.inputCommand.levelFourStrategicObjective)
            }
            if (this.inputCommand.status) {
                this.currentStatus.push(this.inputCommand.status);
            }
            this.showStatus = !this.inputCommand.calculateStatus;
        }
        
        if (!this.isDeleteRequest) {
            this.code = new FormControl(this.inputCommand.code, [
                Validators.required, Validators.maxLength(50)
            ]);
            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.ownerName = new FormControl(this.inputCommand.ownerName, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.ownerEmail = new FormControl(this.inputCommand.ownerEmail, [
                Validators.required, Validators.email, Validators.maxLength(255)
            ]);
            this.ownerPosition = new FormControl(this.inputCommand.ownerPosition, [
                Validators.maxLength(255)
            ]);
            this.ownerPhoneNumber = new FormControl(this.inputCommand.ownerPhoneNumber, [
                Validators.required, Validators.pattern('^0[0-9]{9}$')
            ]);
            this.frequency = new FormControl(Frequency[this.inputCommand.frequency]?.toString(), [
                Validators.required
            ]);
            this.polarity = new FormControl(Polarity[this.inputCommand.polarity]?.toString(), [
                Validators.required
            ]);
            this.validationStatus = new FormControl(ValidationStatus[this.inputCommand.validationStatus]?.toString(), [
                Validators.required
            ]);
            this.formula = new FormControl(this.inputCommand.formula, [
                Validators.maxLength(500)
            ]);
            this.baselineValue = new FormControl(this.inputCommand.baselineValue, [
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.baselineYear = new FormControl(this.inputCommand.baselineYear, [
                Validators.pattern('^(19[8-9]\\d|20[0-8]\\d)?$')
            ]);
            this.measurementUnit = new FormControl(this.inputCommand.measurementUnit, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.dataSource = new FormControl(this.inputCommand.dataSource, [
                Validators.maxLength(255)
            ]);
            this.description = new FormControl(this.inputCommand.description, [
                Validators.required, Validators.maxLength(500)
            ]);
            this.visible = new FormControl(this.inputCommand.visible);
            this.visibleOnDashboard = new FormControl(this.inputCommand.visibleOnDashboard);
            this.calculateStatus = new FormControl(this.inputCommand.calculateStatus);
            this.statusEnumId = new FormControl(this.inputCommand.statusEnumId);
            this.entityId = new FormControl(this.inputCommand.entityId, [
                Validators.required
            ]);
            this.levelThreeStrategicObjectiveId = new FormControl(this.inputCommand.levelThreeStrategicObjectiveId, [
                Validators.required
            ]);
            this.levelFourStrategicObjectiveId = new FormControl({
                value: this.inputCommand.levelFourStrategicObjectiveId,
                disabled: true
            });
            if (this.inputCommand.levelFourStrategicObjectiveId) {
                this.levelFourStrategicObjectiveId.enable();
            }

            this.form = new FormGroup({
                code: this.code,
                name: this.name,
                ownerName: this.ownerName,
                ownerEmail: this.ownerEmail,
                ownerPosition: this.ownerPosition,
                ownerPhoneNumber: this.ownerPhoneNumber,
                frequency: this.frequency,
                polarity: this.polarity,
                validationStatus: this.validationStatus,
                formula: this.formula,
                baselineValue: this.baselineValue,
                baselineYear: this.baselineYear,
                measurementUnit: this.measurementUnit,
                dataSource: this.dataSource,
                description: this.description,
                visible: this.visible,
                visibleOnDashboard: this.visibleOnDashboard,
                calculateStatus: this.calculateStatus,
                statusEnumId: this.statusEnumId,
                entityId: this.entityId,
                levelThreeStrategicObjectiveId: this.levelThreeStrategicObjectiveId,
                levelFourStrategicObjectiveId: this.levelFourStrategicObjectiveId,
            });

            this.stepControls = [
                {
                    stepCount: 1, controls: [
                        this.code,
                        this.name,
                        this.ownerName,
                        this.ownerEmail,
                        this.ownerPhoneNumber,
                        this.ownerPosition,
                        this.description,
                        this.formula,
                        this.baselineValue,
                        this.baselineYear,
                        this.dataSource
                    ]
                },
                {
                    stepCount: 2, controls: [
                        this.frequency,
                        this.polarity,
                        this.validationStatus,
                        this.measurementUnit,
                        this.visible,
                        this.visibleOnDashboard,
                        this.calculateStatus,
                        this.statusEnumId,
                        this.entityId,
                        this.levelThreeStrategicObjectiveId,
                        this.levelFourStrategicObjectiveId
                    ]
                }
            ];
            this.statusSubscription = this.calculateStatus.valueChanges.subscribe((value: boolean) => {
                if (!value) {
                    this.statusEnumId.setValidators(Validators.required);
                } else {
                    this.statusEnumId.clearValidators();
                    this.statusEnumId.setValue(null);
                }
                this.showStatus = !value;
                this.cd.detectChanges();
            })
        }
    }

    public onLevelThreeSelected(item: IStrategicObjectiveBase): void {
        if (item) {
            this.levelFourStrategicObjectiveId.enable();
            this.levelFourUrl = `strategic-objectives?level=4&descendantOf=${item.hierarchyId}`;
            return;
        }
        this.levelFourStrategicObjectiveId.setValue(null);
        this.levelFourStrategicObjectiveId.disable();
        this.levelFourUrl = '';
    }

    public stepForward() {
        let stepControls = this.stepControls.find(sc => sc.stepCount === this.step)?.controls;
        if (!stepControls) {
            return;
        }

        let canMove: boolean = true;
        for (let control of stepControls) {
            control.markAsTouched();
            if (canMove) {
                canMove = !control.invalid;
            }
        }

        if (canMove) {
            this.step += 1;
        }
    }

    public stepBack() {
        this.step -= 1;
    }

    public ngOnDestroy(): void {
        this.statusSubscription?.unsubscribe();
    }

    public override handelError(errors: { [p: string]: string[] }) {
        for (let stepControl of this.stepControls) {
            for (let control of stepControl.controls) {
                if (control.invalid) {
                    this.step = stepControl.stepCount
                    return;
                }
            }
        }
    }
}
