import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizeService} from "../../../core/services/authorize.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styles: []
})
export class ResetPasswordComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthorizeService) {
    }

    public async ngOnInit(): Promise<void> {
        const token = this.route.snapshot.queryParamMap.get('token');
        const userId = this.route.snapshot.queryParamMap.get('id');
        if (!token || !userId) {
            await this.router.navigate(['page-not-found']);
        }
        
        await this.authService.resetPassword(token!, userId!);
    }

}
