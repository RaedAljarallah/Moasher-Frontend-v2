import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateValidators} from "../../../shared/validators/date.validators";
import {stepper} from "../../../shared/animations/app-animations.animation";
import {Subscription} from "rxjs";
import {InitiativeCommand} from "../core/models/initiative.command";
import {FormAction} from "../../../core/models/data-types/form-action.data-type";
import {FormBase} from "../../../core/abstracts/form-base";
import {IInitiative} from "../core/models/initiative.model";
import {ApiService} from "../../../core/services/api.service";
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {IStrategicObjectiveBase} from "../../strategic-objectives/core/models/strategic-objective-base.model";
import {IEnumType} from "../../settings/enum-type/core/models/enum-type.model";
import {ILevelThreeObjective} from "../../strategic-objectives/core/models/level-three-objective.model";
import {ILevelFourObjective} from "../../strategic-objectives/core/models/level-four-objective.model";
import {IEntity} from "../../entities/core/models/entity.model";
import {IPortfolio} from "../../portfolios/core/models/portfolio.model";
import {IProgram} from "../../programs/core/models/program.model";

@Component({
    selector: 'app-initiative-form',
    templateUrl: './initiative-form.component.html',
    animations: [
        stepper
    ]
})
export class InitiativeFormComponent extends FormBase<IInitiative, InitiativeCommand> implements OnInit, OnDestroy {
    constructor(api: ApiService, private cd: ChangeDetectorRef) {
        super(api);
    }

    protected _url: string = 'initiatives';

    protected initCommand(): void {
        this.command = new InitiativeCommand(this.form);
        this.command.id = this.inputCommand.id;
    }

    public unifiedCode!: FormControl;
    public codeByProgram!: FormControl;
    public name!: FormControl;
    public scope!: FormControl;
    public targetSegment!: FormControl;
    public contributionOnStrategicObjective!: FormControl;
    public plannedStart!: FormControl;
    public plannedFinish!: FormControl;
    public actualStart!: FormControl;
    public actualFinish!: FormControl;
    public requiredCost!: FormControl;
    public capexCode!: FormControl;
    public opexCode!: FormControl;
    public visible!: FormControl;
    public visibleOnDashboard!: FormControl;
    public calculateStatus!: FormControl;
    public fundStatusEnumId!: FormControl;
    public statusEnumId!: FormControl;
    public entityId!: FormControl;
    public programId!: FormControl;
    public portfolioId!: FormControl;
    public levelThreeStrategicObjectiveId!: FormControl;
    public levelFourStrategicObjectiveId!: FormControl;

    public step: number = 1;
    public stepControls: { stepCount: number, controls: FormControl[] }[] = [];
    public showStatus: boolean = false;
    public statusSubscription?: Subscription;

