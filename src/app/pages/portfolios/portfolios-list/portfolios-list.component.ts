import { Component } from '@angular/core';
import {ListComponentBase} from "../../../core/abstracts/list-component-base";
import {IPortfolio} from "../core/models/portfolio.model";
import {PortfolioCommand} from "../core/models/portfolio.command";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/services/api.service";
import {ModalService} from "../../../shared/modal/modal.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../core/models/response.model";

@Component({
  selector: 'app-portfolios-list',
  templateUrl: './portfolios-list.component.html',
  styles: [
  ]
})
export class PortfoliosListComponent extends ListComponentBase<IPortfolio, PortfolioCommand> {
  constructor(route: ActivatedRoute, router: Router, api: ApiService, modal: ModalService) {
    super(route, router, api, modal);
  }
  protected _modalId: string = 'createPortfolio';
  protected _rootUrl: string = 'portfolios';
  public command: PortfolioCommand = new PortfolioCommand(null);

  protected loadItems(params: HttpParams): Observable<IResponse<IPortfolio[]>> {
    return this.api.get<IPortfolio[]>(this._rootUrl, { params: params });
  }

  protected queryParams: { key: string; defaultValue?: string }[] = [];

}
