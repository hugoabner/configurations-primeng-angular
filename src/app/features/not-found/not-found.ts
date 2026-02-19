import { Component, Inject, Optional, RESPONSE_INIT } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  constructor(@Optional() @Inject(RESPONSE_INIT) private response: any) {
    if (this.response) {
      this.response.status(404); // Establece el status 404 real en el servidor
    }
  }
}
