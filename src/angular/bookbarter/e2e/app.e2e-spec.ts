import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('bookbarter App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should register new user', () => {
    page.navigateTo();
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(1).click();
    browser.sleep(500);
    page.getInput().get(0).sendKeys('TestUser');
    browser.sleep(500);
    page.getInput().get(1).sendKeys('test');
    browser.sleep(500);
    page.getInput().get(2).sendKeys('test');
    browser.sleep(500);
    page.getLoginButton().click();
    browser.sleep(500);
  });

  it('should login existing user', () => {
    page.navigateTo();
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(0).click();
    page.getInput().get(0).sendKeys('TestUser');
    browser.sleep(500);
    page.getInput().get(1).sendKeys('test');
    browser.sleep(500);
    page.getLoginButton().click();
    browser.sleep(500);
  });
});
