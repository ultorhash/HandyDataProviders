import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').toLowerCase();
  }
}
