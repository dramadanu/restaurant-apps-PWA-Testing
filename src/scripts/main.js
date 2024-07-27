/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
import Swal from 'sweetalert2';

async function main() {
  const baseUrl = 'https://restaurant-api.dicoding.dev';

  const getData = async () => {
    try {
      const response = await fetch(`${baseUrl}/list`);
      const responseJson = await response.json();
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderAllDatas(responseJson);
      }
    } catch (error) {
      showResponseMessage(error.message);
    }
  };

  const renderAllDatas = (jsonData) => {
    const { restaurants } = jsonData;
    let dataList = '';
    restaurants.forEach((data) => {
      dataList += `
        <div class="list_item">
          <img class="list_item_thumb" src="${`https://restaurant-api.dicoding.dev/images/medium/${['pictureId']}`}" alt="${data.name}" title="${data.name}">
          <div class="city">${data.city}</div>
          <div class="list_item_content">
            <p class="list_item_rating">
              Rating : 
              <a href="#" class="list_item_rating_value">${data.rating}</a>
            </p>
            <h1 class="list_item_title"><a href="#">${data.name}</a></h1>
            <div class="list_item_desc">${data.description.slice(0, 150)}...</div>
          </div>
        </div>
      `;
    });
    document.querySelector('#tes').innerHTML = dataList;
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    Swal.fire(message);
  };

  document.addEventListener('DOMContentLoaded', () => {
    getData();
  });
}

export default main;
