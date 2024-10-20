import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import Pace from 'pace-js';
import inView from 'in-view';
import 'slick-carousel';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'; 

let context;
let len;
let id_array = new Array();
let ids = new Array();
const elem = $('[data-product-card-options]');

var cnt = 0;
var response = new Array();
export class ProductCardColorSwatches {
    constructor($scope) {
        var jsContext;

        jsContext = this.$scope;
        this.$scope = $scope;
        this.productId = $scope.data('product-id');
        this.$content = $scope.find('[data-product-card-options-content]');
        this.$cardImg = $scope.find('.swatch-card-image').first();
        this.$cardFigure = $scope.find('.figure-content');
        this.$cardImg.on('load', () => {
            this.$cardFigure.removeClass('loading');
        });

        for (let index1 = 0; index1 <= cnt; index1++) {
            var res = response[index1];

            var products_len = res.data.site.products.edges.length;
            var attributesData = res.data.site.products.edges || {};
            const rec_data = attributesData;
            for (let index2 = 0; index2 < products_len; index2++) {
                if (attributesData[index2].node['entityId'] == this.productId) {
                    // Request in-stock attributes
                    
                    let productUrl = attributesData[index2].node["path"];
                    Pace.ignore(() => {
                        if (typeof attributesData.in_stock_attributes === 'object' || attributesData[index2].node['inventory']['isInStock']) {
                            Pace.ignore(() => {

                                if (attributesData[index2].node['productOptions'].edges.length > 0) {

                                    var swatch_cnt = attributesData[index2].node['productOptions'].edges.length;
                                    var swatch_val = attributesData[index2].node['productOptions'].edges;
                                    var $swatch_html = "<div class='product-option-swiper'><div class='option_section '>";
                                    for (let index3 = 0; index3 < swatch_cnt; index3++) {
                                        var id = swatch_val[index3].node['entityId'];
                                        if (swatch_val[index3].node['displayStyle'] == 'Swatch')//swatch_val[index3].node['displayName']=='Color' && 
                                        {
                                            var vals_len = swatch_val[index3].node['values'].edges.length;
                                            var cnt = 0;
                                            for (let index4 = 0; index4 < vals_len; index4++) {
                                                cnt++;
                                                var col_id = swatch_val[index3].node['values'].edges[index4].node['entityId'];
                                                var label = swatch_val[index3].node['values'].edges[index4].node['label'];
                                                var col = swatch_val[index3].node['values'].edges[index4].node['hexColors'].toString();
                                                if (col.search(',') > 0) {
                                                    var temp = col.split(',');
                                                    if (temp[0] == "#000000") {

                                                        col = temp[1].toString();
                                                    }
                                                }
                                                var img_url = swatch_val[index3].node['values'].edges[index4].node['imageUrl'];
                                                if (img_url == null)
                                                    $swatch_html += "<div class='options_slide '  data-swatch-count='" + cnt + "'><a class='productCard-colorSwatch' href='"+ productUrl +"' data-product-swatch-id='" + id + "' data-product-swatch-value='" + col_id + "' data-product-option-value='" + col_id + "' data-product-option-id='" + id + "' data-product-option-label='" + label + "' ><span class='productCard-colorSwatch-color' title='" + label + "' style='background-color: " + col + "'></span></a></div>";
                                                else
                                                    $swatch_html += "<div class='options_slide '  data-swatch-count='" + cnt + "'><a class='productCard-colorSwatch' href='"+ productUrl +"' data-product-swatch-id='" + id + "' data-product-swatch-value='" + col_id + "' data-product-option-value='" + col_id + "' data-product-option-id='" + id + "' data-product-option-label='" + label + "'><img class='productCard-colorSwatch-color' src='" + img_url + "' alt='" + label + "' title='" + label + "'></a></div>";


                                            }
                                        }
                                        else {
                                            if (typeof swatch_val[index3].node['values'] !== 'undefined') {
                                                var vals_len = swatch_val[index3].node['values'].edges.length;
                                                for (let index4 = 0; index4 < vals_len; index4++) {
                                                    var default_val = swatch_val[index3].node['values'].edges[index4].node['isDefault'];
                                                    if (default_val == true) {
                                                        var val_id = swatch_val[index3].node['values'].edges[index4].node['entityId'];
                                                        $swatch_html += "<span style='display:none' data-product-attribute-id='" + id + "' data-product-attribute-value='" + val_id + "'></span>";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    this.$content.html($swatch_html);
                                }
                                // Delete out-of-stock attributes
                                this.$content.find('[data-product-option-value]').each((i, a) => {
                                    const attrId = $(a).data('product-option-value');

                                    if (typeof attributesData.in_stock_attributes === 'object' && attributesData.in_stock_attributes.indexOf(attrId) === -1) {
                                        $(a).remove();
                                    }
                                });
                                this.$content.addClass('loaded');
                                this.$content.removeClass('loading');
                                $('.card-swatch-body .card-text.card-text--colorswatches').each(function () {
                                    $(this).find(".option_section .options_slide").each(function () {
                                        if ($(this).index() > 4) {
                                            if ($(this).attr('data-swatch-count') > 3) {

                                            }
                                        }
                                    });
                                    var timer;
                                    var li_options_slide = 0;
                                    function hide_swatches(li_prdct_lngth) {
                                        if (li_prdct_lngth > 0) {
                                            clearInterval(timer);
                                            $("li.product").each(function () {
                                                var swatch_identify = '';
                                                $(this).find("article .card-swatch-body .card-text--colorswatches").first().find("ul.option_section li.options_slide").each(function (index) {
                                                    if (index == 0) {
                                                        if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                            swatch_identify = "color";
                                                        }
                                                        else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                            swatch_identify = "pattern";
                                                        }
                                                        else if ($(this).find("input.form-radio").length !== 0) {
                                                            swatch_identify = "size";
                                                        }
                                                    }
                                                    if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                        if (swatch_identify != "color") {
                                                            $(this).css('display', 'none');
                                                        }
                                                    }
                                                    else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                        if (swatch_identify != "pattern") {
                                                            $(this).css('display', 'none');
                                                        }
                                                    }
                                                    else if ($(this).find("input.form-radio").length !== 0) {
                                                        if (swatch_identify != "size") {
                                                            $(this).css('display', 'none');
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    timer = setInterval(function () {
                                        li_options_slide = $('li.options_slide').length;
                                        hide_swatches(li_options_slide);
                                    }, 3000);
                                });
                            });
                        }
                        else {
                            this.$content.addClass('loaded');
                            this.$content.removeClass('loading');
                            $('.card-swatch-body .card-text.card-text--colorswatches').each(function () {
                                $(this).find(".option_section .options_slide").each(function () {
                                    if ($(this).index() > 4) {
                                        if ($(this).attr('data-swatch-count') > 3) {
                                        }
                                    }
                                });
                                var timer;
                                var li_options_slide = 0;
                                function hide_swatches(li_prdct_lngth) {
                                    if (li_prdct_lngth > 0) {
                                        clearInterval(timer);
                                        $("li.product").each(function () {
                                            var swatch_identify = '';
                                            $(this).find("article .card-swatch-body .card-text--colorswatches").first().find("ul.option_section li.options_slide").each(function (index) {
                                                if (index == 0) {
                                                    if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                        swatch_identify = "color";
                                                    }
                                                    else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                        swatch_identify = "pattern";
                                                    }
                                                    else if ($(this).find("input.form-radio").length !== 0) {
                                                        swatch_identify = "size";
                                                    }
                                                }
                                                if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                    if (swatch_identify != "color") {
                                                        $(this).css('display', 'none');
                                                    }
                                                }
                                                else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                    if (swatch_identify != "pattern") {
                                                        $(this).css('display', 'none');
                                                    }
                                                }
                                                else if ($(this).find("input.form-radio").length !== 0) {
                                                    if (swatch_identify != "size") {
                                                        $(this).css('display', 'none');
                                                    }
                                                }
                                            });
                                        });
                                    }
                                }
                                timer = setInterval(function () {
                                    li_options_slide = $('li.options_slide').length;
                                    hide_swatches(li_options_slide);
                                }, 3000);
                            });
                        }
                        loadSwiperForOptions();
                    });
                }
            }
        }

        $scope.on('touchstart mouseover click', '[data-product-option-id]', (event) => {
            event.preventDefault();
            const $a = $(event.currentTarget);
            $scope.find('.options_slide.active').removeClass("active");
            $a.parent('.options_slide').addClass("active");
            var imageLabel = $a.data("product-option-label");
            var productImages = $a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").attr("data-images");
            
            if(productImages) {
                var productImagesList = JSON.parse(productImages);

                let product_image_html = '';
                let product_card_url = $a.parents("[data-product-card-options]").find(".card-title a").attr("href");
                let product_card_name = $a.parents("[data-product-card-options]").find(".card-title a").text().trim();

                let sectionHeight = $a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").outerHeight(true);
                $a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").css("height", sectionHeight + "px");
                $a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").addClass("img--loading");

                let productImageLength = 0;
    
                if(productImagesList && productImagesList.length > 1) {
                    productImagesList.forEach((image, index) => {
                        if(productImageLength < 2 && image.node.altText != "" && (image.node.altText.toLowerCase().indexOf(imageLabel.toLowerCase()) > -1)) {
                            product_image_html = product_image_html + `<a href="${product_card_url}"
                                class="card-figure__link swiper-slide" data-event-type="product-click">
                                    <img src="${image.node.url}" alt="${image.node.altText ? image.node.altText : product_card_name}" title="${product_card_name}" data-sizes="auto" class="swatch-card-image card-image lazyload">
                                </a>`;

                            productImageLength = productImageLength + 1;
                        }
                    });
    
                    if(product_image_html == "") {
                        productImagesList.forEach((image, index) => {
                            if(productImageLength < 2 ){
                                product_image_html = product_image_html + `<a href="${product_card_url}"
                                class="card-figure__link swiper-slide" data-event-type="product-click">
                                    <img src="${image.node.url}" alt="${image.node.altText ? image.node.altText : product_card_name}" title="${product_card_name}" data-sizes="auto" class="swatch-card-image card-image lazyload">
                                </a>`;
                                productImageLength = productImageLength + 1;
                            }
                        });
                    }
    
                    $a.parents("[data-product-card-options]").find(".card-img-container").html(product_image_html);
                    loadProductGalleryNew($a);
                } else {
                    productImagesList.forEach((image, index) => {
                        if(productImageLength < 2 && image.node.altText != "" && (image.node.altText.toLowerCase().indexOf(imageLabel.toLowerCase()) > -1)) {
                            product_image_html = product_image_html + `<a href="${product_card_url}"
                                class="card-figure__link swiper-slide" data-event-type="product-click">
                                    <img src="${image.node.url}" alt="${image.node.altText ? image.node.altText : product_card_name}" title="${product_card_name}" data-sizes="auto" class="swatch-card-image card-image lazyload">
                                </a>`;
                                productImageLength = productImageLength + 1;
                        }
                    });
    
                    $a.parents("[data-product-card-options]").find(".card-img-container").html(product_image_html);
                    loadProductGalleryNew($a);
                }
            }
        });
    }
}

function check() {
    len = $('[data-product-card-options]').length;

    var t = 0;
    var n = 0;
    if (len > 0) {
        $('[data-product-card-options]').each((i, el) => {
            id_array[n] = $(el).data('product-id');
            if (n >= 49) {
                t++;
                if (n == 49)
                    cnt++;
                if (t == 49) {
                    t = 0;
                    cnt++;
                }
            }
            if (n == 0 || t + 1 == 49 || t == 1)
                ids[cnt] = $(el).data('product-id') + ',';
            else if (n + 1 == len)
                ids[cnt] += $(el).data('product-id');
            else
                ids[cnt] += $(el).data('product-id') + ',';
            n++;
        });

        if (context.showSwatch) {
            for (let index = 0; index <= cnt; index++) {
                response[index] = graphqlquery(ids[index]);

            }
            jQuery('[data-product-card-options]').each((i, el) => {
                if (!$(el).data('product-card-colorswatches-instance')) {
                    $(el).data('product-card-colorswatches-instance', new ProductCardColorSwatches($(el)));
                }
            });

            firstLoadImage(response);

        }
    }
}

function firstLoadImage(graphQLData){
    let products_array = graphQLData[0].data.site.products.edges || {};
    if(products_array.length) {
        products_array.forEach((product, index) => {

            let product_card_id = product.node.entityId;
            let product_card_name = product.node.name;
            let product_card_url = product.node.path;
            let product_image_array = product.node.images.edges;
            let imageLabel = $(".product--custom-card-" + product_card_id).find(".option_section .options_slide[data-swatch-count='1'] [data-product-option-label]").data("product-option-label");
            $(".product--custom-card-" + product_card_id).find(".option_section .options_slide[data-swatch-count='1']").addClass("active");
            let product_image_html = '';
            if(product_image_array.length) {
                let productImageLength = 0;
                product_image_array.forEach((image, index) => {
                    if(productImageLength < 2 && image.node.altText != "" && imageLabel && (image.node.altText.toLowerCase().indexOf(imageLabel.toLowerCase()) > -1)) {
                        product_image_html = product_image_html + `<a href="${product_card_url}"
                            class="card-figure__link swiper-slide" data-event-type="product-click">
                                <img src="${image.node.url}" alt="${image.node.altText ? image.node.altText : product_card_name}" title="${product_card_name}" data-sizes="auto" class="swatch-card-image card-image lazyload">
                            </a>`;

                            productImageLength = productImageLength + 1;
                    }
                });

                if(product_image_html == "") {
                    product_image_array.forEach((image, index) => {
                        if(productImageLength < 2) {
                            product_image_html = product_image_html + `<a href="${product_card_url}"
                            class="card-figure__link swiper-slide" data-event-type="product-click">
                                <img src="${image.node.url}" alt="${image.node.altText ? image.node.altText : product_card_name}" title="${product_card_name}" data-sizes="auto" class="swatch-card-image card-image lazyload">
                            </a>`;

                            productImageLength = productImageLength + 1;
                        }
                    });
                }

            }
        
            $(".product--custom-card-" + product_card_id).find(".card-img-container").attr("data-images", (JSON.stringify(product_image_array)));
            $(".product--custom-card-" + product_card_id).find(".card-img-container").html(product_image_html);
            loadProductGalleryNew();
        });
    }
}

function loadProductGalleryNew($a) {
    if($a != undefined) {
        $a.parents("[data-product-card-options]").find(".card-figure .card-img-container").css("height", "");
    }

    return;
    if($a === undefined) {
        Swiper.use([Navigation, Pagination, Autoplay]);

        const  productSwiper = new Swiper(".card-image-slider", {
            initialSlide: 0,
            spaceBetween: 30,
            slidesPerView: 1,
            spaceBetween: 30,
            freeMode: true,

            navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            },
        });
    } else {
        if($a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").hasClass("swiper-initialized")) {

            Swiper.use([Navigation, Pagination, Autoplay]);

            const  productSwiper = new Swiper(".card-image-slider", {
                initialSlide: 0,
                spaceBetween: 30,
                slidesPerView: 1,
                spaceBetween: 30,
                freeMode: true,

                navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                },
            });

            $a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").css("height", "");
            $a.parents("[data-product-card-options]").find(".card-figure .card-image-slider").removeClass("img--loading");

        }
    }
}

function loadSwiperForOptions(){
    return;
  
    Swiper.use([Navigation, Pagination, Autoplay]);

    const  productSwiper = new Swiper(".product-option-swiper", {
        initialSlide: 0,
        slidesPerView: 4,
        freeMode: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 2
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4
            }
          }
    });
}

export function inViewCheck(localContext, eventEl = window) {

    if (localContext) {
        context = localContext;
    }

    if (!context) {
        return;
    }

    const $eventEl = $(eventEl);

    inView.offset(-200);

    if ($eventEl.data('productCardColorswatchesInViewCheckEvent')) {
        return;
    }

    check();

    $eventEl.on('scroll resize load', check());
    $eventEl.data('productCardColorswatchesInViewCheckEvent', check());

    $(window).on('resize', function(){
        $("[data-product-card-options]").find(".card-figure .card-image-slider").css("height", "");
    });
}
export function graphqlquery(prod_ids) {

    if (typeof context.bearerToken !== 'undefined') {

        var bearerToken = context.bearerToken;
        var query =
            `query ProductsWithImagesAndSwatches {
                site {
                  products(entityIds:[`+ prod_ids + `],first:50){
                    edges {
                      node {
                        entityId
                        name
                        path
                        images(first: 35) {
                            edges {
                                node {
                                    url(width: 400)
                                    urlOriginal
                                    altText
                                    isDefault
                                }
                            }
                        }
                        defaultImage {
                            url(width: 400)
                            urlOriginal
                            altText
                            isDefault
                        }
                        ...productInformation
                        variants(first:50){
                            edges {
                                cursor
                                node {
                                  entityId
                                  options
                                  {
                                    edges
                                    {
                                      node
                                      {
                                          values{
                                          edges
                                          {
                                            node
                                            {
                                              label
                                            }
                                          }
                                        }
                                        displayName
                                      }
                                    }
                                  }
                                  defaultImage {
                                    url(width: 1000)
                                  }
                                }
                              }
                            }
                          productOptions {
                              edges {
                                node {
                                  entityId
                                  displayName
                                  isVariantOption
                                  ... on MultipleChoiceOption {
                                    displayStyle
                                    entityId
                                    isVariantOption
                                    values {
                                      edges {
                                        node {
                                          entityId
                                          label
                                          isDefault
                                          ... on SwatchOptionValue {
                                            hexColors
                                            imageUrl(width: 35)
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                    }
                  }
                }
              }
            }
            fragment productInformation on Product {
                        inventory{
                          isInStock
                        }
                      }`


        var graphql_query_result = $.ajax({

            url: "/graphql",
            contentType: "application/json",
            type: 'POST',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            },
            data: JSON.stringify({ query: query }),
            success: function (productSlickData) {

            }
        });
        return graphql_query_result.responseJSON;
    }

}

