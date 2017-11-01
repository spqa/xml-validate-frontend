import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string, args?: any): any {
    if (value) {
      const str = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
      return this.sanitizer.bypassSecurityTrustHtml(str);
    }
    return null;
  }

}
