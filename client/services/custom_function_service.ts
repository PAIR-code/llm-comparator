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

// tslint:disable:no-new-decorators
import {CustomFuncReturnType, CustomFunction, CustomFuncType, Example,} from '../lib/types';
import {extractTextFromTextOrSequenceChunks} from '../lib/utils';

import {Service} from './service';

/**
 * Service for executing custom functions and related.
 */
export class CustomFunctionService extends Service {
  // Use regular expression to find matches in output_text.
  // If the return type is number, count the pattern.
  private executeCustomFunctionRegExp(
      outputText: string,
      expression: string,
      returnType: CustomFuncReturnType,
      ): boolean|number {
    if (returnType === CustomFuncReturnType.NUMBER) {
      // Occurrence.
      const regExp = new RegExp(expression, 'g');
      const matches = outputText.match(regExp);
      return matches != null ? matches.length : 0;
    } else {
      // Existence.
      const regExp = new RegExp(expression);
      const matches = outputText.match(regExp);
      return matches != null ? true : false;
    }
  }

  executeCustomFunction(
      outputText: string,
      example: Example,
      customFunc: CustomFunction,
      ): boolean|number|undefined|null {
    if (customFunc.functionType === CustomFuncType.REGEXP) {
      return this.executeCustomFunctionRegExp(
          outputText,
          customFunc.functionBody,
          customFunc.returnType,
      );
    } else {
      console.warning(
          `Unsupported custom function type: ${customFunc.functionType}`
      );
      return;
    }
  }
}
