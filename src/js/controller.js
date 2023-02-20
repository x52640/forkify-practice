import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView.js';

// import icon from '../img/icons.svg';  Parcel 1
import icons from 'url:../img/icons.svg';
import 'core-js/stable'; //Polyfilling everything for old browser
import 'regenerator-runtime/runtime'; //Polyfilling async/await for old browser

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');
const searchResults = document.querySelector('.results');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// renderSpinner(recipeContainer);

const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // render recipe View on browser
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.searchRecipe(query);

    // 3) render search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) render intial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (state = 'next') {
  if (state === 'next') model.state.search.page++;
  if (state === 'prev') model.state.search.page--;
  resultsView.render(model.getSearchResultsPage(model.state.search.page));
  paginationView.render(model.state.search);
};

const newFeature = function () {
  console.log('Welcome to the application');
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  newFeature();
};

init();
