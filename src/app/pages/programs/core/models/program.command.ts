import {IProgram} from "./program.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class ProgramCommand {
    public id!: string;
    public code!: string;
    public name!: string;
    constructor(model: IProgram | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.code = _.get(form.get('code'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            return;
        }

        this.id = model.id;
        this.code = model.code;
        this.name = model.name;
    }
}