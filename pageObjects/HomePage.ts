import { BasePage, testData } from "./BasePage";
import { ElementsPage } from "./ElementsPage";
import { FormsPage } from "./FormsPage";
import { WidgetsPage } from "./WidgetsPage";
import { InteractionsPage } from "./InteractionsPage";

export class HomePage extends BasePage {
 
  private logo1 = 'xpath=(//div[@class="card-body"])[1]/h5' ;
  private logo = 'xpath=//header/a';
  private element_card = '//div[@class="card-body"]/h5[text()="Elements"]';
  private forms_card = '//div[@class="card-body"]/h5[text()="Forms"]';
  private widgets_card = '//div[@class="card-body"]/h5[text()="Widgets"]';
  private interactions_card = '//div[@class="card-body"]/h5[text()="Interactions"]';

   async getLogoText(): Promise<string>{
    return await this.inner_text(this.logo1);
  }

  async getLogoHref(): Promise<null|string>{
    return await this.getAttributeValue(this.logo,'href');
  }
  
  async gotoFormsPage(): Promise<FormsPage>{
    await this.click(this.forms_card);
    return new FormsPage(this.page);
  }

  async gotoElementsPage(): Promise<ElementsPage>{
    await this.click(this.element_card);
    return new ElementsPage(this.page);
  }

  async gotoWidgetsPage(): Promise<WidgetsPage>{
    await this.click(this.widgets_card);
    return new WidgetsPage(this.page);
  }

  async gotoInteractionsPage(): Promise<InteractionsPage>{
    await this.click(this.interactions_card);
    return new InteractionsPage(this.page);
  }
  
  async open(){
    await this.goToUrl(testData.baseUrl);
  }

  async clickLogo(){
    return await this.click(this.logo)
  }

}