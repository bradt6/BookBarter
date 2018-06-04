import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getUserButton() {
    return element(by.id('userBtn'));
  }

  getMenuButton() {
    return element.all(by.css('.menu-button'));
  }

  getInput() {
    return element.all(by.css('input'));
  }

  getLoginButton() {
    return element(by.css('button'));
  }
}
