import { Component } from '@angular/core';
import { EnvService } from '@services/env.service';
import { RequestData } from './components/request-form/request-form.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'poke-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private response: unknown;

  constructor(
    private env: EnvService,
    private http: HttpClient,
  ) {}

  public get production() {
    return this.env.production;
  }

  public send(data: RequestData) {
    let fullUrl = `${data.url}/${data.endpoint}`;
    if(data.id) {
      fullUrl += `/${data.id}`;
    }

    this.http.get(fullUrl).subscribe({
      next: (response) => {
        this.response = response;
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
