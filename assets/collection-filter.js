window.addEventListener('DOMContentLoaded', function(){
    //get current collection data from JSON
    window.shopifyData = window.shopifyData || {};
    window.shopifyData.collection = JSON.parse(document.querySelector('#collection-data[type="application/json"]').textContent);
    window.shopifyData.colors = {}
    const colorsString = document.querySelector('#all-collections-data[type="application/text"]').textContent;
    colorsString.split(",").forEach((color)=> {
        if(color){
            window.shopifyData.colors[color.split(":")[0]] = color.split(":")[1];
        }
    })

    //check for filters/sort in URL search params
    const searchParams = new URL(window.location.href).searchParams;
    window.shopifyData.filters = {};
    for(const [key, value] of searchParams.entries()){
        if(['size', 'color'].includes(key) && value ){
            window.shopifyData.filters[key] = value;
        }
        else if(key == 'sort'){
            window.shopifyData.sort = value;
        }
    }

    applyFilters();
    applySort();
    populateFilterSelects();
    renderMobileFilterIndicators();
    renderFilteredCollection(document.querySelector('#filtered-collection-grid'));

    document.querySelectorAll("#filtered-collection-filters select:is(.filter,.sort)").forEach((select) => {

        select.addEventListener("change", (event) => {

          let key = "";
          let value = "";
          if(event.target.classList.contains("filter")){
            //reset collection to unfiltered
            window.shopifyData.collection = JSON.parse(document.querySelector('#collection-data[type="application/json"]').textContent);
            //update filter
            key = event.target.dataset.filter.toLowerCase();
            value = event.target.value.toLowerCase();
            if(value){
                window.shopifyData.filters[key] = value;
            }
            else{
                delete window.shopifyData.filters[key];
            }
          } else if (event.target.classList.contains("sort")) {
            //update sort
            key = "sort";
            value = event.target.value.toLowerCase();
            if (value) {
              window.shopifyData.sort = value;
            } else {
              delete window.shopifyData.sort;
            }
          }
          //apply filter/sort
          applyFilters();
          applySort();
          populateFilterSelects();
          renderMobileFilterIndicators();
          const grid = document.querySelector("#filtered-collection-grid");
          renderFilteredCollection(grid);
          updateSearchParams(key, value);
        })
    })

    document.querySelectorAll("#mobileSelectedFilterContainer button.remove-filter-button").forEach(
        (elt)=> {
            elt.addEventListener("click", () => {
                const option = elt.dataset.close;
                const select = document.querySelector(`select[name=${option}]`)
                select.value = "";
                select.dispatchEvent(new Event("change"));
            })
        }
    )

    document.querySelector("#mobileSelectedFilterContainer button.clear-filters").addEventListener("click",
        () => {
            document.querySelectorAll("#filtered-collection-filters select.filter").forEach(
                (select) => {
                    if( select.value ){
                        select.value = "";
                        select.dispatchEvent(new Event("change"));
                    }
                }
            );
        }
    )
});

