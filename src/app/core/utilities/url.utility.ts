import {HttpParams} from "@angular/common/http";

export class UrlUtility {
    static getHttpParams(obj: { [k: string]: string }): HttpParams {
        let params: HttpParams = new HttpParams();
        for(let param of Object.keys(obj)) {
            if(obj[param]) {
                params = params.append(param, obj[param]);
            }
        }
        
        return params;
    }
}