import { test, expect } from '@playwright/test';
import { BasePage, testData} from "../../../pageObjects/BasePage";

test.describe('API Happy Flows', () => {
  let basePage: BasePage;
  var userID: string;
  var token: string;
  
  const user_payload = {
    "userName": testData.api_user,
    "password": testData.api_password
  };
  const isbn_1 = testData.api_book_no[0];
  const isbn_2 = testData.api_book_no[1];

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test.afterAll(async () => {
    let auth = {
      'Authorization': 'Bearer ' + token,
    }
    let res = await basePage.delete('/Account/v1/User/'+userID,{},auth)
  });

  test('TC08 - Creation of user account', async ({}) => {
    let res = await basePage.post('/Account/v1/User',user_payload)
    expect(res.ok()).toEqual(true);
    let result = await res.json()
    expect(typeof result.userID).toBe('string');
    expect(result.username).toEqual(user_payload.userName);
    userID = result.userID
  });

  test('TC09 - Add a list of books', async ({}) => {
    //Authorize the created user
    let res = await basePage.post('/Account/v1/GenerateToken',user_payload)
    expect(res.ok()).toEqual(true);
    let result = await res.json()
    expect(typeof result.token).toBe('string');
    token = result.token
    expect(result.status).toEqual('Success');
    expect(result.result).toEqual('User authorized successfully.');
    let book_payload = {
      "userId": userID,
      "collectionOfIsbns": [
        {
          "isbn": isbn_1
        },
        {
          "isbn": isbn_2
        }
      ]
    }
    var auth = {
      'Authorization': 'Bearer ' + token,
    }
    res = await basePage.post('/BookStore/v1/Books',book_payload, auth)
    expect(res.ok()).toEqual(true);
    result = await res.json()
    expect(typeof result.books).toBe('object');
    expect(result.books[0].isbn).toEqual(isbn_1);
    expect(result.books[1].isbn).toEqual(isbn_2);
  });

  test('TC10 - Remove one of the added books', async ({}) => {
    let book_payload = {
      "userId": userID,
      "isbn": isbn_1
    }
    var auth = {
      'Authorization': 'Bearer ' + token,
    }
    let res = await basePage.delete('/BookStore/v1/Book',book_payload, auth)
    expect(res.ok()).toEqual(true);
  });
});

test.describe('API Un-Happy Flows', () => {
  let basePage: BasePage;
  var userID: string = 'invalid-user-id';
  
  const invalid_user_payload = {
    "userName": "",
    "password": ""
  };
  const isbn_1 = testData.api_book_no[0];
  const isbn_2 = testData.api_book_no[1];

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('TC08 - Creation of user account invalid data', async ({}) => {
    let res = await basePage.post('/Account/v1/User',invalid_user_payload)
    expect(res.status()).toEqual(400);
    let result = await res.json()
    expect(result.code).toEqual("1200");
    expect(result.message).toEqual("UserName and Password required.");
  });

  test('TC09 - Add a list of books without authentication', async ({}) => {
    let book_payload = {
      "userId": userID,
      "collectionOfIsbns": [
        {
          "isbn": isbn_1
        },
        {
          "isbn": isbn_2
        }
      ]
    }
    let res = await basePage.post('/BookStore/v1/Books',book_payload)
    expect(res.status()).toEqual(401);
    let result = await res.json()
    expect(result.code).toEqual("1200");
    expect(result.message).toEqual("User not authorized!");
  });

  test('TC10 - Remove one of the added books without authentication', async ({}) => {
    let book_payload = {
      "userId": userID,
      "isbn": isbn_1
    }
    let res = await basePage.delete('/BookStore/v1/Book',book_payload)
    expect(res.status()).toEqual(401);
    let result = await res.json()
    expect(result.code).toEqual("1200");
    expect(result.message).toEqual("User not authorized!");
  });
});
