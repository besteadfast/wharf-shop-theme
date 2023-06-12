function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if(summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', (event) => {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });

  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch(e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener('keydown', (event) => {
    if(navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', (event) => {
    mouseClick = true;
  });

  window.addEventListener('focus', () => {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

    if (mouseClick) return;

    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');

  }, true);
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach((video) => video.pause());
  document.querySelectorAll('product-model').forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');

    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const parentMenuElement = detailsElement.closest('.has-submenu');
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function addTrapFocus() {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
      summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
    }

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        summaryElement.setAttribute('aria-expanded', true);
        parentMenuElement && parentMenuElement.classList.add('submenu-open');
        !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach(submenu => {
      submenu.classList.remove('submenu-open');
    });
    document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    const parentMenuElement = detailsElement.closest('.submenu-open');
    parentMenuElement && parentMenuElement.classList.remove('submenu-open');
    detailsElement.classList.remove('menu-opening');
    detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
    removeTrapFocus(detailsElement.querySelector('summary'));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    }

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.getElementById('shopify-section-header');
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);
    this.header.classList.add('menu-open');

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus) {
    super.closeMenuDrawer(event, elementToFocus);
    this.header.classList.remove('menu-open');
  }
}

customElements.define('header-drawer', HeaderDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this, false)
    );
    const carousel = this.querySelector(".carousel");
    carousel.dataset.total = carousel.querySelectorAll("img").length;
    carousel.dataset.curr = 0;

    this.querySelectorAll('.carousel-control').forEach((elt) => {
        if (elt.dataset.action == "prev") {elt.disabled = true;}
        if (elt.dataset.action == "next" && carousel.dataset.total <= 1) {elt.disabled = true;}
        elt.addEventListener(
            'click',
            () => {
                const images = this.querySelectorAll(".carousel-img");
                //shift carousel if not already first/last
                switch (elt.dataset.action) {
                    case "prev":
                        if (carousel.dataset.curr == 0) {break;}
                        carousel.dataset.curr = parseInt(carousel.dataset.curr) - 1;
                        break;
                    case "next":
                        if (carousel.dataset.curr >= (carousel.dataset.total - 1)) {break;}
                        carousel.dataset.curr = parseInt(carousel.dataset.curr) + 1;
                }
                images.forEach((img) => {
                    if(Number(img.dataset.index) === Number(carousel.dataset.curr) + 1){
                        img.removeAttribute("loading");
                    }
                    img.style.left = `${100 * (-parseInt(carousel.dataset.curr) + parseInt(img.dataset.index))}%`;
                });

                //toggle disabling buttons if first/last element
                this.querySelectorAll("button.carousel-control").forEach((btn) => {
                    switch (btn.dataset.action) {
                        case "prev":
                            btn.disabled = (carousel.dataset.curr == 0);
                            break;
                        case "next":
                            btn.disabled = (carousel.dataset.curr >= (carousel.dataset.total - 1));
                    }
                })
            }
        )
    })
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    const secondImg = this.querySelector(".carousel-img[data-index='1']");
    if(secondImg){
        secondImg.removeAttribute('loading');
    }
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
      if (focus) deferredElement.focus();
    }
  }
}

customElements.define('deferred-media', DeferredMedia);

class SliderComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[id^="Slider-"]');
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.enableSliderLooping = false;
    this.currentPageElement = this.querySelector('.slider-counter--current');
    this.pageTotalElement = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) return;

    this.initPages();
    const resizeObserver = new ResizeObserver(entries => this.initPages());
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  initPages() {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
    if (this.sliderItemsToShow.length < 2) return;
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
    this.slidesPerPage = Math.floor((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  }

  resetPages() {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.initPages();
  }

  update() {
    const previousPage = this.currentPage;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

    if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage;
      this.pageTotalElement.textContent = this.totalPages;
    }

    if (this.currentPage != previousPage) {
      this.dispatchEvent(new CustomEvent('slideChanged', { detail: {
        currentPage: this.currentPage,
        currentElement: this.sliderItemsToShow[this.currentPage - 1]
      }}));
    }

    if (this.enableSliderLooping) return;

    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
      this.prevButton.setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }

  isSlideVisible(element, offset = 0) {
    const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
    return (element.offsetLeft + element.clientWidth) <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
  }

  onButtonClick(event) {
    event.preventDefault();
    const step = event.currentTarget.dataset.step || 1;
    this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + (step * this.sliderItemOffset) : this.slider.scrollLeft - (step * this.sliderItemOffset);
    this.slider.scrollTo({
      left: this.slideScrollPosition
    });
  }
}

customElements.define('slider-component', SliderComponent);

class SlideshowComponent extends SliderComponent {
  constructor() {
    super();
    this.sliderControlWrapper = this.querySelector('.slider-buttons');
    this.enableSliderLooping = true;

    if (!this.sliderControlWrapper) return;

    this.sliderFirstItemNode = this.slider.querySelector('.slideshow__slide');
    if (this.sliderItemsToShow.length > 0) this.currentPage = 1;

    this.sliderControlLinksArray = Array.from(this.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
    this.sliderControlLinksArray.forEach(link => link.addEventListener('click', this.linkToSlide.bind(this)));
    this.slider.addEventListener('scroll', this.setSlideVisibility.bind(this));
    this.setSlideVisibility();

    if (this.slider.getAttribute('data-autoplay') === 'true') this.setAutoPlay();
  }

  setAutoPlay() {
    this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
    this.autoplaySpeed = this.slider.dataset.speed * 1000;

    this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
    this.addEventListener('mouseover', this.focusInHandling.bind(this));
    this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
    this.addEventListener('focusin', this.focusInHandling.bind(this));
    this.addEventListener('focusout', this.focusOutHandling.bind(this));

    this.play();
    this.autoplayButtonIsSetToPlay = true;
  }

  onButtonClick(event) {
    super.onButtonClick(event);
    const isFirstSlide = this.currentPage === 1;
    const isLastSlide = this.currentPage === this.sliderItemsToShow.length;

    if (!isFirstSlide && !isLastSlide) return;

    if (isFirstSlide && event.currentTarget.name === 'previous') {
      this.slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
    } else if (isLastSlide && event.currentTarget.name === 'next') {
      this.slideScrollPosition = 0;
    }
    this.slider.scrollTo({
      left: this.slideScrollPosition
    });
  }

  update() {
    super.update();
    this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
    this.prevButton.removeAttribute('disabled');

    if (!this.sliderControlButtons.length) return;

    this.sliderControlButtons.forEach(link => {
      link.classList.remove('slider-counter__link--active');
      link.removeAttribute('aria-current');
    });
    this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
    this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
  }

  autoPlayToggle() {
    this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
    this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
    this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
  }

  focusOutHandling(event) {
    const focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
    if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
    this.play();
  }

  focusInHandling(event) {
    const focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
    if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
      this.play();
    } else if (this.autoplayButtonIsSetToPlay) {
      this.pause();
    }
  }

  play() {
    this.slider.setAttribute('aria-live', 'off');
    clearInterval(this.autoplay);
    this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
  }

  pause() {
    this.slider.setAttribute('aria-live', 'polite');
    clearInterval(this.autoplay);
  }

  togglePlayButtonState(pauseAutoplay) {
    if (pauseAutoplay) {
      this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
    } else {
      this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
    }
  }

  autoRotateSlides() {
    const slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }

