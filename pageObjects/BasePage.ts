import { APIResponse, Page} from "@playwright/test";
import playwright from 'playwright';

export class BasePage {
        protected page: Page;
        protected req: Promise<playwright.APIRequestContext>;

        constructor(page: Page) {
        this.page = page;
        this.req = playwright.request.newContext({
            baseURL: testData.baseUrl
        });
        }

    async click(locator: string) {
        await this.page.click(locator);
    }

    async hover(locator: string) {
        await this.page.hover(locator);
    }

    async goToUrl(url: string) {
        await this.page.goto(url, { waitUntil: 'load' });
    }

    async type(locator: string, text: string) {
        await this.click(locator);
        await this.page.locator(locator).clear();
        await this.page.type(locator, text);
    }

    async fill(locator: string, text: string) {
        await this.page.fill(locator, text);
    }

    async isElementPresent(locator: string, options?): Promise<boolean> {
        try {
        await this.page.waitForSelector(locator, options={timeout:30000});
        return true;
        } catch (error) {
        if (error instanceof playwright.errors.TimeoutError) {
            return false;
        }
        throw error;
        }
    }

    async inner_text(locator: string): Promise<string> {
        await this.page.waitForSelector(locator)
        return await this.page.innerText(locator);
    }

    async all_inner_text(locator: string): Promise<Array<string>> {
        await this.page.waitForSelector(locator)
        const text = await this.page.locator(locator).allInnerTexts();
        return text[0].split('\n');
    }

    async getAttributeValue(locator: string, name: string): Promise<null|string> {
        await this.page.waitForSelector(locator)
        return await this.page.locator(locator).getAttribute(name);
    }

    async pressKey(key: string) {
        await this.page.keyboard.press(key);
    }

    async isBrokenImage(locator: string): Promise<boolean>{
        const imageElementHandle  = await this.page.locator(locator);
        const naturalWidthHandle = await imageElementHandle.evaluateHandle((element) => element.naturalWidth);
        const isBroken = await naturalWidthHandle.jsonValue() == 0 ? true : false;
        return isBroken;
    }

    async uploadFile(locator: string, file: string){
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.locator(locator).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(file);
    }

    async dragAndDrop(drag_locator: string, drop_locator: string){
        await this.page.locator(drag_locator).dragTo(this.page.locator(drop_locator));
    }

    async getCssValue(locator: string, attribute: string): Promise<string>{
        const element = await this.page.locator(locator);
        return element.evaluate( (el, attribute) => window.getComputedStyle(el).getPropertyValue(attribute), attribute);
    }

    async post(path: string, payload?: object, auth?: any): Promise<APIResponse>{
        const req = await this.req
        const res = await req.post(path, {
            data: payload,
            headers : auth
        })
        return res
    }

    async delete(path: string, payload?: object, auth?: any): Promise<APIResponse>{
        const req = await this.req
        const res = await req.delete(path, {
            data: payload,
            headers : auth
        })
        return res
    }
}

export const testData = {
    baseUrl: 'https://demoqa.com',
    api_user: 'testUser',
    api_password: 'TestUser1$',
    api_book_no:['9781449331818','9781593277574']
}