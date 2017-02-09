import { TransactionResponse } from './../../models/transaction-response';
import { TransactionRequest } from './../../models/transaction-request';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-query',
  templateUrl: './balance-query.component.html',
  providers: [TransactionService]
})
export class BalanceQueryComponent implements OnInit {

  transactionRequest: TransactionRequest;
  transactionResponse: TransactionResponse;
  output: string = '';

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {

  }

  onSubmit(cardId, cardPin) {

    this.transactionRequest = new TransactionRequest();
    this.transactionRequest.transTypeId = 3;
    this.transactionRequest.cardId = cardId;
    this.transactionRequest.cardPin = cardPin;

    this.transactionResponse = new TransactionResponse();

    this.transactionService.getBalance(this.transactionRequest).subscribe(
      data => this.transactionResponse = data,
      error => alert('Error: ' + error.toString()),
      () => {
        if (this.transactionResponse.statusCode > 0)
          this.output = 'Fehlermeldung: ' + this.transactionResponse.statusMsg;
        else
          this.output = 'Aktuelles Guthaben: ' + this.transactionResponse.amount + ' ' + this.transactionResponse.unitName
      }
    );
  }
}
