import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(text: string, eachWord: boolean = false): string {
    let capitalizedText: string;

    if(eachWord) {
      capitalizedText = text.split(' ')
        .map((word) => this.transform(word, false))
        .join();
    } else {
      capitalizedText = text.length > 1 ?
      text.charAt(0).toUpperCase()+text.substring(1).toLowerCase() :
      text.toUpperCase();
    }

    return capitalizedText;
  }

}