  setSlideVisibility() {
    this.sliderItemsToShow.forEach((item, index) => {
      const button = item.querySelector('a');
      if (index === this.currentPage - 1) {
        if (button) button.removeAttribute('tabindex');
        item.setAttribute('aria-hidden', 'false');
        item.removeAttribute('tabindex');
      } else {
        if (button) button.setAttribute('tabindex', '-1');
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
    });
  }

  linkToSlide(event) {
    event.preventDefault();
    const slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }
}

customElements.define('slideshow-component', SlideshowComponent);

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '');
    this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '');
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateCarousel();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options.includes(option);
      }).includes(false);
    });
  }

  updateMedia() {
    const images = document.querySelector(`#images-${this.dataset.section}`);
    const mobileImages = document.querySelector(`#mobile-images-${this.dataset.section} .carousel`);
    const modalImages = document.querySelector(`#ProductModal-${this.dataset.product} .carousel`);
    const currentVariantImage = document.querySelector(`#images-${this.dataset.section} .variant-image`);
    const mobileCurrentVariantImage = document.querySelector(`#mobile-images-${this.dataset.section} img.variant-img`);
    const modalCurrentVariantImage = document.querySelector(`#ProductModal-${this.dataset.product} img.variant-img`);

    if (currentVariantImage) {
        const oldVarCopy = currentVariantImage.cloneNode();
        oldVarCopy.classList.remove("row-span-2", "col-span-2", "variant-image");
        oldVarCopy.classList.remove("row-span-1", "col-span-1");
        images.removeChild(currentVariantImage);
        images.insertBefore(oldVarCopy, images.querySelector(`img[data-base-index="${Number(currentVariantImage.dataset.baseIndex) + 1}"]`));
    }

    if (images && this.currentVariant.featured_image){
        const newVarCopy = images.querySelector(`img[data-base-index="${this.currentVariant.featured_image.position}"]`).cloneNode()
        images.removeChild(images.querySelector(`img[data-base-index="${this.currentVariant.featured_image.position}"]`));
        newVarCopy.classList.add("row-span-2", "col-span-2", "variant-image");
        newVarCopy.classList.remove("row-span-1", "col-span-1");
        images.insertBefore(newVarCopy, images.firstChild)
    }

    //mobile
    if (mobileCurrentVariantImage) {
        const oldVarCopy = mobileCurrentVariantImage.cloneNode();
        oldVarCopy.classList.remove("variant-img");
        mobileImages.removeChild(mobileCurrentVariantImage);
        mobileImages.insertBefore(oldVarCopy, mobileImages.querySelector(`img[data-base-index="${Number(mobileCurrentVariantImage.dataset.baseIndex) + 1}"]`));
    }

    if(mobileImages && this.currentVariant.featured_image){
        const newVarCopy = mobileImages.querySelector(`img[data-base-index="${this.currentVariant.featured_image.position}"]`).cloneNode()
        mobileImages.removeChild(mobileImages.querySelector(`img[data-base-index="${this.currentVariant.featured_image.position}"]`));
        newVarCopy.classList.add("variant-img");
        newVarCopy.style = "left:calc(100% * 0);";
        newVarCopy.alt = this.currentVariant.featured_image.alt;
        mobileImages.insertBefore(newVarCopy, mobileImages.querySelector('.carousel-img:first-of-type'));
    }


    //carousel
    if (modalCurrentVariantImage) {
        const oldVarCopy = modalCurrentVariantImage.cloneNode();
        oldVarCopy.classList.remove("variant-img");
        modalImages.removeChild(modalCurrentVariantImage);
        modalImages.insertBefore(oldVarCopy, modalImages.querySelector(`img[data-base-index="${Number(modalCurrentVariantImage.dataset.baseIndex) + 1}"]`));
    }

    if(modalImages && this.currentVariant.featured_image){
        const newVarCopy = modalImages.querySelector(`img[data-base-index="${this.currentVariant.featured_image.position}"]`).cloneNode()
        modalImages.removeChild(modalImages.querySelector(`img[data-base-index="${this.currentVariant.featured_image.position}"]`));
        newVarCopy.classList.add("variant-img");
        newVarCopy.style = "left:calc(100% * 0);";
        newVarCopy.alt = this.currentVariant.featured_image.alt;
        modalImages.insertBefore(newVarCopy, modalImages.querySelector('.carousel-img:first-of-type'));
    }
    //   mobileCurrentVariantImage.src = this.currentVariant.featured_image.src;
    // } else if (mobileImages) {
    //   const variantImageNode = document.createElement("img");
    //   variantImageNode.className =
    //     "carousel-img variant-image absolute top-0 transition-left w-full aspect-square object-cover";
    //   variantImageNode.id = `Thumbnail-${this.dataset.section}-variant`;
    //   variantImageNode.style = "left:calc(100% * 0);";
    //   variantImageNode.dataset.index = "0";
    //   variantImageNode.src = this.currentVariant.featured_image.src;
    //   variantImageNode.alt = this.currentVariant.featured_image.alt;
    //   mobileImages.insertBefore(
    //     variantImageNode,
    //     mobileImages.querySelector(".carousel-img:first-of-type")
    //   );
    //}
    //modal
    // if (modalCurrentVariantImage) {
    //   modalCurrentVariantImage.src = this.currentVariant.featured_image.src;
    // } else if (modalImages) {
    //   const variantImageNode = document.createElement("img");
    //   variantImageNode.className =
    //     "w-full h-full object-cover absolute top-0 transition-left carousel-img variant-img";
    //   variantImageNode.style = "left:calc(100% * 0);";
    //   variantImageNode.dataset.index = "0";
    //   variantImageNode.src = this.currentVariant.featured_image.src;
    //   variantImageNode.alt = this.currentVariant.featured_image.alt;
    //   modalImages.insertBefore(
    //     variantImageNode,
    //     modalImages.querySelector(".carousel-img:first-of-type")
    //   );
    // }

    //get featured media for variant (if it exists) and insert into first gallery item
    //otherwise remove featured media gallery item (if it exists)
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-${this.dataset.section}-${this.dataset.product}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  renderProductInfo() {
    if(this.dataset.productPage){
        fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
        .then((response) => response.text())
        .then((responseText) => {
            const html = new DOMParser().parseFromString(responseText, 'text/html')

            //rerender price
            const priceDestination = document.getElementById(`price-${this.dataset.section}`);
            const priceSource = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
            if (priceSource && priceDestination) priceDestination.innerHTML = priceSource.innerHTML;

            //rerender images
            // const imagesDestination = document.getElementById(`images-${this.dataset.section}`);
            // const imagesSource = html.getElementById(`images-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
            // if (imagesSource && imagesDestination) imagesDestination.innerHTML = imagesSource.innerHTML;

            //rerender add to cart/notify when available
            const addButtonDestination = document.getElementById(`addButton-${this.dataset.section}`);
            const addButtonSource = html.getElementById(`addButton-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
            if (addButtonSource && addButtonDestination) addButtonDestination.innerHTML = addButtonSource.innerHTML;

            const price = document.getElementById(`price-${this.dataset.section}`);

            if (price) price.classList.remove('visibility-hidden');
            // this.toggleAddButton(!this.currentVariant.available, "Sold Out");
        });
    }
}

toggleAddButton(disable = true, text) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = "Unavailable";
    if (price) price.classList.add('hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  updateCarousel() {
    const product = document.querySelector(`#product-${this.dataset.product}`);
    const productID = product ? product.id : null;
    const variantImage = this.currentVariant.featured_image ? this.currentVariant.featured_image.src : null;
    //replace product images with variant images
    if(true){
          if (variantImage && product) {
            product.querySelector(".main-img").src = variantImage;
          }
          const carousel = document.querySelector(`modal-dialog[data-for='${productID}'] .carousel, #mobile-images-${this.dataset.section} .carousel`);
          const images = carousel.querySelectorAll("img");
        //   //if variant has image and carousel doesn't yet
        //   if ( variantImage && !carousel.querySelector(".variant-img") ) {
        //     //shift all current elements
        //     const variantImageNode = document.createElement('img')
        //     if (this.dataset.productPage){
        //       variantImageNode.className = "carousel-img variant-img absolute top-0 transition-left w-full aspect-square object-cover";
        //     }
        //     else{
        //       variantImageNode.className = "w-full h-full object-cover absolute top-0 transition-left carousel-img variant-img";
        //     }
        //     variantImageNode.style = "left:calc(100% * 0);"
        //     variantImageNode.dataset.index = "0"
        //     variantImageNode.src = this.currentVariant.featured_image.src;
        //     variantImageNode.alt = this.currentVariant.featured_image.alt
        //     carousel.insertBefore(variantImageNode, carousel.querySelector(".carousel-img:first-of-type"))
        //   }
        //   //if variant has image and carousel has image
        //   else if (variantImage) {
        //     //check if different
        //     if ( !( carousel.querySelector(".variant-img").src == variantImage) ) {
        //       //swap new one in
        //       carousel.querySelector(".variant-img").src = variantImage
        //     }
        //   }
        //   //if variant doesn't have image and carousel has image
        //   else if (carousel.querySelector(".variant-img")) {
        //     carousel.querySelector(".variant-img").remove();
        //     images.forEach((img) => {
        //       img.dataset.index = Number(img.dataset.index) + 1;
        //       img.style.left = `calc(${img.style.left} + 100% + 12px)`;
        //     });
        //   }
          const updatedImages = carousel.querySelectorAll("img");
          //update image positions
          updatedImages.forEach((img, index) => {
            img.dataset.index = index;
            img.style.left = `calc(${100 * parseInt(img.dataset.index)}% + ${12 * parseInt(index)}px`;
          });

          //set total
          const imageCount = carousel.querySelectorAll("img").length;
          carousel.dataset.total = imageCount;
          carousel.dataset.curr = 0;
          const pageNumber = document.querySelector('p.page-number')
          if(pageNumber){
            pageNumber.innerHTML = `1/${carousel.dataset.total}`
          }

          //reset next/prev
          document
            .querySelectorAll(
              `modal-dialog[data-for='${productID}'] button.carousel-control, #mobile-images-${this.dataset.section} button.carousel-control`
            )
            .forEach((btn) => {
              switch (btn.dataset.action) {
                case "prev":
                  btn.disabled = carousel.dataset.curr == 0;
                  break;
                case "next":
                  btn.disabled =
                    carousel.dataset.curr >= carousel.dataset.total - 1;
              }
            });
    }
  }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked)?.value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);

class Carousel extends HTMLElement {
  constructor() {
    super();
    const carousel = this.querySelector(".carousel");
    const carouselControls = this.querySelectorAll(".carousel-control");
    const pageNumber = this.querySelector(".page-number");
    carousel.dataset.total = carousel.querySelectorAll("img").length;
    carousel.dataset.curr = 0;
    pageNumber.innerHTML = `1/${carousel.dataset.total}`;

    carouselControls.forEach((elt) => {
        if (elt.dataset.action == "prev") {elt.disabled = true;}
        if (elt.dataset.action == "next" && carousel.dataset.total <= 1) {elt.disabled = true;}
        elt.addEventListener(
            'click',
            () => {
                const images = carousel.querySelectorAll(".carousel-img");
                //shift carousel if not already first/last
                switch (elt.dataset.action) {
                    case "prev":
                        if (carousel.dataset.curr == 0) {break;}
                        carousel.dataset.curr = parseInt(carousel.dataset.curr) - 1;
                        break;
                    case "next":
                        if (carousel.dataset.curr >= (carousel.dataset.total - 1)) {break;}
                        carousel.dataset.curr = parseInt(carousel.dataset.curr) + 1;
                }
                images.forEach((img) => {
                    if(Number(img.dataset.index) === Number(carousel.dataset.curr) + 1){
                        img.removeAttribute("loading");
                    }
                    img.style.left = `calc(${100 * (-parseInt(carousel.dataset.curr) + parseInt(img.dataset.index))}% + ${12 * (-parseInt(carousel.dataset.curr) + parseInt(img.dataset.index))}px`;
                });

                //toggle disabling buttons if first/last element
                this.querySelectorAll("button.carousel-control").forEach((btn) => {
                    switch (btn.dataset.action) {
                        case "prev":
                            btn.disabled = (carousel.dataset.curr == 0);
                            break;
                        case "next":
                            btn.disabled = (carousel.dataset.curr >= (carousel.dataset.total - 1));
                    }
                })

                //update page number
                pageNumber.innerHTML = `${parseInt(carousel.dataset.curr) + 1}/${carousel.dataset.total}`
            }
        )
    })
  }
}

customElements.define("img-carousel", Carousel);

/* mobile nav toggle */
function toggleNav() {
    body.classList.toggle("nav-active");
}

/* search */

function toggleSearchMode(e){

    //desktop
    const nav = document.querySelector("nav")
    const search = document.querySelector("nav .search");
    const searchInput = document.querySelector("nav .search input");
    const mobileSearchInput = document.querySelector("nav .search-mobile input")
    const searchCloseButton = document.querySelector("nav .search #searchCloseButton")
    nav.classList.toggle("search-mode");
    if(nav.classList.contains("search-mode")){
        //desktop
        const offsetRight = window.innerWidth - search.offsetLeft - search.offsetWidth;
        search.style.position = "absolute";
        search.style.right = "0px";
        search.style.margin = `0px ${offsetRight}px`;
        search.style.width = `calc(100vw - 2 * (${offsetRight}px) )`;
        search.style.paddingRight = "28px";
        searchInput.focus();
        //mobile
    }
    else{
        search.style.width = "40px";
        searchInput.blur();
        setTimeout(() => {
            search.style.cssText = "";
            // search.style.position = "static";
            // search.style.margin = "0px";
        }, 1000);
    }
    searchCloseButton.classList.toggle("w-0");
    searchCloseButton.classList.toggle("opacity-0");
    document.querySelector(".mobile-toggle").classList.toggle("flex-1")
}

const searchElts = document.querySelectorAll("input.search-input")
searchElts.forEach( (searchInput) => {
    searchInput.addEventListener("keyup", (e) => {
        if(e.key == "Enter"){
            window.location.href = `/search?q=${e.target.value}&type=product`
        }
    })
})

const searchSubmit = document.querySelector("button.search-submit")
if(searchSubmit){
    searchSubmit.addEventListener("click", (e) => {
    const searchInput = e.currentTarget.parentElement.querySelector("input.search-input");
    window.location.href = `/search?q=${searchInput.value}&type=product`;
    });
}

/* size guide link */
const sizeGuideLink = document.querySelector("a#sizeGuideLink")
const sizeGuide = document.querySelector("li.accordion__item#sizeGuide");
if(sizeGuideLink && sizeGuide){
    sizeGuideLink.addEventListener("click", () => {
        if( !sizeGuide.querySelector(".accordion__trigger_active")){
            sizeGuide.querySelector("button.accordion__trigger").click();
        }
        setTimeout(() => {sizeGuide.scrollIntoView(true)}, 201);
    })
}

/* titlecase helper */

function toTitleCase(string){
    const wordArray = string.split(" ").map((word) => {
        return word[0].toUpperCase() + word.substring(1, word.length)
    })
    return wordArray.join(" ");
}


function notifySignup(event) {
  event.stopPropagation();
  event.preventDefault();
  const form = event.target
  const inputs = form.querySelectorAll("input");
  const baseUrl = "";
  const data = new FormData()
  inputs.forEach((input) => {
     data.append(input.name, input.value);
  })
  fetch("https://a.klaviyo.com/api/v1/catalog/subscribe", {
    method: "POST",
    mode: "no-cors",
    body: data
  })
}
