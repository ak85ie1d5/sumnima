(self["webpackChunksumnima_outfit"] = self["webpackChunksumnima_outfit"] || []).push([["assets_js_theme_catalog_js-assets_js_theme_common_faceted-search_js-assets_js_theme_global_co-3f5afe"],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CatalogPage)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  function CatalogPage(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }
  _inheritsLoose(CatalogPage, _PageManager);
  var _proto = CatalogPage.prototype;
  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');
    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2__.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _sumnima_product_card_options__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../sumnima/product-card-options */ "./assets/js/theme/sumnima/product-card-options.js");
/* harmony import */ var scrollreveal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! scrollreveal */ "./node_modules/scrollreveal/dist/scrollreveal.es.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");












var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: $('#facetedSearch').length ? '#facet-range-form [name=max_price]' : '#facet-range-form [name=price_max]',
  priceRangeMinPriceSelector: $('#facetedSearch').length ? '#facet-range-form [name=min_price]' : '#facet-range-form [name=price_min]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: (0,_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal')[0],
  modalOpen: false
};

/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    (0,_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    console.log(window.contextCategory);
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    (0,_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();
    (0,_sumnima_product_card_options__WEBPACK_IMPORTED_MODULE_10__.inViewCheck)(window.contextCategory);
    function updateGridNumbers() {
      if ($(window).width() < 1023) {
        $('<ul class="grid-numbers"><li class="productgrid-one"><svg class="grid-option-mobile" width="40.0px" height="40.0px" viewBox="0 0 40.0 40.0" version="1.1" id="SVGRoot" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs3350"/><g id="layer1"><rect style="fill:none;stroke:#000000;stroke-width:1.45857;stroke-linecap:square;stroke-dasharray:none;paint-order:stroke fill markers" id="rect4313" width="36.541435" height="34.541431" x="1.7292825" y="2.7292829"/></g></svg></li><li class="productgrid-two"><svg class="grid-option-mobile" width="40.0px" height="40.0px" viewBox="0 0 40.0 40.0" version="1.1" id="SVGRoot" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs3350"/><g id="layer1"><rect style="fill:none;stroke:#000000;stroke-width:0.986767;stroke-linecap:square;stroke-dasharray:none;paint-order:stroke fill markers" id="rect4313" width="16.499233" height="35.013233" x="1.4933782" y="2.4933791"/><rect style="fill:none;stroke:#000000;stroke-width:0.986778;stroke-linecap:square;stroke-dasharray:none;paint-order:stroke fill markers" id="rect4313-3" width="16.499596" height="35.013226" x="22.007015" y="2.4933882"/></g></svg></li></ul>').appendTo('#faceted-search-container');
      } else {
        $('<ul class="grid-numbers"><li class="productgrid-filter"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"></path></svg><li class="productgrid-three"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"></path></svg></li><li class="productgrid-five"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"></path></svg></li></ul>').appendTo('#faceted-search-container');
        $('<ul class="grid-numbers"><li class="productgrid-filter"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"></path></svg><li class="productgrid-three"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"></path></svg></li><li class="productgrid-five"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"></path></svg></li></ul>').insertAfter('.sidebar-filter .actionBar');
        if ($('body.search #faceted-search-container').length === 0) {
          $('.shopByPrice-search .grid-numbers').remove();
          $('.shopByPrice-search #main-content').removeClass("productgrid-three");
          $('.shopByPrice-search .page.load').removeClass('sidebar-filter');
        }
      }
    }
    updateGridNumbers();
    $('.card-figure').addClass('show-favourite');
    $('<span class="add-to-favourite"><svg aria-labelledby="wishlist-icon" color="#888888" fill="none" height="48px" role="img" stroke="#888888" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="wishlist-icon"></title><path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path></svg></span>').insertAfter(' .container figcaption.card-figcaption');
    var activeFavourites = [];
    $("#main-content .card-figure .add-to-favourite").click(function () {
      var listItem = $(this).closest('.card-figure').closest('article');
      var productId = listItem.data('product-id');
      if ($('.favourite-content .favourite-container ul.productGrid article[data-product-id="' + productId + '"]').length === 0) {
        var clonedItem = listItem.clone();
        clonedItem.appendTo(".favourite-content .favourite-container ul.productGrid");
        $('<span class="remove-button" ><button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button></span>').insertAfter(clonedItem.find('.card-figure'));
        var favouriteItems = $('.favourite-content .favourite-container ul.productGrid').html();
        localStorage.setItem('favouriteItems', favouriteItems);
        activeFavourites.push(productId);
      } else {
        $('.favourite-content .favourite-container ul.productGrid article[data-product-id="' + productId + '"]').remove();
        var index = activeFavourites.indexOf(productId);
        if (index !== -1) {
          activeFavourites.splice(index, 1);
          localStorage.setItem('activeFavourites', JSON.stringify(activeFavourites));
        }
        var favouriteItems = $('.favourite-content .favourite-container ul.productGrid').html();
        localStorage.setItem('favouriteItems', favouriteItems);
      }
      localStorage.setItem('activeFavourites', JSON.stringify(activeFavourites));
      updateCount();
    });
    function updateCount() {
      var clonedItemCount = $('.favourite-content .favourite-container article').length;
      $('.navUser-section--alt .cloned-quantity').html(clonedItemCount);
    }
    $('.card .sale-flag-side').marquee({
      direction: 'left',
      duration: 10000,
      gap: 35,
      delayBeforeStart: 0,
      duplicated: true,
      startVisible: true
    });
    $('.pre-order-flag').marquee({
      direction: 'left',
      duration: 10000,
      gap: 35,
      delayBeforeStart: 0,
      duplicated: true,
      startVisible: true
    });
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.api.getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }

      // Refresh view with new content
      _this2.refreshView(content);

      // Refresh range view when shop-by-price enabled
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('search_query')) {
        $('.reset-filters').show();
      }
      $('input[name="price_min"]').attr('value', urlParams.get('price_min'));
      $('input[name="price_max"]').attr('value', urlParams.get('price_max'));
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id');

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id');

    // Toggle depending on `collapsed` flag
    if (this.collapsedFacetItems.includes(id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;
    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl();
    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.api.getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        _this3.options.modal.open();
        _this3.options.modalOpen = true;
        _this3.options.modal.updateContent(response);
      });
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this5.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = (0,_nod__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__.Validators.setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');
      var shouldCollapse = _this6.collapsedFacetItems.includes(id);
      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;
      var shouldCollapse = _this7.collapsedFacets.includes(id);
      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href'));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected');

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_4__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_9__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_4__.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    if (document.location.hash !== '') return;
    $(window).trigger('statechange');
  };
  return FacetedSearch;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FacetedSearch);

