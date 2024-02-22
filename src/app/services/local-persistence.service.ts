import { Inject, Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Logger } from '@models/logger';

/**
 * Wrapper class of localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class LocalPersistenceService {

  private itemsCache: { [reference: string]: unknown } = {};

  persistItem<Item>(itemReference: string, item: Item): boolean {
    if(this.env.localCache) {
      this.itemsCache[itemReference] = item;
      const stringifiedItem: string = JSON.stringify(item);
      localStorage.setItem(itemReference, stringifiedItem);
      this.logger.info.info('LocalPersistenceService', `Persisted item: ${itemReference}`);
    }
    return this.env.localCache;
  }

  readItem<Item>(itemReference: string): Item | null | Record<string,never> {
    let item = null;
    if(this.env.localCache) {
      item = (this.itemsCache[itemReference] as Item)??
        (JSON.parse(localStorage.getItem(itemReference)??'{}') as Item)??
        {};
    }
    return item;
  }

  removeItem(itemReference: string) {
    localStorage.removeItem(itemReference);
    delete this.itemsCache[itemReference];
    this.logger.info.info(itemReference, 'Cleared');
  }

  clearStorage() {
    localStorage.clear();
    this.itemsCache = {};
  }

  constructor(
    private env: EnvService,
    @Inject(Logger) private logger: Logger,
  ) {
    this.logger.info.info('LocalPersistence', this.env.localCache ? 'Enabled' : 'Disabled');
  }
}
