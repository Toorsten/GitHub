import { Response } from '@angular/http';
import { PdfService } from './../../services/pdf.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  providers: [PdfService]
})
export class PdfViewerComponent implements OnInit {

  private pdf: Blob;


  constructor(private pdfService: PdfService) { }

  ngOnInit() {
  }

   load(cardNumber: number) {

    this.pdfService.showPdf(cardNumber).subscribe(
      response => { 
        console.log(response);
        var fileUrl = URL.createObjectURL(response);
        console.log(fileUrl);
        window.open(fileUrl);
      },
      error => console.log(error),
      () => console.log('done')
    );
  }
}