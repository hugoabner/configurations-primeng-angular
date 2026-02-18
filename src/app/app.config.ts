import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { EVENT_MANAGER_PLUGINS, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { DebounceEventPlugin } from './core/plugins/debounce-event-plugin';
import MyPreset from './mypreset';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // Habilita el modo zoneless (opcional si es proyecto nuevo v21)
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
      },
    }),
    // provider para HTTP Client usando Fetch API, que es más moderna y eficiente que XMLHttpRequest
    provideHttpClient(withFetch()),
    
    // Registrar el plugin de eventos personalizado para manejar eventos con debounce
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: DebounceEventPlugin,
      multi: true,
    }
  ],
};
