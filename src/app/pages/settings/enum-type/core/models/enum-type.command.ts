import {EnumTypeCategory} from "../../../../../core/models/data-types/eum-type-category.data-type";
import {IEnumType} from "./enum-type.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class EnumTypeCommand {
    public id!: string;
    public name!: string;
    public style!: string;
    public category!: string;
    public limitFrom?: number;
    public limitTo?: number;
    public isDefault: boolean = false;
    constructor(model: IEnumType | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.style = _.get(form.get('style'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            this.limitFrom = parseFloat(_.get(form.get('limitFrom'), 'value', null));
            this.limitTo = parseFloat(_.get(form.get('limitTo'), 'value', null));
            this.isDefault = _.get(form.get('isDefault'), 'value', false);
            return;
        }

        this.id = model.id;
        this.name = model.name;
        this.style = model.style;
        this.category = model.category;
        this.limitFrom = model.limitFrom;
        this.limitTo = model.limitTo;
        this.isDefault = model.isDefault;
    }

    public setCategory(category: EnumTypeCategory): EnumTypeCommand {
        this.category = category;
        return this;
    }
}