/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TitleBarComponent } from './title-bar.component';

describe('Component: TitleBar', () => {
  it('should create an instance', () => {
    let component = new TitleBarComponent();
    expect(component).toBeTruthy();
  });

  it('should have as title \'Cake Order Form 2\'',
     inject([TitleBarComponent], (app: TitleBarComponent) => {
       expect(app.title).toEqual('app works!');
     }));
});
