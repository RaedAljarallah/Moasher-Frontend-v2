import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styles: []
})
export class ActivationComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    public async ngOnInit(): Promise<void> {
        const token = this.route.snapshot.queryParamMap.get('token');
        const userId = this.route.snapshot.queryParamMap.get('id');
        if (!token || !userId) {
            await this.router.navigate(['page-not-found']);
        }
    }

}
