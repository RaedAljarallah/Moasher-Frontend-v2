import {Frequency} from "../../../../core/models/data-types/frequency.data-type";
import {Polarity} from "../../../../core/models/data-types/polarity.data-type";
import {ValidationStatus} from "../../../../core/models/data-types/validation-status.data-type";
import {IEnumType} from "../../../settings/enum-type/core/models/enum-type.model";
import {IEntity} from "../../../entities/core/models/entity.model";
import {ILevelThreeObjective} from "../../../strategic-objectives/core/models/level-three-objective.model";
import {ILevelFourObjective} from "../../../strategic-objectives/core/models/level-four-objective.model";
import {FormGroup} from "@angular/forms";
import {IKpi} from "./kpi.model";
import * as _ from "lodash";

export class KpiCommand {
    public id!: string;
    public code!: string;
    public name!: string;
    public ownerName!: string;
    public ownerEmail!: string;
    public ownerPhoneNumber!: string;
    public ownerPosition?: string;
    public description!: string;
    public frequency!: Frequency;
    public polarity!: Polarity;
    public validationStatus!: ValidationStatus;
    public startDate!: Date | null;
    public endDate!: Date | null;
    public measurementUnit!: string;
    public formula?: string;
    public dataSource?: string;
    public baselineValue?: number;
    public baselineYear?: number;
    public visible: boolean = true;
    public visibleOnDashboard: boolean = true;
    public calculateStatus: boolean = true;
    public statusEnumId?: string;
    public entityId!: string;
    public levelThreeStrategicObjectiveId!: string;
    public levelFourStrategicObjectiveId?: string;

    public status?: IEnumType;
    public entity!: IEntity;
    public levelThreeStrategicObjective!: ILevelThreeObjective;
    public levelFourStrategicObjective?: ILevelFourObjective;

    constructor(model: IKpi | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.code = _.get(form.get('code'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            this.ownerName = _.get(form.get('ownerName'), 'value', null);
            this.ownerEmail = _.get(form.get('ownerEmail'), 'value', null);
            this.ownerPosition = _.get(form.get('ownerPosition'), 'value', null);
            this.ownerPhoneNumber = _.get(form.get('ownerPhoneNumber'), 'value', null);
            this.frequency = _.get(form.get('frequency'), 'value', null);
            this.polarity = _.get(form.get('polarity'), 'value', null);
            this.validationStatus = _.get(form.get('validationStatus'), 'value', null);
            this.startDate = _.get(form.get('startDate'), 'value', null);
            this.endDate = _.get(form.get('endDate'), 'value', null);
            this.formula = _.get(form.get('formula'), 'value', null);
            this.baselineValue = parseFloat(_.get(form.get('baselineValue'), 'value', null));
            this.baselineYear = parseInt(_.get(form.get('baselineYear'), 'value', null));
            this.measurementUnit = _.get(form.get('measurementUnit'), 'value', null);
            this.dataSource = _.get(form.get('dataSource'), 'value', null);
            this.description = _.get(form.get('description'), 'value', null);
            this.visible = _.get(form.get('visible'), 'value', null);
            this.visibleOnDashboard = _.get(form.get('visibleOnDashboard'), 'value', null);
            this.calculateStatus = _.get(form.get('calculateStatus'), 'value', null);
            this.statusEnumId = _.get(form.get('statusEnumId'), 'value', null);
            this.entityId = _.get(form.get('entityId'), 'value', null);
            this.levelThreeStrategicObjectiveId = _.get(form.get('levelThreeStrategicObjectiveId'), 'value', null);
            this.levelFourStrategicObjectiveId = _.get(form.get('levelFourStrategicObjectiveId'), 'value', null);
            return;
        }

        this.id = model.id;
    }
}