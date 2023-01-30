import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular XSS';
  userInput: SafeHtml = "";

  constructor(protected sanitizer: DomSanitizer) {}

  getValue(val:any){
    this.userInput = this.sanitizer.bypassSecurityTrustHtml(val)
  }
}
