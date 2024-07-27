import RestaurantSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Restaurant = {
  async render() {
    return `
      <main id="mainContent">
      <div class="hero" id="hero">
 
       
        <div class="heroinner">
            <h1 class="herotitle">Banana Rasa Pisang</h1>
            <p class="herosubtitle">Menyediakan berbagai menu Seafood, makanan ayam, dan pisang bakar rasa pisang.</p>
        </div>
      </div>
      <section class="content">
          <div class="latest">
              <h1 class="content__heading" style="
              background-color: rgba(255, 255, 255, 0.15);
              backdrop-filter: blur(12px);
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
              padding: 2px 30px;
              border-radius: 15px;
              ">Explore Restaurant</h1>
              <div class="list" id="tes"></div>
          </div>
      </section>
    </main>
        `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();
    console.log(restaurants);
    const restaurantContainer = document.querySelector('.list');

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Restaurant;
