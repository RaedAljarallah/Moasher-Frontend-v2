import {FormGroup} from "@angular/forms";
import {IUser} from "./user.model";
import * as _ from "lodash";
import {IEntity} from "../../../entities/core/models/entity.model";

export class UserCommand {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phoneNumber!: string;
    public role!: string;
    public entityId!: string;

    public entity!: IEntity;
    public localizedRole!: string;
    constructor(model: IUser | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.firstName = _.get(form.get('firstName'), 'value', null);
            this.lastName = _.get(form.get('lastName'), 'value', null);
            this.email = _.get(form.get('email'), 'value', null);
            this.phoneNumber = _.get(form.get('phoneNumber'), 'value', null);
            this.role = _.get(form.get('role'), 'value', null);
            this.entityId = _.get(form.get('entityId'), 'value', null);
            return;
        }
        
        this.id = model.id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.email = model.email;
        this.phoneNumber = model.phoneNumber;
        this.role = model.role;
    }
}