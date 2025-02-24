import { Component, OnInit } from '@angular/core';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css'],
})
export class QrScannerComponent implements OnInit {
  qrResult: string | null = null; // Holds the scanned QR code result
  private codeReader: BrowserMultiFormatReader;
  private controls: IScannerControls | null = null; // Scanner controls to stop the scanner

  constructor(private router: Router) {
    this.codeReader = new BrowserMultiFormatReader(); // Initialize the QR code reader
  }

  ngOnInit(): void {
    this.startScanner(); // Start the scanner when the component initializes
  }

  // Start the QR code scanner
  startScanner() {
    this.codeReader
      .decodeFromVideoDevice(undefined, 'video', (result, err) => {
        if (result) {
          this.qrResult = result.getText(); // Extract QR code result
          console.log(`QR Code Result: ${this.qrResult}`);
          this.navigateToPage(this.qrResult); // Navigate based on the QR code result
        }
        if (err) {
          console.error(err); // Log any errors that occur during scanning
        }
      })
      .then((controls) => {
        this.controls = controls; // Store the scanner controls for stopping later
      })
      .catch((err) => console.error('Error initializing scanner:', err));
  }

  // Stop the QR code scanner
  stopScanner() {
    if (this.controls) {
      this.controls.stop(); // Stop the video stream
      this.controls = null; // Clear the scanner controls
      console.log('Scanner stopped.');
    }
  }

  // Navigate to a page based on the QR code result
  navigateToPage(data: string) {
    if (data === 'target') {
      // Navigate to the specific route if the QR code contains "target-page"
      this.router.navigate(['target']);
      this.stopScanner();
    }
    else if(data==='target1'){
      this.router.navigate(['target1']);
      this.stopScanner();
    } else {
      console.log('Scanned data does not match any route. Scanned Data:', data);
    }
  }
}
