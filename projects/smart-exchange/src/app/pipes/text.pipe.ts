import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {
  transform(text: string): unknown {
    const separated = text.replace(/([A-Z])/g, ' $1');
    return separated.charAt(0).toUpperCase() + separated.slice(1);
  }
}
