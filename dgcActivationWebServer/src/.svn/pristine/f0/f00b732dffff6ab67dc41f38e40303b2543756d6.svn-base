import { TransactionRequest } from './../models/transaction-request';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PdfService {

    constructor(private http: Http) { }

    private url = 'http://localhost:8084/pdfService/pdf/getPDF/';

    OnInit() {
    }

    showPdf(cardNumber: number) {

        return this.http.get(this.url + cardNumber, { responseType: ResponseContentType.Blob }).map(response => { return new Blob([response.blob()], { type: 'application/pdf' }) });
    }
}