    public statusUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeStatus}`;
    public fundStatusUrl: string = `enum-types?category=${EnumTypeCategory.InitiativeFundStatus}`;
    public levelFourUrl: string = '';

    public currentStatus: IEnumType[] = [];
    public currentFundStatus: IEnumType[] = [];
    public currentLevelThreeObjective: ILevelThreeObjective[] = [];
    public currentLevelFourObjective: ILevelFourObjective[] = [];
    public currentEntity: IEntity[] = [];
    public currentPortfolio: IPortfolio[] = [];
    public currentProgram: IProgram[] = [];

    public ngOnInit(): void {
        this.isDeleteRequest = (this.formAction == FormAction.Delete);

        if (this.formAction === FormAction.Update) {
            this.currentLevelThreeObjective.push(this.inputCommand.levelThreeStrategicObjective);
            if (this.inputCommand.levelFourStrategicObjective) {
                this.currentLevelFourObjective.push(this.inputCommand.levelFourStrategicObjective)
            }
            this.currentEntity.push(this.inputCommand.entity);
            if (this.inputCommand.portfolio) {
                this.currentPortfolio.push(this.inputCommand.portfolio)
            }
            this.currentProgram.push(this.inputCommand.program);
            if (this.inputCommand.status) {
                this.currentStatus.push(this.inputCommand.status);
            }
            this.currentFundStatus.push(this.inputCommand.fundStatus);
            this.showStatus = !this.inputCommand.calculateStatus;
        }

        if (!this.isDeleteRequest) {
            this.unifiedCode = new FormControl(this.inputCommand.unifiedCode, [
                Validators.required, Validators.maxLength(50)
            ]);
            this.codeByProgram = new FormControl(this.inputCommand.codeByProgram, [
                Validators.maxLength(50)
            ]);
            this.name = new FormControl(this.inputCommand.name, [
                Validators.required, Validators.maxLength(255)
            ]);
            this.scope = new FormControl(this.inputCommand.scope, [
                Validators.maxLength(5000)
            ]);
            this.targetSegment = new FormControl(this.inputCommand.targetSegment, [
                Validators.maxLength(5000)
            ]);
            this.contributionOnStrategicObjective = new FormControl(this.inputCommand.contributionOnStrategicObjective, [
                Validators.maxLength(5000)
            ]);
            this.plannedStart = new FormControl(this.getDate(this.inputCommand.plannedStart), [
                Validators.required
            ]);
            this.plannedFinish = new FormControl(this.getDate(this.inputCommand.plannedFinish), [
                Validators.required,
            ]);
            this.actualStart = new FormControl(this.getDate(this.inputCommand.actualStart));
            this.actualFinish = new FormControl(this.getDate(this.inputCommand.actualFinish));
            this.requiredCost = new FormControl(this.inputCommand.requiredCost, [
                Validators.required,
                Validators.min(0),
                Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,5})?$')
            ]);
            this.capexCode = new FormControl(this.inputCommand.capexCode, [
                Validators.maxLength(255),
            ]);
            this.opexCode = new FormControl(this.inputCommand.opexCode, [
                Validators.maxLength(255),
            ]);
            this.visible = new FormControl(this.inputCommand.visible);
            this.visibleOnDashboard = new FormControl(this.inputCommand.visibleOnDashboard);
            this.calculateStatus = new FormControl(this.inputCommand.calculateStatus);
            this.fundStatusEnumId = new FormControl(this.inputCommand.fundStatusEnumId, [
                Validators.required
            ]);
            this.statusEnumId = new FormControl(this.inputCommand.statusEnumId);
            this.entityId = new FormControl(this.inputCommand.entityId, [
                Validators.required
            ]);
            this.programId = new FormControl(this.inputCommand.programId, [
                Validators.required
            ]);
            this.portfolioId = new FormControl(this.inputCommand.portfolioId);
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
                unifiedCode: this.unifiedCode,
                codeByProgram: this.codeByProgram,
                name: this.name,
                scope: this.scope,
                targetSegment: this.targetSegment,
                contributionOnStrategicObjective: this.contributionOnStrategicObjective,
                plannedStart: this.plannedStart,
                plannedFinish: this.plannedFinish,
                actualStart: this.actualStart,
                actualFinish: this.actualFinish,
                requiredCost: this.requiredCost,
                capexCode: this.capexCode,
                opexCode: this.opexCode,
                visible: this.visible,
                visibleOnDashboard: this.visibleOnDashboard,
                calculateStatus: this.calculateStatus,
                fundStatusEnumId: this.fundStatusEnumId,
                statusEnumId: this.statusEnumId,
                entityId: this.entityId,
                programId: this.programId,
                portfolioId: this.portfolioId,
                levelThreeStrategicObjectiveId: this.levelThreeStrategicObjectiveId,
                levelFourStrategicObjectiveId: this.levelFourStrategicObjectiveId
            }, [
                DateValidators.after('plannedFinish', 'plannedStart')
            ]);

            this.stepControls = [
                {
                    stepCount: 1, controls: [
                        this.unifiedCode,
                        this.codeByProgram,
                        this.name,
                        this.scope,
                        this.targetSegment,
                        this.levelThreeStrategicObjectiveId,
                        this.levelFourStrategicObjectiveId,
                        this.contributionOnStrategicObjective
                    ]
                },
                {
                    stepCount: 2, controls: [
                        this.plannedStart,
                        this.plannedFinish,
                        this.actualStart,
                        this.actualFinish,
                        this.entityId,
                        this.portfolioId,
                        this.programId,
                        this.visible,
                        this.visibleOnDashboard,
                        this.calculateStatus,
                        this.statusEnumId
                    ]
                },
                {
                    stepCount: 3, controls: [
                        this.fundStatusEnumId,
                        this.requiredCost,
                        this.capexCode,
                        this.opexCode
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

