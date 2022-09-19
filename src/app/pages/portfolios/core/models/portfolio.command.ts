import {IPortfolio} from "./portfolio.model";
import {FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {IInitiative} from "../../../initiatives/core/models/initiative.model";

export class PortfolioCommand {
    public id!: string;
    public code!: string;
    public name!: string;
    public initiativeIds: string[] = [];
    
    public relatedInitiatives: IInitiative[] = [];
    
    constructor(model: IPortfolio | FormGroup | null) {
        if (model == null) {
            return;
        }

        if (model instanceof FormGroup) {
            const form = <FormGroup>model;
            this.code = _.get(form.get('code'), 'value', null);
            this.name = _.get(form.get('name'), 'value', null);
            this.initiativeIds = _.get(form.get('initiativeIds'), 'value', null);
            return;
        }

        this.id = model.id;
        this.code = model.code;
        this.name = model.name;
    }
}