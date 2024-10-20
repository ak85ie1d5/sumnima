/* eslint-disable */
import $ from 'jquery';
import beefup from 'beefup';

// core version + navigation, pagination modules:
import Swiper, {
    Navigation,
    Pagination,
    Autoplay,
    EffectCoverflow,
    Mousewheel,
    Keyboard,
    Zoom,
    Scrollbar,
    FreeMode,
    Parallax,
    EffectCreative

} from 'swiper';
import AOS from 'aos';
import {
    Fancybox
} from "@fancyapps/ui";


import {
    remove
} from 'lodash';

import LocomotiveScroll from 'locomotive-scroll';
import ScrollReveal from 'scrollreveal';

export default (function(context) {


        if ($('.page-heading:contains("features")').length > 0) {
        $('body').addClass('features');
        }

//

if($('body.search #faceted-search-container').length === 0) {
    $('body.search').addClass("shopByPrice-search")
}


$('.productGrid.productGrid--maxCol12').each(function() {
    var numOfLi = $(this).find('li').length;

    if (numOfLi % 4 === 0) {
            $(this).addClass('grid-4')
    }else if (numOfLi % 6 === 0) {
        $(this).addClass('grid-6')
    }

});


setTimeout(function() {
    if($('.logo-loading').length > 0) {
        $('.logo-loading').remove();
    }
},100);


//


// video carousel

setInterval(function () {

         if ($(window).width() > 1023) { 
    var imageHeight = $('.CarouselHome .swiper-wrapper .video-slider img').height();
    var originalHeight = $('.CarouselHome').height();
$('.CarouselHome').height(imageHeight);
}else {
    $('.CarouselHome').height(originalHeight);
}
});



setInterval(function () {

 if ($('.category-description div[data-test-id="hero-image-title"]').length > 0) {
            $(".category-description").addClass("hidetitle");
            $(".header").addClass("invert");
        } else {

        };
});

//

if($('body.category').length > 0 || $('body.brand').length > 0){
    if($('.page-sidebar#faceted-search-container').length === 0){
        $(".body").addClass("no-filters");
    }
    if($('.page-sidebar#faceted-search-container #facetedSearch-navList').length === 0){
        $(".body").addClass("no-filtersSidebar");
    }
}
if($('body.brand').length > 0){
    if($('.page-sidebar#faceted-search-container .sidebarBlock .no-facet-enable').length){
        $(".body").addClass("no-filters");
    }
}
    $(document).on('click', '.no-filtersSidebar .sidebarBlock.shop_by_price .sidebarBlock-heading', function() {
        if ($(window).width() < 1023) {
            if($('.no-filtersSidebar .sidebarBlock.shop_by_price .form-fieldset').hasClass("show")){
                $('.no-filtersSidebar .sidebarBlock.shop_by_price .form-fieldset').removeClass("show");
            }else{
                $('.no-filtersSidebar .sidebarBlock.shop_by_price .form-fieldset').addClass("show");
            }
            
        }
    });

    $(document).on('click', '.no-filtersSidebar .sidebarBlock.shop_by_price svg', function() {
        if ($(window).width() < 1023) {
            if($('.no-filtersSidebar .sidebarBlock.shop_by_price .form-fieldset').hasClass("show")){
                $('.no-filtersSidebar .sidebarBlock.shop_by_price .form-fieldset').removeClass("show");
            }else{
                $('.no-filtersSidebar .sidebarBlock.shop_by_price .form-fieldset').addClass("show");
            }
            
        }
    });
//

if ($(window).width() > 1023) {

    setTimeout(function () {
    var slides = $('.subcategories .swiper-slide'); 


    slides.each(function (index) {
        var slide = $(this);
        setTimeout(function () {
            slide.addClass('fade-up'); 
        }, 100 * index); 
    });

    }, 1000);

}

if($('body').hasClass('aos-active')) {

var processedElements = [];

function addFadeUpClassToVisibleArticles() {
    var liImages = $('.category article figure');

    liImages.each(function (index) {
        var liImage = $(this);

        // Check if this element has already been processed
        if (processedElements.indexOf(liImage[0]) === -1) {
            var elementOffsetTop = liImage.offset().top;
            var elementHeight = liImage.height();
            var windowHeight = $(window).height();
            var windowScrollTop = $(window).scrollTop();

            // Check if any part of the article is visible
            if (elementOffsetTop + elementHeight >= windowScrollTop && elementOffsetTop <= windowScrollTop + windowHeight) {
                setTimeout(function () {
                    liImage.addClass('fade-up');
                    processedElements.push(liImage[0]);
                }, 30 * index);
            }
        }
    });
}

$(document).ready(function () {
    addFadeUpClassToVisibleArticles();
});

$(window).scroll(function () {
    addFadeUpClassToVisibleArticles();
});

    
}

const sr = ScrollReveal({
    delay: 10,
});

sr.reveal('#main-content div[data-sub-layout]', { interval: 50});


const pr = ScrollReveal({
    delay: 800,
});

pr.reveal('.productView.main section , .productView.main article.productView-description', { interval: 120});



// locomotive

if ($('.main-locomotive').length > 0) {
        const locomotiveScroll = new LocomotiveScroll({
            autoResize: true,
           triggerRootMargin: '-1px -1px -1px -1px', 
            normalizeWheel: true,
             smooth: true,
  tablet: {
    breakpoint: 0,     
  }

});

locomotiveScroll.lenisInstance.options.content.addEventListener('wheel', (event) => {
    const paths = event.composedPath();

    paths.find((el) => {
        if(el instanceof HTMLElement && el.classList.contains('size-chart-content')) {
            event.stopPropagation();

            return;
        }
    })
        paths.find((el) => {
        if(el instanceof HTMLElement && el.classList.contains('favourite-content')) {
            event.stopPropagation();

            return;
        }
    })
});




    $('.main-locomotive div[data-layout-name="four-two"]').attr('data-scroll-section', '');
 

    $('.main-locomotive div[data-layout-name="four-two"] div[data-test-id="hero-image-title"]').attr('data-scroll','').attr('data-scroll-speed','.1');

        
 
 $('.main-locomotive div.heroCarousel-content').attr('data-scroll','').attr('data-scroll-speed','.1');

 $('.main-locomotive .productSwiper').attr('data-scroll','').attr('data-scroll-speed','.2');

  $('.main-locomotive .main.full.homepage .container ul.productGrid').attr('data-scroll','').attr('data-scroll-speed','.2');
    $('.main-locomotive .productView .container ul.productGrid').attr('data-scroll','').attr('data-scroll-speed','.2');

 $('.main-locomotive .homepage h2').not("article.card .card-title").attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');
  $('.main-locomotive .product-wrapper h2').not("article.card .card-title").attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-position', 'end, start');
  $('.main-locomotive .reviews-content').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');
 // $('.main-locomotive .category-description h1.page-heading').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');
  $('.main-locomotive .main.full.homepage .blog-homepage .blogSwiper').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');
  $('.main-locomotive div.marquee-instagram').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');
  $('.main-locomotive footer .container').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');

 $('.main-locomotive .social-icons').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');
 $('.main-locomotive section.footer-info').attr('data-scroll','').attr('data-scroll-speed','.1').attr('data-scroll-offset', '-20%, -20%');

}

 //


function resizeImage() {
     if ($(window).width() > 1023) { 

$('<span class="image-resize"><svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><title/><polyline points="304 96 416 96 416 208" style="fill:none;stroke:#888888;stroke-linecap:round;stroke-linejoin:round;stroke-width:22px"/><line style="fill:none;stroke:#888888;stroke-linecap:round;stroke-linejoin:round;stroke-width:22px" x1="405.77" x2="111.98" y1="106.2" y2="400.02"/><polyline points="208 416 96 416 96 304" style="fill:none;stroke:#888888;stroke-linecap:round;stroke-linejoin:round;stroke-width:22px"/></svg></span>').insertBefore('.productView.main .productView-images figure')

}

}

        $(document).on('click', '.image-resize', function() {
            if($('.productView.main').hasClass('gallery-left')) {
                $('.productView.main').removeClass('gallery-left');
            }else {
                $('.productView.main').addClass('gallery-left');
            }
        });

resizeImage();
        $(window).resize(function() {
            $('.image-resize').remove();
            resizeImage();
        });
//
    if ($('.main-layout').hasClass("icon-layout")) {


             if ($(window).width() > 1023) { 


        var layoutClasses = ["standard", "box", "full"];


        function updateMainLayout() {
            if ($(window).width() > 1023) {
                $('<ul class="layout-switch"><li class="theme-standard"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="256" height="256" viewBox="0, 0, 256, 256"><g id="Layer_1"><g><path d="M40,48 L216,48 C220.418,48 224,51.582 224,56 L224,200 C224,204.418 220.418,208 216,208 L40,208 C35.582,208 32,204.418 32,200 L32,56 C32,51.582 35.582,48 40,48 z" fill="#FFFFFF"/><path d="M40,48 L216,48 C220.418,48 224,51.582 224,56 L224,200 C224,204.418 220.418,208 216,208 L40,208 C35.582,208 32,204.418 32,200 L32,56 C32,51.582 35.582,48 40,48 z" fill-opacity="0" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g><g><path d="M63.833,48 L192.167,48 C195.388,48 198,51.582 198,56 L198,200 C198,204.418 195.388,208 192.167,208 L63.833,208 C60.612,208 58,204.418 58,200 L58,56 C58,51.582 60.612,48 63.833,48 z" fill="#FFFFFF"/><path d="M63.833,48 L192.167,48 C195.388,48 198,51.582 198,56 L198,200 C198,204.418 195.388,208 192.167,208 L63.833,208 C60.612,208 58,204.418 58,200 L58,56 C58,51.582 60.612,48 63.833,48 z" fill-opacity="0" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g></g></svg></li><li class="theme-full"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="256" height="256" viewBox="0, 0, 256, 256"><g id="Layer_1"><g><path d="M40,48 L216,48 C220.418,48 224,51.582 224,56 L224,200 C224,204.418 220.418,208 216,208 L40,208 C35.582,208 32,204.418 32,200 L32,56 C32,51.582 35.582,48 40,48 z" fill="#FFFFFF"/><path d="M40,48 L216,48 C220.418,48 224,51.582 224,56 L224,200 C224,204.418 220.418,208 216,208 L40,208 C35.582,208 32,204.418 32,200 L32,56 C32,51.582 35.582,48 40,48 z" fill-opacity="0" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g></g></svg></li><li class="theme-box"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="256" height="256" viewBox="0, 0, 256, 256"><g id="Layer_1"><g><path d="M40,48 L216,48 C220.418,48 224,51.582 224,56 L224,200 C224,204.418 220.418,208 216,208 L40,208 C35.582,208 32,204.418 32,200 L32,56 C32,51.582 35.582,48 40,48 z" fill="#C4C4C4"/><path d="M40,48 L216,48 C220.418,48 224,51.582 224,56 L224,200 C224,204.418 220.418,208 216,208 L40,208 C35.582,208 32,204.418 32,200 L32,56 C32,51.582 35.582,48 40,48 z" fill-opacity="0" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g><g><path d="M82.625,48 L173.375,48 C175.653,48 177.5,51.582 177.5,56 L177.5,200 C177.5,204.418 175.653,208 173.375,208 L82.625,208 C80.347,208 78.5,204.418 78.5,200 L78.5,56 C78.5,51.582 80.347,48 82.625,48 z" fill="#FFFFFF"/><path d="M82.625,48 L173.375,48 C175.653,48 177.5,51.582 177.5,56 L177.5,200 C177.5,204.418 175.653,208 173.375,208 L82.625,208 C80.347,208 78.5,204.418 78.5,200 L78.5,56 C78.5,51.582 80.347,48 82.625,48 z" fill-opacity="0" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g></g></svg></li></ul>').insertBefore('.footer-copyright:first');

            }
        }

        updateMainLayout();

        $(window).resize(function() {
            $('.layout-switch').not('.layout-switch.static').remove();
            updateMainLayout();
        });

$(document).on('click', '.theme-standard', function(event) {
    event.preventDefault(); 
    setLayoutClass("standard");
    $(window).scrollTop(0); 
    $('body').addClass('blink'); 

    setTimeout(function() {
        $('body').removeClass('blink');
    }, 300);
});

$(document).on('click', '.theme-full', function(event) {
    event.preventDefault(); 
    setLayoutClass("full");
    $(window).scrollTop(0); 
    $('body').addClass('blink'); 

    setTimeout(function() {
        $('body').removeClass('blink');
    }, 300);
});

$(document).on('click', '.theme-box', function(event) {
    event.preventDefault(); 
    setLayoutClass("box");
    $(window).scrollTop(0); 
    $('body').addClass('blink');

    setTimeout(function() {
        $('body').removeClass('blink');
    }, 300);
});


        function setLayoutClass(layoutClass, callback) {
            if (!$('body').hasClass(layoutClass)) {
                for (var i = 0; i < layoutClasses.length; i++) {
                    $('body').removeClass(layoutClasses[i]);
                    $('.main-layout').removeClass(layoutClasses[i]);
                }
                $('body').addClass(layoutClass);
                $('.main-layout').addClass(layoutClass);

                // Save the layout class in local storage
                localStorage.setItem('selectedLayout', layoutClass);

                if (typeof callback === 'function') {
                    callback();
                }
            }
        }



        var storedLayout = localStorage.getItem('selectedLayout');

        if (storedLayout) {
            setLayoutClass(storedLayout);
        }


    }
};




    $('div[data-product-attribute="swatch"] .form-option-wrapper').click(function() {
        $(".productView-images").addClass("active");

        setTimeout(function() {
            $(".productView-images").removeClass("active");
        }, 1600); // Remove the class after 2 seconds
    });



    // shop by price filter

    $('<svg><use href="#icon-keyboard-arrow-down"></use></svg>').insertAfter('.sidebarBlock.shop_by_price .sidebarBlock-heading');

    function closeUpdate() {
        if ($(window).width() < 1023) {
            $('<button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button>').appendTo('.sidebarBlock.shop_by_price .navList');
        } else {
            $('.sidebarBlock.shop_by_price .navList .modal-close').remove();
        }

    };
    closeUpdate();
    $(window).resize(function() {
        $('.sidebarBlock.shop_by_price .navList .modal-close').remove();
        closeUpdate();
    });

    $(document).on('click', '.sidebarBlock.shop_by_price .sidebarBlock-heading', function() {
        var pageElement = $('.page.load');
        var priceRange = $(this).parents('.shop_by_price').find('.navList');

        if (!pageElement.hasClass("sidebar-filter")) {
            if (priceRange.is(':visible')) {
                priceRange.hide();
                setTimeout(function() {
                    $('.popUP-bg').removeClass('is-open');
                }, 100);
            } else {
                priceRange.show();

                if ($(window).width() < 1023 && priceRange.length > 0) {
                    setTimeout(function() {
                        $('.popUP-bg').addClass('is-open');
                        $('body').addClass('filter-active');

                    }, 100);

                }


            }
        }

        closeUpdate();
    });

    $(document).on('click', '.sidebarBlock.shop_by_price svg', function() {
        var pageElement = $('.page.load');
        var priceRange = $(this).parents('.shop_by_price').find('.navList');

        if (!pageElement.hasClass("sidebar-filter")) {
            if (priceRange.is(':visible')) {
                priceRange.hide();
            } else {
                priceRange.show();

                if ($(window).width() < 1023 && priceRange.length > 0) {
                    setTimeout(function() {
                        $('.popUP-bg').addClass('is-open');
                        $('body').addClass('filter-active');

                    }, 100);
                }
            }
        }
    });

    $(document).on('click', function(event) {
        var pageElement = $('.page.load');
        var target = $(event.target);

        if (!pageElement.hasClass("sidebar-filter") && !target.closest('.sidebarBlock.shop_by_price').length) {
            $('.sidebarBlock.shop_by_price .navList').hide();
            $('.popUP-bg').removeClass('is-open');
            $('body').removeClass('filter-active');
        }
    });

    // blog layout


    function updateBlogLayout() {
        if ($(window).width() > 1023) {

            $('<ul class="blog-layout"><li class="box-column"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"></path></svg></li><li class="box-row"><svg class="grid-option" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"></path></svg></li></ul>').insertBefore('.blog .blog-grid');

        } else {
            $('blog-layout').remove();
        }
    }

    updateBlogLayout();

    $(window).resize(function() {
        $('.blog-layout').remove();
        updateBlogLayout();
    });




    if ($(window).width() > 1023) {

        function blogHeight() {
            if ($(".blog .blog-grid").hasClass("grid-display")) {
                var maxBlogHeight = 0;

                $(".blog .grid-display .blog").each(function() {
                    if ($(this).height() > maxBlogHeight) {
                        maxBlogHeight = $(this).height();
                    }
                });

                $(".blog .grid-display .blog").height(maxBlogHeight);
            } else {
                $(".blog .blog-grid .blog").css('height', 'auto');
            }
        }

        $(window).resize(function() {
            blogHeight();
        });

        setInterval(function() {
            blogHeight();
        }, 100);

        var savedLayout = localStorage.getItem('gridLayout');
        if (savedLayout === 'row') {
            $('.blog .blog-grid').addClass('grid-display');
            blogHeight(); // Call blogHeight() after adding the class
        } else if (savedLayout === 'column') {
            $('.blog .blog-grid').removeClass('grid-display');
            blogHeight(); // Call blogHeight() after removing the class
        }

        $(document).on('click', '.box-row', function() {
            $('.blog .blog-grid').addClass('grid-display');
            blogHeight(); // Call blogHeight() after adding the class
            localStorage.setItem('gridLayout', 'row'); // Save layout preference
        });

        $(document).on('click', '.box-column', function() {
            $('.blog .blog-grid').removeClass('grid-display');
            blogHeight(); // Call blogHeight() after removing the class
            localStorage.setItem('gridLayout', 'column'); // Save layout preference
        });
    }



    // mobile menu 

if ($(window).width() < 1023) {

         var navPageAction = $(".navPages .navPages-list--menu .navPages-item a.has-subMenu");


         function insertMobileMenuToggle() {

        $(".navPages .navPages-list--menu .navPages-item a.has-subMenu").each(function() {
            var imgElement = $(this).find("img");

            if (imgElement.length === 0) { // Check if imgElement is empty
                $(this).parent().addClass("menu-withoutImg"); // Add the class to anchor element
            }
        });



             $('<span class="mobile-menu--toggle"></span>').insertAfter(navPageAction);
         }

                 function removeMobileMenuToggle() {
            $(".mobile-menu--toggle").remove();
        }


                function handleMobileMenuToggleClick() {
            var clickedli = $(this).parent();
            var clickedliA = clickedli.find('a.has-subMenu:first');
            var $parentSiblings = clickedli.siblings();
            var $parentAction = clickedli.parents('.navPage-subMenu.navPage-subMenu-horizontal:first').siblings();

            if (clickedliA.hasClass('is-open')) {
                $parentSiblings.removeClass('is-hidden');
                $parentAction.removeClass('is-hidden');
                $(this).parents("ul:first").removeClass("subMenu-is-open");
                clickedli.find('.navPage-subMenu.navPage-subMenu-horizontal:first').removeClass("is-open")
                clickedliA.removeClass('is-open');

            } else {

                $parentSiblings.not(clickedli).addClass('is-hidden');
                $parentAction.addClass('is-hidden');
                $(this).parents("ul:first").addClass("subMenu-is-open")
                clickedli.find('.navPage-subMenu.navPage-subMenu-horizontal:first').addClass("is-open")
                clickedliA.addClass('is-open');
            }
        }

            var bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var bodyHasClass = $("body").hasClass("has-activeNavPages");
                    if (bodyHasClass) {
                        insertMobileMenuToggle();
                        $(".mobile-menu--toggle").on("click", handleMobileMenuToggleClick);
                    } else {
                        removeMobileMenuToggle();
                    }
                }
            });
        });

        bodyObserver.observe(document.querySelector("body"), {
            attributes: true
        });

        if ($("body").hasClass("has-activeNavPages")) {
            insertMobileMenuToggle();
            $(".mobile-menu--toggle").on("click", handleMobileMenuToggleClick);
        }

                $('header a.mobileMenu-toggle').click(function () {

                    if($(this).hasClass('is-open')) {
                        $('.navPages .has-subMenu').removeClass('is-open');
                         $('.navPages .navPage-subMenu.navPage-subMenu-horizontal').removeClass('is-open');

                    }
                });
};


    $('<button class="modal-close show" type="button" title="Close" data-drop-down-close=""><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button>').insertAfter('#quickSearch .container .form')

    $('.productView.main .productView-details .productView-price p').each(function() {
        if ($(this).text().trim() === 'Log in for pricing') {
            $(this).addClass('login-for-price');
        }
    });

    // category grid layout 

    if(!$('.main-layout').hasClass('enable-grid--numbers') && !$('.main-layout').hasClass('sidebar-verify')) {
        localStorage.removeItem('sidebar-filter');
        localStorage.removeItem('gridnumberclasses');
    
}

