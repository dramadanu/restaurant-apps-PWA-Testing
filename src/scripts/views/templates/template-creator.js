import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="list_item">
    <img class="list_item_thumb lazyload" crossorigin="anonymous" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" title="${restaurant.name}" />
    <div class="city">${restaurant.city}</div>
    <div class="list_item_content">
      <p class="list_item_rating">
        Rating : 
        <a href="#" class="list_item_rating_value">${restaurant.rating}</a>
      </p>
      <h1 class="list_item_title lazyload"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h1>
      <div class="list_item_desc">${restaurant.description.slice(0, 150)}...</div>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => {
  const {
    name = 'N/A',
    pictureId = '',
    address = 'N/A',
    city = 'N/A',
    rating = 'N/A',
    description = 'N/A',
    categories = [],
    menus = { foods: [], drinks: [] },
    customerReviews = [],
  } = restaurant;

  const imageUrl = pictureId ? `${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}` : 'path/to/default-image.jpg';

  return `
  <div class="restauranyt-detail">
    <div tabindex="0" class="restaurant-container-info">
      <div class="restaurant-img-container">
        <img class="restaurant-image lazyload" crossorigin="anonymous" data-src="${imageUrl}" alt="Image ${name}" tabindex="0"/>
      </div>
      <ul class="restaurant-detail-info">
        <li class="restaurant-name">
          <i title="restaurant"></i>
          <p class="restaurant-name-address-rating">${name}</p>
        </li>
        <li class="restaurant-address">
          <i class="fa fa-building"></i>
          <p class="restaurant-name-address-rating">${address}, ${city}</p>
        </li>
        <li class="restaurant-rating">
          <i title="ratings"></i>
          <p class="restaurant-name-address-rating">&star; ${rating}</p>
        </li>
        <h4>Description:</h4>
        <li><p class="restaurant-description">${description}</p></li>
        <li class="restaurant-categories">${categories.map((category) => `
            <span class="restaurant-category">${category.name}</span>
          `).join('')}
        </li>
      </ul>
    </div>
    <h2 tabindex="0" id="restaurant-menu-title"><span>List Menu</span></h2>
    <div class="restaurant-menu-list">
      <div class="foods">
        <h3>Food</h3>
        <ul class="restaurant-foods">
          ${menus.foods.map((food) => `
            <li><i class="fa fa-cutlery font-decoration"></i> ${food.name}</li>
          `).join('')}
        </ul>
      </div>
      <div class="drinks">
        <h3>Drink</h3>
        <ul class="restaurant-drinks">
          ${menus.drinks.map((drink) => `
            <li><i class="fa fa-coffee font-decoration"></i> ${drink.name}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <h2 tabindex="0" id="restaurant-review-title"><span>Reviews</span></h2>
    <div tabindex="0" class="restaurant-reviews">
      ${customerReviews.map((review) => `
        <div class="restaurant-review-item">
          <div class="restaurant-review-header">
            <p class="reviewer-name"><i title="restaurant" class="fa fa-user-circle" style="font-size:1.3em; padding-right:10px;"></i>${review.name}</p>
            <p class="review-date">${review.date}</p>
          </div>
          <div class="review-body">
            ${review.review}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  `;
};

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
