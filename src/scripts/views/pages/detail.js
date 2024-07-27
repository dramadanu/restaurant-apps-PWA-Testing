import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div tabindex="0" class="main">
        <div class="like" id="likeButtonContainer"></div>
        <h2 tabindex="0" class="explore-restaurant__label">Detail Restaurant</h2>
        <section id="detail-rest"></section>
      </div>
      <div class="form-review">
        <form>
          <div class="mb-3"> 
            <label for="inputName" class="form-label">Name</label>
            <input name="inputName" type="text" class="form-control" id="inputName">
          </div>
          <div class="mb-3">
            <label for="inputReview" class="form-label">Review</label>
            <input name="inputReview" type="text" class="form-control" id="inputReview">
          </div>
          <button id="submit-review" type="submit" class="btn">Submit</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#detail-rest');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    // Handle review submission
    document.getElementById('submit-review').addEventListener('click', async (event) => {
      event.preventDefault();
      const name = document.getElementById('inputName').value;
      const review = document.getElementById('inputReview').value;
      if (name && review) {
        await RestaurantSource.addReview({
          id: url.id,
          name,
          review,
        });
        Swal.fire('Review submitted!');
        // Optionally, you can reload the reviews section here.
      } else {
        Swal.fire('Please fill out all fields.');
      }
    });
  },
};

export default Detail;
