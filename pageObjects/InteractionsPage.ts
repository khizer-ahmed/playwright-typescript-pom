import { BasePage } from "./BasePage";

export class InteractionsPage extends BasePage {

  private list_item = 'xpath=//span[@class="text" and text()="PLACEHOLDER"]/parent::li';
  private drag_me_element = 'xpath=//div[@id="draggable"]';
  private drop_here_element = 'xpath=(//div[@id="droppable"])[1]';
  
  async clickOn(item: string){
    await this.click(this.list_item.replace('PLACEHOLDER', item));
  }

  async dragMeElementToDropHere(){
    await this.dragAndDrop(this.drag_me_element,this.drop_here_element);
  }

 async getBgColorDropHereElement(): Promise<string>{
    return await this.getCssValue(this.drop_here_element,'background-color')
  }

}