"use strict";
(self["webpackChunksumnima_outfit"] = self["webpackChunksumnima_outfit"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







var Cart = /*#__PURE__*/function (_PageManager) {
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Cart, _PageManager);
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
    var _that = this;
    $(document).on("click", ".cart-page .clear-all-items", function () {
      console.log("clicked");
      $.ajax({
        type: "GET",
        url: "/api/storefront/carts",
        headers: {
          'Content-Type': 'application/json'
        },
        success: function success(response) {
          console.log(response);
          console.log("response");
          if (response && response[0] && response[0].id) {
            _that.clearAllItems(response[0].id);
          }
        },
        error: function error(textStatus, errorThrown) {
          console.log("error");
          console.log(textStatus);
        }
      });
    });
  };
  _proto.clearAllItems = function clearAllItems(cartId) {
    //const cartId = "315170bc-ca09-47fa-8693-a629e72569ff";

    var options = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{}'
    };
    fetch('/api/storefront/carts/' + cartId, options).then(function (response) {
      window.location.reload();
    })["catch"](function (err) {
      return console.error(err);
    });
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!Number.isInteger(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(err);
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $couponContainer.attr('aria-hidden', false);
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $couponContainer.attr('aria-hidden', true);
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)($codeInput.data('error'));
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $certContainer.attr('aria-hidden', false);
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $certContainer.attr('aria-hidden', true);
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(validationDictionary.invalid_gift_certificate);
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(resp.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingEstimator)
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(err);
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();


/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartItemDetails)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_this, hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRThCO0FBQ1M7QUFDakM7QUFDVztBQUNpQjtBQUNsQjtBQUFBLElBRXBDUyxJQUFJLDBCQUFBQyxZQUFBO0VBQUEsU0FBQUQsS0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQUMsY0FBQSxDQUFBSixJQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBSSxNQUFBLEdBQUFMLElBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3JCRSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtJQUNsQixJQUFJLENBQUNDLGdCQUFnQixHQUFHQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ3hDLElBQUksQ0FBQ0MsWUFBWSxHQUFHRCxDQUFDLENBQUMscUJBQXFCLENBQUM7SUFDNUMsSUFBSSxDQUFDRSxhQUFhLEdBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUM1QyxJQUFJLENBQUNHLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzFDLElBQUksQ0FBQ0ksMkJBQTJCLEdBQUdKLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQztJQUMvRSxJQUFJLENBQUNLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQzNDTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7SUFDN0IsSUFBSSxDQUFDQyx3QkFBd0IsR0FBRyxJQUFJO0lBRXBDLElBQUksQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQztJQUN6QixJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0lBRWpCLElBQUlDLEtBQUssR0FBRyxJQUFJO0lBQ2hCWCxDQUFDLENBQUNZ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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBTWhWLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlxRixPQUFPLEVBQUs7RUFDcEQsSUFBUWtRLHdCQUF3QixHQUF3RWxRLE9BQU8sQ0FBdkdrUSx3QkFBd0I7SUFBRUMsZ0NBQWdDLEdBQXNDblEsT0FBTyxDQUE3RW1RLGdDQUFnQztJQUFFQywrQkFBK0IsR0FBS3BRLE9BQU8sQ0FBM0NvUSwrQkFBK0I7RUFDbkcsSUFBTUMsZ0JBQWdCLEdBQUdSLHNCQUFzQixDQUFDSyx3QkFBd0IsRUFBRUMsZ0NBQWdDLEVBQUVDLCtCQUErQixDQUFDO0VBQzVJLElBQU1FLGFBQWEsR0FBRzdQLE1BQU0sQ0FBQzhQLE1BQU0sQ0FBQ0YsZ0JBQWdCLENBQUNaLFlBQVksQ0FBQyxDQUFDO0VBQ25FLElBQU1lLGVBQWUsR0FBRy9QLE1BQU0sQ0FBQ21QLElBQUksQ0FBQ1MsZ0JBQWdCLENBQUNaLFlBQVksQ0FBQyxDQUFDLENBQUMvQyxHQUFHLENBQUMsVUFBQStELEdBQUc7SUFBQSxPQUFJQSxHQUFHLENBQUM5RSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMrRSxHQUFHLENBQUMsQ0FBQztFQUFBLEVBQUM7RUFFcEcsT0FBT0YsZUFBZSxDQUFDRyxNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFFSCxHQUFHLEVBQUVYLENBQUMsRUFBSztJQUMzQ2MsR0FBRyxDQUFDSCxHQUFHLENBQUMsR0FBR0gsYUFBYSxDQUFDUixDQUFDLENBQUM7SUFDM0IsT0FBT2MsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdW1uaW1hLW91dGZpdC8uL2Fzc2V0cy9qcy90aGVtZS9jYXJ0LmpzIiwid2VicGFjazovL3N1bW5pbWEtb3V0Zml0Ly4vYXNzZXRzL2pzL3RoZW1lL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yLmpzIiwid2VicGFjazovL3N1bW5pbWEtb3V0Zml0Ly4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9zdW1uaW1hLW91dGZpdC8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc3VtbmltYS1vdXRmaXQvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vc3VtbmltYS1vdXRmaXQvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBzaG93QWxlcnRNb2RhbCwgTW9kYWxFdmVudHMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgQ2FydEl0ZW1EZXRhaWxzIGZyb20gJy4vY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLiRtb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudCA9ICQoJ1tkYXRhLWNhcnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xuICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMgPSAkKCdbZGF0YS1jYXJ0LXN0YXR1c10nKTtcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyA9ICQoJ1tkYXRhLWNhcnQtYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zXScpO1xuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydF0gLmxvYWRpbmdPdmVybGF5JylcbiAgICAgICAgICAgIC5oaWRlKCk7IC8vIFRPRE86IHRlbXBvcmFyeSB1bnRpbCByb3BlciBwdWxscyBpbiBoaXMgY2FydCBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBudWxsO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zZXRBcHBsZVBheVN1cHBvcnQoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgdmFyIF90aGF0ID0gdGhpcztcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jYXJ0LXBhZ2UgLmNsZWFyLWFsbC1pdGVtc1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkXCIpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDogXCIvYXBpL3N0b3JlZnJvbnQvY2FydHNcIixcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZSAmJiByZXNwb25zZVswXSAmJiByZXNwb25zZVswXS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoYXQuY2xlYXJBbGxJdGVtcyhyZXNwb25zZVswXS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAodGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0U3RhdHVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJBbGxJdGVtcyhjYXJ0SWQpIHtcbiAgICAgICAgLy9jb25zdCBjYXJ0SWQgPSBcIjMxNTE3MGJjLWNhMDktNDdmYS04NjkzLWE2MjllNzI1NjlmZlwiO1xuICAgIFxuICAgICAgICBjb25zdCBvcHRpb25zID0ge21ldGhvZDogJ2RlbGV0ZScsIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSwgYm9keTogJ3t9J307XG4gICAgXG4gICAgICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydHMvJyArIGNhcnRJZCwgb3B0aW9ucylcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICB9XG5cbiAgICBzZXRBcHBsZVBheVN1cHBvcnQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQXBwbGVQYXlTZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQuYWRkQ2xhc3MoJ2FwcGxlLXBheS1zdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IGl0ZW1JZDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWluRXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWF4RXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHByZVZhbCAhPT0gbnVsbCA/IHByZVZhbCA6IG1pblF0eTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG5cbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobmV3UXR5KSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHRoaXMuY29udGV4dC5pbnZhbGlkRW50cnlNZXNzYWdlLnJlcGxhY2UoJ1tFTlRSWV0nLCBpbnZhbGlkRW50cnkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtaW5FcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtYXhFcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVJlbW92ZShpdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHByb2R1Y3RGb3JDaGFuZ2VJZDogcHJvZHVjdElkLCAuLi50aGlzLmNvbnRleHQgfTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICBpZiAodGhpcy4kbW9kYWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJCgnI21vZGFsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuICAgICAgICB0aGlzLiRtb2RhbC5maW5kKCcubW9kYWwtY29udGVudCcpLmFkZENsYXNzKCdoaWRlLWNvbnRlbnQnKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCA9ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5sZW5ndGggJiYgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmNzcygnaGVpZ2h0JywgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRtb2RhbC5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uQ2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5vbmUoTW9kYWxFdmVudHMub3BlbmVkLCBvcHRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBDYXJ0SXRlbURldGFpbHModGhpcy4kbW9kYWwsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJChjdXJyZW50VGFyZ2V0KS5maW5kKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zOiAnY2FydC9hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudChvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMuaHRtbChyZXNwb25zZS5hZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihgW2RhdGEtYWN0aW9uPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9ufSddYClcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoc3RyaW5nLCB7XG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgb25Db25maXJtOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWl0ZW0tZWRpdF0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtRWRpdCcpO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBlZGl0IGl0ZW0gaW4gY2FydFxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kUHJvbW9Db2RlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY291cG9uQ29udGFpbmVyID0gJCgnLmNvdXBvbi1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmF0dHIoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcbiAgICAgICAgICAgICRjb2RlSW5wdXQudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNvZGVJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gRW1wdHkgY29kZVxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKCRjb2RlSW5wdXQuZGF0YSgnZXJyb3InKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjZXJ0Q29udGFpbmVyID0gJCgnLmdpZnQtY2VydGlmaWNhdGUtY29kZScpO1xuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNlcnRJbnB1dCA9ICQoJ1tuYW1lPVwiY2VydGNvZGVcIl0nLCAkY2VydEZvcm0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNlcnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCFjaGVja0lzR2lmdENlcnRWYWxpZChjb2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHZhbGlkYXRpb25EaWN0aW9uYXJ5LmludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5R2lmdENlcnRpZmljYXRlKGNvZGUsIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICBjb25zdCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuY29udGV4dC5zaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50LCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICBjb25zdCBzaGlwcGluZ0VzdGltYXRvckFsZXJ0ID0gJCgnLnNoaXBwaW5nLXF1b3RlcycpO1xuXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdGAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAvLyBlc3RpbWF0b3IgZXJyb3IgbWVzc2FnZXMgYXJlIGJlaW5nIGluamVjdGVkIGluIGh0bWwgYXMgYSByZXN1bHRcbiAgICAgICAgICAgIC8vIG9mIHVzZXIgc3VibWl0OyBjbGVhcmluZyBhbmQgYWRkaW5nIHJvbGUgb24gc3VibWl0IHByb3ZpZGVzXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xuICAgICAgICAgICAgaWYgKHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScpKSB7XG4gICAgICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5yZW1vdmVBdHRyKCdyb2xlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScsICdhbGVydCcpO1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzLmNvdW50cnksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xuICAgICAqL1xuICAgIGJpbmRVUFNSYXRlcygpIHtcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIFVQU1JhdGVUb2dnbGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtVXBzLnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcbiAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KHRoaXMuJHN0YXRlLCB0aGlzLmNvbnRleHQsIHsgdXNlSWRGb3JTdGF0ZXM6IHRydWUgfSwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuZ2V0U3RhdHVzKHRoaXMuJHN0YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXaGVuIHlvdSBjaGFuZ2UgYSBjb3VudHJ5LCB5b3Ugc3dhcCB0aGUgc3RhdGUvcHJvdmluY2UgYmV0d2VlbiBhbiBpbnB1dCBhbmQgYSBzZWxlY3QgZHJvcGRvd25cbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZW1vdmUgdGhpcyBjbGFzcyB3aGVuIHdlIHN3YXAgc2luY2Ugbm9kIHZhbGlkYXRpb24gZG9lc24ndCBjbGVhbnVwIGZvciB1c1xuICAgICAgICAgICAgJCh0aGlzLnNoaXBwaW5nRXN0aW1hdG9yKS5maW5kKCcuZm9ybS1maWVsZC0tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdmb3JtLWZpZWxkLS1zdWNjZXNzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSA9IChzZWxlY3RvclRvQWN0aXZhdGUpID0+IHtcbiAgICAgICAgICAgICQodG9nZ2xlQnV0dG9uKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCBzZWxlY3RvclRvQWN0aXZhdGUpO1xuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1jbG9zZScpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWFkZCcpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9ICF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZDtcbiAgICB9XG5cbiAgICBiaW5kRXN0aW1hdG9yRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yQ29udGFpbmVyID0gJCgnLnNoaXBwaW5nLWVzdGltYXRvcicpO1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcbiAgICAgICAgJGVzdGltYXRvckZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgc3RhdGVfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctc3RhdGVcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAkKCdbbmFtZT1cInNoaXBwaW5nLXppcFwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc2hpcHBpbmctcXVvdGVzJykuaHRtbChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0LXNoaXBwaW5nLXF1b3RlJykub24oJ2NsaWNrJywgY2xpY2tFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlSWQgPSAkKCcuc2hpcHBpbmctcXVvdGU6Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzQmFzZSwgeyBvcHRpb25DaGFuZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3Byb2R1Y3QtZGV0YWlscy1iYXNlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNCcm93c2VySUUsIGNvbnZlcnRJbnRvQXJyYXkgfSBmcm9tICcuL3V0aWxzL2llLWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgY29udGV4dCwgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJyNDYXJ0RWRpdFByb2R1Y3RGaWVsZHNGb3JtJywgdGhpcy4kc2NvcGUpO1xuICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNFbGVtZW50ID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgJGZvcm0pO1xuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaGFzRGVmYXVsdE9wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xuXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlQ2FsbGJhY2sgPSBvcHRpb25DaGFuZ2VEZWNvcmF0b3IuY2FsbCh0aGlzLCBoYXNEZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcbiAgICAgICAgLy8gb3IgaGF2ZSBkZWZhdWx0IHZhcmlhbnQgcHJvcGVydGllcyB0aGF0IGNoYW5nZSB0aGUgdmlld1xuICAgICAgICBpZiAoKGlzRW1wdHkocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKSB8fCBoYXNEZWZhdWx0T3B0aW9ucykgJiYgaGFzT3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIG9wdGlvbkNoYW5nZUNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFByb2R1Y3RWYXJpYW50KCkge1xuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyksIChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gdmFsdWUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uVGl0bGUgPSBvcHRpb25MYWJlbC5zcGxpdCgnOicpWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUnKTtcblxuICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndGV4dGFyZWEnICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2F0aXNmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2RhdGVTdHJpbmd9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHR9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAnc3dhdGNoJyB8fCB0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50c2xpc3QgPSBjb252ZXJ0SW50b0FycmF5KHZhbHVlLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQgPSBpbnB0ID0+IGlucHQuZGF0YXNldC5wcm9kdWN0QXR0cmlidXRlVmFsdWUgPT09IGNoZWNrZWQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdFZhcmlhbnRzbGlzdC5maWx0ZXIobWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dClbMF07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuaW5uZXJUZXh0LnRyaW0oKSA6IGNoZWNrZWQubGFiZWxzWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc3dhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5jaGlsZHJlblswXSA6IGNoZWNrZWQubGFiZWxzWzBdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06WWVzYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpOb2ApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RWYXJpYW50ID0gdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IDAgPyBvcHRpb25zLnNvcnQoKS5qb2luKCcsICcpIDogJ3Vuc2F0aXNmaWVkJztcbiAgICAgICAgY29uc3QgdmlldyA9ICQoJy5tb2RhbC1oZWFkZXItdGl0bGUnKTtcblxuICAgICAgICBpZiAocHJvZHVjdFZhcmlhbnQpIHtcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gcHJvZHVjdFZhcmlhbnQgPT09ICd1bnNhdGlzZmllZCcgPyAnJyA6IHByb2R1Y3RWYXJpYW50O1xuICAgICAgICAgICAgaWYgKHZpZXcuYXR0cignZGF0YS1ldmVudC10eXBlJykpIHtcbiAgICAgICAgICAgICAgICB2aWV3LmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0TmFtZSA9IHZpZXcuaHRtbCgpLm1hdGNoKC8nKC4qPyknLylbMV07XG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9ICQoYFtkYXRhLW5hbWU9XCIke3Byb2R1Y3ROYW1lfVwiXWApO1xuICAgICAgICAgICAgICAgIGNhcmQuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xuICAgICAgICBzdXBlci51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdoaWRlLWNvbnRlbnQnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycgfHwgY2VydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc2VydFN0YXRlSGlkZGVuRmllbGQgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuXG4vKipcbiAqIElmIHRoZXJlIGFyZSBubyBvcHRpb25zIGZyb20gYmNhcHAsIGEgdGV4dCBmaWVsZCB3aWxsIGJlIHNlbnQuIFRoaXMgd2lsbCBjcmVhdGUgYSBzZWxlY3QgZWxlbWVudCB0byBob2xkIG9wdGlvbnMgYWZ0ZXIgdGhlIHJlbW90ZSByZXF1ZXN0LlxuICogQHJldHVybnMge2pRdWVyeXxIVE1MRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlUmVxdWlyZWQoc3RhdGVFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICBpZDogYXR0cnMuaWQsXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8c2VsZWN0Pjwvc2VsZWN0PicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcbiAgICBjb25zdCAkaGlkZGVuSW5wdXQgPSAkKCdbbmFtZSo9XCJGb3JtRmllbGRJc1RleHRcIl0nKTtcblxuICAgIGlmICgkaGlkZGVuSW5wdXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICRoaWRkZW5JbnB1dC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuYXBwZW5kKGA8c21hbGw+JHtjb250ZXh0LnJlcXVpcmVkfTwvc21hbGw+YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBJZiBhIGNvdW50cnkgd2l0aCBzdGF0ZXMgaXMgdGhlIGRlZmF1bHQsIGEgc2VsZWN0IHdpbGwgYmUgc2VudCxcbiAqIEluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gc3dpdGNoIHRvIGFuIGlucHV0IGZpZWxkIGFuZCBoaWRlIHRoZSByZXF1aXJlZCBmaWVsZFxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVPcHRpb25hbChzdGF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCBhdHRycyA9IF8udHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBpZDogYXR0cnMuaWQsXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcbiAgICAgICAgY2xhc3M6ICdmb3JtLWlucHV0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgIGlmICgkbmV3RWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkbmV3RWxlbWVudCk7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYXJyYXkgb2Ygb3B0aW9ucyBmcm9tIHRoZSByZW1vdGUgcmVxdWVzdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBzZWxlY3QgYm94LlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlc0FycmF5XG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gW107XG5cbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xuXG4gICAgaWYgKCFfLmlzRW1wdHkoJHNlbGVjdEVsZW1lbnQpKSB7XG4gICAgICAgIHN0YXRlc0FycmF5LnN0YXRlcy5mb3JFYWNoKChzdGF0ZU9iaikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudXNlSWRGb3JTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmouaWR9XCI+JHtzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmoubmFtZX1cIj4ke3N0YXRlT2JqLmxhYmVsID8gc3RhdGVPYmoubGFiZWwgOiBzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2VsZWN0RWxlbWVudC5odG1sKGNvbnRhaW5lci5qb2luKCcgJykpO1xuICAgIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGVFbGVtZW50LCBjb250ZXh0ID0ge30sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgLyoqXG4gICAgICogQmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIHRocmVlIHBhcmFtZXRlcnMgaW5zdGVhZCBvZiBmb3VyXG4gICAgICpcbiAgICAgKiBBdmFpbGFibGUgb3B0aW9uczpcbiAgICAgKlxuICAgICAqIHVzZUlkRm9yU3RhdGVzIHtCb29sfSAtIEdlbmVyYXRlcyBzdGF0ZXMgZHJvcGRvd24gdXNpbmcgaWQgZm9yIHZhbHVlcyBpbnN0ZWFkIG9mIHN0cmluZ3NcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICB9XG5cbiAgICAkKCdzZWxlY3RbZGF0YS1maWVsZC10eXBlPVwiQ291bnRyeVwiXScpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50cnlOYW1lID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblxuICAgICAgICBpZiAoY291bnRyeU5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY291bnRyeS5nZXRCeU5hbWUoY291bnRyeU5hbWUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoY29udGV4dC5zdGF0ZV9lcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50SW5wdXQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkocmVzcG9uc2UuZGF0YS5zdGF0ZXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGVsZW1lbnQgbWF5IGhhdmUgYmVlbiByZXBsYWNlZCB3aXRoIGEgc2VsZWN0LCByZXNlbGVjdCBpdFxuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RFbGVtZW50ID0gbWFrZVN0YXRlUmVxdWlyZWQoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBhZGRPcHRpb25zKHJlc3BvbnNlLmRhdGEsICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVPcHRpb25hbCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG5ld0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsImNoZWNrSXNHaWZ0Q2VydFZhbGlkIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwidXRpbHMiLCJTaGlwcGluZ0VzdGltYXRvciIsImRlZmF1bHRNb2RhbCIsInNob3dBbGVydE1vZGFsIiwiTW9kYWxFdmVudHMiLCJDYXJ0SXRlbURldGFpbHMiLCJDYXJ0IiwiX1BhZ2VNYW5hZ2VyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCIkbW9kYWwiLCIkY2FydFBhZ2VDb250ZW50IiwiJCIsIiRjYXJ0Q29udGVudCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyIsIiRvdmVybGF5IiwiaGlkZSIsIiRhY3RpdmVDYXJ0SXRlbUlkIiwiJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uIiwic2V0QXBwbGVQYXlTdXBwb3J0IiwiYmluZEV2ZW50cyIsIl90aGF0IiwiZG9jdW1lbnQiLCJvbiIsImNvbnNvbGUiLCJsb2ciLCJhamF4IiwidHlwZSIsInVybCIsImhlYWRlcnMiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJpZCIsImNsZWFyQWxsSXRlbXMiLCJlcnJvciIsInRleHRTdGF0dXMiLCJlcnJvclRocm93biIsImNhcnRJZCIsIm9wdGlvbnMiLCJtZXRob2QiLCJib2R5IiwiZmV0Y2giLCJ0aGVuIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnIiLCJBcHBsZVBheVNlc3Npb24iLCJhZGRDbGFzcyIsImNhcnRVcGRhdGUiLCIkdGFyZ2V0IiwiX3RoaXMiLCJpdGVtSWQiLCJkYXRhIiwiJGVsIiwib2xkUXR5IiwicGFyc2VJbnQiLCJ2YWwiLCJtYXhRdHkiLCJtaW5RdHkiLCJtaW5FcnJvciIsIm1heEVycm9yIiwibmV3UXR5Iiwic2hvdyIsImFwaSIsImNhcnQiLCJpdGVtVXBkYXRlIiwic3RhdHVzIiwicmVtb3ZlIiwicmVmcmVzaENvbnRlbnQiLCJlcnJvcnMiLCJqb2luIiwiY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UiLCJwcmVWYWwiLCJfdGhpczIiLCJOdW1iZXIiLCJpbnZhbGlkRW50cnkiLCJpc0ludGVnZXIiLCJjb250ZXh0IiwiaW52YWxpZEVudHJ5TWVzc2FnZSIsInJlcGxhY2UiLCJjYXJ0UmVtb3ZlSXRlbSIsIl90aGlzMyIsIml0ZW1SZW1vdmUiLCJjYXJ0RWRpdE9wdGlvbnMiLCJwcm9kdWN0SWQiLCJfdGhpczQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcm9kdWN0Rm9yQ2hhbmdlSWQiLCJtb2RhbCIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50Iiwib3B0aW9uQ2hhbmdlSGFuZGxlciIsIiRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciIsIm1vZGFsQm9keVJlc2VydmVkSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJjc3MiLCJoYXNDbGFzcyIsIm9uZSIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsIiRmb3JtIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94Iiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwicmVzdWx0IiwicHVyY2hhc2luZ19tZXNzYWdlIiwidGV4dCIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCJfdGhpczUiLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiX3RoaXM2IiwiZGVib3VuY2VUaW1lb3V0IiwiX2JpbmQiLCJfZGVib3VuY2UiLCJwcmV2ZW50RGVmYXVsdCIsIm9uUXR5Rm9jdXMiLCJ2YWx1ZSIsImNoYW5nZSIsInN0cmluZyIsImljb24iLCJzaG93Q2FuY2VsQnV0dG9uIiwib25Db25maXJtIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIl90aGlzNyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJhdHRyIiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCJfdGhpczgiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJfdGhpczkiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpbmRleCIsImFsbG93TWVzc2FnZSIsInRvZ2dsZVZpZXdzIiwiJHNpbmdsZUZvcm0iLCIkbXVsdGlGb3JtIiwic2hpcHBpbmdFcnJvck1lc3NhZ2VzIiwiY291bnRyeSIsInNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSIsInByb3ZpbmNlIiwic2hpcHBpbmdQcm92aW5jZUVycm9yTWVzc2FnZSIsInNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdCIsInN0YXRlQ291bnRyeSIsIm5vZCIsIlZhbGlkYXRvcnMiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiY29sbGFwc2libGVGYWN0b3J5IiwiJGVsZW1lbnQiLCIkc3RhdGUiLCJpc0VzdGltYXRvckZvcm1PcGVuZWQiLCJpbml0Rm9ybVZhbGlkYXRpb24iLCJiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlIiwiYmluZEVzdGltYXRvckV2ZW50cyIsInNoaXBwaW5nRXN0aW1hdG9yQWxlcnQiLCJzaGlwcGluZ1ZhbGlkYXRvciIsInN1Ym1pdCIsInRhcCIsInJlbW92ZUF0dHIiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiaXMiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUiLCJ0b2dnbGVCdXR0b24iLCJidXR0b25TZWxlY3RvciIsIiR0b2dnbGVDb250YWluZXIiLCJjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUiLCJzZWxlY3RvclRvQWN0aXZhdGUiLCIkZXN0aW1hdG9yQ29udGFpbmVyIiwiJGVzdGltYXRvckZvcm0iLCJwYXJhbXMiLCJjb3VudHJ5X2lkIiwic3RhdGVfaWQiLCJjaXR5IiwiemlwX2NvZGUiLCJnZXRTaGlwcGluZ1F1b3RlcyIsImNsaWNrRXZlbnQiLCJxdW90ZUlkIiwic3VibWl0U2hpcHBpbmdRdW90ZSIsIlByb2R1Y3REZXRhaWxzQmFzZSIsIm9wdGlvbkNoYW5nZURlY29yYXRvciIsImlzQnJvd3NlcklFIiwiY29udmVydEludG9BcnJheSIsIl9Qcm9kdWN0RGV0YWlsc0Jhc2UiLCIkc2NvcGUiLCJwcm9kdWN0QXR0cmlidXRlc0RhdGEiLCJjYWxsIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwiX2lzRW1wdHkiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMiLCJlYWNoIiwib3B0aW9uTGFiZWwiLCJjaGlsZHJlbiIsImlubmVyVGV4dCIsIm9wdGlvblRpdGxlIiwic3BsaXQiLCJyZXF1aXJlZCIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwibWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCIsImlucHQiLCJkYXRhc2V0IiwicHJvZHVjdEF0dHJpYnV0ZVZhbHVlIiwibGFiZWwiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsImNlcnQiLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwibWFrZVN0YXRlUmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsIl90cmFuc2Zvcm0iLCJpdGVtIiwicmV0IiwibmFtZSIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsImFwcGVuZCIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiYWRkT3B0aW9ucyIsInN0YXRlc0FycmF5IiwiJHNlbGVjdEVsZW1lbnQiLCJjb250YWluZXIiLCJwcmVmaXgiLCJzdGF0ZXMiLCJmb3JFYWNoIiwic3RhdGVPYmoiLCJjYWxsYmFjayIsImNvdW50cnlOYW1lIiwiZ2V0QnlOYW1lIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwic291cmNlUm9vdCI6IiJ9