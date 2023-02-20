import View from './view.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  nextPage = document.querySelector('.pagination__btn--next');
  prevPage = document.querySelector('.pagination__btn--prev');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      if ([...btn.classList].includes('pagination__btn--next')) {
        handler('next');
      }
      if ([...btn.classList].includes('pagination__btn--prev')) {
        handler('prev');
      }
    });
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPages
    );
    // 1. page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      // console.log('page 1, there are other pages');
      return this._genNextPage(curPage);
    }

    // 2. last page
    if (curPage === numPages && numPages > 1) {
      // console.log('last page');
      return this._genPrevPage(curPage);
    }
    // 3. other page
    if (curPage > 1 && curPage < numPages) {
      // console.log('other page');
      return this._genPrevPage(curPage) + this._genNextPage(curPage);
    }
    // 4. page 1, there are NO other page
    if (numPages === 1) return '';
  }
  _genPrevPage(curPage) {
    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
  _genNextPage(curPage) {
    return `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new paginationView();
