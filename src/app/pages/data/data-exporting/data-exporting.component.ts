import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {saveAs} from "file-saver";
import {finalize} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";

@Component({
    selector: 'app-data-exporting',
    templateUrl: './data-exporting.component.html',
    styles: []
})
export class DataExportingComponent implements OnInit {
    public isExportingLoading: boolean = false;
    public includeEntities: boolean = false;
    public includeObjectives: boolean = false;
    public includePrograms: boolean = false;
    public includeKpis: boolean = false;
    public includeKpiValues: boolean = false;
    public includeKpiAnalytics: boolean = false;
    public includeInitiatives: boolean = false;
    public includeMilestones: boolean = false;
    public includeDeliverables: boolean = false;
    public includeApprovedCosts: boolean = false;
    public includeBudgets: boolean = false;
    public includeContracts: boolean = false;
    public includeProjects: boolean = false;
    public includeExpenditures: boolean = false;
    public includeIssues: boolean = false;
    public includeRisks: boolean = false;
    public includeTeams: boolean = false;
    public includeInitiativeAnalytics: boolean = false;
    
    constructor(private api: ApiService) {
    }

    ngOnInit(): void {
    }
    
    public kpisChanged(): void {
        if (!this.includeKpis) {
            this.includeKpiValues = false;
            this.includeKpiAnalytics = false;
        }
    }
    
    public initiativesChanged(): void {
        if (!this.includeInitiatives) {
            this.includeMilestones = false;
            this.includeDeliverables = false;
            this.includeApprovedCosts = false;
            this.includeBudgets = false;
            this.includeContracts = false;
            this.includeProjects = false;
            this.includeExpenditures = false;
            this.includeIssues = false;
            this.includeRisks = false;
            this.includeTeams = false;
            this.includeInitiativeAnalytics = false;
        }
    }
    
    public exporting(): void {
        this.isExportingLoading = true;
        let observables: Observable<any>[] = [];
        if (this.includeEntities) {
            observables.push(this.api.downloadFile('entities/export'));
        }
        
        if (this.includeObjectives) {
            observables.push(this.api.downloadFile('strategic-objectives/export'));
        }
        
        if (this.includePrograms) {
            observables.push(this.api.downloadFile('programs/export'));
        }
        
        if (this.includeKpis) {
            observables.push(this.api.downloadFile('kpis/export'));
        }
        
        if (this.includeKpiValues) {
            observables.push(this.api.downloadFile('kpi-values/export'));
        }
        
        if (this.includeKpiAnalytics) {
            observables.push(this.api.downloadFile('analytics/export?model=kpis'));
        }
        
        if (this.includeInitiatives) {
            observables.push(this.api.downloadFile('initiatives/export'));
        }
        
        if (this.includeMilestones) {
            observables.push(this.api.downloadFile('milestones/export'));
        }
        
        if (this.includeDeliverables) {
            observables.push(this.api.downloadFile('deliverables/export'));
        }
        
        if (this.includeApprovedCosts) {
            observables.push(this.api.downloadFile('approved-costs/export'));
        }
        
        if (this.includeBudgets) {
            observables.push(this.api.downloadFile('budgets/export'));
        }
        
        if (this.includeContracts) {
            observables.push(this.api.downloadFile('contracts/export'));
        }
        
        if (this.includeProjects) {
            observables.push(this.api.downloadFile('projects/export'));
        }
        
        if (this.includeExpenditures) {
            observables.push(this.api.downloadFile('expenditures/export'));
        }
        
        if (this.includeIssues) {
            observables.push(this.api.downloadFile('issues/export'));
        }
        
        if (this.includeRisks) {
            observables.push(this.api.downloadFile('risks/export'));
        }
        
        if (this.includeTeams) {
            observables.push(this.api.downloadFile('initiative-teams/export'));
        }
        
        if (this.includeInitiativeAnalytics) {
            observables.push(this.api.downloadFile('analytics/export?model=initiatives'));
        }
        
        forkJoin(observables).pipe(finalize(() => this.isExportingLoading = false))
            .subscribe(responses => {
                responses.forEach(res => {
                    let filename = res.headers.get('Content-Disposition')?.split(';')[1].split('=')[1];
                    saveAs(res.body as Blob, filename);
                })
            });
    }
}
