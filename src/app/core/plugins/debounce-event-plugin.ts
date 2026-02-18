import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, ListenerOptions } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser';
@Injectable()
export class DebounceEventPlugin extends EventManagerPlugin {
  constructor(@Inject(DOCUMENT) document: Document) {
    super(document);
  }

  override supports(eventName: string): boolean {
    return /debounce/.test(eventName);
  }

  /**
   * Gestionar el registro de eventos
   */
  override addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function,
    options?: ListenerOptions,
  ): Function {
    /**
     * Parsear el nombre del evento: e.g., "click.debounce.500"
     * => event: "click", method: "debounce", delay: 500ms
     */
    const [event, method, delay = '300'] = eventName.split('.');

    let timeoutId: ReturnType<typeof setTimeout>;
	const debounceDelay = Number(delay) || 300;

    const listener = (event: Event) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handler(event);
      }, debounceDelay);
    };

    element.addEventListener(event, listener);

    return () => {
      clearTimeout(timeoutId);
      element.removeEventListener(event, listener);
    };
  }
}
