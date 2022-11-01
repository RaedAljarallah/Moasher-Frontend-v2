import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-data-exporting',
    templateUrl: './data-exporting.component.html',
    styles: []
})
export class DataExportingComponent implements OnInit {
    public isExportingLoading: boolean = true;
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
    constructor() {
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
        
    }
}
