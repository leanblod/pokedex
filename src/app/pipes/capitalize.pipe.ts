import { Pipe, PipeTransform } from '@angular/core';

export type CapitalizationType = 'word' | 'line' | 'text' | 'none';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(text: string | null | undefined, by: CapitalizationType = 'text'): string {
    let capitalizedText: string;
    text = text??'';
    const splitBy = {
      word: ' ' ,
      line: '\n',
    };

    switch(by) {
      case 'word':
        capitalizedText = text.split(splitBy.word)
        .map((word) => this.transform(word, 'line'))
        .join(splitBy.word);
        break; // Fallthrought not allowed by tsconfig

      case 'line':
        capitalizedText = text.split(splitBy.line)
        .map((line) => this.transform(line, 'text'))
        .join(splitBy.line);
        break;

      case 'text':
        capitalizedText = text.length > 1 ?
        text.charAt(0).toUpperCase()+text.substring(1).toLowerCase() :
        text.toUpperCase();
        break;

      case 'none':
        capitalizedText = text;
        break;

      default:
        throw new Error("Capitalization discrimination not supported");
    }

    return capitalizedText;
  }

}
