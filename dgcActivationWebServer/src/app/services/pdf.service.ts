import { TransactionRequest } from './../models/transaction-request';
import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PdfService {

    constructor(private http: Http) { }

    private url = 'http://localhost:8084/pdfService/pdf/getPDF/';

    OnInit() {
    }

    showPdf(cardNumber: number, languageCode: string) {

        console.log(cardNumber + ' ' + languageCode);
        return this.http.get(this.url + cardNumber + '/' + languageCode, { responseType: ResponseContentType.Blob }).map(response => { return new Blob([response.blob()], { type: 'application/pdf' }) });
    }
}