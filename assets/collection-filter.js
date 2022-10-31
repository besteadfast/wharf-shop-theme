window.addEventListener('DOMContentLoaded', function(){
    //get current collection data as JSON
    window.shopifyData = window.shopifyData || {};
    window.shopifyData.collection = JSON.parse(document.querySelector('#collection-data[type="application/json"]').textContent);;
    //check for filters/sort in URL search params
    const searchParams = new URL(window.location.href).searchParams;
    window.shopifyData.filters = {};
    for(const [key, value] of searchParams.entries()){
        if(['size', 'color'].includes(key)){
            window.shopifyData.filters[key] = value;
        }
        else if(key == 'sort'){
            window.shopifyData.sort = value;
        }
    }

    applyFilters();
    applySort();
    populateFilterSelects();
    renderFilteredCollection(document.querySelector('#filtered-collection-grid'));

    document.querySelectorAll("select.filter").forEach((select) => {
        select.addEventListener("change", (event) => {
          //reset collection to unfiltered
          window.shopifyData.collection = JSON.parse(document.querySelector('#collection-data[type="application/json"]').textContent);
          //update filter
          const key = event.target.dataset.filter.toLowerCase();
          const value = event.target.value.toLowerCase();
          window.shopifyData.filters[key] = value;
          //apply filter/sort
          applyFilters();
          applySort();
          populateFilterSelects()
          const grid = document.querySelector("#filtered-collection-grid");
          renderFilteredCollection(grid);
          updateSearchParams(key, value);
        })
    })
});

function applyFilters() {
  if (window.shopifyData.filters) {
    for (filter in window.shopifyData.filters) {
      if (window.shopifyData.filters[filter] == "all") continue;
      window.shopifyData.collection = window.shopifyData.collection.filter(
        (product) => {
          return product.variants.some((variant) =>
            variant.options.some(
              (optionValue) =>
                optionValue.toLowerCase() === window.shopifyData.filters[filter]
            )
          );
        }
      );
    }
  }
}

function applySort() {
  if (window.shopifyData.sort) {
    //sort
  }
}

function populateFilterSelects(){
  window.shopifyData.filterOptions = {};
  for (filter of ["Size", "Color"]) {
    window.shopifyData.filterOptions[filter] =
      window.shopifyData.collection.reduce(function (prev, curr, cI) {
        const optionIndex = curr.options.indexOf(filter);
        for (variant of curr.variants) {
          if (variant.options[optionIndex]) {
            prev.add(variant.options[optionIndex]);
          }
        }
        return prev;
      }, new Set());
  }
    document.querySelectorAll("select.filter").forEach((filterSelectElt) => {
        const filter = filterSelectElt.dataset.filter;
        //remove any existing filters
        while (filterSelectElt.children.length > 2) {
            filterSelectElt.removeChild(filterSelectElt.lastChild);
        }
        //(re)populate with updated filters
        for (filterOption of window.shopifyData.filterOptions[filter]) {
            //if the option already exists, continue
            const filterOptionElt = document.createElement("option");
            filterOptionElt.setAttribute("value", filterOption.toLowerCase());
            filterOptionElt.appendChild(document.createTextNode(filterOption));
            filterSelectElt.appendChild(filterOptionElt);
        }
        //select current option
        for (selectOption of filterSelectElt.children) {
            if (window.shopifyData.filters[filter.toLowerCase()] == selectOption.value) {
                filterSelectElt.value = selectOption.value;
            }
        }
    });
}

function renderFilteredCollection(grid) {
    fetch(`${grid.dataset.url}?section_id=${grid.dataset.section}`)
    .then((response) => response.text())
    .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        const destination = grid;
        const productsSource = html.getElementById(grid.id).children;
        const filteredSource = [...productsSource].filter((elt) => {
            const filteredProductIds = window.shopifyData.collection.map(
                (filteredElt) => `product-${filteredElt.id}`
            );
            return filteredProductIds.includes(elt.id);
        });
        if (filteredSource && destination) {
            while (destination.firstChild) {
                destination.removeChild(destination.firstChild);
            }
            for (i of filteredSource) {
                destination.append(i);
            }
        }
    });
}

function updateSearchParams(updatedFilterKey, updatedFilterVal) {
    const url = new URL(window.location.href);
    url.searchParams.set(updatedFilterKey, updatedFilterVal);

    window.history.replaceState({}, "", url.toString());
}
