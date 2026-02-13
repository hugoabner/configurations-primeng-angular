import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('control-de-procesos');

  constructor() {
    // server log
    console.log('Inicializando la aplicación desde en servidor:', this.title());
    // client log
    // console.log('Inicializando la aplicación desde el cliente:', this.title());
    // prerender log
    // console.log('Inicializando la aplicación desde prerender:', this.title());
  }
}
