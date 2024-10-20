import { hooks, api } from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import Url from 'url';
import urlUtils from './utils/url-utils';
import modalFactory from '../global/modal';
import collapsibleFactory from './collapsible';
import { Validators } from './utils/form-utils';
import nod from './nod';
import { inViewCheck } from '../sumnima/product-card-options';
import ScrollReveal from 'scrollreveal';

const defaultOptions = {
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
    modal: modalFactory('#modal')[0],
    modalOpen: false,
};

/**
 * Faceted search view component
 */
class FacetedSearch {
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
    constructor(requestOptions, callback, options) {
        // Private properties
        this.requestOptions = requestOptions;
        this.callback = callback;
        this.options = _.extend({}, defaultOptions, options);
        this.collapsedFacets = [];
        this.collapsedFacetItems = [];

        // Init collapsibles
        collapsibleFactory();

        // Init price validator
        this.initPriceValidator();

        // Show limited items by default
        $(this.options.facetNavListSelector).each((index, navList) => {
            this.collapseFacetItems($(navList));
        });

        // Mark initially collapsed accordions
        $(this.options.accordionToggleSelector).each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);
            const collapsible = $accordionToggle.data('collapsibleInstance');

            if (collapsible.isCollapsed) {
                this.collapsedFacets.push(collapsible.targetId);
            }
        });

        // Collapse all facets if initially hidden
        // NOTE: Need to execute after Collapsible gets bootstrapped
        setTimeout(() => {
            if ($(this.options.componentSelector).is(':hidden')) {
                this.collapseAllFacets();
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
    refreshView(content) {
        console.log(window.contextCategory);

        if (content) {
            this.callback(content);
        }

        // Init collapsibles
        collapsibleFactory();

        // Init price validator
        this.initPriceValidator();

        // Restore view state
        this.restoreCollapsedFacets();
        this.restoreCollapsedFacetItems();

        // Bind events
        this.bindEvents();

        inViewCheck(window.contextCategory);


    function updateGridNumbers() {
        if ($(window).width() < 1023) {
            $('<ul class="grid-numbers"><li class="productgrid-one"><svg class="grid-option-mobile" width="40.0px" height="40.0px" viewBox="0 0 40.0 40.0" version="1.1" id="SVGRoot" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs3350"/><g id="layer1"><rect style="fill:none;stroke:#000000;stroke-width:1.45857;stroke-linecap:square;stroke-dasharray:none;paint-order:stroke fill markers" id="rect4313" width="36.541435" height="34.541431" x="1.7292825" y="2.7292829"/></g></svg></li><li class="productgrid-two"><svg class="grid-option-mobile" width="40.0px" height="40.0px" viewBox="0 0 40.0 40.0" version="1.1" id="SVGRoot" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs3350"/><g id="layer1"><rect style="fill:none;stroke:#000000;stroke-width:0.986767;stroke-linecap:square;stroke-dasharray:none;paint-order:stroke fill markers" id="rect4313" width="16.499233" height="35.013233" x="1.4933782" y="2.4933791"/><rect style="fill:none;stroke:#000000;stroke-width:0.986778;stroke-linecap:square;stroke-dasharray:none;paint-order:stroke fill markers" id="rect4313-3" width="16.499596" height="35.013226" x="22.007015" y="2.4933882"/></g></svg></li></ul>').appendTo('#faceted-search-container');

                 } else {
            $('<ul class="grid-numbers"><li class="productgrid-filter"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"></path></svg><li class="productgrid-three"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"></path></svg></li><li class="productgrid-five"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"></path></svg></li></ul>').appendTo('#faceted-search-container');
            $('<ul class="grid-numbers"><li class="productgrid-filter"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"></path></svg><li class="productgrid-three"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"></path></svg></li><li class="productgrid-five"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"></path></svg></li></ul>').insertAfter('.sidebar-filter .actionBar');
         
                             if($('body.search #faceted-search-container').length === 0) {
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

        $("#main-content .card-figure .add-to-favourite").click(function() {
            var listItem = $(this).closest('.card-figure').closest('article');
            var productId = listItem.data('product-id');

            if ($('.favourite-content .favourite-container ul.productGrid article[data-product-id="' + productId + '"]').length === 0) {
                var clonedItem = listItem.clone();

                clonedItem.appendTo(".favourite-content .favourite-container ul.productGrid");

                $('<span class="remove-button" ><button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button></span>').insertAfter(clonedItem.find('.card-figure'));

                var favouriteItems = $('.favourite-content .favourite-container ul.productGrid').html();
                localStorage.setItem('favouriteItems', favouriteItems);

                activeFavourites.push(productId);
            }else {

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






    }

    updateView() {
        $(this.options.blockerSelector).show();

        api.getPage(urlUtils.getUrl(), this.requestOptions, (err, content) => {
            $(this.options.blockerSelector).hide();

            if (err) {
                throw new Error(err);
            }

            // Refresh view with new content
            this.refreshView(content);

            // Refresh range view when shop-by-price enabled
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.has('search_query')) {
                $('.reset-filters').show();
            }

            $('input[name="price_min"]').attr('value', urlParams.get('price_min'));
            $('input[name="price_max"]').attr('value', urlParams.get('price_max'));
        });
    }

    expandFacetItems($navList) {
        const id = $navList.attr('id');

        // Remove
        this.collapsedFacetItems = _.without(this.collapsedFacetItems, id);
    }

    collapseFacetItems($navList) {
        const id = $navList.attr('id');
        const hasMoreResults = $navList.data('hasMoreResults');

        if (hasMoreResults) {
            this.collapsedFacetItems = _.union(this.collapsedFacetItems, [id]);
        } else {
            this.collapsedFacetItems = _.without(this.collapsedFacetItems, id);
        }
    }

    toggleFacetItems($navList) {
        const id = $navList.attr('id');

        // Toggle depending on `collapsed` flag
        if (this.collapsedFacetItems.includes(id)) {
            this.getMoreFacetResults($navList);

            return true;
        }

        this.collapseFacetItems($navList);

        return false;
    }

    getMoreFacetResults($navList) {
        const facet = $navList.data('facet');
        const facetUrl = urlUtils.getUrl();

        if (this.requestOptions.showMore) {
            api.getPage(facetUrl, {
                template: this.requestOptions.showMore,
                params: {
                    list_all: facet,
                },
            }, (err, response) => {
                if (err) {
                    throw new Error(err);
                }

                this.options.modal.open();
                this.options.modalOpen = true;
                this.options.modal.updateContent(response);
            });
        }

        this.collapseFacetItems($navList);

        return false;
    }

    filterFacetItems(event) {
        const $items = $('.navList-item');
        const query = $(event.currentTarget).val().toLowerCase();

        $items.each((index, element) => {
            const text = $(element).text().toLowerCase();
            if (text.indexOf(query) !== -1) {
                $(element).show();
            } else {
                $(element).hide();
            }
        });
    }

    expandFacet($accordionToggle) {
        const collapsible = $accordionToggle.data('collapsibleInstance');

        collapsible.open();
    }

    collapseFacet($accordionToggle) {
        const collapsible = $accordionToggle.data('collapsibleInstance');

        collapsible.close();
    }

    collapseAllFacets() {
        const $accordionToggles = $(this.options.accordionToggleSelector);

        $accordionToggles.each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);

            this.collapseFacet($accordionToggle);
        });
    }

    expandAllFacets() {
        const $accordionToggles = $(this.options.accordionToggleSelector);

        $accordionToggles.each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);

            this.expandFacet($accordionToggle);
        });
    }

    // Private methods
    initPriceValidator() {
        if ($(this.options.priceRangeFormSelector).length === 0) {
            return;
        }

        const validator = nod();
        const selectors = {
            errorSelector: this.options.priceRangeErrorSelector,
            fieldsetSelector: this.options.priceRangeFieldsetSelector,
            formSelector: this.options.priceRangeFormSelector,
            maxPriceSelector: this.options.priceRangeMaxPriceSelector,
            minPriceSelector: this.options.priceRangeMinPriceSelector,
        };

        Validators.setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);

        this.priceRangeValidator = validator;
    }

    restoreCollapsedFacetItems() {
        const $navLists = $(this.options.facetNavListSelector);

        // Restore collapsed state for each facet
        $navLists.each((index, navList) => {
            const $navList = $(navList);
            const id = $navList.attr('id');
            const shouldCollapse = this.collapsedFacetItems.includes(id);

            if (shouldCollapse) {
                this.collapseFacetItems($navList);
            } else {
                this.expandFacetItems($navList);
            }
        });
    }

    restoreCollapsedFacets() {
        const $accordionToggles = $(this.options.accordionToggleSelector);

        $accordionToggles.each((index, accordionToggle) => {
            const $accordionToggle = $(accordionToggle);
            const collapsible = $accordionToggle.data('collapsibleInstance');
            const id = collapsible.targetId;
            const shouldCollapse = this.collapsedFacets.includes(id);

            if (shouldCollapse) {
                this.collapseFacet($accordionToggle);
            } else {
                this.expandFacet($accordionToggle);
            }
        });
    }

    bindEvents() {
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
        hooks.on('facetedSearch-facet-clicked', this.onFacetClick);
        hooks.on('facetedSearch-range-submitted', this.onRangeSubmit);
        hooks.on('sortBy-submitted', this.onSortBySubmit);
    }

    unbindEvents() {
        // DOM events
        $(window).off('statechange', this.onStateChange);
        $(window).off('popstate', this.onPopState);
        $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
        $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
        $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
        $(this.options.clearFacetSelector).off('click', this.onClearFacet);

        // Hooks
        hooks.off('facetedSearch-facet-clicked', this.onFacetClick);
        hooks.off('facetedSearch-range-submitted', this.onRangeSubmit);
        hooks.off('sortBy-submitted', this.onSortBySubmit);
    }

    onClearFacet(event) {
        const $link = $(event.currentTarget);
        const url = $link.attr('href');

        event.preventDefault();
        event.stopPropagation();

        // Update URL
        urlUtils.goToUrl(url);
    }

    onToggleClick(event) {
        const $toggle = $(event.currentTarget);
        const $navList = $($toggle.attr('href'));

        // Prevent default
        event.preventDefault();

        // Toggle visible items
        this.toggleFacetItems($navList);
    }

    onFacetClick(event, currentTarget) {
        const $link = $(currentTarget);
        const url = $link.attr('href');

        event.preventDefault();

        $link.toggleClass('is-selected');

        // Update URL
        urlUtils.goToUrl(url);

        if (this.options.modalOpen) {
            this.options.modal.close();
        }
    }

    onSortBySubmit(event, currentTarget) {
        const url = Url.parse(window.location.href, true);
        const queryParams = $(currentTarget).serialize().split('=');

        url.query[queryParams[0]] = queryParams[1];
        delete url.query.page;

        // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
        const urlQueryParams = {};
        Object.assign(urlQueryParams, url.query);

        event.preventDefault();

        urlUtils.goToUrl(Url.format({ pathname: url.pathname, search: urlUtils.buildQueryString(urlQueryParams) }));
    }

    onRangeSubmit(event, currentTarget) {
        event.preventDefault();

        if (!this.priceRangeValidator.areAll(nod.constants.VALID)) {
            return;
        }

        const url = Url.parse(window.location.href, true);
        let queryParams = decodeURI($(currentTarget).serialize()).split('&');
        queryParams = urlUtils.parseQueryParams(queryParams);

        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                url.query[key] = queryParams[key];
            }
        }

        // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
        const urlQueryParams = {};
        Object.assign(urlQueryParams, url.query);

        urlUtils.goToUrl(Url.format({ pathname: url.pathname, search: urlUtils.buildQueryString(urlQueryParams) }));
    }

    onStateChange() {
        this.updateView();
    }

    onAccordionToggle(event) {
        const $accordionToggle = $(event.currentTarget);
        const collapsible = $accordionToggle.data('collapsibleInstance');
        const id = collapsible.targetId;

        if (collapsible.isCollapsed) {
            this.collapsedFacets = _.union(this.collapsedFacets, [id]);
        } else {
            this.collapsedFacets = _.without(this.collapsedFacets, id);
        }
    }

    onPopState() {
        if (document.location.hash !== '') return;

        $(window).trigger('statechange');
    }
}

export default FacetedSearch;
