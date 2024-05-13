/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Constructor} from './lib/types';
import {CustomFunctionService} from './services/custom_function_service';
import {Service} from './services/service';
import {AppState} from './services/state_service';

/**
 * The class responsible for building and managing the app.
 */
export class Core {
  constructor() {
    this.buildServices();
  }

  async initialize() {
    const appState = this.getService(AppState);

    appState.initialize();
  }

  private buildServices() {
    const customFunctionService = new CustomFunctionService();
    const appState = new AppState(customFunctionService);

    this.services.set(CustomFunctionService, customFunctionService);
    this.services.set(AppState, appState);
  }

  private readonly services = new Map<Constructor<Service>, Service>();

  getService<T extends Service>(t: Constructor<T>): T {
    const service = this.services.get(t);
    if (service === undefined) {
      throw new Error(`Service is undefined: ${t.name}`);
    }
    return service as T;
  }
}

// tslint:disable-next-line:enforce-comments-on-exported-symbols
export const core = new Core();
