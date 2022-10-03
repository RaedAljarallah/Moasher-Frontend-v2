import {
    AfterViewInit, ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output, QueryList,
    ViewChildren
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

export interface ITab {
    id: string,
    value: string
}

export interface IDetailPageState {
    [key: string]: any
}

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, AfterViewInit {
    @Input() state: IDetailPageState | undefined;
    @Input() notFound: boolean = false;
    @Input() tabs: ITab[] = [];
    @Input() selectedTab: string = ''; // selectedTab
    @Input() titleKey: string = 'name';
    @Input() editBtnLoading: boolean = false;
    @Input() returnUrl?: string;
    @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() selectedTabChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChildren('tabsList') tabsList: QueryList<ElementRef> = new QueryList<ElementRef>();

    private currentTabIndex: number = 0;
    private currentTabSlideMargin: number = 0;
    private readonly fixedTabMargin: number = 20 // this number is based on the space-x and the mr on <ul> element
    public tabSlideMargin: string = '';
    public showTabsSlider: boolean = false;
    
    constructor(private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.currentTabIndex = (this.selectedTab.length > 0)
            ? this.tabs.findIndex(t => t.id === this.selectedTab)
            : 0;
    }

    public ngAfterViewInit(): void {
        this.tabsList.changes.subscribe(tabs => {
            if (tabs.length == this.tabs.length) {
                this.calculateTabsSliderStatus();
            }
        })
    }
    
    public calculateTabsSliderStatus() {
        let el = document.getElementById('tabsContainer');
        this.showTabsSlider = el!.scrollWidth > el!.clientWidth;

        if (this.showTabsSlider) {
            this.getTranslateMargin(this.currentTabIndex);
        } else {
            this.tabSlideMargin = 'translateX(0px)';
        }
        
        this.cd.detectChanges();
    }
    
    public async select(e: Event, tab: ITab): Promise<void> {
        e.preventDefault();
        if (tab.id === this.selectedTab) return;
        this.selectedTab = tab.id;
        this.getTranslateMargin(this.tabs.findIndex(t => t.id === tab.id));
        this.selectedTabChange.emit(this.selectedTab);
        await this.router.navigate([], {
            queryParams: {
                s: this.selectedTab
            }
        })
    }
    
    public get showBtn(): boolean {
        return true;
    }
    
    public async back(e?: Event): Promise<void> {
        e?.preventDefault();
        if (this.returnUrl) {
            await this.router.navigateByUrl(this.returnUrl); 
        } else {
            await this.router.navigate(['.'], { relativeTo: this.route.parent });
        }
    }
    
    public nextTab() {
        if(this.currentTabIndex === this.tabs.length - 1 || !this.showTabsSlider) return;
        
        const currentTab = this.tabs[this.currentTabIndex];
        const el = document.getElementById(`tab-${currentTab.id}`);
        this.currentTabSlideMargin += (el?.offsetWidth ?? 0) + this.fixedTabMargin;
        this.tabSlideMargin = `translateX(${this.currentTabSlideMargin}px)`;
        this.currentTabIndex += 1;
    }
    
    public previousTab() {
        if (this.currentTabIndex === 0 || !this.showTabsSlider) return;
        
        const previousTab = this.tabs[this.currentTabIndex - 1];
        const el = document.getElementById(`tab-${previousTab.id}`);
        this.currentTabSlideMargin -= (el?.offsetWidth ?? 0) + this.fixedTabMargin;
        this.tabSlideMargin = `translateX(${this.currentTabSlideMargin}px)`;
        this.currentTabIndex -= 1;
    }
    
    public updateTitle(title: string) {
        this.state![this.titleKey] = title;
    }
    
    private getTranslateMargin(index: number) {
        if (!this.showTabsSlider) return;
        
        this.currentTabIndex = index;
        this.currentTabSlideMargin = 0;
        for(let i = index - 1; i >= 0; i--) {
            let tab = this.tabs[i];
            let el = document.getElementById(`tab-${tab.id}`);
            this.currentTabSlideMargin += (el?.offsetWidth ?? 0) + this.fixedTabMargin;
        }
        this.tabSlideMargin = `translateX(${this.currentTabSlideMargin}px)`;
    }
    
}
