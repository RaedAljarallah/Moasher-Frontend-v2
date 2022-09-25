import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[appLoadingBtn]'
})
export class LoadingBtnDirective implements AfterViewInit {
    private _isLoading: boolean = false;
    private _innerHTML: string = '';

    @Input() set isLoading(value: boolean) {
        this._isLoading = value;
        this.toggleSpinner();
    }

    constructor(private el: ElementRef) {
    }

    public ngAfterViewInit() {
        this._innerHTML = `<span class="loading-btn-text">${this.el.nativeElement.innerHTML}</span>`;
        this.el.nativeElement.classList.add('relative');
        this.el.nativeElement.innerHTML = this._innerHTML;
    }

    private toggleSpinner(): void {
        const innerText = this.el.nativeElement.querySelector('.loading-btn-text');
        if (innerText) {
            if (this._isLoading) {
                innerText.classList.add('invisible');
                innerText.classList.add('opacity-0');
                this.el.nativeElement.insertAdjacentHTML('beforeend',
                    `<span class="absolute w-6 h-6 inset-0 m-auto border-4 border-theme-gray-300 border-t-white rounded-full animate-spin"></span>`);
                
                return;
            }
            innerText.classList.remove('invisible');
            innerText.classList.remove('opacity-0');
            this.el.nativeElement.innerHTML = this._innerHTML;
        }
    }
}
