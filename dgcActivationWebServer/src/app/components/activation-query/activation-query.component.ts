import { Language } from './../../models/language';
import { TranslateService } from './../../translate/translate.service';
import { PdfService } from './../../services/pdf.service';
import { AuthenticationResponse } from './../../models/authentication-response';
import { AuthenticationRequest } from './../../models/authentication-request';
import { AuthenticationService } from './../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TransactionResponse } from './../../models/transaction-response';
import { TransactionRequest } from './../../models/transaction-request';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation-query',
  templateUrl: './activation-query.component.html',
  providers: [TransactionService, AuthenticationService, PdfService]
})
export class ActivationQueryComponent implements OnInit {

  authRequest: AuthenticationRequest;
  authResponse: AuthenticationResponse;
  transactionRequest: TransactionRequest;
  transactionResponse: TransactionResponse;
  output: string = '';
  token: string;
  languageCode: string;
  isPrintable: boolean = false;

  constructor(private transactionService: TransactionService, private authenticationService: AuthenticationService, private pdfService: PdfService, private route: ActivatedRoute) {

    this.token = route.snapshot.params['token'];
  }

  ngOnInit() {
  }

  onSubmit(token, cardPin, language) {

    this.languageCode = language;
    this.authentificate(token, cardPin);
  }

  authentificate(token: string, cardPin: number) {

    this.authRequest = new AuthenticationRequest();
    this.authRequest.token = token;
    this.authRequest.cardPin = cardPin;

    this.authenticationService.validateActivationLink(this.authRequest).subscribe(
      response => this.authResponse = response,
      error => this.output = 'Error: ' + error,
      () => {
        if (this.authResponse.statusCode = 200)
          this.activate(this.authResponse.cardNumber);
        else
          this.output = 'Error: ' + this.authResponse.statusMsg;
      }
    );
  }

  activate(cardNumber: number) {

    this.transactionRequest = new TransactionRequest();
    this.transactionRequest.transTypeId = 1;
    this.transactionRequest.cardId = cardNumber;

    this.transactionService.getTransId(this.transactionRequest).subscribe(
      response => this.transactionResponse = response,
      error => this.output = 'Error: ' + error,
      () => {
        if (this.transactionResponse.statusCode > 0)
          this.output = 'Error: ' + this.transactionResponse.statusMsg;
        else {
          this.transactionRequest.transTypeId = 37;
          this.transactionRequest.transId = this.transactionResponse.transId;
          this.transactionService.doActivation(this.transactionRequest).subscribe(
            response => this.transactionResponse = response,
            error => this.output = 'Error: ' + error,
            () => {
              if (this.transactionResponse.statusCode = 0)
                this.showPdf(this.transactionResponse.cardNumber);
              else if (this.transactionResponse.statusCode = 62)
                this.showPdf(cardNumber);
              else
                this.output = 'Error: ' + this.transactionResponse.statusMsg;
            }
          );
        }
      },
    );
  }

  showPdf(cardNumber: number) {


    this.pdfService.showPdf(cardNumber, this.languageCode).subscribe(
      response => {
        console.log(response);
        var fileUrl = URL.createObjectURL(response);
        window.open(fileUrl);
      },
      error => this.output = 'Error: ' + ' ' + error,
      () => console.log('done')
    );
  }
}