export function graphqlqueryvariants(prod_id, cur) {

    if (typeof context.bearerToken !== 'undefined') {

        var bearerToken = context.bearerToken;
        var query =
            `query ProductsWithImagesAndSwatches {
                site {
                  products(entityIds:[`+ prod_id + `]){
                    edges {
                      node {
                        entityId
                        name
                        ...productInformation
                        variants(first:50,after:"`+ cur + `"){
                            edges {
                                cursor
                                node {
                                  entityId
                                  options
                                  {
                                    edges
                                    {
                                      node
                                      {
                                          values{
                                          edges
                                          {
                                            node
                                            {
                                              label
                                            }
                                          }
                                        }
                                        displayName
                                      }
                                    }
                                  }
                                  defaultImage {
                                    url(width: 1000)
                                  }
                                }
                              }
                            }
                          productOptions {
                              edges {
                                node {
                                  entityId
                                  displayName
                                  ... on MultipleChoiceOption {
                                    displayStyle
                                    entityId
                                    values {
                                      edges {
                                        node {
                                          entityId
                                          label
                                          isDefault
                                          ... on SwatchOptionValue {
                                            hexColors
                                            imageUrl(width: 35)
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                    }
                  }
                }
            }
            fragment productInformation on Product {
                        inventory{
                          isInStock
                        }
                      }`

        var graphql_query_result = $.ajax({

            url: "/graphql",
            contentType: "application/json",
            type: 'POST',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            },
            data: JSON.stringify({ query: query }),
            success: function (productSlickData) {

            }
        });
        return graphql_query_result.responseJSON;
    }

}
