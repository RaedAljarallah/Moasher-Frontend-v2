import {Injectable} from '@angular/core';

interface IModal {
    id: string;
    visible: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modals: IModal[] = [];

    constructor() {
    }

    public isModalOpen(id: string): boolean {
        return this.modals.find(modal => modal.id === id)?.visible ?? false;
    }
    
    public open(id: string) {
        this.toggleModal(id);
    }
    
    
    public close(id: string, staticBackdrop: boolean) {
        if (staticBackdrop) return;
        this.toggleModal(id);
    }
    
    public register(id: string): void {
        this.modals.push({
            id: id,
            visible: false
        });
    }

    public unregister(id: string): void {
        this.modals = this.modals.filter(modal => modal.id !== id);
    }

    private toggleModal(id: string): void {
        const modal = this.modals.find(modal => modal.id === id);
        if (modal) {
            modal.visible = !modal.visible;
        }
    }
}
