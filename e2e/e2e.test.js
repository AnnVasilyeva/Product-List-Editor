import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('Popover', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 250,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should add editor-form to the page', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-product-update');
    button.click();
    await page.waitForSelector('.editor-form');
    const form = await page.$('.editor-form');
    const input = await form.$('.editor-form-input-cost');
    // фокусируемся в поле и очищаем его
    await input.focus();
    await input.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    // меняем значение на 0
    await input.type('0');
    const submit = await form.$('.editor-form-btn_save');
    submit.click();
    await page.waitForSelector('.editor-form-input-cost.error');
  });

  test('should open modal window to the page', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-product-delete');
    button.click();
    await page.waitForSelector('.modal-window.active');
  });

  test('should add .error class for input', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-product-creator');
    button.click();
    await page.waitForSelector('.create-form');
    const form = await page.$('.create-form');
    const input = await form.$('.create-form-input-name');
    await input.type('');
    const submit = await form.$('.create-form-btn_save');
    submit.click();
    await page.waitForSelector('.create-form-input-name.error');
  });
});
