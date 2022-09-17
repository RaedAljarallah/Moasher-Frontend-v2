import {IInitiative} from "./initiative.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class InitiativeCommand {
    public id!: string;
    public unifiedCode!: string;
    public codeByProgram!: string;
    public name!: string;
    public scope?: string;
    public targetSegment?: string;
    public contributionOnStrategicObjective?: string;
    public plannedStart!: Date | null;
    public plannedFinish!: Date | null;
    public actualStart?: Date | null;
    public actualFinish?: Date | null;
    public requiredCost!: number;
    public capexCode?: string;
    public opexCode?: string;
    public visible: boolean = true;
    public visibleOnDashboard: boolean = true;
    public calculateStatus: boolean = true;
    public statusEnumId?: string;
    public fundStatusEnumId!: string;
    public entityId!: string;
    public programId!: string;
    public portfolioId?: string;
    public levelThreeStrategicObjectiveId!: string;
    public levelFourStrategicObjectiveId?: string;

    // public fundStatus: EnumType = new EnumType();
    // public status?: EnumType;
    // public entity!: Entity;
    // public program!: Program;
    // public levelThreeStrategicObjective!: LevelThree;
    // public levelFourStrategicObjective?: LevelFour;
    // public portfolio?: Portfolio;
    
    constructor(model: IInitiative | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.unifiedCode = _.get(form.get('unifiedCode'), 'value', null);
            this.codeByProgram = _.get(form.get('codeByProgram'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            this.scope = _.get(form.get('scope'), 'value', null);
            this.targetSegment = _.get(form.get('targetSegment'), 'value', null);
            this.contributionOnStrategicObjective = _.get(form.get('contributionOnStrategicObjective'), 'value', null);
            this.plannedStart = _.get(form.get('plannedStart'), 'value', null);
            this.plannedFinish = _.get(form.get('plannedFinish'), 'value', null);
            this.actualStart = _.get(form.get('actualStart'), 'value', null);
            this.actualFinish = _.get(form.get('actualFinish'), 'value', null);
            this.requiredCost = parseFloat(_.get(form.get('requiredCost'), 'value', null));
            this.capexCode = _.get(form.get('capexCode'), 'value', null);
            this.opexCode = _.get(form.get('opexCode'), 'value', null);
            this.visible = _.get(form.get('visible'), 'value', null);
            this.visibleOnDashboard = _.get(form.get('visibleOnDashboard'), 'value', null);
            this.calculateStatus = _.get(form.get('calculateStatus'), 'value', null);
            this.statusEnumId = _.get(form.get('statusEnumId'), 'value', null);
            this.fundStatusEnumId = _.get(form.get('fundStatusEnumId'), 'value', null);
            this.entityId = _.get(form.get('entityId'), 'value', null);
            this.portfolioId = _.get(form.get('portfolioId'), 'value', null);
            this.programId = _.get(form.get('programId'), 'value', null);
            this.levelThreeStrategicObjectiveId = _.get(form.get('levelThreeStrategicObjectiveId'), 'value', null);
            this.levelFourStrategicObjectiveId = _.get(form.get('levelFourStrategicObjectiveId'), 'value', null);
            return;
        }

        this.id = model.id;
    }
}