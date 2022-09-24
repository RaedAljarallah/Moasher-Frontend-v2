import {IEnumType} from "../../../../settings/enum-type/core/models/enum-type.model";
import {FormGroup} from "@angular/forms";
import {ITeam} from "./team.model";
import * as _ from "lodash";

export class TeamCommand {
    public id!: string;
    public name!: string;
    public email!: string;
    public phone!: string;
    public roleEnumId!: string;
    public initiativeId!: string;
    
    public role!: IEnumType;

    constructor(model: ITeam | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.name = _.get(form.get('name'), 'value', null);
            this.email = _.get(form.get('email'), 'value', null);
            this.phone = _.get(form.get('phone'), 'value', null);
            this.roleEnumId = _.get(form.get('roleEnumId'), 'value', null);
            this.initiativeId = _.get(form.get('initiativeId'), 'value', null);
            return;
        }

        this.id = model.id;
        this.initiativeId = model.initiativeId;
    }

    public setInitiativeId(id: string): TeamCommand {
        this.initiativeId = id;
        return this;
    }
    
}