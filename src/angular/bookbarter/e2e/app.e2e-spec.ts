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
    page.getLoginButton().get(2).click();
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
    page.getLoginButton().get(2).click();
    browser.sleep(500);
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(1).click();
    browser.sleep(500);
  });

  it('should register admin user', () => {
    page.navigateTo();
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(1).click();
    browser.sleep(500);
    page.getInput().get(0).sendKeys('admin');
    browser.sleep(500);
    page.getInput().get(1).sendKeys('admin');
    browser.sleep(500);
    page.getInput().get(2).sendKeys('admin');
    browser.sleep(500);
    page.getLoginButton().get(2).click();
    browser.sleep(500);
  });

  it('should login admin user', () => {
    page.navigateTo();
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(0).click();
    page.getInput().get(0).sendKeys('admin');
    browser.sleep(500);
    page.getInput().get(1).sendKeys('admin');
    browser.sleep(500);
    page.getLoginButton().get(2).click();
    browser.sleep(500);
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(1).click();
    browser.sleep(500);
  });

  it('admin should create new book', () => {
    page.navigateTo();
    page.getUserButton().click();
    browser.sleep(500);
    page.getMenuButton().get(0).click();
    page.getInput().get(0).sendKeys('admin');
    browser.sleep(500);
    page.getInput().get(1).sendKeys('admin');
    browser.sleep(500);
    page.getLoginButton().get(2).click();
    browser.sleep(500);
    page.getInput().get(0).sendKeys('Test Book');
    browser.sleep(500);
    page.getInput().get(1).sendKeys('Test Author');
    browser.sleep(500);
    page.getInput().get(2).sendKeys('Test Publisher');
    browser.sleep(500);
    page.getTextArea().get(0).sendKeys('Description of test book');
    browser.sleep(500);
    page.getTextArea().get(1).sendKeys('This is a test Book');
    browser.sleep(500);
    page.getLoginButton().get(2).click();
    browser.sleep(1000);
  });

});
