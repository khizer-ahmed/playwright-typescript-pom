import { BasePage } from "./BasePage";

interface Data {
  first_name: string;
  last_name : string;
  email : string;
  gender: string
  mobile: string
  dob : string;
  subjects : string;
  hobbies: string;
  address : string;
  state: string,
  city: string
}

export class FormsPage extends BasePage {

  private list_item = 'xpath=//span[@class="text" and text()="PLACEHOLDER"]/parent::li';
  private input_first_name = 'xpath=//input[@id="firstName"]';
  private input_last_name = 'xpath=//input[@id="lastName"]';
  private input_email = 'xpath=//input[@id="userEmail"]';
  private input_gender = 'xpath=//input[@name="gender" and @value="PLACEHOLDER"]/parent::div';
  private input_mobile = 'xpath=//input[@id="userNumber"]';
  private input_dob = 'xpath=//input[@id="dateOfBirthInput"]';
  private input_subjects = 'xpath=//input[@id="subjectsInput"]';
  private input_hobbies = 'xpath=//label[text()="PLACEHOLDER"]/parent::div';
  private input_file = 'xpath=//input[@id="uploadPicture"]';
  private input_address = 'xpath=//textarea[@id="currentAddress"]';
  private input_state = 'xpath=(//div[@id="state"]//following::input)[1]';
  private input_city = 'xpath=(//div[@id="city"]//following::input)[1]';
  private table_data_row = 'xpath=//tbody';
  
  async clickOn(item: string){
    await this.click(this.list_item.replace('PLACEHOLDER', item));
  }

  async submitRegistrationForm(data: Data, file_path){
     await this.type(this.input_first_name,data.first_name)
     await this.type(this.input_last_name,data.last_name)
     await this.type(this.input_email,data.email)
     this.input_gender = this.input_gender.replace('PLACEHOLDER', data.gender)
     await this.click(this.input_gender)
     await this.type(this.input_mobile,data.mobile)
     await this.fill(this.input_dob,data.dob)
     await this.pressKey("Enter")
     await this.fill(this.input_subjects,data.subjects)
     await this.pressKey("Enter")
     this.input_hobbies = this.input_hobbies.replace('PLACEHOLDER', data.hobbies)
     await this.click(this.input_hobbies)
     await this.uploadFile(this.input_file,file_path)
     await this.fill(this.input_address,data.address)
     await this.fill(this.input_state,data.state)
     await this.pressKey("Enter")
     await this.fill(this.input_city,data.city)
     await this.pressKey("Enter")
     await this.pressKey("Tab")
     await this.pressKey("Enter")
  }

  async getFormData(): Promise<Array<string>> {
    const data =  await this.all_inner_text(this.table_data_row);
    const modifiedData = data.map(item => item.split('\t')[1]);
    return modifiedData;
  }

}