setInterval(function() {
    if($('body.search #product-listing-container.u-hidden').length){
        $("body").addClass("newAndInformation");
    }else{
        $("body").removeClass("newAndInformation");
    }

},100);

    let gridnumberclasses = [];


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


    function addClassAndUpdateArray(className) {
        $('#main-content').addClass(className);

        if (!gridnumberclasses.includes(className)) {
            gridnumberclasses.push(className);

            localStorage.setItem('gridnumberclasses', JSON.stringify(gridnumberclasses));
        }
    }


    function removeClassAndUpdateArray(className) {
        $('#main-content').removeClass(className);

        const index = gridnumberclasses.indexOf(className);
        if (index > -1) {
            gridnumberclasses.splice(index, 1);

            localStorage.setItem('gridnumberclasses', JSON.stringify(gridnumberclasses));
        }
    }


    const storedClasses = localStorage.getItem('gridnumberclasses');
    if (storedClasses) {
        gridnumberclasses = JSON.parse(storedClasses);
        // Apply the stored classes to #main-content
        gridnumberclasses.forEach(className => {
            $('#main-content').addClass(className);
        });
    }

    updateGridNumbers();

    $(window).resize(function() {
        $('.grid-numbers').remove();
        updateGridNumbers();
    });

    setTimeout(function() {
        $('.grid-numbers').remove();
        updateGridNumbers();
    },100);


    if ($('.main-layout').hasClass('sidebar-verify')) {
    
    if(!$('.main-layout').hasClass('enable-grid--numbers')) {
         localStorage.setItem('sidebar-filter', 'true');
    }
           
    
}

    if (localStorage.getItem('sidebar-filter') === 'true') {
        $('.page.load').addClass('sidebar-filter');
    } else {
        $('.page.load').removeClass('sidebar-filter');
    }

    $(document).on('click', '.productgrid-three', function() {
        addClassAndUpdateArray('productgrid-three');
        $('.page.load').addClass('sidebar-filter');
        localStorage.setItem('sidebar-filter', 'true');
        $('.grid-numbers').remove();
        updateGridNumbers();
    });

    $(document).on('click', '.productgrid-filter', function() {
        setTimeout(function() {
            $('.page.load').removeClass('sidebar-filter');
            localStorage.removeItem('sidebar-filter');
            removeClassAndUpdateArray('productgrid-three');
        }, 100);
        $('.grid-numbers').remove();
        updateGridNumbers();
    });

    $(document).on('click', '.productgrid-five', function() {
        setTimeout(function() {
            removeClassAndUpdateArray('productgrid-three');
        }, 100);
        $('.page.load').addClass('sidebar-filter');
        localStorage.setItem('sidebar-filter', 'true');
        $('.grid-numbers').remove();
        updateGridNumbers();
    });

    $(document).on('click', '.productgrid-one', function() {
        addClassAndUpdateArray('productgrid-one');
    });

    $(document).on('click', '.productgrid-two', function() {
        setTimeout(function() {
            removeClassAndUpdateArray('productgrid-one');
        }, 100);
    });
    
    // header component

    var heroImageTitleDivs = $('[data-test-id="hero-image-title"]');


    heroImageTitleDivs.each(function() {
        $(this).parent().addClass('mobile-header').attr('data-scroll','').attr('data-scroll-speed','.1');;
    });


    // dark/light and toggle move
