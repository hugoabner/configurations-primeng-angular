import { DebounceEventPlugin } from './debounce-event-plugin';

describe('DebounceEventPlugin', () => {
  it('should create an instance', () => {
    expect(new DebounceEventPlugin(document)).toBeTruthy();
  });
});
