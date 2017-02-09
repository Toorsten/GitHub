import { TransactionResponse } from './../models/transaction-response';
import { TransactionRequest } from './../models/transaction-request';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {

  private url = 'http://81.221.33.116:8080/gcws-rest/services/GatewayService/doTrans';

  constructor(private http: Http) { }


  getTransId(transactionRequest: TransactionRequest) {

    return this.http.post(this.url, transactionRequest).map(response => <TransactionResponse>response.json());
  }

  getBalance(transactionRequest: TransactionRequest) {

    return this.http.post(this.url, transactionRequest).map(response => <TransactionResponse>response.json());
  }

  doActivation(transactionRequest: TransactionRequest) {

    return this.http.post(this.url, transactionRequest).map(response => response.json());
  }

}