if($('.main-layout').hasClass('enable-theme-switch')) {

    setInterval(function() {
        if ($('#scrollToTopBtn').hasClass('show')) {
            $('.dark-theme--toggle').addClass('move-left');
        } else {
            $('.dark-theme--toggle').removeClass('move-left');
        }
    }, 100);


    $('<div class="toggle-content-button"><div class="dark-theme--toggle"><input aria-label="toggle" type="checkbox" class="checkbox" id="checkbox"><label for="checkbox" class="checkbox-label"><img   width: 20px;     height: 20px;  alt="dark mode" class="fa-moon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI1NiAyNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNTYiIHdpZHRoPSIyNTYiLz48cGF0aCBkPSJNMjE2LjcsMTUyLjZBOTEuOSw5MS45LDAsMCwxLDEwMy40LDM5LjNoMEE5Miw5MiwwLDEsMCwyMTYuNywxNTIuNloiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEyIi8+PC9zdmc+"><img  alt="light mode"      width: 20px;     height: 20px; class="fa-sun" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI1NiAyNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNTYiIHdpZHRoPSIyNTYiLz48Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIGZpbGw9Im5vbmUiIHI9IjYwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxMiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEyIiB4MT0iMTI4IiB4Mj0iMTI4IiB5MT0iMzYiIHkyPSIyOCIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEyIiB4MT0iNjIuOSIgeDI9IjU3LjMiIHkxPSI2Mi45IiB5Mj0iNTcuMyIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEyIiB4MT0iMzYiIHgyPSIyOCIgeTE9IjEyOCIgeTI9IjEyOCIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEyIiB4MT0iNjIuOSIgeDI9IjU3LjMiIHkxPSIxOTMuMSIgeTI9IjE5OC43Ii8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTIiIHgxPSIxMjgiIHgyPSIxMjgiIHkxPSIyMjAiIHkyPSIyMjgiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxMiIgeDE9IjE5My4xIiB4Mj0iMTk4LjciIHkxPSIxOTMuMSIgeTI9IjE5OC43Ii8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTIiIHgxPSIyMjAiIHgyPSIyMjgiIHkxPSIxMjgiIHkyPSIxMjgiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxMiIgeDE9IjE5My4xIiB4Mj0iMTk4LjciIHkxPSI2Mi45IiB5Mj0iNTcuMyIvPjwvc3ZnPg=="><span class="ball"></span></label></div></div>').insertAfter('footer');
    const checkbox = document.getElementById("checkbox");
    const body = document.body;

    // Check local storage for a saved theme preference on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            body.classList.add("dark-theme");
            // Save the theme preference to local storage
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-theme");
            // Remove the theme preference from local storage
            localStorage.removeItem("theme");
        }
    });
  
};

    // hide 0 pill from cart

    setInterval(function() {
        var cartNum = $('.navUser .navUser-section .navUser-item.navUser-item--cart').find('.cart-quantity').text();

        if (cartNum === "0") {

            $('.navUser .navUser-section .navUser-item--cart .cart-quantity').hide()
        } else {
            $('.navUser .navUser-section .navUser-item--cart .cart-quantity').show()
        }
    }, 100);

    $(document).ready(function() {

        function handleDOMChanges(mutationsList, observer) {
            mutationsList.forEach(function(mutation) {
                var target = mutation.target;
                if (target.classList.contains('cloned-quantity')) {
                    var pillNum = $(target).text();


                    pillNum = parseInt(pillNum);

                    if (pillNum === 0) {

                        $('.navUser-item--favourite .cloned-quantity').hide();
                    } else {

                        $('.navUser-item--favourite .cloned-quantity').show();
                    }
                }
            });
        }

        var observerConfig = {
            subtree: true,
            childList: true
        };
        var observer = new MutationObserver(handleDOMChanges);
        observer.observe(document, observerConfig);
    });

    //// 0 pill end 

    var productView = $('.productView.main');

    if (productView.find("div.sale").length > 0) {
        productView.find('.price.price--withoutTax').addClass("red");
    }

    if ($(window).width() < 1023) {


        var startY = 0;
        var endY = 0;

        $(document).on('touchstart', function(event) {
            startY = event.originalEvent.touches[0].clientY;
        });

        $(document).on('touchend', function(event) {
            endY = event.originalEvent.changedTouches[0].clientY;

            var swipeDistance = Math.abs(endY - startY);

            if (endY < startY || swipeDistance < 160) {
                return;
            }

            var sizeChartContent = $('.body .size-chart-content');
            if (sizeChartContent.is(':visible')) {
                $(".size-chart-content").removeClass("fadein");
                $(".size-chart-content-bg").removeClass("fadein");
                $("body").removeClass("sizechart-open");
                $(".productView-details.product-data").show();
            }
            var quickView = $('#modal');
            if (quickView.is(':visible')) {
                quickView.removeClass("open");
                quickView.removeClass("modal--large");
                $("body").removeClass("has-activeModal");
            }

            var previewModal = $('#previewModal')
            if (previewModal.is(':visible')) {
                previewModal.removeClass("open");
                previewModal.removeClass("modal--large");
                $("body").removeClass("has-activeModal");
            }
            var reviewForm = $('#modal-review-form')
            if (reviewForm.is(':visible')) {
                reviewForm.removeClass("open");
                $("body").removeClass("has-activeModal");
            }
            var favoriteModal = $('.favourite-content')
            if (favoriteModal.is(':visible')) {
                favoriteModal.hide();
                $("body").removeClass("favorite-active");
            }
            var filterModal = $('#facetedSearch-navList');
            if (filterModal.is(':visible')) {
                filterModal.hide();
                $("body").removeClass("filter-open");
            }
            var navList = $('.sidebarBlock.shop_by_price .navList');
            if (navList.is(':visible')) {
                navList.hide();
                $('.popUP-bg').removeClass('is-open');
                $("body").removeClass("filter-active");
            }
            var subscriptionForm = $('div.form-toggle--mobile');
            if (subscriptionForm.is(':visible')) {
                $('div.form-toggle--mobile').toggleClass("showonly")
                $('body').removeClass('subscriptionForm-active')
                $('article[data-section-type="newsletterSubscription"] p').toggleClass("showonly");
                $('article[data-section-type="newsletterSubscription"] form').toggleClass("showonly");
            }
        });
    }


    $('<div class="popUP-bg"></div>').insertBefore('.container');

    $('<div class="facetedSearch-bg"></div>').insertBefore('.container');
    // $('<button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button>').appendTo('#facetedSearch-navList');

    $(document).on('click', '.facetedSearch-bg', function() {

        $('body').removeClass("filter-open");
        $('#facetedSearch-navList').hide();
    });

    $('.card-figure').addClass('show-favourite');



    setInterval(function() {
        var productText = $('#productReview_link').text().replace(" reviews", "");
        $('#productReview_link').text(productText);


    }, 100);



    // searchbar start


    var clonedSection = localStorage.getItem('clonedSection');
    var $featuredSections = $('.container .main.full.homepage .featured');

    if (!clonedSection) {
        var $firstSection = $('.container .main.full.homepage .featured');
        var $clonedSection = $firstSection.clone();

        $clonedSection.appendTo('#quickSearch .container');
        clonedSection = $clonedSection.prop('outerHTML');
        localStorage.setItem('clonedSection', clonedSection);
    }


    if (clonedSection === "undefined") {
        var $firstSection = $('.container .main.full.homepage .featured');
        var $clonedSection = $firstSection.clone();

        $clonedSection.appendTo('#quickSearch .container');
        clonedSection = $clonedSection.prop('outerHTML');
        localStorage.setItem('clonedSection', clonedSection);
    } else {
        $('#quickSearch .container').append(clonedSection);
    }

     if(!$('.main-layout').hasClass('enable-search-feature')) {
         localStorage.removeItem('clonedSection');
     };

     if (clonedSection && $featuredSections.length > 0) {
    var currentClonedSection = $featuredSections.map(function() {
        return $(this).prop('outerHTML');
    }).get().join('');

    if (clonedSection !== currentClonedSection) {
        localStorage.setItem('clonedSection', currentClonedSection);
    }else{
    }
    }






    setInterval(function() {
        $('#quickSearch .container .featured:not(:first)').remove();
        $('#quickSearch .container section.featured article.card .card-figure .add-to-favourite').remove();
        $('#quickSearch .container .featured article.card .card-figure .add-to-favourite').remove();
    }, 100);




    // wishlist start



    $(document).ready(function() {
        $('<li class="navUser-item navUser-item--favourite"><span class="navUser-action" href="#" aria-label="Favourite" style="display: block;"><svg aria-labelledby="wishlist-icon" color="#888888" fill="none" height="48px" role="img" stroke="#888888" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path></svg></span></li>').insertBefore('.navUser-section.navUser-section--alt .navUser-item.navUser-item--account');

        $('<span class="add-to-favourite"><svg aria-labelledby="wishlist-icon" color="#888888" fill="none" height="48px" role="img" stroke="#888888" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path></svg></span>').insertAfter('.productView-images figure');

        $('<span class="add-to-favourite"><svg aria-labelledby="wishlist-icon" color="#888888" fill="none" height="48px" role="img" stroke="#888888" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"></path></svg></span>').insertAfter(' .container figcaption.card-figcaption');

        $('<div class="favourite-content"><div class="favourite-container"><ul class="productGrid"></ul></div></div>').insertAfter('body #main-content #alert-modal');

        $('<ul class="favourite-action"></ul>').appendTo('.favourite-content .favourite-container');

        $('<li class="favourite-action--item"><span class="button clear-all-button" >Clear all</span></li>').appendTo('#main-content .favourite-content .favourite-container .favourite-action');

        $('<span class="close-favourite" ><button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button></span>').appendTo('#main-content .favourite-content .favourite-container')



        var storedItems = localStorage.getItem('favouriteItems');
        if (storedItems) {
            $('.favourite-content .favourite-container ul.productGrid').append(storedItems);
            updateCount();
        }

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

        setInterval(function() {
            $('.favourite-content .favourite-container ul.productGrid article .card-figure .add-to-favourite').remove();
            $('.favourite-content .favourite-container ul.productGrid article .card-figure .card-figcaption').remove();
            $('.favourite-content .favourite-container ul.productGrid article .productView-price .price-section.price-section--withoutTax .priceDisplay').remove();


        }, 100);

        $(document).on('click', '.productGrid .remove-button', function() {
            var listItem = $(this).closest('article');
            listItem.remove();



            var favouriteItems = $('.favourite-content .favourite-container ul.productGrid').html();
            localStorage.setItem('favouriteItems', favouriteItems);

            var productId = listItem.data('product-id');

            updateCount();

            if (activeFavourites) {
                var activeFavourites = JSON.parse(localStorage.getItem('activeFavourites'));
                var index = activeFavourites.indexOf(productId);
                if (index !== -1) {
                    activeFavourites.splice(index, 1);
                    localStorage.setItem('activeFavourites', JSON.stringify(activeFavourites));
                };
            };

        });

        $(document).on('click', '.favourite-container .clear-all-button', function() {
            $('.favourite-content .favourite-container ul.productGrid').empty();
            $('.favourite-content').hide();
            $('body').removeClass("favorite-active");

            var favouriteItems = $('.favourite-content .favourite-container ul.productGrid').html();
            localStorage.setItem('favouriteItems', favouriteItems);

            var clonedSection = localStorage.getItem('clonedSection');
            const currentTheme = localStorage.getItem("theme");
            localStorage.removeItem(activeFavourites);
            updateCount();
        });

        setInterval(function() {

            $('.clear-all-button').hide();
            if ($('.favourite-content .favourite-container article').length > 0) {
                $('.clear-all-button').show();
            }
        }, 100);



        $(document).ready(function() {
            var clonedQuantity = $('<span class="countPill countPill--positive cloned-quantity">0</span>');
            $(".navUser-section--alt .navUser-item--favourite .navUser-action svg").after(clonedQuantity);

            updateCount();
        });

        function updateCount() {
            var clonedItemCount = $('.favourite-content .favourite-container article').length;
            $('.navUser-section--alt .cloned-quantity').html(clonedItemCount);
        }

        $('.navUser-section--alt .navUser-item--favourite').on("click", function() {
            $('body').addClass("favorite-active");
            $(".favourite-content").show();
            updateCount();
        });

        $(document).on('click', '.favourite-content-bg', function() {

            $('body').removeClass("favorite-active");
            $('.favourite-content').hide();
        });

        $('.close-favourite').on("click", function() {
            $('body').removeClass("favorite-active");
            $('.favourite-content').hide();
        });
        $('<div class="favourite-content-bg"></div>').insertBefore(".favourite-content");
        $('<h3 class="favourite-content-title">Favourite</h3>').insertBefore(".favourite-container ul.productGrid");


        // // countPill end

        $('.productView.main .productView-images .add-to-favourite').on("click", function() {
            var $wishlistItem = $(this);
            var $favouriteContainer = $('.favourite-content .favourite-container ul.productGrid');

            var productId = $wishlistItem.parents().find('.productView.main .productView-details .productView-options form input[name="product_id"]').val();

            var existingArticle = $favouriteContainer.find('article[data-product-id="' + productId + '"]');
            if (existingArticle.length > 0) {
                existingArticle.remove();
                removeFromLocalStorage(productId);
                updateCount();
                return;
            }

            var productImage = $wishlistItem.parents().find('.productView-img-container img:first').clone();
            var title = $wishlistItem.parents().find('.productView.main .productView-details h1.productView-title').text();
            var link = "products.php?productId=" + productId;
            var price = $wishlistItem.parents().find('.productView.main .productView-details .productView-price').clone();

            var article = $('<article class="card" data-product-id="' + productId + '"><figure class="card-figure"><a href="/' + link + '/"></a></figure><div class="card-body"><h3 class="card-title"><a href="/' + link + '/"></a></h3></div></article>');
            $('<span class="remove-button"><button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button></span>').insertAfter(article.find('.card-figure'));

            article.find('h3.card-title a').text(title);
            article.find('.card-figure a').append(productImage);
            article.find('h3.card-title').after(price);

            article.appendTo($favouriteContainer);

            updateCount();

            var favouriteItems = $favouriteContainer.html();
            localStorage.setItem('favouriteItems', favouriteItems);
        });

        var storedItems = localStorage.getItem('favouriteItems');
        if (storedItems) {
            $('.favourite-content .favourite-container ul.productGrid').html(storedItems);
            updateCount();
        }
    });

    function removeFromLocalStorage(productId) {
        var storedItems = localStorage.getItem('favouriteItems');
        if (storedItems) {
            var $favouriteContainer = $('.favourite-content .favourite-container ul.productGrid');
            var articles = $favouriteContainer.find('article');
            var updatedItems = articles
                .filter(function() {
                    return $(this).data('product-id') !== productId;
                })
                .clone();
            localStorage.setItem('favouriteItems', updatedItems.prop('outerHTML'));
        }
    }

    setInterval(function() {
        var $favouriteContainer = $('.favourite-content .favourite-container ul.productGrid');
        var $articles = $favouriteContainer.find('article');

        $articles.each(function() {
            var productId = $(this).data('product-id');
            if (productId === undefined) {
                $(this).remove();
            }
        });
    }, 100);


    setInterval(function() {
        var $realArticles = $('.add-to-favourite').parents('article');

        $realArticles.each(function() {
            var $realArticle = $(this);
            var realTitle = $realArticle.find('.card-body .card-title').text().trim();

            var $appendArticles = $('.favourite-content .favourite-container .productGrid article');

            var isMatch = false; // Flag to check if a match is found

            $appendArticles.each(function() {
                var $appendArticle = $(this);
                var appendTitle = $appendArticle.find('.card-body .card-title').text().trim();

                if (realTitle === appendTitle) {
                    isMatch = true;
                    return false; // Exit the loop once a match is found
                }
            });

            if (isMatch) {
                $realArticle.find('.add-to-favourite').addClass('favourite-active');
            } else {
                $realArticle.find('.add-to-favourite').removeClass('favourite-active');
            }
        });
    }, 100);
    setInterval(function() {
        var $realProductViews = $('.add-to-favourite').parents('.productView.main');

        $realProductViews.each(function() {
            var $realProductView = $(this);
            var productViewTitle = $realProductView.find('.productView-details.product-data .productView-title').text().trim();

            var $appendArticles = $('.favourite-content .favourite-container .productGrid article');

            var isMatch = false; // Flag to check if a match is found

            $appendArticles.each(function() {
                var $appendArticle = $(this);
                var appendTitle = $appendArticle.find('.card-body .card-title').text().trim();

                if (productViewTitle === appendTitle) {
                    isMatch = true;
                    return false; // Exit the loop once a match is found
                }
            });

            if (isMatch) {
                $realProductView.find('.add-to-favourite').addClass('favourite-active');
            } else {
                $realProductView.find('.add-to-favourite').removeClass('favourite-active');
            }
        });
    }, 100);


    setInterval(function() {
        $('.favourite-content .sale-flag-side, .favourite-content .pre-order-flag').marquee('destroy');



    }, 100);



    //wishlist end



    $('img').each(function() {
        var altText = $(this).attr('alt');
        if (altText && altText.toLowerCase().includes('video')) {
            var newAltText = altText.replace(/ /g, '-').concat('.png');
            $(this).attr('src', '/images/stencil/original/image-manager/' + newAltText);
            $(this).attr('srcset', '/images/stencil/original/image-manager/' + newAltText);
            $(this).attr('data-srcset', '/images/stencil/original/image-manager/' + newAltText);
        }
    });

    setInterval(function() {
        $('img').each(function() {
            var altText = $(this).attr('alt');
            if (altText && altText.toLowerCase().includes('video')) {
                var newAltText = altText.replace(/ /g, '-').concat('.png');
                $(this).attr('src', '/images/stencil/original/image-manager/' + newAltText);
                $(this).attr('srcset', '/images/stencil/original/image-manager/' + newAltText);
                $(this).attr('data-srcset', '/images/stencil/original/image-manager/' + newAltText);
            }
        });
    }, 10000)



    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery1"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery2"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery3"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery4"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery5"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery6"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery7"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery8"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery9"]', {
        // Your custom options
    });
    Fancybox.bind('[data-fancybox="gallery10"]', {
        // Your custom options
    });

    Fancybox.bind('[data-fancybox="gallery11"]', {
        // Your custom options
    });


    $('div[data-layout-name="lightbox-four-two"] div[data-sub-layout] a').each(function(i) {
        $(this).attr('data-fancybox', 'gallery');
    });
     $('div[data-layout-name="Layout-lightbox"] div[data-sub-layout] a img').each(function(i) {
        $(this).attr('data-fancybox', 'gallery');
    });
        
    $('div[data-layout-name="lightbox-instagram"] div[data-sub-layout] a').each(function(i) {
        $(this).attr('data-fancybox', 'gallery');
    });
    $('div[data-layout-name="instagram"] div[data-sub-layout] a').each(function(i) {
        $(this).attr('data-fancybox', 'gallery');
    });

    $('.beefup').beefup({
        openSingle: true
    });



    $(' <span id="scrollToTopBtn" class="scrollTopArrow"><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><circle cx="128" cy="128" fill="none" r="96" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><polyline fill="none" points="94.1 121.9 128 88 161.9 121.9" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="128" x2="128" y1="168" y2="88"/></svg></span>').insertAfter(".footer");

    $('.card-figcaption-body .button--small').each(function() {
        if ($(this).text() === 'Out of stock') {
            $(this).prev('.quickview').hide();
        }
    });

    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    var rootElement = document.documentElement;

    function scrollToTop() {
        // Scroll to top logic
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    scrollToTopBtn.addEventListener("click", scrollToTop);



    //accordion
    $('.accordion').beefup();
    $('.accordion-fade').beefup({
        animation: 'fade',
        openSpeed: 400,
        closeSpeed: 400
    });
    $('.accordion-scroll').beefup({
        scroll: true,
        scrollOffset: -10
    });
    $('.accordion-open').beefup({
        openSingle: true,
    });
    $('.accordion-selfblock').beefup({
        selfBlock: true
    });
    $('.accordion-selfclose').beefup({
        selfClose: true
    });
    $('.accordion-breakpoints').beefup({
        scroll: true,
        scrollOffset: -10,
        breakpoints: [{
            breakpoint: 768,
            settings: {
                animation: 'fade',
                scroll: false
            }
        }, {
            breakpoint: 1024,
            settings: {
                animation: 'slide',
                openSpeed: 800,
                openSingle: true
            }
        }]
    });
    //accordion

    //Swiper
    Swiper.use([Navigation,
        Pagination,
        Autoplay,
        EffectCoverflow,
        Mousewheel,
        Keyboard,
        Zoom,
        Scrollbar,
        FreeMode,
        Parallax,
        EffectCreative
    ]);
    const swiper = new Swiper(".CarouselHome", {


        autoplay: {
            disableOnInteraction: true
        },
        loop: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    const infoSlider = new Swiper(".info-slider", {
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    const productSwiper = new Swiper(".productSwiper", {
        slidesPerView: 1.3,
        grabCursor: true,
        noSwiping: true ,
        onlyExternal: true,

        breakpoints: {
            320: {
                slidesPerView: 1.3
            },
            768: {
                slidesPerView: 3.3
            },
            1261: {
                slidesPerView: 4.3
            }


        },
        scrollbar: {
            el: ".swiper-scrollbar",
        }
    });



    const productSwiperBig = new Swiper(".productSwiperBig", {
        slidesPerView: 2.2,
        grabCursor: true,
        freeMode: true,

        breakpoints: {
            320: {
                slidesPerView: 2.2
            },
            768: {
                slidesPerView: 3.3
            },
            1261: {
                slidesPerView: 4.3
            }


        },
        scrollbar: {
            el: ".swiper-scrollbar",
        }
    });



    const subcategories = new Swiper(".subcategories", {
        cssMode: true,
        slidesPerView: 3,
        spaceBetween: 10, 


        breakpoints: {
            320: {
                slidesPerView: 2.5,
                spaceBetween: 0,
                freeMode: true,
            },
            768: {
                slidesPerView: 4.5,
                spaceBetween: 2,
                freeMode: true,
            },
            1024: {
                slidesPerView: 4.5,
                freeMode: true,
                spaceBetween: 5,
            },
            1200: {
                slidesPerView: 8.5,
                freeMode: true,
                spaceBetween: 5,
            },
        },



    });



    const featuredswiper = new Swiper(".featuredswiper ", {
        slidesPerView: 5,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            810: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },

            1240: {
                slidesPerView: 5,
                spaceBetween: 30,
            },
        },



    });

    const customersReviews = new Swiper(".customersReviews ", {

        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        loop: true,

        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },



        breakpoints: {
            1080: {
                coverflowEffect: {
                    rotate: 15,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
            },

            1120: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
            },
        },



    });


    const reviewSwiper = new Swiper(".reviewSwiper ", {
        spaceBetween: 30,
        slidesPerView: 2.5,
        lazy: true,

        pagination: {
            el: ".swiper-pagination",
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 30,
            },
        },


    });



    const blogswiper = new Swiper(".blogSwiper", {
        spaceBetween: 50,
        slidesPerView: 3,
        lazy: true,


        scrollbar: {
            el: ".swiper-scrollbar",
        },



        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 0,
            },
            1024: {
                slidesPerView: 3.2,
                spaceBetween: 0,
            },
        },



    });



    const mySwiper = new Swiper('.gallery', {

        mousewheel: {
            invert: true,
        },

        zoom: {
            maxRatio: 1.8,
        },

        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });



    //Swiper


    $('.toggle').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });
    // search modal close start
    $(document).on("click touchstart", ".quickSearchResults .modal-close", function() {
        $(this).parents(".quickSearchResults").siblings(".form").find(".form-input").val("");
        $(this).parents(".quickSearchResults").html("");
    });



    var $thumbnails = $('.productView-thumbnails');
    var $listItems = $thumbnails.find('li');

    if ($listItems.length > 6) {
        $thumbnails.addClass('overflow-bar');
    }

    $('.size-guide .form-label').each(function() {
        var labelText = $(this).find('.label-title').text().trim();

        if (labelText === 'Size') {
            var sizeChartLink = $('.size-chart-link');
            $(this).append(sizeChartLink);
        }
    });


    if ($(".size-guide .form-label:contains('Size')").length > 0) {
        $('<div class="size-chart-content"><button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true" save_webp_as_jpg="true">×</span></button><div class="size-chart-wrapper"></div></div><div class="size-chart-content-bg"></div>').appendTo(".product .body");



        $(".size-chart-wrapper").load("/size-chart/ #size-guide");

    }


    $(".size-chart-link").click(function() {
        $(".size-chart-content").toggleClass("fadein");
        $(".size-chart-content-bg").toggleClass("fadein");
        $("body").toggleClass("sizechart-open");
    });


    $(".size-chart-content .modal-close").click(function() {
        $(".size-chart-content").toggleClass("fadein");
        $(".size-chart-content-bg").toggleClass("fadein");
        $("body").toggleClass("sizechart-open");
    });


    $(".size-chart-content-bg").click(function() {
        $(".size-chart-content").toggleClass("fadein");
        $(".size-chart-content-bg").toggleClass("fadein");
        $("body").toggleClass("sizechart-open");
    });


