import { BasePage } from "./BasePage";

interface Data {
  first_name: string;
  last_name : string;
  age : string;
  email : string;
  salary : string;
  department : string;
}

export class ElementsPage extends BasePage {

  private list_item = 'xpath=//span[@class="text" and text()="PLACEHOLDER"]/parent::li';
  private add_web_table_btn = 'xpath=//button[@id="addNewRecordButton"]';
  private submit_btn = 'xpath=//button[@id="submit"]';
  private input_first_name = 'xpath=//input[@id="firstName"]';
  private input_last_name = 'xpath=//input[@id="lastName"]';
  private input_email = 'xpath=//input[@id="userEmail"]';
  private input_age = 'xpath=//input[@id="age"]';
  private input_salary = 'xpath=//input[@id="salary"]';
  private input_department = 'xpath=//input[@id="department"]';
  private table_data_row = 'xpath=//div[text()="PLACEHOLDER"]/parent::div';
  private table_data_edit = 'xpath=//div[text()="PLACEHOLDER"]//parent::div//child::span[@title="Edit"]';
  private broken_image = 'xpath=//p[text()="Broken image"]/following-sibling::img';
  
  async clickOn(item: string){
    await this.click(this.list_item.replace('PLACEHOLDER', item));
  }

  async enterDataIntoTable(data: Data){
     await this.click(this.add_web_table_btn)
     await this.type(this.input_first_name,data.first_name)
     await this.type(this.input_last_name,data.last_name)
     await this.type(this.input_email,data.email)
     await this.type(this.input_age,data.age)
     await this.type(this.input_salary,data.salary)
     await this.type(this.input_department,data.department)
     await this.click(this.submit_btn)
  }

  async updateData(record,data: Data){
    await this.click(this.table_data_edit.replace('PLACEHOLDER',record));
    await this.type(this.input_first_name,data.first_name)
    await this.type(this.input_last_name,data.last_name)
    await this.click(this.submit_btn)
 }

  async getRecord(data: string): Promise<Array<string>> {
    return await this.all_inner_text(this.table_data_row.replace('PLACEHOLDER', data));
  }

  async checkbrokenImage(): Promise<Boolean> {
    return await this.isBrokenImage(this.broken_image);
  }

}