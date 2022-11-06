import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicationPaths, UserManagerSetting} from "../../../core/constants/api-authorization.constants";
import {AuthorizeService} from "../../../core/services/authorize.service";
import {ApiService} from "../../../core/services/api.service";

@Component({
    selector: 'app-activation',
    templateUrl: './activation.component.html',
    styles: []
})
export class ActivationComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthorizeService, private api: ApiService) {
    }

    public async ngOnInit(): Promise<void> {
        const token = this.route.snapshot.queryParamMap.get('token');
        const userId = this.route.snapshot.queryParamMap.get('id');
        if (!token || !userId) {
            await this.router.navigate(['page-not-found']);
        }

        this.api.post<{ userId: string, token: string }, boolean>('users/verify-activation-token', {
            userId: userId!,
            token: token!
        }).subscribe(res => {
            if (res.result) {
                this.authService.activateUser(userId!);
            } else {
                this.router.navigate(['page-not-found']);
            }
        });
    }

}
