import refs from "./refs.js";
const {
  searchForm,
  searchResults,
  countriesList,
  modalIsHidden,
  modalContent,
} = refs;

import countriesListItem from "../template/countriesListItem.hbs";
import modalCountryItem from "../template/modalCountryItem.hbs";
import countrySearchItem from "../template/countrySearchItem.hbs";

window.addEventListener("DOMContentLoaded", getAllCountries);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchName = event.target.elements.search.value;
  console.log(searchName);
  searchCountry(searchName);
  searchForm.reset();
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    modalIsHidden.classList.add("is-hidden");
    modalContent.innerHTML = "";
  }
});

modal.addEventListener("click", (e) => {
  if (e.target.id != "modalContent") {
    modalIsHidden.classList.add("is-hidden");
    modalContent.innerHTML = "";
  }
});

async function getAllCountries() {
  let url = `https://restcountries.eu/rest/v2/all`;
  let response = await fetch(url);
  //   console.log(response);
  let data = await response.json();
  //   console.log(data);
  let items = countriesListItem(data);
  countriesList.insertAdjacentHTML("afterbegin", items);

  const countries = [...countriesList.children];
  countries.forEach((country) => {
    country.addEventListener("click", async (event) => {
      let name = event.target.textContent.trim();
      console.log(name);
      let url = `https://restcountries.eu/rest/v2/name/${name}`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      let item = modalCountryItem(data);
      modalContent.insertAdjacentHTML("afterbegin", item);
      modalIsHidden.classList.remove("is-hidden");
    });
  });
}

async function searchCountry(searchName) {
  let url = `https://restcountries.eu/rest/v2/name/${searchName}`;
  let response = await fetch(url);
  console.log(response);
  let data = await response.json();
  console.log(data);
  let item = countrySearchItem(data);
  console.log(item);
  searchResults.insertAdjacentHTML("afterbegin", item);
  const countries = [...searchResults.children];
  countries.forEach((country) => {
    country.addEventListener("click", async (event) => {
      let name = event.target.textContent.trim();
      let url = `https://restcountries.eu/rest/v2/name/${name}`;
      let response = await fetch(url);
      let data = await response.json();
      let item = modalCountryItem(data);
      modalContent.insertAdjacentHTML("afterbegin", item);
      modalIsHidden.classList.remove("is-hidden");
    });
  });
}
