import { AuthenticationResponse } from './../models/authentication-response';
import { AuthenticationRequest } from './../models/authentication-request';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    private url = 'http://localhost:8083/voucherService/voucher/validateActivationLink';

    constructor(private http: Http) { }

    validateActivationLink(authRequest: AuthenticationRequest) {

        return this.http.post(this.url, authRequest).map(response => <AuthenticationResponse>response.json());
    }
}