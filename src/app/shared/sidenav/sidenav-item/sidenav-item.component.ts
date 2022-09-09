import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-sidenav-item',
    templateUrl: './sidenav-item.component.html',
    styles: []
})
export class SidenavItemComponent implements OnInit, AfterViewInit {
    @Input() expanded: boolean | null = null;
    @Input() name: string = '';
    @Input() icon: string | null = null;
    @Input() link: string = '#';
    @ViewChild('parent') parent!: ElementRef;
    @ViewChild('popover') popover!: ElementRef;
    
    constructor() {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        const position = this.parent.nativeElement.getBoundingClientRect();
        this.popover.nativeElement.style.top = `${position.top + 10 }px`;
    }
    
    show() {
        if (this.expanded) {
            return;
        }
        this.popover.nativeElement.classList.add('lg:block');
    }
    
    hide() {
        if (this.expanded) {
            return;
        }
        this.popover.nativeElement.classList.remove('lg:block');
    }
}
