import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getRandProducts = () => {
  return fetch(`${API}/randomProducts`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllUniqueCategories = () => {
  return fetch(`${API}/products/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllCategory = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProductsByCategoryId = (categoryId) => {
  return fetch(`${API}/products/category/${categoryId}`, {
    method: "Get",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
