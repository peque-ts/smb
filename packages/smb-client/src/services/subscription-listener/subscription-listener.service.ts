import { Injectable } from '@pequehq/di';

import { Listener } from '../../models';

@Injectable()
export class SubscribeListenerService {
  #subscriptions = new Map<string, Listener[]>();

  set(pattern: string, listener: Listener): void {
    const subscriptions = this.#subscriptions.get(pattern) || [];
    subscriptions.push(listener);
    this.#subscriptions.set(pattern, subscriptions);
  }

  unset(pattern: string): void {
    this.#subscriptions.delete(pattern);
  }

  find(topic: string): Listener[] {
    const listeners: Listener[] = [];
    for (const key of this.#subscriptions.keys()) {
      if (new RegExp(key).test(topic)) {
        const values = [...new Set<Listener>(this.#subscriptions.get(key))];
        listeners.push(...values);
      }
    }

    return listeners;
  }

  clear(): void {
    this.#subscriptions.clear();
  }
}
