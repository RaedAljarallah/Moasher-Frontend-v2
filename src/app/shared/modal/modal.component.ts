import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ModalService} from "./modal.service";
import {container, fadeIn, slideDown, zoomOut} from "../animations/app-animations.animation";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    animations: [
        slideDown,
        fadeIn,
        zoomOut,
        container
    ]
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() modalId = "";
    @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'fit' = 'fit';
    @Input() staticBackdrop: boolean = true;
    @ViewChild('modalContainer') modalContainer!: ElementRef;
    
    public showBody: boolean = false;
    public animate: boolean = true;
    
    constructor(public modal: ModalService, public el: ElementRef) {
    }

    ngOnInit(): void {

        // we move the modal component to the body to insure that 
        // the modal does not get the parent css style
        document.body.appendChild(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        document.body.removeChild(this.el.nativeElement);
    }

    public toggleBody() {
        this.showBody = !this.showBody;
    }
    
    public closeModal() {
        if (this.staticBackdrop) {
            this.modalContainer.nativeElement.classList.toggle('animate-shake');
            setTimeout(() => {
                this.modalContainer.nativeElement.classList.remove('animate-shake');
            }, 1000)
            return;
        }
        
        this.modal.close(this.modalId, false);
    }
}
