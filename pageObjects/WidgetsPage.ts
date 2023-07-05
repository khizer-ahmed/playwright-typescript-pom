import { BasePage } from "./BasePage";

export class WidgetsPage extends BasePage {

  private list_item = 'xpath=//span[@class="text" and text()="PLACEHOLDER"]/parent::li';
  private start_stop_btn = 'xpath=//button[@id="startStopButton"]';
  private reset_btn = 'xpath=//button[@id="resetButton"]';
  private progress_bar = 'xpath=//div[@id="progressBar"]/div';
  private tool_tip_btn = 'xpath=//button[@id="toolTipButton"]';
  private hover_tool_tip = 'xpath=//div[@role="tooltip"and @id="buttonToolTip"]';

  async clickOn(item: string){
    await this.click(this.list_item.replace('PLACEHOLDER', item));
  }

  async startStopProgressBar(){
    await this.click(this.start_stop_btn);
  }

  async isProgessBarComplete(): Promise<boolean>{
    return await this.isElementPresent(this.reset_btn);
  }

  async getProgressBarValue(): Promise<string>{
    return await this.inner_text(this.progress_bar);
  }

  async hoverOnToolTip(){
    await this.hover(this.tool_tip_btn);
  }

  async getToolTip(): Promise<Array<string>>{
    return await this.all_inner_text(this.hover_tool_tip);
  }
}