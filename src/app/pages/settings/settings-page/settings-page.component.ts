import {Component, OnInit} from '@angular/core';
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styles: []
})
export class SettingsPageComponent implements OnInit {
    public selectedSection: string = 'data';
    public selectedEnumType: EnumTypeCategory = EnumTypeCategory.KPIStatus;
    constructor() {
    }

    public ngOnInit(): void {
    }
    
    public setSection(e: Event, section: string): void {
        e.preventDefault();
        this.selectedSection = section;
    }
    
    public selectEnumType(e: Event, enumType: EnumTypeCategory): void {
        e.preventDefault();
        this.selectedEnumType = enumType;
    }
    
    public get enumTypeCategory(): typeof EnumTypeCategory {
        return EnumTypeCategory;
    }
}
