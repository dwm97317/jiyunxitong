/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewType } from '../types';

class NavigationService {
    private stack: ViewType[] = ['home'];

    navigate(view: ViewType) {
        if (this.stack[this.stack.length - 1] !== view) {
            this.stack.push(view);
        }
    }

    back(): ViewType {
        if (this.stack.length > 1) {
            this.stack.pop();
        }
        return this.stack[this.stack.length - 1];
    }

    getCurrentView(): ViewType {
        return this.stack[this.stack.length - 1];
    }

    reset(view: ViewType = 'home') {
        this.stack = [view];
    }
}

export const navigationService = new NavigationService();
