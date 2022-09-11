import {IStrategicObjectiveBase} from "./strategic-objective-base.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class StrategicObjectiveCommand {
    public id!: string;
    public code!: string;
    public name!: string;
    public hierarchyId!: string;
    public level!: number;
    
    constructor(model: IStrategicObjectiveBase | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.code = _.get(form.get('code'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            this.hierarchyId = `/${this.code?.replace('.', '/')}/`;
            return;
        }

        this.id = model.id;
        this.code = model.code;
        this.name = model.name;
        this.hierarchyId = model.hierarchyId;
        this.level = model.level;
    }

    public mapToLevel(level: number, id: string): StrategicObjectiveCommand {
        this.level = level;
        this.id = id;
        return this;
    }
}