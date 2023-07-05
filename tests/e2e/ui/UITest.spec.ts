import { test, expect } from '@playwright/test';
import { Helper } from '../../../util/helper';
import { ElementsPage } from '../../../pageObjects/ElementsPage';
import { HomePage } from "../../../pageObjects/HomePage";

test.describe('TC01 - Verify user can enter new data and edit a row in the table', () => {
  let elementPage: ElementsPage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    elementPage = await homePage.gotoElementsPage();
    await elementPage.clickOn('Web Tables');
  });

  test('Scenario A - Verify user can enter new data into the table', async () => {
    const data = {
      first_name: "Alden",
      last_name: "Cantrell",
      age: "30",
      email: "test@test.com",
      salary: "12345",
      department: "QA"
    };
    await elementPage.enterDataIntoTable(data);
    const newRecord = await elementPage.getRecord(data.email);
    expect(newRecord[0]).toEqual(data.first_name);
    expect(newRecord[1]).toEqual(data.last_name);
    expect(newRecord[2]).toEqual(data.age);
    expect(newRecord[3]).toEqual(data.email);
    expect(newRecord[4]).toEqual(data.salary);
    expect(newRecord[5]).toEqual(data.department);
  });

  test('Scenario B - Verify user can edit the row in a table', async () => {
    const data = {
      first_name: "Gerimedica",
      last_name: "BV",
      age: "45",
      email: "alden@example.com",
      salary: "12000",
      department: "Compliance"
    };
    await elementPage.updateData('Alden',data);
    const newRecord = await elementPage.getRecord(data.first_name);
    expect(newRecord[0]).toEqual(data.first_name);
    expect(newRecord[1]).toEqual(data.last_name);
  });
});

test('TC02 - Verify broken image', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.open();
  const elementPage = await homePage.gotoElementsPage();
  await elementPage.clickOn('Broken Links - Images');
  expect(await elementPage.checkbrokenImage()).toEqual(true);
});

test('TC03 - Verify user can submit the form', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.open();
  const formsPage = await homePage.gotoFormsPage();
  await formsPage.clickOn('Practice Form');
  const data = {
    first_name: "Gerimedica",
    last_name: "BV",
    email: "test@test.com",
    gender: "Male",
    mobile: "0123456789",
    dob: "15 Jan 1990",
    subjects: "Maths",
    hobbies: "Reading",
    address: "Netherlands",
    state: "NCR",
    city: "Delhi"
  };
  const file_path = 'toolssqa.jpg'
  await formsPage.submitRegistrationForm(data,file_path);
  const submittedData = await formsPage.getFormData();
  expect(submittedData[0]).toEqual(data.first_name + " " + data.last_name);
  expect(submittedData[1]).toEqual(data.email);
  expect(submittedData[2]).toEqual(data.gender);
  expect(submittedData[3]).toEqual(data.mobile);
  expect(Helper.convertDateFormat(submittedData[4])).toEqual(data.dob);
  expect(submittedData[5]).toEqual(data.subjects);
  expect(submittedData[6]).toEqual(data.hobbies);
  expect(submittedData[7]).toEqual(file_path);
  expect(submittedData[8]).toEqual(data.address);
  expect(submittedData[9]).toEqual(data.state + " " + data.city);
});

test('TC04 - Verify the progress bar', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.open();
  const widgetsPage = await homePage.gotoWidgetsPage();
  await widgetsPage.clickOn('Progress Bar');
  await widgetsPage.startStopProgressBar();
  expect(await widgetsPage.isProgessBarComplete()).toEqual(true);
  expect(await widgetsPage.getProgressBarValue()).toEqual('100%');
});

test('TC05 - Verify the tooltip', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.open();
  const widgetsPage = await homePage.gotoWidgetsPage();
  await widgetsPage.clickOn('Tool Tips');
  await widgetsPage.hoverOnToolTip();
  expect(await widgetsPage.getToolTip()).toContain("You hovered over the Button");
});

test('TC06 - Verify user can drag and drop', async ({page}) => {
  const homePage = new HomePage(page);
  await homePage.open();
  const interactionPages = await homePage.gotoInteractionsPage();
  await interactionPages.clickOn('Droppable');
  await interactionPages.dragMeElementToDropHere();
  const rgb = await interactionPages.getBgColorDropHereElement()
  const bg_color = Helper.rgbToHex(rgb);
  // color code of steelblue color is #4682b4
  expect(bg_color).toEqual('#4682b4');
});
