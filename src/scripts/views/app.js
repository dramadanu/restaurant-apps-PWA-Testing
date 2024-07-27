import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this._content.innerHTML = await page.render();
    await page.afterRender();

    const mainContent = document.querySelector('#mainContent');
    const skipLink = document.querySelector('.skip-link');
    const hero = document.querySelector('#hero');

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.scrollIntoView({ behavior: 'smooth' });
      skipLink.blur();
    });

    // Check if hero element exists before accessing style
    if (hero) {
      if (url !== '/') {
        hero.style.display = 'none';
      } else {
        hero.style.display = 'block';
      }
    } else {
      console.warn('Hero element not found.');
      // Handle gracefully if hero element is not found
    }
  }
}

export default App;