function applyFilters() {
  if (window.shopifyData.filters) {
    for (filter in window.shopifyData.filters) {
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
    window.shopifyData.collection = window.shopifyData.collection.slice().sort((a,b) => {
        switch (window.shopifyData.sort) {
            case "price-low-high":
                return a.price - b.price;
            case "price-high-low":
                return b.price - a.price;
        }
    })
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
    document.querySelectorAll("#filtered-collection-filters select.filter").forEach((filterSelectElt) => {
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

    //select current sort
    const sortSelectElt = document.querySelector("#filtered-collection-filters select.sort");
    for (selectOption of sortSelectElt.children) {
        if (window.shopifyData.sort == selectOption.value) {
            sortSelectElt.value = selectOption.value;
        }
    }
}

function renderMobileFilterIndicators() {
    const filters = window.shopifyData.filters;

    //color filter indicator
    const colorFilterIndicator = document.querySelector("#selectedColor");
    if(filters.color){
        colorFilterIndicator.classList.remove("hidden");
        const colorName = Array.from(window.shopifyData.filterOptions.Color).find((colorName) => filters.color.toUpperCase() == colorName.toUpperCase());
        colorFilterIndicator.querySelector(".indicator-label").innerHTML = colorName;
        colorFilterIndicator.querySelector(".color-swatch").style = `background-color:${window.shopifyData.colors[filters.color]}`
    }
    else{
        colorFilterIndicator.classList.add("hidden")
    }

    //size filter indicator
    const sizeFilterIndicator = document.querySelector("#selectedSize");
    if(filters.size){
        const sizeName = Array.from(window.shopifyData.filterOptions.Size).find((sizeName) => filters.size.toUpperCase() == sizeName.toUpperCase())
        sizeFilterIndicator.querySelector(".indicator-label").innerHTML =  sizeName;
        sizeFilterIndicator.classList.remove("hidden");
    } else {
        sizeFilterIndicator.classList.add("hidden");
    }
}

function renderFilteredCollection(grid) {
    fetch(`${grid.dataset.url}?section_id=${grid.dataset.section}`)
    .then((response) => response.text())
    .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        const destination = grid;
        const productsSource = html.getElementById(grid.id).children;
        const filteredAndSortedProductIds = window.shopifyData.collection.map((filteredElt) => `product-${filteredElt.id}`);
        const variantSpecificFirstImages = window.shopifyData.collection.map((product) => getVariantSpecificFirstImage(product))

        //filter
        let source = [...productsSource].filter((elt) => {
            return filteredAndSortedProductIds.includes(elt.id);
        });

        //sort
        source = source.sort((a,b) => {
            return filteredAndSortedProductIds.indexOf(a.id) - filteredAndSortedProductIds.indexOf(b.id);
        })

        //replace product images with variant images
        source.forEach((elt, index) => {
            if (variantSpecificFirstImages[index]){
                elt.querySelector(".main-img").src = variantSpecificFirstImages[index];
            }
            const modal = document.querySelector(`modal-dialog[data-for='${elt.id}']`);
            const carousel = modal.querySelector(".carousel");
            const images = carousel.querySelectorAll("img");
            //if variant has image and carousel doesn't yet
            if(variantSpecificFirstImages[index] && !carousel.querySelector(".variant-img")){
                //shift all current elements
                const newFirstImg = carousel.firstElementChild.cloneNode(true);
                newFirstImg.src = variantSpecificFirstImages[index];
                newFirstImg.classList.add("variant-img")
                carousel.insertBefore(newFirstImg, carousel.firstChild);
            }
            //if variant has image and carousel has image
            else if (variantSpecificFirstImages[index]){
                //check if different
                if( !(carousel.querySelector(".variant-img").src == variantSpecificFirstImages[index]) ){
                    //swap new one in
                    carousel.querySelector(".variant-img").src = variantSpecificFirstImages[index];
                }


            }
            //if variant doesn't have image and carousel has image
            else if ( carousel.querySelector(".variant-img") ){
                carousel.querySelector(".variant-img").remove()
                images.forEach((img) => {
                  img.dataset.index = Number(img.dataset.index) + 1;
                  img.style.left = `calc(${img.style.left} + 100% + 12px)`;
                });
            }
            const updatedImages = carousel.querySelectorAll("img");
            //update image positions
            updatedImages.forEach((img, index) => {
                img.dataset.index = index;
                img.style.left = `calc(${100 * (parseInt(img.dataset.index))}% + ${12 * (parseInt(index))}px`;
            });



            //set total
            const imageCount = carousel.querySelectorAll("img").length;
            carousel.dataset.total = imageCount;
            carousel.dataset.curr = 0;

            //reset next/prev
            carousel.querySelectorAll("button.carousel-control").forEach((btn) => {
                switch (btn.dataset.action) {
                    case "prev":
                        btn.disabled = (carousel.dataset.curr == 0);
                        break;
                    case "next":
                        btn.disabled = (carousel.dataset.curr >= (carousel.dataset.total - 1));
                }
            })
        })

        if (source && destination) {
            while (destination.firstChild) {
                destination.removeChild(destination.firstChild);
            }
            for (i of source) {
                destination.append(i);
            }
        }

    });
}

function updateSearchParams(updatedFilterKey, updatedFilterVal) {
    const url = new URL(window.location.href);
    if(updatedFilterVal){
        url.searchParams.set(updatedFilterKey, updatedFilterVal);
    }
    else{
        url.searchParams.delete(updatedFilterKey)
    }

    window.history.replaceState({}, "", url.toString());
}

function getVariantSpecificFirstImage(product) {
    const currentVariant = product.variants.find((variant) => {
        const lowercaseOptions = variant.options.map((option) => option.toLowerCase());
        for (filter of Object.values(window.shopifyData.filters)){
            if( !(lowercaseOptions.includes(filter)) ){
                return false;
            }
        }
        return true;
    })
    if(currentVariant.featured_image){
        return currentVariant.featured_image.src
    } else{
        return null;
    }
}


/* mobile-specific */

const filterToggle = document.querySelector("#mobileFilterToggle");
filterToggle.addEventListener("click", (e) => {
    document.querySelector("#filtered-collection-filters").classList.toggle("to-lg:hidden");
    e.target.classList.toggle("btn--dark");
});

const collectionSelect = document.querySelector("select[name=collection]");
if(collectionSelect){
    collectionSelect.addEventListener("change", (e) => {
        window.location.href = e.target.value;
    })
}

function generateColorDefs(){

}
