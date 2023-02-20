import View from './view.js';
import icons from 'url:../../img/icons.svg';

class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'There is no search results. Please try agian.';
  _message = '';

  _generateMarkUp() {
    return this._data.map(this._generateMarkUpPreview).join('');
  }

  _generateMarkUpPreview(data) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${data.id}">
          <figure class="preview__fig">
            <img src="${data.image}" alt="${data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new resultView();
