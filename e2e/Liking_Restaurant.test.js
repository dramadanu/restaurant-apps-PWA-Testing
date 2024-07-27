const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', async ({ I }) => {
  I.dontSee('.list_item');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada favorite restaurant yang ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/#/');

  I.waitForElement('.list_item_title a', 5);
  I.seeElement('.list_item_title a');
  const firstResto = locate('.list_item_title a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  const likedRestoName = await I.grabTextFrom('.list_item_title');
  assert.strictEqual(firstRestoName, likedRestoName);
});