/***/ }),

/***/ "./assets/js/theme/common/utils/url-utils.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/utils/url-utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0__.parse(url, true);
    var param;

    // Let the formatter use the query object to build the new url
    parsed.search = null;
    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    }
    return url__WEBPACK_IMPORTED_MODULE_0__.format(parsed);
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;
    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;
          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + key + "=" + queryData[key][ndx];
            }
          }
        } else {
          out += "&" + key + "=" + queryData[key];
        }
      }
    }
    return out.substring(1);
  },
  parseQueryParams: function parseQueryParams(queryData) {
    var params = {};
    for (var i = 0; i < queryData.length; i++) {
      var temp = queryData[i].split('=');
      if (temp[0] in params) {
        if (Array.isArray(params[temp[0]])) {
          params[temp[0]].push(temp[1]);
        } else {
          params[temp[0]] = [params[temp[0]], temp[1]];
        }
      } else {
        params[temp[0]] = temp[1];
      }
    }
    return params;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (urlUtils);

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showAlertModal)(noCompareMessage);
      return false;
    }
  });
}

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRhbG9nX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fZmFjZXRlZC1zZWFyY2hfanMtYXNzZXRzX2pzX3RoZW1lX2dsb2JhbF9jby0zZjVhZmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNPO0FBQzFCO0FBQUEsSUFFREcsV0FBVywwQkFBQUMsWUFBQTtFQUM1QixTQUFBRCxZQUFZRSxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFGLFlBQUEsQ0FBQUcsSUFBQSxPQUFNRixPQUFPLENBQUM7SUFFZEcsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtNQUMxQyxJQUFJQyxRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsRUFBRSxLQUFLLE1BQU0sRUFBRTtRQUN0Q0osTUFBTSxDQUFDSyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDO01BQzNEO0lBQ0osQ0FBQyxDQUFDO0lBQUMsT0FBQVIsS0FBQTtFQUNQO0VBQUNTLGNBQUEsQ0FBQVosV0FBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQVksTUFBQSxHQUFBYixXQUFBLENBQUFjLFNBQUE7RUFBQUQsTUFBQSxDQUVERSxvQkFBb0IsR0FBcEIsU0FBQUEsb0JBQW9CQSxDQUFBLEVBQUc7SUFDbkIsSUFBTUMsZUFBZSxHQUFHQyxDQUFDLENBQUMsZ0NBQWdDLENBQUM7SUFFM0QsSUFBSVosTUFBTSxDQUFDSyxZQUFZLENBQUNRLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtNQUM3Q0YsZUFBZSxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUN2QmQsTUFBTSxDQUFDSyxZQUFZLENBQUNVLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDbEQ7RUFDSixDQUFDO0VBQUFQLE1BQUEsQ0FFRFEsY0FBYyxHQUFkLFNBQUFBLGNBQWNBLENBQUNDLEtBQUssRUFBRUMsYUFB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QUFPLEtBQUs7SUFDaEI7RUFDSixDQUFDLENBQUM7QUFDTjs7Ozs7Ozs7OztBQzdEQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N1bW5pbWEtb3V0Zml0Ly4vYXNzZXRzL2pzL3RoZW1lL2NhdGFsb2cuanMiLCJ3ZWJwYWNrOi8vc3VtbmltYS1vdXRmaXQvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovL3N1bW5pbWEtb3V0Zml0Ly4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy91cmwtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3VtbmltYS1vdXRmaXQvLi9hc3NldHMvanMvdGhlbWUvZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vc3VtbmltYS1vdXRmaXQvaWdub3JlZHwvaG9tZS9kZXZtYXN0ZXIvZ2EvU1VNTklNQSsxOF8wOV8yNC0xLjEuMC9ub2RlX21vZHVsZXMvb2JqZWN0LWluc3BlY3R8Li91dGlsLmluc3BlY3QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZCA9PT0gJ3NvcnQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYW5nZUZvY3VzT25Tb3J0QnkoKSB7XG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5U3RhdHVzJykpIHtcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0QnlTdGF0dXMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29sbGFwc2libGUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgbm9kIGZyb20gJy4vbm9kJztcbmltcG9ydCB7IGluVmlld0NoZWNrIH0gZnJvbSAnLi4vc3VtbmltYS9wcm9kdWN0LWNhcmQtb3B0aW9ucyc7XG5pbXBvcnQgU2Nyb2xsUmV2ZWFsIGZyb20gJ3Njcm9sbHJldmVhbCc7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGFjY29yZGlvblRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1uYXZpZ2F0aW9uLCAjZmFjZXRlZFNlYXJjaCAuZmFjZXRlZFNlYXJjaC10b2dnbGUnLFxuICAgIGJsb2NrZXJTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5ibG9ja2VyJyxcbiAgICBjbGVhckZhY2V0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuZmFjZXRlZFNlYXJjaC1jbGVhckxpbmsnLFxuICAgIGNvbXBvbmVudFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2gtbmF2TGlzdCcsXG4gICAgZmFjZXROYXZMaXN0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAubmF2TGlzdCcsXG4gICAgcHJpY2VSYW5nZUVycm9yU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1pbmxpbmVNZXNzYWdlJyxcbiAgICBwcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWZpZWxkc2V0JyxcbiAgICBwcmljZVJhbmdlRm9ybVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0nLFxuICAgIHByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yOiAkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA/ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1tYXhfcHJpY2VdJyA6ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1wcmljZV9tYXhdJyxcbiAgICBwcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcjogJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPyAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXScgOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9cHJpY2VfbWluXScsXG4gICAgc2hvd01vcmVUb2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tY29udGVudCAudG9nZ2xlTGluaycsXG4gICAgZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zOiAnI2ZhY2V0ZWRTZWFyY2gtZmlsdGVySXRlbXMgLmZvcm0taW5wdXQnLFxuICAgIG1vZGFsOiBtb2RhbEZhY3RvcnkoJyNtb2RhbCcpWzBdLFxuICAgIG1vZGFsT3BlbjogZmFsc2UsXG59O1xuXG4vKipcbiAqIEZhY2V0ZWQgc2VhcmNoIHZpZXcgY29tcG9uZW50XG4gKi9cbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyAtIE9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIHRoZSBhamF4IHJlcXVlc3RzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29uZmlndXJhYmxlIG9wdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogbGV0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAqICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAqICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJ1xuICAgICAqICAgICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCB0ZW1wbGF0ZXNEaWRMb2FkID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgKiAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBsZXQgZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCB0ZW1wbGF0ZXNEaWRMb2FkKTtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBbXTtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgICAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xuXG4gICAgICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJChuYXZMaXN0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1hcmsgaW5pdGlhbGx5IGNvbGxhcHNlZCBhY2NvcmRpb25zXG4gICAgICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMucHVzaChjb2xsYXBzaWJsZS50YXJnZXRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxuICAgICAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29tcG9uZW50U2VsZWN0b3IpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsRmFjZXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9ic2VydmUgdXNlciBldmVudHNcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlID0gdGhpcy5vbkFjY29yZGlvblRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xlYXJGYWNldCA9IHRoaXMub25DbGVhckZhY2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhbmdlU3VibWl0ID0gdGhpcy5vblJhbmdlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcmVmcmVzaFZpZXcoY29udGVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuY29udGV4dENhdGVnb3J5KTtcblxuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xuICAgICAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudHNcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgaW5WaWV3Q2hlY2sod2luZG93LmNvbnRleHRDYXRlZ29yeSk7XG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUdyaWROdW1iZXJzKCkge1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCAxMDIzKSB7XG4gICAgICAgICAgICAkKCc8dWwgY2xhc3M9XCJncmlkLW51bWJlcnNcIj48bGkgY2xhc3M9XCJwcm9kdWN0Z3JpZC1vbmVcIj48c3ZnIGNsYXNzPVwiZ3JpZC1vcHRpb24tbW9iaWxlXCIgd2lkdGg9XCI0MC4wcHhcIiBoZWlnaHQ9XCI0MC4wcHhcIiB2aWV3Qm94PVwiMCAwIDQwLjAgNDAuMFwiIHZlcnNpb249XCIxLjFcIiBpZD1cIlNWR1Jvb3RcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6c3ZnPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZGVmcyBpZD1cImRlZnMzMzUwXCIvPjxnIGlkPVwibGF5ZXIxXCI+PHJlY3Qgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuNDU4NTc7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtwYWludC1vcmRlcjpzdHJva2UgZmlsbCBtYXJrZXJzXCIgaWQ9XCJyZWN0NDMxM1wiIHdpZHRoPVwiMzYuNTQxNDM1XCIgaGVpZ2h0PVwiMzQuNTQxNDMxXCIgeD1cIjEuNzI5MjgyNVwiIHk9XCIyLjcyOTI4MjlcIi8+PC9nPjwvc3ZnPjwvbGk+PGxpIGNsYXNzPVwicHJvZHVjdGdyaWQtdHdvXCI+PHN2ZyBjbGFzcz1cImdyaWQtb3B0aW9uLW1vYmlsZVwiIHdpZHRoPVwiNDAuMHB4XCIgaGVpZ2h0PVwiNDAuMHB4XCIgdmlld0JveD1cIjAgMCA0MC4wIDQwLjBcIiB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJTVkdSb290XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnN2Zz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGRlZnMgaWQ9XCJkZWZzMzM1MFwiLz48ZyBpZD1cImxheWVyMVwiPjxyZWN0IHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjk4Njc2NztzdHJva2UtbGluZWNhcDpzcXVhcmU7c3Ryb2tlLWRhc2hhcnJheTpub25lO3BhaW50LW9yZGVyOnN0cm9rZSBmaWxsIG1hcmtlcnNcIiBpZD1cInJlY3Q0MzEzXCIgd2lkdGg9XCIxNi40OTkyMzNcIiBoZWlnaHQ9XCIzNS4wMTMyMzNcIiB4PVwiMS40OTMzNzgyXCIgeT1cIjIuNDkzMzc5MVwiLz48cmVjdCBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC45ODY3Nzg7c3Ryb2tlLWxpbmVjYXA6c3F1YXJlO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtwYWludC1vcmRlcjpzdHJva2UgZmlsbCBtYXJrZXJzXCIgaWQ9XCJyZWN0NDMxMy0zXCIgd2lkdGg9XCIxNi40OTk1OTZcIiBoZWlnaHQ9XCIzNS4wMTMyMjZcIiB4PVwiMjIuMDA3MDE1XCIgeT1cIjIuNDkzMzg4MlwiLz48L2c+PC9zdmc+PC9saT48L3VsPicpLmFwcGVuZFRvKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJzx1bCBjbGFzcz1cImdyaWQtbnVtYmVyc1wiPjxsaSBjbGFzcz1cInByb2R1Y3RncmlkLWZpbHRlclwiPjxzdmcgY2xhc3M9XCJncmlkLW9wdGlvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cImluaGVyaXRcIiBzdHJva2U9XCJpbmhlcml0XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTE5LjQgNC42SDQuNnYxNC44aDE0LjhWNC42em0tMTUuOC0xdjE2LjhoMTYuOFYzLjZIMy42elwiPjwvcGF0aD48L3N2Zz48bGkgY2xhc3M9XCJwcm9kdWN0Z3JpZC10aHJlZVwiPjxzdmcgY2xhc3M9XCJncmlkLW9wdGlvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cImluaGVyaXRcIiBzdHJva2U9XCJpbmhlcml0XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTQuNiA0LjZIMTB2MTQuOEg0LjZWNC42em0tMS0xSDExdjE2LjhIMy42VjMuNnptMTAuNCAxaDUuNHYxNC44SDE0VjQuNnptLTEtMWg3LjR2MTYuOEgxM1YzLjZ6XCI+PC9wYXRoPjwvc3ZnPjwvbGk+PGxpIGNsYXNzPVwicHJvZHVjdGdyaWQtZml2ZVwiPjxzdmcgY2xhc3M9XCJncmlkLW9wdGlvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cImluaGVyaXRcIiBzdHJva2U9XCJpbmhlcml0XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTQuNiA0LjZIMTBWMTBINC42VjQuNnptLTEtMUgxMVYxMUgzLjZWMy42em0xIDEwLjRIMTB2NS40SDQuNlYxNHptLTEtMUgxMXY3LjRIMy42VjEzem0xNS44LTguNEgxNFYxMGg1LjRWNC42em0tNS40LTFoLTFWMTFoNy40VjMuNkgxNHpNMTQgMTRoNS40djUuNEgxNFYxNHptLTEtMWg3LjR2Ny40SDEzVjEzelwiPjwvcGF0aD48L3N2Zz48L2xpPjwvdWw+JykuYXBwZW5kVG8oJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgICAgICQoJzx1bCBjbGFzcz1cImdyaWQtbnVtYmVyc1wiPjxsaSBjbGFzcz1cInByb2R1Y3RncmlkLWZpbHRlclwiPjxzdmcgY2xhc3M9XCJncmlkLW9wdGlvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cImluaGVyaXRcIiBzdHJva2U9XCJpbmhlcml0XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTE5LjQgNC42SDQuNnYxNC44aDE0LjhWNC42em0tMTUuOC0xdjE2LjhoMTYuOFYzLjZIMy42elwiPjwvcGF0aD48L3N2Zz48bGkgY2xhc3M9XCJwcm9kdWN0Z3JpZC10aHJlZVwiPjxzdmcgY2xhc3M9XCJncmlkLW9wdGlvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cImluaGVyaXRcIiBzdHJva2U9XCJpbmhlcml0XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTQuNiA0LjZIMTB2MTQuOEg0LjZWNC42em0tMS0xSDExdjE2LjhIMy42VjMuNnptMTAuNCAxaDUuNHYxNC44SDE0VjQuNnptLTEtMWg3LjR2MTYuOEgxM1YzLjZ6XCI+PC9wYXRoPjwvc3ZnPjwvbGk+PGxpIGNsYXNzPVwicHJvZHVjdGdyaWQtZml2ZVwiPjxzdmcgY2xhc3M9XCJncmlkLW9wdGlvblwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cImluaGVyaXRcIiBzdHJva2U9XCJpbmhlcml0XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTQuNiA0LjZIMTBWMTBINC42VjQuNnptLTEtMUgxMVYxMUgzLjZWMy42em0xIDEwLjRIMTB2NS40SDQuNlYxNHptLTEtMUgxMXY3LjRIMy42VjEzem0xNS44LTguNEgxNFYxMGg1LjRWNC42em0tNS40LTFoLTFWMTFoNy40VjMuNkgxNHpNMTQgMTRoNS40djUuNEgxNFYxNHptLTEtMWg3LjR2Ny40SDEzVjEzelwiPjwvcGF0aD48L3N2Zz48L2xpPjwvdWw+JykuaW5zZXJ0QWZ0ZXIoJy5zaWRlYmFyLWZpbHRlciAuYWN0aW9uQmFyJyk7XG4gICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJCgnYm9keS5zZWFyY2ggI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zaG9wQnlQcmljZS1zZWFyY2ggLmdyaWQtbnVtYmVycycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zaG9wQnlQcmljZS1zZWFyY2ggI21haW4tY29udGVudCcpLnJlbW92ZUNsYXNzKFwicHJvZHVjdGdyaWQtdGhyZWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnNob3BCeVByaWNlLXNlYXJjaCAucGFnZS5sb2FkJykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItZmlsdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgdXBkYXRlR3JpZE51bWJlcnMoKTtcblxuJCgnLmNhcmQtZmlndXJlJykuYWRkQ2xhc3MoJ3Nob3ctZmF2b3VyaXRlJyk7XG5cblxuICQoJzxzcGFuIGNsYXNzPVwiYWRkLXRvLWZhdm91cml0ZVwiPjxzdmcgYXJpYS1sYWJlbGxlZGJ5PVwid2lzaGxpc3QtaWNvblwiIGNvbG9yPVwiIzg4ODg4OFwiIGZpbGw9XCJub25lXCIgaGVpZ2h0PVwiNDhweFwiIHJvbGU9XCJpbWdcIiBzdHJva2U9XCIjODg4ODg4XCIgc3Ryb2tlLWxpbmVjYXA9XCJzcXVhcmVcIiBzdHJva2UtbGluZWpvaW49XCJtaXRlclwiIHN0cm9rZS13aWR0aD1cIjFcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCI0OHB4XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjx0aXRsZSBpZD1cIndpc2hsaXN0LWljb25cIj48L3RpdGxlPjxwYXRoIGQ9XCJNMTIsMjEgTDEwLjU1LDE5LjcwNTE3NzEgQzUuNCwxNS4xMjQyNTA3IDIsMTIuMTAyOTk3MyAyLDguMzk1MDk1MzcgQzIsNS4zNzM4NDE5NiA0LjQyLDMgNy41LDMgQzkuMjQsMyAxMC45MSwzLjc5NDU1MDQxIDEyLDUuMDUwMTM2MjQgQzEzLjA5LDMuNzk0NTUwNDEgMTQuNzYsMyAxNi41LDMgQzE5LjU4LDMgMjIsNS4zNzM4NDE5NiAyMiw4LjM5NTA5NTM3IEMyMiwxMi4xMDI5OTczIDE4LjYsMTUuMTI0MjUwNyAxMy40NSwxOS43MTQ5ODY0IEwxMiwyMSBaXCI+PC9wYXRoPjwvc3ZnPjwvc3Bhbj4nKS5pbnNlcnRBZnRlcignIC5jb250YWluZXIgZmlnY2FwdGlvbi5jYXJkLWZpZ2NhcHRpb24nKTtcblxuICAgICAgICAgdmFyIGFjdGl2ZUZhdm91cml0ZXMgPSBbXTtcblxuICAgICAgICAkKFwiI21haW4tY29udGVudCAuY2FyZC1maWd1cmUgLmFkZC10by1mYXZvdXJpdGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5jYXJkLWZpZ3VyZScpLmNsb3Nlc3QoJ2FydGljbGUnKTtcbiAgICAgICAgICAgIHZhciBwcm9kdWN0SWQgPSBsaXN0SXRlbS5kYXRhKCdwcm9kdWN0LWlkJyk7XG5cbiAgICAgICAgICAgIGlmICgkKCcuZmF2b3VyaXRlLWNvbnRlbnQgLmZhdm91cml0ZS1jb250YWluZXIgdWwucHJvZHVjdEdyaWQgYXJ0aWNsZVtkYXRhLXByb2R1Y3QtaWQ9XCInICsgcHJvZHVjdElkICsgJ1wiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBjbG9uZWRJdGVtID0gbGlzdEl0ZW0uY2xvbmUoKTtcblxuICAgICAgICAgICAgICAgIGNsb25lZEl0ZW0uYXBwZW5kVG8oXCIuZmF2b3VyaXRlLWNvbnRlbnQgLmZhdm91cml0ZS1jb250YWluZXIgdWwucHJvZHVjdEdyaWRcIik7XG5cbiAgICAgICAgICAgICAgICAkKCc8c3BhbiBjbGFzcz1cInJlbW92ZS1idXR0b25cIiA+PGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiIHRpdGxlPVwiQ2xvc2VcIj48c3BhbiBjbGFzcz1cImFyaWEtZGVzY3JpcHRpb24tLWhpZGRlblwiPkNsb3NlPC9zcGFuPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsOXPC9zcGFuPjwvYnV0dG9uPjwvc3Bhbj4nKS5pbnNlcnRBZnRlcihjbG9uZWRJdGVtLmZpbmQoJy5jYXJkLWZpZ3VyZScpKTtcblxuICAgICAgICAgICAgICAgIHZhciBmYXZvdXJpdGVJdGVtcyA9ICQoJy5mYXZvdXJpdGUtY29udGVudCAuZmF2b3VyaXRlLWNvbnRhaW5lciB1bC5wcm9kdWN0R3JpZCcpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3VyaXRlSXRlbXMnLCBmYXZvdXJpdGVJdGVtcyk7XG5cbiAgICAgICAgICAgICAgICBhY3RpdmVGYXZvdXJpdGVzLnB1c2gocHJvZHVjdElkKTtcbiAgICAgICAgICAgIH1lbHNlIHtcblxuICAgICAgICAkKCcuZmF2b3VyaXRlLWNvbnRlbnQgLmZhdm91cml0ZS1jb250YWluZXIgdWwucHJvZHVjdEdyaWQgYXJ0aWNsZVtkYXRhLXByb2R1Y3QtaWQ9XCInICsgcHJvZHVjdElkICsgJ1wiXScpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBpbmRleCA9IGFjdGl2ZUZhdm91cml0ZXMuaW5kZXhPZihwcm9kdWN0SWQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBhY3RpdmVGYXZvdXJpdGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0aXZlRmF2b3VyaXRlcycsIEpTT04uc3RyaW5naWZ5KGFjdGl2ZUZhdm91cml0ZXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmYXZvdXJpdGVJdGVtcyA9ICQoJy5mYXZvdXJpdGUtY29udGVudCAuZmF2b3VyaXRlLWNvbnRhaW5lciB1bC5wcm9kdWN0R3JpZCcpLmh0bWwoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm91cml0ZUl0ZW1zJywgZmF2b3VyaXRlSXRlbXMpO1xuICAgIH1cblxuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjdGl2ZUZhdm91cml0ZXMnLCBKU09OLnN0cmluZ2lmeShhY3RpdmVGYXZvdXJpdGVzKSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUNvdW50KCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNvdW50KCkge1xuICAgICAgICAgICAgdmFyIGNsb25lZEl0ZW1Db3VudCA9ICQoJy5mYXZvdXJpdGUtY29udGVudCAuZmF2b3VyaXRlLWNvbnRhaW5lciBhcnRpY2xlJykubGVuZ3RoO1xuICAgICAgICAgICAgJCgnLm5hdlVzZXItc2VjdGlvbi0tYWx0IC5jbG9uZWQtcXVhbnRpdHknKS5odG1sKGNsb25lZEl0ZW1Db3VudCk7XG4gICAgICAgIH1cblxuXG5cbiAgJCgnLmNhcmQgLnNhbGUtZmxhZy1zaWRlJykubWFycXVlZSh7XG4gICAgZGlyZWN0aW9uOiAnbGVmdCcsXG4gICAgZHVyYXRpb246IDEwMDAwLFxuICAgIGdhcDogMzUsXG4gICAgZGVsYXlCZWZvcmVTdGFydDogMCxcbiAgICBkdXBsaWNhdGVkOiB0cnVlLFxuICAgIHN0YXJ0VmlzaWJsZTogdHJ1ZVxuICB9KTtcblxuICAkKCcucHJlLW9yZGVyLWZsYWcnKS5tYXJxdWVlKHtcbiAgICBkaXJlY3Rpb246ICdsZWZ0JyxcbiAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgZ2FwOiAzNSxcbiAgICBkZWxheUJlZm9yZVN0YXJ0OiAwLFxuICAgIGR1cGxpY2F0ZWQ6IHRydWUsXG4gICAgc3RhcnRWaXNpYmxlOiB0cnVlXG4gIH0pO1xuXG5cblxuXG5cblxuICAgIH1cblxuICAgIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3Rvcikuc2hvdygpO1xuXG4gICAgICAgIGFwaS5nZXRQYWdlKHVybFV0aWxzLmdldFVybCgpLCB0aGlzLnJlcXVlc3RPcHRpb25zLCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkKHRoaXMub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZWZyZXNoIHZpZXcgd2l0aCBuZXcgY29udGVudFxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVmlldyhjb250ZW50KTtcblxuICAgICAgICAgICAgLy8gUmVmcmVzaCByYW5nZSB2aWV3IHdoZW4gc2hvcC1ieS1wcmljZSBlbmFibGVkXG4gICAgICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgICAgICBpZiAodXJsUGFyYW1zLmhhcygnc2VhcmNoX3F1ZXJ5JykpIHtcbiAgICAgICAgICAgICAgICAkKCcucmVzZXQtZmlsdGVycycpLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInByaWNlX21pblwiXScpLmF0dHIoJ3ZhbHVlJywgdXJsUGFyYW1zLmdldCgncHJpY2VfbWluJykpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInByaWNlX21heFwiXScpLmF0dHIoJ3ZhbHVlJywgdXJsUGFyYW1zLmdldCgncHJpY2VfbWF4JykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBSZW1vdmVcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgIGNvbnN0IGhhc01vcmVSZXN1bHRzID0gJG5hdkxpc3QuZGF0YSgnaGFzTW9yZVJlc3VsdHMnKTtcblxuICAgICAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBkZXBlbmRpbmcgb24gYGNvbGxhcHNlZGAgZmxhZ1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKCdmYWNldCcpO1xuICAgICAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlKSB7XG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShmYWNldFVybCwge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmaWx0ZXJGYWNldEl0ZW1zKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRpdGVtcyA9ICQoJy5uYXZMaXN0LWl0ZW0nKTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgJGl0ZW1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YocXVlcnkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuXG4gICAgICAgIGNvbGxhcHNpYmxlLm9wZW4oKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlQWxsRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgaW5pdFByaWNlVmFsaWRhdG9yKCkge1xuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSBub2QoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0ge1xuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VFcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgfTtcblxuICAgICAgICBWYWxpZGF0b3JzLnNldE1pbk1heFByaWNlVmFsaWRhdGlvbih2YWxpZGF0b3IsIHNlbGVjdG9ycywgdGhpcy5vcHRpb25zLnZhbGlkYXRpb25FcnJvck1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKSB7XG4gICAgICAgIGNvbnN0ICRuYXZMaXN0cyA9ICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKTtcblxuICAgICAgICAvLyBSZXN0b3JlIGNvbGxhcHNlZCBzdGF0ZSBmb3IgZWFjaCBmYWNldFxuICAgICAgICAkbmF2TGlzdHMuZWFjaCgoaW5kZXgsIG5hdkxpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJChuYXZMaXN0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IHRoaXMuY29sbGFwc2VkRmFjZXRzLmluY2x1ZGVzKGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBDbGVhbi11cFxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIC8vIERPTSBldmVudHNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvciwgdGhpcy5vblRvZ2dsZUNsaWNrKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub24oJ2NsaWNrJywgdGhpcy5vbkNsZWFyRmFjZXQpO1xuXG4gICAgICAgIC8vIEhvb2tzXG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vZmYoJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAgICAgJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub2ZmKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZCcsIHRoaXMub25GYWNldENsaWNrKTtcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9mZignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIG9uQ2xlYXJGYWNldChldmVudCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBVcGRhdGUgVVJMXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICR0b2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQoJHRvZ2dsZS5hdHRyKCdocmVmJykpO1xuXG4gICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIGl0ZW1zXG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgfVxuXG4gICAgb25GYWNldENsaWNrKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJGxpbmsudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RhbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XG5cbiAgICAgICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblJhbmdlU3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IuYXJlQWxsKG5vZC5jb25zdGFudHMuVkFMSUQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSkuc3BsaXQoJyYnKTtcbiAgICAgICAgcXVlcnlQYXJhbXMgPSB1cmxVdGlscy5wYXJzZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5UGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnlba2V5XSA9IHF1ZXJ5UGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcbiAgICAgICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBvbkFjY29yZGlvblRvZ2dsZShldmVudCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcblxuICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0cywgW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Qb3BTdGF0ZSgpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2ggIT09ICcnKSByZXR1cm47XG5cbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3N0YXRlY2hhbmdlJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGYWNldGVkU2VhcmNoO1xuIiwiaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5jb25zdCB1cmxVdGlscyA9IHtcbiAgICBnZXRVcmw6ICgpID0+IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0ke3dpbmRvdy5sb2NhdGlvbi5zZWFyY2h9YCxcblxuICAgIGdvVG9Vcmw6ICh1cmwpID0+IHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXJsKTtcbiAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3N0YXRlY2hhbmdlJyk7XG4gICAgfSxcblxuICAgIHJlcGxhY2VQYXJhbXM6ICh1cmwsIHBhcmFtcykgPT4ge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBVcmwucGFyc2UodXJsLCB0cnVlKTtcbiAgICAgICAgbGV0IHBhcmFtO1xuXG4gICAgICAgIC8vIExldCB0aGUgZm9ybWF0dGVyIHVzZSB0aGUgcXVlcnkgb2JqZWN0IHRvIGJ1aWxkIHRoZSBuZXcgdXJsXG4gICAgICAgIHBhcnNlZC5zZWFyY2ggPSBudWxsO1xuXG4gICAgICAgIGZvciAocGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xuICAgICAgICAgICAgICAgIHBhcnNlZC5xdWVyeVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFVybC5mb3JtYXQocGFyc2VkKTtcbiAgICB9LFxuXG4gICAgYnVpbGRRdWVyeVN0cmluZzogKHF1ZXJ5RGF0YSkgPT4ge1xuICAgICAgICBsZXQgb3V0ID0gJyc7XG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHF1ZXJ5RGF0YSkge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5RGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocXVlcnlEYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZHg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChuZHggaW4gcXVlcnlEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeURhdGFba2V5XS5oYXNPd25Qcm9wZXJ0eShuZHgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0ICs9IGAmJHtrZXl9PSR7cXVlcnlEYXRhW2tleV1bbmR4XX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0ICs9IGAmJHtrZXl9PSR7cXVlcnlEYXRhW2tleV19YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0LnN1YnN0cmluZygxKTtcbiAgICB9LFxuXG4gICAgcGFyc2VRdWVyeVBhcmFtczogKHF1ZXJ5RGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGVtcCA9IHF1ZXJ5RGF0YVtpXS5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICBpZiAodGVtcFswXSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXNbdGVtcFswXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1t0ZW1wWzBdXS5wdXNoKHRlbXBbMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1t0ZW1wWzBdXSA9IFtwYXJhbXNbdGVtcFswXV0sIHRlbXBbMV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dID0gdGVtcFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVybFV0aWxzO1xuIiwiaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuL21vZGFsJztcblxuZnVuY3Rpb24gZGVjcmVtZW50Q291bnRlcihjb3VudGVyLCBpdGVtKSB7XG4gICAgY29uc3QgaW5kZXggPSBjb3VudGVyLmluZGV4T2YoaXRlbSk7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBjb3VudGVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbmNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb3VudGVyLnB1c2goaXRlbSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXJOYXYoY291bnRlciwgJGxpbmssIHVybHMpIHtcbiAgICBpZiAoY291bnRlci5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaWYgKCEkbGluay5pcygndmlzaWJsZScpKSB7XG4gICAgICAgICAgICAkbGluay5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgICB9XG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCBgJHt1cmxzLmNvbXBhcmV9LyR7Y291bnRlci5qb2luKCcvJyl9YCk7XG4gICAgICAgICRsaW5rLmZpbmQoJ3NwYW4uY291bnRQaWxsJykuaHRtbChjb3VudGVyLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGxpbmsucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IG5vQ29tcGFyZU1lc3NhZ2UsIHVybHMgfSkge1xuICAgIGxldCBjb21wYXJlQ291bnRlciA9IFtdO1xuXG4gICAgY29uc3QgJGNvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjb21wYXJlUmVzZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0ICRjaGVja2VkID0gJCgnYm9keScpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XG5cbiAgICAgICAgY29tcGFyZUNvdW50ZXIgPSAkY2hlY2tlZC5sZW5ndGggPyAkY2hlY2tlZC5tYXAoKGluZGV4LCBlbGVtZW50KSA9PiBlbGVtZW50LnZhbHVlKS5nZXQoKSA6IFtdO1xuICAgICAgICB1cGRhdGVDb3VudGVyTmF2KGNvbXBhcmVDb3VudGVyLCAkY29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtY29tcGFyZS1pZF0nLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICAgICBjb25zdCAkY2xpY2tlZENvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xuXG4gICAgICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGluY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVjcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVDb3VudGVyTmF2KGNvbXBhcmVDb3VudGVyLCAkY2xpY2tlZENvbXBhcmVMaW5rLCB1cmxzKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtkYXRhLWNvbXBhcmUtbmF2XScsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDaGVja2VkSW5wdXQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBpZiAoJGNsaWNrZWRDaGVja2VkSW5wdXQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKG5vQ29tcGFyZU1lc3NhZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwibmFtZXMiOlsiUGFnZU1hbmFnZXIiLCJ1cmxVdGlscyIsIlVybCIsIkNhdGFsb2dQYWdlIiwiX1BhZ2VNYW5hZ2VyIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJpZCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiJHNvcnRCeVNlbGVjdG9yIiwiJCIsImdldEl0ZW0iLCJmb2N1cyIsInJlbW92ZUl0ZW0iLCJvblNvcnRCeVN1Ym1pdCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInVybCIsInBhcnNlIiwibG9jYXRpb24iLCJocmVmIiwicXVlcnlQYXJhbXMiLCJzZXJpYWxpemUiLCJzcGxpdCIsInF1ZXJ5IiwicGFnZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybWF0IiwicGF0aG5hbWUiLCJzZWFyY2giLCJidWlsZFF1ZXJ5U3RyaW5nIiwiZGVmYXVsdCIsImhvb2tzIiwiYXBpIiwibW9kYWxGYWN0b3J5IiwiY29sbGFwc2libGVGYWN0b3J5IiwiVmFsaWRhdG9ycyIsIm5vZCIsImluVmlld0NoZWNrIiwiU2Nyb2xsUmV2ZWFsIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwibGVuZ3RoIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbE9wZW4iLCJGYWNldGVkU2VhcmNoIiwicmVxdWVzdE9wdGlvbnMiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJfZXh0ZW5kIiwiY29sbGFwc2VkRmFjZXRzIiwiY29sbGFwc2VkRmFjZXRJdGVtcyIsImluaXRQcmljZVZhbGlkYXRvciIsImVhY2giLCJpbmRleCIsIm5hdkxpc3QiLCJjb2xsYXBzZUZhY2V0SXRlbXMiLCJhY2NvcmRpb25Ub2dnbGUiLCIkYWNjb3JkaW9uVG9nZ2xlIiwiY29sbGFwc2libGUiLCJkYXRhIiwiaXNDb2xsYXBzZWQiLCJwdXNoIiwidGFyZ2V0SWQiLCJzZXRUaW1lb3V0IiwiaXMiLCJjb2xsYXBzZUFsbEZhY2V0cyIsIm9uU3RhdGVDaGFuZ2UiLCJiaW5kIiwib25Ub2dnbGVDbGljayIsIm9uQWNjb3JkaW9uVG9nZ2xlIiwib25DbGVhckZhY2V0Iiwib25GYWNldENsaWNrIiwib25SYW5nZVN1Ym1pdCIsImZpbHRlckZhY2V0SXRlbXMiLCJiaW5kRXZlbnRzIiwicmVmcmVzaFZpZXciLCJjb250ZW50IiwiY29uc29sZSIsImxvZyIsImNvbnRleHRDYXRlZ29yeSIsInJlc3RvcmVDb2xsYXBzZWRGYWNldHMiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcyIsInVwZGF0ZUdyaWROdW1iZXJzIiwid2lkdGgiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFjdGl2ZUZhdm91cml0ZXMiLCJjbGljayIsImxpc3RJdGVtIiwiY2xvc2VzdCIsInByb2R1Y3RJZCIsImNsb25lZEl0ZW0iLCJjbG9uZSIsImZpbmQiLCJmYXZvdXJpdGVJdGVtcyIsImh0bWwiLCJpbmRleE9mIiwic3BsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInVwZGF0ZUNvdW50IiwiY2xvbmVkSXRlbUNvdW50IiwibWFycXVlZSIsImRpcmVjdGlvbiIsImR1cmF0aW9uIiwiZ2FwIiwiZGVsYXlCZWZvcmVTdGFydCIsImR1cGxpY2F0ZWQiLCJzdGFydFZpc2libGUiLCJ1cGRhdGVWaWV3IiwiX3RoaXMyIiwic2hvdyIsImdldFBhZ2UiLCJnZXRVcmwiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJ1cmxQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoYXMiLCJhdHRyIiwiZ2V0IiwiZXhwYW5kRmFjZXRJdGVtcyIsIiRuYXZMaXN0IiwiX3dpdGhvdXQiLCJoYXNNb3JlUmVzdWx0cyIsIl91bmlvbiIsInRvZ2dsZUZhY2V0SXRlbXMiLCJpbmNsdWRlcyIsImdldE1vcmVGYWNldFJlc3VsdHMiLCJfdGhpczMiLCJmYWNldCIsImZhY2V0VXJsIiwic2hvd01vcmUiLCJ0ZW1wbGF0ZSIsInBhcmFtcyIsImxpc3RfYWxsIiwicmVzcG9uc2UiLCJvcGVuIiwidXBkYXRlQ29udGVudCIsIiRpdGVtcyIsInZhbCIsInRvTG93ZXJDYXNlIiwiZWxlbWVudCIsInRleHQiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJjbG9zZSIsIl90aGlzNCIsIiRhY2NvcmRpb25Ub2dnbGVzIiwiZXhwYW5kQWxsRmFjZXRzIiwiX3RoaXM1IiwidmFsaWRhdG9yIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsInNldE1pbk1heFByaWNlVmFsaWRhdGlvbiIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwicHJpY2VSYW5nZVZhbGlkYXRvciIsIl90aGlzNiIsIiRuYXZMaXN0cyIsInNob3VsZENvbGxhcHNlIiwiX3RoaXM3IiwidW5iaW5kRXZlbnRzIiwib24iLCJvblBvcFN0YXRlIiwib2ZmIiwiJGxpbmsiLCJzdG9wUHJvcGFnYXRpb24iLCJnb1RvVXJsIiwiJHRvZ2dsZSIsInRvZ2dsZUNsYXNzIiwidXJsUXVlcnlQYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmVBbGwiLCJjb25zdGFudHMiLCJWQUxJRCIsImRlY29kZVVSSSIsInBhcnNlUXVlcnlQYXJhbXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc2giLCJ0cmlnZ2VyIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInRpdGxlIiwicmVwbGFjZVBhcmFtcyIsInBhcnNlZCIsInBhcmFtIiwicXVlcnlEYXRhIiwib3V0IiwiQXJyYXkiLCJpc0FycmF5IiwibmR4Iiwic3Vic3RyaW5nIiwiaSIsInRlbXAiLCJzaG93QWxlcnRNb2RhbCIsImRlY3JlbWVudENvdW50ZXIiLCJjb3VudGVyIiwiaXRlbSIsImluY3JlbWVudENvdW50ZXIiLCJ1cGRhdGVDb3VudGVyTmF2IiwidXJscyIsImNvbXBhcmUiLCJqb2luIiwiX3JlZiIsIm5vQ29tcGFyZU1lc3NhZ2UiLCJjb21wYXJlQ291bnRlciIsIiRjb21wYXJlTGluayIsIiRjaGVja2VkIiwibWFwIiwidmFsdWUiLCJ0cmlnZ2VySGFuZGxlciIsInByb2R1Y3QiLCIkY2xpY2tlZENvbXBhcmVMaW5rIiwiY2hlY2tlZCIsIiRjbGlja2VkQ2hlY2tlZElucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==