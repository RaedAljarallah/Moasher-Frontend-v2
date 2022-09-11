// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {DateValidators} from "../../../shared/validators/date.validators";
// import {stepper} from "../../../shared/animations/app-animations.animation";
// import {Subscription} from "rxjs";
// import {InitiativeCommand} from "../core/models/initiative.command";
// import {FormAction} from "../../../core/models/data-types/form-action.data-type";
// import {FormBase} from "../../../core/abstracts/form-base";
// import {IInitiative} from "../core/models/initiative.model";
//
// @Component({
//     selector: 'app-initiative-form',
//     templateUrl: './initiative-form.component.html',
//     animations: [
//         stepper
//     ]
// })
// export class InitiativeFormComponent extends FormBase<IInitiative, InitiativeCommand> implements OnInit, OnDestroy {
//
//     public unifiedCode!: FormControl;
//     public codeByProgram!: FormControl;
//     public name!: FormControl;
//     public scope!: FormControl;
//     public targetSegment!: FormControl;
//     public contributionOnStrategicObjective!: FormControl;
//     public plannedStart!: FormControl;
//     public plannedFinish!: FormControl;
//     public actualStart!: FormControl;
//     public actualFinish!: FormControl;
//     public requiredCost!: FormControl;
//     public cAPEXCode!: FormControl;
//     public oPEXCode!: FormControl;
//     public visible!: FormControl;
//     public visibleOnDashboard!: FormControl;
//     public calculateStatus!: FormControl;
//     public fundStatusEnumId!: FormControl;
//     public statusEnumId!: FormControl;
//     public entityId!: FormControl;
//     public programId!: FormControl;
//     public portfolioId!: FormControl;
//     public levelThreeStrategicObjectiveId!: FormControl;
//     public levelFourStrategicObjectiveId!: FormControl;
//
//     public step: number = 1;
//     public stepControls: { stepCount: number, controls: FormControl[] }[] = [];
//     public showStatus: boolean = false;
//     public statusSubscription?: Subscription;
//
//
//     public ngOnInit(): void {
//         this.isDeleteRequest = (this.formAction == FormAction.Delete);
//        
//         if (!this.isDeleteRequest) {
//             this.unifiedCode = new FormControl(this.inputCommand.unifiedCode, [
//                 Validators.required, Validators.maxLength(50)
//             ]);
//             this.codeByProgram = new FormControl(this.inputCommand.codeByProgram, [
//                 Validators.required, Validators.maxLength(50)
//             ]);
//             this.name = new FormControl(this.inputCommand.name, [
//                 Validators.required, Validators.maxLength(255)
//             ]);
//             this.scope = new FormControl(this.inputCommand.scope, [
//                 Validators.required, Validators.maxLength(5000)
//             ]);
//             this.targetSegment = new FormControl(this.inputCommand.targetSegment, [
//                 Validators.required, Validators.maxLength(5000)
//             ]);
//             this.contributionOnStrategicObjective = new FormControl(this.inputCommand.contributionOnStrategicObjective, [
//                 Validators.required, Validators.maxLength(5000)
//             ]);
//             this.plannedStart = new FormControl(this.getDate(this.inputCommand.plannedStart), [
//                 Validators.required
//             ]);
//             this.plannedFinish = new FormControl(this.getDate(this.inputCommand.plannedFinish), [
//                 Validators.required,
//             ]);
//             this.actualStart = new FormControl(this.getDate(this.inputCommand.actualStart));
//             this.actualFinish = new FormControl(this.getDate(this.inputCommand.actualFinish), [
//                 //Validators.GraterOrEqual
//             ]);
//             this.requiredCost = new FormControl('', [
//                 Validators.required,
//                 Validators.min(0),
//                 //Validators.number()
//             ]);
//             this.cAPEXCode = new FormControl('', [
//                 Validators.maxLength(255),
//             ]);
//             this.oPEXCode = new FormControl('', [
//                 Validators.maxLength(255),
//             ]);
//             this.visible = new FormControl('');
//             this.visibleOnDashboard = new FormControl('');
//             this.calculateStatus = new FormControl('');
//             this.fundStatusEnumId = new FormControl('', [
//                 Validators.required
//             ]);
//             this.statusEnumId = new FormControl('');
//             this.entityId = new FormControl('', [
//                 Validators.required
//             ]);
//             this.programId = new FormControl('', [
//                 Validators.required
//             ]);
//             this.portfolioId = new FormControl('');
//             this.levelThreeStrategicObjectiveId = new FormControl('', [
//                 Validators.required
//             ]);
//             this.levelFourStrategicObjectiveId = new FormControl('');
//             this.form = new FormGroup({
//                 unifiedCode: this.unifiedCode,
//                 codeByProgram: this.codeByProgram,
//                 name: this.name,
//                 scope: this.scope,
//                 targetSegment: this.targetSegment,
//                 contributionOnStrategicObjective: this.contributionOnStrategicObjective,
//                 plannedStart: this.plannedStart,
//                 plannedFinish: this.plannedFinish,
//                 actualStart: this.actualStart,
//                 actualFinish: this.actualFinish,
//                 requiredCost: this.requiredCost,
//                 cAPEXCode: this.cAPEXCode,
//                 oPEXCode: this.oPEXCode,
//                 visible: this.visible,
//                 visibleOnDashboard: this.visibleOnDashboard,
//                 calculateStatus: this.calculateStatus,
//                 fundStatusEnumId: this.fundStatusEnumId,
//                 statusEnumId: this.statusEnumId,
//                 entityId: this.entityId,
//                 programId: this.programId,
//                 portfolioId: this.portfolioId,
//                 levelThreeStrategicObjectiveId: this.levelThreeStrategicObjectiveId,
//                 levelFourStrategicObjectiveId: this.levelFourStrategicObjectiveId
//             }, [
//                 DateValidators.after('plannedFinish', 'plannedStart')
//             ]);
//
//             this.stepControls = [
//                 {
//                     stepCount: 1, controls: [
//                         this.unifiedCode,
//                         this.codeByProgram,
//                         this.name,
//                         this.scope,
//                         this.targetSegment,
//                         this.levelThreeStrategicObjectiveId,
//                         this.levelFourStrategicObjectiveId,
//                         this.contributionOnStrategicObjective
//                     ]
//                 },
//                 {
//                     stepCount: 2, controls: [
//                         this.plannedStart,
//                         this.plannedFinish,
//                         this.actualStart,
//                         this.actualFinish,
//                         this.entityId,
//                         this.portfolioId,
//                         this.programId,
//                         this.visible,
//                         this.visibleOnDashboard,
//                         this.calculateStatus,
//                         this.statusEnumId
//                     ]
//                 },
//                 {
//                     stepCount: 3, controls: [
//                         this.fundStatusEnumId,
//                         this.requiredCost,
//                         this.cAPEXCode,
//                         this.oPEXCode
//                     ]
//                 }
//             ]
//             this.statusSubscription = this.calculateStatus.valueChanges.subscribe((value: boolean) => {
//                 if (value) {
//                     this.statusEnumId.setValidators(Validators.required);
//                 } else {
//                     this.statusEnumId.clearValidators();
//                     this.statusEnumId.setValue(null);
//                 }
//                 this.showStatus = value;
//             })
//         }
//     }
//
//     public ngOnDestroy(): void {
//         this.statusSubscription?.unsubscribe();
//     }
//    
//     public stepForward() {
//         let stepControls = this.stepControls.find(sc => sc.stepCount === this.step)?.controls;
//         if (!stepControls) {
//             return;
//         }
//        
//         let canMove: boolean = true;
//         for(let control of stepControls) {
//             control.markAsTouched();
//             if (canMove) {
//                 canMove = control.valid;
//             }
//         }
//        
//         if (canMove) {
//             this.step += 1;
//         }
//
//         this.step += 1;
//     }
//
//     public stepBack() {
//         this.step -= 1;
//     }
//
//     private getDate(date: Date | null | undefined) : Date | null {
//         if (date) {
//             return new Date(date);
//         }
//        
//         return null;
//     }
//
//     protected _url: string = 'initiatives';
//
//     protected initCommand(): void {
//         this.command = new InitiativeCommand(null);
//         this.command.id = this.inputCommand.id;
//     }
// }
