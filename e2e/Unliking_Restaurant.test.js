/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked menu restaurant', ({ I }) => {
  I.dontSeeElement('.list_item');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/');
  I.waitForElement('.list_item_title a', 30);
  I.seeElement('.list_item_title a');

  const firstResto = locate('.list_item_title a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  console.log(`First restaurant name: ${firstRestoName}`); // Logging
  I.click(firstResto);

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  console.log('Clicked like button'); // Logging

  I.amOnPage('/#/favorite');
  I.waitForElement('.list_item_title a', 30);
  const unlikedRestoName = await I.grabTextFrom('.list_item_title a');
  assert.strictEqual(firstRestoName, unlikedRestoName);

  // Ensure the element is fully visible and not obstructed
  I.scrollTo('.list_item_title a');
  I.executeScript((locator) => {
    document.querySelector(locator).click();
  }, '.list_item_title a');

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  console.log('Clicked unlike button'); // Logging

  // Wait for the element to be removed
  I.wait(5); // Wait 5 seconds
  I.amOnPage('/#/favorite');
  I.dontSeeElement('.list_item');
});
