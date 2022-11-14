function onOptionChange(event) {
        fetch(
          `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${
            this.dataset.originalSection
              ? this.dataset.originalSection
              : this.dataset.section
          }`
        )
          .then((response) => response.text())
          .then((responseText) => {
            const html = new DOMParser().parseFromString(
              responseText,
              "text/html"
            );
            const destination = document.getElementById(
              `price-${this.dataset.section}`
            );
            const source = html.getElementById(
              `price-${
                this.dataset.originalSection
                  ? this.dataset.originalSection
                  : this.dataset.section
              }`
            );
            if (source && destination) destination.innerHTML = source.innerHTML;

            const price = document.getElementById(
              `price-${this.dataset.section}`
            );

            if (price) price.classList.remove("visibility-hidden");
            this.toggleAddButton(
              !this.currentVariant.available,
              window.variantStrings.soldOut
            );
          });
}