setInterval(function() {
    var articles = $("div.size-box");
    var foundMatch = false;

    if (!foundMatch) {
        var productViewTitle = $(".productView-details .productView-product");
        var titleContent = productViewTitle.find("h1.productView-title").text().toLowerCase();
        var words = titleContent.split(' ');

        articles.each(function() {
            var article = $(this);
            var roleValue = article.attr("class").split(' ');

            var articleFoundMatch = false;

            for (var i = 0; i < words.length; i++) {
                for (var j = 0; j < roleValue.length; j++) {
                    
                    var classWords = roleValue[j].toLowerCase().split(' ');

                    if (classWords.indexOf(words[i]) !== -1) {
                        
                        article.addClass("show");
                        
                        articleFoundMatch = true;
                    }
                }
            }
            
            if (articleFoundMatch) {
                foundMatch = true;
            }
        });

        if (!foundMatch) {
            articles.addClass("show");
        }
    }

    if ($('.alertBox-message').text() === 'Out of stock') {
        // Hide the .alertBox element
        $('.alertBox').hide();
    }
}, 100);



    $(document).ready(function() {




// aos

        $('.body').attr('data-aos', 'fade-up').attr('data-aos-delay', '300');
        $('.aos-active .navUser').attr('data-aos', 'fade-up');
        $('.aos-active .mobileMenu-toggle').attr('data-aos', 'fade-up');
        $('.aos-active .page-heading').attr('data-aos', 'fade-up').attr('data-aos-duration', '700');
        $('.aos-active .productSwiper').attr('data-aos', 'fade-up').attr('data-aos-duration', '1000');


        $('.aos-active div[data-layout-name="heading-instagram"] p').attr('data-aos', 'fade-up').attr('data-aos-offset', '-300');

        $('.aos-active div[data-layout-name="instagram"] div').attr('data-aos', 'zoom-in').attr('data-aos-offset', '-300');
        //$('.aos-active div[data-widget-id]  p').attr('data-aos', 'fade-up').attr('data-aos-duration', '1000');





        //blog

        $('.aos-active .blogSwiper figure').attr('data-aos', 'zoom-out').attr('data-aos-duration', '700');
        $('.aos-active   .blogSwiper  h3').attr('data-aos', 'fade-up').attr('data-aos-duration', '1000');
        $('.aos-active  .blogSwiper  p').attr('data-aos', 'fade-up').attr('data-aos-duration', '1500');


        $('.aos-active .customersReview h5').attr('data-aos', 'fade-up');

        $('.aos-active .featuredin h2').attr('data-aos', 'fade-up').attr('data-aos-duration', '700');
        $('.aos-active .product-wrapper h2').not("article.card .card-title").attr('data-aos', 'fade-up').attr('data-aos-duration', '700');



        $('.aos-active .featuredswiper').attr('data-aos', 'fade-up').attr('data-aos-duration', '1000');

        $('.aos-active .blogSwiper').attr('data-aos', 'fade-up').attr('data-aos-duration', '1000');

        //     $('.aos-active .footer-info').attr('data-aos', 'fade-up').attr('data-aos-offset', '0').attr('data-aos-duration', '700');


        // $('.aos-active div[data-widget-id]').each(function(i) {
        //     $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '0').attr('data-aos-duration', '1000');
        // });



        $('.aos-active div[data-content-region="header_navigation_bottom--global"]').each(function(i) {
            $(this).attr('data-aos', 'fade-up').attr('data-aos-anchor-placement', 'center-bottom').attr('data-aos-duration', '700');
        });


        $('.aos-active div[data-test-id="hero-image-title"]').each(function(i) {
            $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        });
        $('.aos-active div[data-test-id="hero-image-subtitle"]').each(function(i) {
            $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        });
        $('.aos-active div[data-test-id="hero-image-button"]').each(function(i) {
            $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        });


        $('.aos-active div.customersReviews').each(function(i) {
            $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        });
        // $('.aos-active .blog-post-figure').each(function(i) {
        //     $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        // });

        $('.aos-active .gallery').each(function(i) {
            $(this).attr('data-aos', 'fade-right').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        });

        // $('.aos-active .blog-post-body').each(function(i) {
        //     $(this).attr('data-aos', 'fade-up').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        // });
        // $('.aos-active .subcategories').each(function(i) {
        //     $(this).attr('data-aos', 'fade-right').attr('data-aos-offset', '10').attr('data-aos-duration', '700');
        // });


        $("img[alt='Image coming soon']").css("opacity", "0");

        // now initialize AOS
        AOS.init({
            duration: 200,
        });

        AOS.refreshHard();



        // AOS END



        var $found = $(".card-figcaption-body a:contains('Choose Options')");
        $found.hide();


        var $emptycart = $(".page-heading:contains('0 items')");
        $emptycart.parents('.page-content').addClass('emptycart');
        $(".form-label:contains('Wall Width')").parents('.form-field').addClass('small-form');
        $(".form-label:contains('Wall Height')").parents('.form-field').addClass('small-form');
        $(".navPages-action:contains('Sale')").addClass('red');


        if ($(".CarouselHome").hasClass("swiper-home")) {

            $(".header").addClass("invert");
        }


        $(window).scroll(function() {
            var windowHeight = $("body").height();
            var scrollThreshold = 0.25 * windowHeight;

            if ($(this).scrollTop() > scrollThreshold) {
                $(".header").addClass("clear hide");
            } else {
                $(".header").removeClass("clear hide");
            }

            if ($(this).scrollTop() > 900) {
                $(".scrollTopArrow").addClass("show");
            } else {
                $(".scrollTopArrow").removeClass("show");
            }
        });




        let lastScrollTop = 0;
        const delta = 5;
        const navbarHeight = $(".header").outerHeight();
        const header = $(".header")

        $(window).scroll(hasScrolled);

        function hasScrolled() {
            const st = $(this).scrollTop();
            if (Math.abs(lastScrollTop - st) <= delta) return;
            header.toggleClass("hidden", st > lastScrollTop && st > navbarHeight);
            lastScrollTop = st;
        }



        $(".icon--stumbleupon").html('<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>');
        $(".icon--tumblr").html('<svg height="56.693px" id="Layer_1" style="enable-background:new 0 0 56.693 56.693;" version="1.1" viewBox="0 0 56.693 56.693" width="56.693px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28.6601,51.6829c-0.1281,0-0.2539-0.0037-0.3798-0.0096h-0.0003c-0.0802,0.0062-0.1641,0.0096-0.248,0.0096  c-2.9442,0-4.834-1.3358-6.6613-2.6278c-1.2618-0.8916-2.4524-1.7332-3.8554-1.9669c-0.6846-0.1133-1.366-0.1709-2.0245-0.1709  c-1.1863,0-2.1222,0.1831-2.8054,0.3167c-0.4152,0.0813-0.7734,0.1511-1.0456,0.1511c-0.2844,0-0.5926-0.0615-0.7265-0.5191  c-0.1164-0.3965-0.2006-0.7804-0.2816-1.1519c-0.2087-0.956-0.3569-1.5439-0.7575-1.6054  c-4.6697-0.7213-6.0062-1.7048-6.3042-2.4027c-0.0422-0.0998-0.0662-0.1998-0.0719-0.2988  c-0.0151-0.2681,0.1748-0.5048,0.4397-0.5481c7.1784-1.1821,10.3974-8.5188,10.531-8.8304  c0.0036-0.0086,0.0076-0.0169,0.0115-0.0255c0.4394-0.8903,0.5254-1.6632,0.2566-2.2967c-0.4926-1.161-2.0992-1.6712-3.1628-2.0086  c-0.2602-0.0823-0.5069-0.1602-0.7015-0.237c-2.1222-0.839-2.2988-1.7002-2.2154-2.1391c0.1422-0.7479,1.1417-1.2691,1.95-1.2691  c0.2217,0,0.4168,0.0393,0.5809,0.1159c0.9547,0.4472,1.815,0.6739,2.5574,0.6739c1.0258,0,1.4735-0.4311,1.5283-0.4876  c-0.0261-0.4858-0.0584-0.9933-0.0914-1.5168c-0.2138-3.3938-0.4787-7.6108,0.595-10.0179  c3.218-7.2154,10.0421-7.7759,12.0569-7.7759c0.0516,0,0.8833-0.0088,0.8833-0.0088l0.1193-0.0005  c2.0195,0,8.8585,0.5616,12.0783,7.7809c1.074,2.4084,0.8083,6.629,0.5941,10.0202l-0.0089,0.1474  c-0.0297,0.4723-0.0583,0.9312-0.0823,1.3706c0.0513,0.0524,0.4631,0.4488,1.3931,0.4845h0.001  c0.7067-0.0271,1.5189-0.2524,2.4102-0.6699c0.2613-0.1219,0.5514-0.1477,0.7489-0.1477c0.3016,0,0.6075,0.0584,0.8614,0.1644  l0.0154,0.0063c0.721,0.2555,1.1933,0.7609,1.2034,1.2889c0.0094,0.4972-0.3702,1.2448-2.2323,1.9804  c-0.193,0.0758-0.4397,0.1542-0.7009,0.237c-1.0646,0.3378-2.6707,0.8476-3.163,2.0083c-0.2691,0.6332-0.1829,1.4056,0.2563,2.2964  c0.0039,0.0086,0.0083,0.0169,0.0117,0.0261c0.1336,0.3113,3.3498,7.6459,10.5313,8.8293c0.2652,0.0437,0.4545,0.2802,0.4399,0.5486  c-0.006,0.1006-0.0305,0.2019-0.0734,0.3004c-0.2962,0.6929-1.6317,1.6751-6.3029,2.3969  c-0.3816,0.0586-0.5295,0.5559-0.7572,1.5986c-0.0828,0.3795-0.1667,0.7523-0.2821,1.1443  c-0.0995,0.3402-0.3115,0.4994-0.6681,0.4994h-0.0581c-0.2475,0-0.5994-0.0443-1.0453-0.1318  c-0.7908-0.1547-1.6775-0.2972-2.8056-0.2972c-0.6588,0-1.3404,0.0576-2.0255,0.1709c-1.4014,0.2337-2.5913,1.0737-3.8507,1.964  C33.4947,50.3471,31.6052,51.6829,28.6601,51.6829z"/></svg>');
        $('<svg aria-labelledby="myaccounticon" color="#000000" fill="none" height="48px" role="img" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="myaccountIcon"/><path d="M5.5,19.5 C7.83333333,18.5 9.33333333,17.6666667 10,17 C11,16 8,16 8,11 C8,7.66666667 9.33333333,6 12,6 C14.6666667,6 16,7.66666667 16,11 C16,16 13,16 14,17 C14.6666667,17.6666667 16.1666667,18.5 18.5,19.5" stroke-linecap="round"/><circle cx="12" cy="12" r="10"/></svg>').appendTo(".navUser-item--account a");
        $('<svg aria-labelledby="search-icon" color="#000000" fill="none" height="48px" role="img" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="serach-icon"/><path d="M14.4121122,14.4121122 L20,20"/><circle cx="10" cy="10" r="6"/></svg>').appendTo(".navUser-action--quickSearch");
        $('<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="48" rx="8" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" width="192" x="32" y="80"/><path d="M208,128v72a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V128" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" x1="128" x2="128" y1="80" y2="208"/><path d="M173.3,68.7C161.9,80,128,80,128,80s0-33.9,11.3-45.3a24,24,0,0,1,34,34Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M82.7,68.7C94.1,80,128,80,128,80s0-33.9-11.3-45.3a24,24,0,0,0-34,34Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>').appendTo(".gift .navUser-action");
        $('<span class="mobile-search"><svg aria-labelledby="search-icon" color="#2329D6" fill="none" height="48px" role="img" stroke="#2329D6" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="serach-icon"/><path d="M14.4121122,14.4121122 L20,20"/><circle cx="10" cy="10" r="6"/></svg></span>').appendTo(".mobileMenu-toggle");
        $('<svg aria-labelledby="wishlist-icon" color="#888888" fill="none" height="48px" role="img" stroke="#888888" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title /><path d="M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"/></svg>').appendTo(".form-wishlist .button");
        $('<svg aria-labelledby="bagIconTitle" color="#2329D6" fill="none" height="48px" role="img" stroke="#2329D6" stroke-linecap="square" stroke-linejoin="miter" stroke-width="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="bagIconTitle"/><rect height="12" width="14" x="5" y="7"/><path d="M8 7a4 4 0 1 1 8 0"/></svg>').appendTo(".navUser-item--cart .navUser-action");
        //$(".aria-description--hidden").text("Tiktok");
        $(".icon--stumbleupon").attr("title", "Tiktok");
        $(".icon--stumbleupon").addClass("icon--tiktok").removeClass("icon--stumbleupon");
        $(".icon--tumblr").attr("title", "Snapchat");
        $(".icon--tumblr").addClass("icon--snapchat").removeClass("icon--tumblr");

        $('.page-sidebar .subcategories').insertAfter(".category-head");

        $('.footer-info-col[data-section-type="storeInfo"]').clone().insertAfter(".navPages-list.navPages-list--user");
        $('.footer-info-col[data-section-type="footer-brands"]').clone().insertAfter(".navPages-list--user");
        $('.footer-info-col--small[data-section-type="footer-webPages"]').clone().insertAfter(".navPages-list--user");
        $('.productView-details .socialLinks').clone().appendTo(".productView-description");


        if ($(window).width() < 1023) {


            $(window).scroll(function() {
                if ($(this).scrollTop() > 320) {
                    $(".productView").addClass("mobile-view");
                } else {
                    $(".productView").removeClass("mobile-view");
                }
            });



            $('.productView-info').insertAfter(".tab-description");
            $('.form.form-wishlist').appendTo(".productView-images");
            // mobile only

            $('article[data-section-type="newsletterSubscription"] h3').click(function() {
               $('div.form-toggle--mobile').toggleClass("showonly")
                $('body').addClass('subscriptionForm-active')
                $('article[data-section-type="newsletterSubscription"] p').toggleClass("showonly");
                $('article[data-section-type="newsletterSubscription"] form').toggleClass("showonly");

            });

            var subscriptionForm = $('div.form-toggle--mobile');
$('<button class="modal-close" type="button" title="Close"><span class="aria-description--hidden">Close</span><span aria-hidden="true">×</span></button>').insertBefore('.form-toggle--mobile p')
            subscriptionForm.insertAfter('footer');

                    $(document).on('click', '.subscriptionForm-active .favourite-content-bg', function() {

            if(subscriptionForm.is(':visible')) {
                $('div.form-toggle--mobile').toggleClass("showonly")
                $('body').removeClass('subscriptionForm-active')
               $('article[data-section-type="newsletterSubscription"] p').toggleClass("showonly");
                $('article[data-section-type="newsletterSubscription"] form').toggleClass("showonly");
            }else {
            }
        });



            $(".size-chart-link").click(function() {
                $(".productView .form.form-wishlist").hide();
                $(".productView-details.product-data").hide();
            });


            $(".size-chart-content .modal-close").click(function() {
                $(".productView .form.form-wishlist").show();
                $(".productView-details.product-data").show();
            });


            $(".size-chart-content-bg").click(function() {
                $(".productView .form.form-wishlist").show();
                $(".productView-details.product-data").show();
            });



            $('[id^="sd-hero-image"]').addClass('layout-sd-hero-image');


    if ($('.sidebarBlock.shop_by_price').length === 0 && $('#faceted-search-container.page-sidebar').length !== 0) {
        $('<span class="close-filter"></span>').appendTo('.page');
    }
            $('.close-filter').click(function() {
                $('body').toggleClass("filter-open");
            });

            $('.productView-image').click(function() {
                $('body').toggleClass("galleryMobile");

            });



            var link = $("#productReview_link");
            var text = link.text();

            // Remove ' reviews' from the text
            text = text.replace(' reviews', '');



            link.text(text);



            if ($(".productReviews .toggle-title").length > 0) {
                $(".productView-reviewLink--new").appendTo(".productReviews .toggle-title");
            } else {
                $(".productView-reviewLink--new").appendTo(".productView-description");
            }



            $(".productView-product .productView-rating").insertAfter(".productView-images");



            var label = $('div[data-product-attribute="swatch"] .form-label');
            label.contents().filter(function() {
                return this.nodeType === 3 && this.nodeValue.trim() === 'Color:';
            }).remove();
        }



        $(".dropdown--quickSearch").insertBefore(".header");
        $("article.card").removeClass("card--alternate");


       

    });


});
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Countdown = t()
    }
}((function() {
    return function t(e, i, n) {
        function s(r, h) {
            if (!i[r]) {
                if (!e[r]) {
                    var a = "function" == typeof require && require;
                    if (!h && a) return a(r, !0);
                    if (o) return o(r, !0);
                    var f = new Error("Cannot find module '" + r + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var d = i[r] = {
                    exports: {}
                };
                e[r][0].call(d.exports, (function(t) {
                    return s(e[r][1][t] || t)
                }), d, d.exports, t, e, i, n)
            }
            return i[r].exports
        }
        for (var o = "function" == typeof require && require, r = 0; r < n.length; r++) s(n[r]);
        return s
    }({
        1: [function(t, e, i) {
            var n = {
                date: "June 7, 2087 15:03:25",
                refresh: 1e3,
                offset: 0,
                onEnd: function() {},
                render: function(t) {
                    this.el.innerHTML = t.years + " years, " + t.days + " days, " + this.leadingZeros(t.hours) + " hours, " + this.leadingZeros(t.min) + " min and " + this.leadingZeros(t.sec) + " sec"
                }
            };
            e.exports = function(t, e) {
                this.el = t, this.options = {}, this.interval = !1, this.mergeOptions = function(t) {
                    for (var e in n) n.hasOwnProperty(e) && (this.options[e] = void 0 !== t[e] ? t[e] : n[e], "date" === e && "object" != typeof this.options.date && (this.options.date = new Date(this.options.date)), "function" == typeof this.options[e] && (this.options[e] = this.options[e].bind(this)));
                    "object" != typeof this.options.date && (this.options.date = new Date(this.options.date))
                }.bind(this), this.mergeOptions(e), this.getDiffDate = function() {
                    var t = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3,
                        e = {
                            years: 0,
                            days: 0,
                            hours: 0,
                            min: 0,
                            sec: 0,
                            millisec: 0
                        };
                    return t <= 0 ? (this.interval && (this.stop(), this.options.onEnd()), e) : (t >= 31557600 && (e.years = Math.floor(t / 31557600), t -= 365.25 * e.years * 86400), t >= 86400 && (e.days = Math.floor(t / 86400), t -= 86400 * e.days), t >= 3600 && (e.hours = Math.floor(t / 3600), t -= 3600 * e.hours), t >= 60 && (e.min = Math.floor(t / 60), t -= 60 * e.min), e.sec = Math.round(t), e.millisec = t % 1 * 1e3, e)
                }.bind(this), this.leadingZeros = function(t, e) {
                    return e = e || 2, (t = String(t)).length > e ? t : (Array(e + 1).join("0") + t).substr(-e)
                }, this.update = function(t) {
                    return "object" != typeof t && (t = new Date(t)), this.options.date = t, this.render(), this
                }.bind(this), this.stop = function() {
                    return this.interval && (clearInterval(this.interval), this.interval = !1), this
                }.bind(this), this.render = function() {
                    return this.options.render(this.getDiffDate()), this
                }.bind(this), this.start = function() {
                    if (!this.interval) return this.render(), this.options.refresh && (this.interval = setInterval(this.render, this.options.refresh)), this
                }.bind(this), this.updateOffset = function(t) {
                    return this.options.offset = t, this
                }.bind(this), this.restart = function(t) {
                    return this.mergeOptions(t), this.interval = !1, this.start(), this
                }.bind(this), this.start()
            }
        }, {}],
        2: [function(t, e, i) {
            var n = t("./countdown.js"),
                s = "countdown",
                o = "date";
            jQuery.fn.countdown = function(t) {
                return $.each(this, (function(e, i) {
                    var r = $(i);
                    r.data(s) || (r.data(o) && (t.date = r.data(o)), r.data(s, new n(i, t)))
                }))
            }, e.exports = n
        }, {
            "./countdown.js": 1
        }]
    }, {}, [2])(2)
}));
$(function() {
    var e = "Dec 11, 3000 17:00:00";
    $(".countdown.simple").countdown({
        date: e
    }), $(".countdown.styled").countdown({
        date: e,
        render: function(e) {
            $(this.el).html("<div>" + this.leadingZeros(e.days, 2) + " <span>days</span></div><div>" + this.leadingZeros(e.hours, 2) + " <span>hrs</span></div><div>" + this.leadingZeros(e.min, 2) + " <span>min</span></div><div>" + this.leadingZeros(e.sec, 2) + " <span>sec</span></div>")
        }
    }), $(".countdown.callback").countdown({
        date: +new Date + 1e4,
        render: function(e) {
            $(this.el).text(this.leadingZeros(e.sec, 2) + " sec")
        },
        onEnd: function() {
            $(this.el).addClass("ended")
        }
    }).on("click", (function() {
        $(this).removeClass("ended").data("countdown").update(+new Date + 1e4).start()
    }));
    var t, n = (new Date).getTime() + 15e3,
        a = new Date,
        i = new Date(a.getTime() - 5434),
        r = i.getTime() - a.getTime(),
        s = r / 1e3 | 0,
        o = [];
    o.push("Server time: " + a.toDateString() + " " + a.toTimeString()), o.push("Your time: " + i.toDateString() + " " + i.toTimeString()), o.push("Time difference: " + s + " seconds (" + r + " milliseconds to be precise). Your time is a bit behind."), $(".offset-notice").html(o.join("<br />")), $(".offset-server .countdown").countdown({
        date: n,
        offset: 1e3 * s,
        onEnd: function() {
            $(this.el).addClass("ended")
        }
    }), $(".offset-client .countdown").countdown({
        date: n,
        onEnd: function() {
            $(this.el).addClass("ended")
        }
    }), t = function(e) {
        e.fn.marquee = function(t) {
            return this.each((function() {
                var n, a, i, r, s, o = e.extend({}, e.fn.marquee.defaults, t),
                    d = e(this),
                    u = 3,
                    p = "animation-play-state",
                    l = !1,
                    c = function(e, t, n) {
                        for (var a = ["webkit", "moz", "MS", "o", ""], i = 0; i < a.length; i++) a[i] || (t = t.toLowerCase()), e.addEventListener(a[i] + t, n, !1)
                    },
                    f = function() {
                        d.timer = setTimeout(T, o.delayBeforeStart)
                    },
                    m = {
                        pause: function() {
                            l && o.allowCss3Support ? n.css(p, "paused") : e.fn.pause && n.pause(), d.data("runningStatus", "paused"), d.trigger("paused")
                        },
                        resume: function() {
                            l && o.allowCss3Support ? n.css(p, "running") : e.fn.resume && n.resume(), d.data("runningStatus", "resumed"), d.trigger("resumed")
                        },
                        toggle: function() {
                            m["resumed" === d.data("runningStatus") ? "pause" : "resume"]()
                        },
                        destroy: function() {
                            clearTimeout(d.timer), d.find("*").addBack().off(), d.html(d.find(".js-marquee:first").html())
                        }
                    };
                if ("string" != typeof t) {
                    var g;
                    e.each(o, (function(e) {
                        if (void 0 !== (g = d.attr("data-" + e))) {
                            switch (g) {
                                case "true":
                                    g = !0;
                                    break;
                                case "false":
                                    g = !1
                            }
                            o[e] = g
                        }
                    })), o.speed && (o.duration = parseInt(d.width(), 10) / o.speed * 1e3), r = "up" === o.direction || "down" === o.direction, o.gap = o.duplicated ? parseInt(o.gap) : 0, d.wrapInner('<div class="js-marquee"></div>');
                    var h = d.find(".js-marquee").css({
                        "margin-right": o.gap,
                        float: "left"
                    });
                    if (o.duplicated)
                        for (let e = 0; e < 10; e++) h.clone(!0).appendTo(d);
                    if (d.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'), n = d.find(".js-marquee-wrapper"), r) {
                        var v = d.height();
                        n.removeAttr("style"), d.height(v), d.find(".js-marquee").css({
                            float: "none",
                            "margin-bottom": o.gap,
                            "margin-right": 0
                        }), o.duplicated && d.find(".js-marquee:last").css({
                            "margin-bottom": 0
                        });
                        var w = d.find(".js-marquee:first").height() + o.gap;
                        o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(w, 10) + parseInt(v, 10)) / parseInt(v, 10) * o.duration, o.duration = parseInt(w, 10) / parseInt(v, 10) * o.duration) : o.duration = (parseInt(w, 10) + parseInt(v, 10)) / parseInt(v, 10) * o.duration
                    } else s = d.find(".js-marquee:first").width() + o.gap, a = d.width(), o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration, o.duration = parseInt(s, 10) / parseInt(a, 10) * o.duration) : o.duration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration;
                    if (o.duplicated && (o.duration = o.duration / 2), o.allowCss3Support) {
                        var y = document.body || document.createElement("div"),
                            x = "marqueeAnimation-" + Math.floor(1e7 * Math.random()),
                            S = "Webkit Moz O ms Khtml".split(" "),
                            I = "animation",
                            b = "",
                            q = "";
                        if (void 0 !== y.style.animation && (q = "@keyframes " + x + " ", l = !0), !1 === l)
                            for (var j = 0; j < S.length; j++)
                                if (void 0 !== y.style[S[j] + "AnimationName"]) {
                                    var D = "-" + S[j].toLowerCase() + "-";
                                    I = D + I, p = D + p, q = "@" + D + "keyframes " + x + " ", l = !0;
                                    break
                                }
                        l && (b = x + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s infinite " + o.css3easing, d.data("css3AnimationIsSupported", !0))
                    }
                    var C = function() {
                            n.css("transform", "translateY(" + ("up" === o.direction ? v + "px" : "-" + w + "px") + ")")
                        },
                        $ = function() {
                            n.css("transform", "translateX(" + ("left" === o.direction ? a + "px" : "-" + s + "px") + ")")
                        };
                    o.duplicated ? (r ? o.startVisible ? n.css("transform", "translateY(0)") : n.css("transform", "translateY(" + ("up" === o.direction ? v + "px" : "-" + (2 * w - o.gap) + "px") + ")") : o.startVisible ? n.css("transform", "translateX(0)") : n.css("transform", "translateX(" + ("left" === o.direction ? a + "px" : "-" + (2 * s - o.gap) + "px") + ")"), o.startVisible || (u = 1)) : o.startVisible ? u = 12 : r ? C() : $();
                    var T = function() {
                        if (o.duplicated && (1 === u ? (o._originalDuration = o.duration, o.duration = r ? "up" === o.direction ? o.duration + v / (w / o.duration) : 2 * o.duration : "left" === o.direction ? o.duration + a / (s / o.duration) : 2 * o.duration, b && (b = x + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), u++) : 2 === u && (o.duration = o._originalDuration, b && (x += "0", q = e.trim(q) + "0 ", b = x + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), u++)), r ? o.duplicated ? (u > 2 && n.css("transform", "translateY(" + ("up" === o.direction ? 0 : "-" + w + "px") + ")"), i = {
                                transform: "translateY(" + ("up" === o.direction ? "-" + w + "px" : 0) + ")"
                            }) : o.startVisible ? 2 === u ? (b && (b = x + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), i = {
                                transform: "translateY(" + ("up" === o.direction ? "-" + w + "px" : v + "px") + ")"
                            }, u++) : 3 === u && (o.duration = o._completeDuration, b && (x += "0", q = e.trim(q) + "0 ", b = x + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), C()) : (C(), i = {
                                transform: "translateY(" + ("up" === o.direction ? "-" + n.height() + "px" : v + "px") + ")"
                            }) : o.duplicated ? (u > 2 && n.css("transform", "translateX(" + ("left" === o.direction ? 0 : "-" + s + "px") + ")"), i = {
                                transform: "translateX(" + ("left" === o.direction ? "-" + s + "px" : 0) + ")"
                            }) : o.startVisible ? 2 === u ? (b && (b = x + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing), i = {
                                transform: "translateX(" + ("left" === o.direction ? "-" + s + "px" : a + "px") + ")"
                            }, u++) : 3 === u && (o.duration = o._completeDuration, b && (x += "0", q = e.trim(q) + "0 ", b = x + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing), $()) : ($(), i = {
                                transform: "translateX(" + ("left" === o.direction ? "-" + s + "px" : a + "px") + ")"
                            }), d.trigger("beforeStarting"), l) {
                            n.css(I, b);
                            var t = q + " { 100%  " + function(e) {
                                    var t = [];
                                    for (var n in e) e.hasOwnProperty(n) && t.push(n + ":" + e[n]);
                                    return t.push(), "{" + t.join(",") + "}"
                                }(i) + "}",
                                p = n.find("style");
                            0 !== p.length ? p.filter(":last").html(t) : e("head").append("<style>" + t + "</style>"), c(n[0], "AnimationIteration", (function() {
                                d.trigger("finished")
                            })), c(n[0], "AnimationEnd", (function() {
                                T(), d.trigger("finished")
                            }))
                        } else n.animate(i, o.duration, o.easing, (function() {
                            d.trigger("finished"), o.pauseOnCycle ? f() : T()
                        }));
                        d.data("runningStatus", "resumed")
                    };
                    d.on("pause", m.pause), d.on("resume", m.resume), o.pauseOnHover && (d.on("mouseenter", m.pause), d.on("mouseleave", m.resume)), l && o.allowCss3Support ? T() : f()
                } else e.isFunction(m[t]) && (n || (n = d.find(".js-marquee-wrapper")), !0 === d.data("css3AnimationIsSupported") && (l = !0), m[t]())
            }))
        }, e.fn.marquee.defaults = {
            allowCss3Support: !0,
            css3easing: "linear",
            easing: "linear",
            delayBeforeStart: 1e3,
            direction: "left",
            duplicated: !1,
            duration: 5e3,
            speed: 0,
            gap: 20,
            pauseOnCycle: !1,
            pauseOnHover: !1,
            startVisible: !1
        }
    }, "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery);
    $('.marquee').marquee({
        direction: 'left',
        duration: 30000,
        gap: 100,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });
    $('.marquee-product').marquee({
        direction: 'left',
        duration: 100000,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });
    $('.marquee-instagram').marquee({
        direction: 'left',
        duration: 100000,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });


    $('.card-marquee').marquee({
        direction: 'left',
        duration: 10000,
        gap: 35,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });



});

/* eslint-enable */
