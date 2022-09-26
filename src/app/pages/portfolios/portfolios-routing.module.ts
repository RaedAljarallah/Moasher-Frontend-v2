import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortfoliosListComponent} from "./portfolios-list/portfolios-list.component";
import {PortfolioDetailComponent} from "./portfolio-detail/portfolio-detail.component";


const routes: Routes = [
    {
        path: 'portfolios',
        children: [
            { path: '', pathMatch: 'full', component: PortfoliosListComponent, data: { animation: 'portfolioList' }},
            { path: ':id', component: PortfolioDetailComponent, data: { animation: 'portfolioDetail' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortfoliosRoutingModule {
}
