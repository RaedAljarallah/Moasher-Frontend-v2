import {Component, OnInit} from '@angular/core';
import {EnumTypeCategory} from "../../../core/models/data-types/eum-type-category.data-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ITableHeader} from "../../../shared/table/table.component";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styles: []
})
export class SettingsPageComponent implements OnInit {
    public selectedSection: string = 'data';
    public selectedEnumType: EnumTypeCategory = EnumTypeCategory.KPIStatus;
    public dataTableHeader: ITableHeader[] = [
        {value: 'الاسم', classes: 'xl:min-w-[7rem]'},
        {value: 'اللون', classes: 'w-28'},
        {value: '', classes: 'w-full'},
    ];
    public dataTableHeaderWithMetadata: ITableHeader[] = [
        {value: 'الاسم', classes: 'xl:min-w-[7rem]'},
        {value: 'اللون', classes: 'w-28'},
        {value: 'فرق نسبة التقدم', classes:'w-32'},
        {value: '', classes: 'w-full'},
    ];
    constructor(private route: ActivatedRoute, private router: Router) {
    }

    public ngOnInit(): void {
        this.route.queryParamMap.subscribe(param => {
            this.selectedSection = param.get('s') ?? this.selectedSection;
        });
    }

    public async setSection(e: Event, section: string): Promise<void> {
        e.preventDefault();
        this.selectedSection = section;
        await this.router.navigate([], {
            queryParams: {
                s: this.selectedSection,
                category: this.selectedSection === 'data' ? this.selectedEnumType : null
            }
        })
    }

    public async selectEnumType(e: Event, enumType: EnumTypeCategory): Promise<void> {
        e.preventDefault();
        this.selectedEnumType = enumType;
        await this.router.navigate([], {
            queryParams: {
                s: this.selectedSection,
                category: this.selectedEnumType
            }
        })
    }

    public get enumTypeCategory(): typeof EnumTypeCategory {
        return EnumTypeCategory;
    }
}
