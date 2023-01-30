## Angular
Angular will also by default automatically escape any values before rendering them. 

*View*
```html
<div>
  <h1>{{title}}</h1>
  <input type="text" #box (keyup)="getValue(box.value)">
  <h2>{{userInput}}</h2>
</div>
```

*Component*
```js
export class AppComponent {
  title = 'Angular XSS';
  userInput: string = "";
  getValue(val:string){
    this.userInput = val
  }
}
```

**Vulnerability 1) innerHtml & Dom Sanitizer**
We can use the `innerHtml` flag to tell Angular to not sanitize input:
```html
<div>
  <h1>{{title}}</h1>
  <input type="text" #box (keyup)="getValue(box.value)">
  <h2 [innerHtml]="userInput"></h2>
</div>
```

This will result in an attacker being able to perform HTML injection, but not XSS. Angular has protections inplace to sanitize malicious input in `innerHtml` is in use.
![[Pasted image 20230130113817.png]]
 To get XSS, the developer will need to also add the `bypassSecurityTrustScript` method and change the input type to `SafeScript`
```js
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class AppComponent {
  title = 'Angular XSS';
  userInput: SafeHtml = "";

  constructor(protected sanitizer: DomSanitizer) {}

  getValue(val:any){
    this.userInput = this.sanitizer.bypassSecurityTrustHtml(val)
  }
}
```

**Other**
- The default testing port for Angular Applications is port 4200

