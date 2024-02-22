import { Component, Input, OnInit, booleanAttribute } from '@angular/core';

interface Image {
  /** Lower goes first, nullish go last */
  order?: number | null;
  url: string;
  /** If undefined takes title or empty */
  alt?: string;
  /** If undefined takes alt or empty */
  title?: string;
}

@Component({
  selector: 'poke-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  private readonly noImage = '/assets/no_image_available.png';

  @Input() images: Image[] = [];

  @Input() height: string = "";
  @Input() width: string = "";

  @Input() start?: Image | number;

  @Input({transform:booleanAttribute}) rewindToStart: boolean = false;
  @Input({transform:booleanAttribute}) blankOnEmpty: boolean = false;

  selected: number = 0;

  ngOnInit(): void {
    let startIndex;
    switch(typeof this.start) {
      case 'number':
        if(this.start > 0) {
          this.selected = this.start > this.images.length ?
            this.images.length : this.start;
        }
        break;

      case 'object':
        startIndex = this.images.indexOf(this.start);
        if(startIndex > 0) this.selected = startIndex;
        break;
    }

    this.images.sort(this.byOrderNullishLast);
  }

  previous() {

  }

  next() {

  }

  private previousIndex(currentIndex: number) {
    return currentIndex > 0 && currentIndex < this.images?.length;
  }

  private nextIndex(currentIndex: number) {
    return currentIndex > 0 && currentIndex < this.images?.length;
  }

  private byOrderNullishLast(image1: Image, image2: Image) {
    const o = (image: Image) => image.order??Infinity;  // Sets nullish last
    const result = o(image1) - o(image2);               // Lower order has priority
    return isNaN(result)? 0 : result;                   // If both nullish treat these as equal
  }

}
