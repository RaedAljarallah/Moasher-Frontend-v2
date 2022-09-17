import {EnumTypeCategory} from "../../../../../core/models/data-types/eum-type-category.data-type";
import {IEnumType} from "./enum-type.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";

export class EnumTypeCommand {
    public id!: string;
    public name!: string;
    public style!: string;
    public category!: string;
    public metadata?: { [key: string]: string };

    constructor(model: IEnumType | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.style = _.get(form.get('style'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            return;
        }

        this.id = model.id;
        this.name = model.name;
        this.style = model.style;
        this.category = model.category;
        this.metadata = model.metadata;
    }

    public setCategory(category: EnumTypeCategory): EnumTypeCommand {
        this.category = category;
        return this;
    }
    
    public setMetadata(form: FormGroup, key: string): void {
        this.metadata = { [key]: _.get(form.get('metadata'), 'value', null) }
    }
}