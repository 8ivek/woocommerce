/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _specificSelect = __webpack_require__(1);

var _categorySelect = __webpack_require__(2);

var _attributeSelect = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var RawHTML = wp.element.RawHTML;
var registerBlockType = wp.blocks.registerBlockType;
var _wp$editor = wp.editor,
    InspectorControls = _wp$editor.InspectorControls,
    BlockControls = _wp$editor.BlockControls;
var _wp$components = wp.components,
    Toolbar = _wp$components.Toolbar,
    Dropdown = _wp$components.Dropdown,
    Dashicon = _wp$components.Dashicon,
    RangeControl = _wp$components.RangeControl,
    Tooltip = _wp$components.Tooltip,
    SelectControl = _wp$components.SelectControl;
var _wp = wp,
    apiFetch = _wp.apiFetch;


/**
 * A setting has the following properties:
 *    title - Display title of the setting.
 *    description - Display description of the setting.
 *    value - Display setting slug to set when selected.
 *    group_container - (optional) If set the setting is a parent container.
 *    no_orderby - (optional) If set the setting does not allow orderby settings.
 */
var PRODUCTS_BLOCK_DISPLAY_SETTINGS = {
	'specific': {
		title: __('Individual products'),
		description: __('Hand-pick which products to display'),
		value: 'specific'
	},
	'category': {
		title: __('Product category'),
		description: __('Display products from a specific category or multiple categories'),
		value: 'category'
	},
	'filter': {
		title: __('Filter products'),
		description: __('E.g. featured products, or products with a specific attribute like size or color'),
		value: 'filter',
		group_container: 'filter'
	},
	'featured': {
		title: __('Featured products'),
		description: '',
		value: 'featured'
	},
	'on_sale': {
		title: __('On sale'),
		description: '',
		value: 'on_sale'
	},
	'best_selling': {
		title: __('Best sellers'),
		description: '',
		value: 'best_selling',
		no_orderby: true
	},
	'top_rated': {
		title: __('Top rated'),
		description: '',
		value: 'top_rated',
		no_orderby: true
	},
	'attribute': {
		title: __('Attribute'),
		description: '',
		value: 'attribute'
	},
	'all': {
		title: __('All products'),
		description: __('Display all products ordered chronologically, alphabetically, by price, by rating or by sales'),
		value: 'all'
	}
};

/**
 * Returns whether or not a display scope supports orderby options.
 *
 * @param string display The display scope slug.
 * @return bool
 */
function supportsOrderby(display) {
	return !(PRODUCTS_BLOCK_DISPLAY_SETTINGS.hasOwnProperty(display) && PRODUCTS_BLOCK_DISPLAY_SETTINGS[display].hasOwnProperty('no_orderby') && PRODUCTS_BLOCK_DISPLAY_SETTINGS[display].no_orderby);
}

/**
 * One option from the list of all available ways to display products.
 */

var ProductsBlockSettingsEditorDisplayOption = function (_React$Component) {
	_inherits(ProductsBlockSettingsEditorDisplayOption, _React$Component);

	function ProductsBlockSettingsEditorDisplayOption() {
		_classCallCheck(this, ProductsBlockSettingsEditorDisplayOption);

		return _possibleConstructorReturn(this, (ProductsBlockSettingsEditorDisplayOption.__proto__ || Object.getPrototypeOf(ProductsBlockSettingsEditorDisplayOption)).apply(this, arguments));
	}

	_createClass(ProductsBlockSettingsEditorDisplayOption, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var icon = 'arrow-right-alt2';

			if ('filter' === this.props.value && this.props.extended) {
				icon = 'arrow-down-alt2';
			}

			var classes = 'wc-products-display-options__option wc-products-display-options__option--' + this.props.value;

			if (this.props.current === this.props.value) {
				icon = 'yes';
				classes += ' wc-products-display-options__option--current';
			}

			return wp.element.createElement(
				'div',
				{ className: classes, onClick: function onClick() {
						_this2.props.current !== _this2.props.value && _this2.props.update_display_callback(_this2.props.value);
					} },
				wp.element.createElement(
					'div',
					{ 'class': 'wc-products-display-options__option-content' },
					wp.element.createElement(
						'span',
						{ className: 'wc-products-display-options__option-title' },
						this.props.title
					),
					wp.element.createElement(
						'p',
						{ className: 'wc-products-display-options__option-description' },
						this.props.description
					)
				),
				wp.element.createElement(
					'div',
					{ className: 'wc-products-display-options__icon' },
					wp.element.createElement(Dashicon, { icon: icon })
				)
			);
		}
	}]);

	return ProductsBlockSettingsEditorDisplayOption;
}(React.Component);

/**
 * A list of all available ways to display products.
 */


var ProductsBlockSettingsEditorDisplayOptions = function (_React$Component2) {
	_inherits(ProductsBlockSettingsEditorDisplayOptions, _React$Component2);

	/**
  * Constructor.
  */
	function ProductsBlockSettingsEditorDisplayOptions(props) {
		_classCallCheck(this, ProductsBlockSettingsEditorDisplayOptions);

		var _this3 = _possibleConstructorReturn(this, (ProductsBlockSettingsEditorDisplayOptions.__proto__ || Object.getPrototypeOf(ProductsBlockSettingsEditorDisplayOptions)).call(this, props));

		_this3.setWrapperRef = _this3.setWrapperRef.bind(_this3);
		_this3.handleClickOutside = _this3.handleClickOutside.bind(_this3);
		return _this3;
	}

	/**
  * Hook in the listener for closing menu when clicked outside.
  */


	_createClass(ProductsBlockSettingsEditorDisplayOptions, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.existing) {
				document.addEventListener('mousedown', this.handleClickOutside);
			}
		}

		/**
   * Remove the listener for closing menu when clicked outside.
   */

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.existing) {
				document.removeEventListener('mousedown', this.handleClickOutside);
			}
		}

		/**
   * Set the wrapper reference.
   *
   * @param node DOMNode
   */

	}, {
		key: 'setWrapperRef',
		value: function setWrapperRef(node) {
			this.wrapperRef = node;
		}

		/**
   * Close the menu when user clicks outside the search area.
   */

	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside(evt) {
			if (this.wrapperRef && !this.wrapperRef.contains(event.target) && 'close-menu' !== event.target.getAttribute('class')) {
				this.props.closeMenu();
			}
		}

		/**
   * Render the list of options.
   */

	}, {
		key: 'render',
		value: function render() {
			var classes = 'wc-products-display-options';

			if (this.props.extended) {
				classes += ' wc-products-display-options--extended';
			}

			if (this.props.existing) {
				classes += ' wc-products-display-options--popover';
			}

			var display_settings = [];
			for (var setting_key in PRODUCTS_BLOCK_DISPLAY_SETTINGS) {
				display_settings.push(wp.element.createElement(ProductsBlockSettingsEditorDisplayOption, _extends({}, PRODUCTS_BLOCK_DISPLAY_SETTINGS[setting_key], { update_display_callback: this.props.update_display_callback, extended: this.props.extended, current: this.props.current })));
			}

			var arrow = wp.element.createElement('span', { className: 'wc-products-display-options--popover__arrow' });
			var description = wp.element.createElement(
				'p',
				{ className: 'wc-products-block-description' },
				__('Choose which products you\'d like to display:')
			);

			return wp.element.createElement(
				'div',
				{ className: classes },
				this.props.existing && arrow,
				!this.props.existing && description,
				display_settings
			);
		}
	}]);

	return ProductsBlockSettingsEditorDisplayOptions;
}(React.Component);

/**
 * The products block when in Edit mode.
 */


var ProductsBlockSettingsEditor = function (_React$Component3) {
	_inherits(ProductsBlockSettingsEditor, _React$Component3);

	/**
  * Constructor.
  */
	function ProductsBlockSettingsEditor(props) {
		_classCallCheck(this, ProductsBlockSettingsEditor);

		var _this4 = _possibleConstructorReturn(this, (ProductsBlockSettingsEditor.__proto__ || Object.getPrototypeOf(ProductsBlockSettingsEditor)).call(this, props));

		_this4.state = {
			display: props.selected_display,
			menu_visible: props.selected_display ? false : true,
			expanded_group: ''
		};

		_this4.updateDisplay = _this4.updateDisplay.bind(_this4);
		_this4.closeMenu = _this4.closeMenu.bind(_this4);
		return _this4;
	}

	/**
  * Update the display settings for the block.
  *
  * @param value String
  */


	_createClass(ProductsBlockSettingsEditor, [{
		key: 'updateDisplay',
		value: function updateDisplay(value) {

			// If not a group update display.
			var new_state = {
				display: value,
				menu_visible: false,
				expanded_group: ''
			};

			var is_group = 'undefined' !== PRODUCTS_BLOCK_DISPLAY_SETTINGS[value].group_container && PRODUCTS_BLOCK_DISPLAY_SETTINGS[value].group_container;

			if (is_group) {
				// If the group has not been expanded, expand it.
				new_state = {
					menu_visible: true,
					expanded_group: value

					// If the group has already been expanded, collapse it.
				};if (this.state.expanded_group === PRODUCTS_BLOCK_DISPLAY_SETTINGS[value].group_container) {
					new_state.expanded_group = '';
				}
			}

			this.setState(new_state);

			// Only update the display setting if a non-group setting was selected.
			if (!is_group) {
				this.props.update_display_callback(value);
			}
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			this.setState({
				menu_visible: false
			});
		}

		/**
   * Render the display settings dropdown and any extra contextual settings.
   */

	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var extra_settings = null;
			if ('specific' === this.state.display) {
				extra_settings = wp.element.createElement(_specificSelect.ProductsSpecificSelect, this.props);
			} else if ('category' === this.state.display) {
				extra_settings = wp.element.createElement(_categorySelect.ProductsCategorySelect, this.props);
			} else if ('attribute' === this.state.display) {
				extra_settings = wp.element.createElement(_attributeSelect.ProductsAttributeSelect, this.props);
			}

			var menu = this.state.menu_visible ? wp.element.createElement(ProductsBlockSettingsEditorDisplayOptions, { extended: this.state.expanded_group ? true : false, existing: this.state.display ? true : false, current: this.state.display, closeMenu: this.closeMenu, update_display_callback: this.updateDisplay }) : null;

			var heading = null;
			if (this.state.display) {
				var group_options = ['featured', 'on_sale', 'attribute', 'best_selling', 'top_rated'];
				var should_group_expand = group_options.includes(this.state.display) ? this.state.display : '';
				var menu_link = wp.element.createElement(
					'button',
					{ type: 'button', className: 'wc-products-settings-heading__change-button button-link', onClick: function onClick() {
							_this5.setState({ menu_visible: !_this5.state.menu_visible, expanded_group: should_group_expand });
						} },
					__('Display different products')
				);

				heading = wp.element.createElement(
					'div',
					{ className: 'wc-products-settings-heading' },
					wp.element.createElement(
						'div',
						{ className: 'wc-products-settings-heading__current' },
						__('Displaying '),
						wp.element.createElement(
							'strong',
							null,
							__(PRODUCTS_BLOCK_DISPLAY_SETTINGS[this.state.display].title)
						)
					),
					wp.element.createElement(
						'div',
						{ className: 'wc-products-settings-heading__change' },
						menu_link
					)
				);
			}

			var done_button = wp.element.createElement(
				'button',
				{ type: 'button', className: 'button wc-products-settings__footer-button', onClick: this.props.done_callback },
				__('Done')
			);
			if (['', 'specific', 'category', 'attribute'].includes(this.state.display) && !this.props.selected_display_setting.length) {
				var done_tooltips = {
					'': __('Please select which products you\'d like to display'),
					specific: __('Please search for and select products to display'),
					category: __('Please select at least one category to display'),
					attribute: __('Please select an attribute')
				};

				done_button = wp.element.createElement(
					Tooltip,
					{ text: done_tooltips[this.state.display] },
					wp.element.createElement(
						'button',
						{ type: 'button', className: 'button wc-products-settings__footer-button disabled' },
						__('Done')
					)
				);
			}

			return wp.element.createElement(
				'div',
				{ className: 'wc-products-settings ' + (this.state.expanded_group ? 'expanded-group-' + this.state.expanded_group : '') },
				wp.element.createElement(
					'h4',
					{ className: 'wc-products-settings__title' },
					wp.element.createElement(Dashicon, { icon: 'screenoptions' }),
					' ',
					__('Products')
				),
				heading,
				menu,
				extra_settings,
				wp.element.createElement(
					'div',
					{ className: 'wc-products-settings__footer' },
					done_button
				)
			);
		}
	}]);

	return ProductsBlockSettingsEditor;
}(React.Component);

/**
 * One product in the product block preview.
 */


var ProductPreview = function (_React$Component4) {
	_inherits(ProductPreview, _React$Component4);

	function ProductPreview() {
		_classCallCheck(this, ProductPreview);

		return _possibleConstructorReturn(this, (ProductPreview.__proto__ || Object.getPrototypeOf(ProductPreview)).apply(this, arguments));
	}

	_createClass(ProductPreview, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    attributes = _props.attributes,
			    product = _props.product;


			var image = null;
			if (product.images.length) {
				image = wp.element.createElement('img', { src: product.images[0].src });
			}

			return wp.element.createElement(
				'div',
				{ className: 'product-preview', key: product.id + '-preview' },
				image,
				wp.element.createElement(
					'div',
					{ className: 'product-title' },
					product.name
				),
				wp.element.createElement('div', { className: 'product-price', dangerouslySetInnerHTML: { __html: product.price_html } }),
				wp.element.createElement(
					'span',
					{ className: 'product-add-to-cart' },
					__('Add to cart')
				)
			);
		}
	}]);

	return ProductPreview;
}(React.Component);

/**
 * Renders a preview of what the block will look like with current settings.
 */
/*const ProductsBlockPreview = withAPIData( ( { attributes } ) => {

	const { columns, rows, display, display_setting, orderby } = attributes;

	let query = {
		per_page: rows * columns,
	};

	if ( 'specific' === display ) {
		query.include = display_setting.join( ',' );
		query.per_page = display_setting.length;
	} else if ( 'category' === display ) {
		query.category = display_setting.join( ',' );
	} else if ( 'attribute' === display && display_setting.length ) {
		query.attribute = getAttributeSlug( display_setting[0] );

		if ( display_setting.length > 1 ) {
			query.attribute_term = display_setting.slice( 1 ).join( ',' );
		}
	} else if ( 'featured' === display ) {
		query.featured = 1;
	} else if ( 'on_sale' === display ) {
		query.on_sale = 1;
	}

	if ( supportsOrderby( display ) ) {
		if ( 'price_desc' === orderby ) {
			query.orderby = 'price';
			query.order = 'desc';
		} else if ( 'price_asc' === orderby ) {
			query.orderby = 'price';
			query.order = 'asc';
		} else if ( 'title' === orderby ) {
			query.orderby = 'title';
			query.order = 'asc';
		} else {
			query.orderby = orderby;
		}
	}

	let query_string = '?';
	for ( const key of Object.keys( query ) ) {
		query_string += key + '=' + query[ key ] + '&';
	}

	return {
		// @todo Switch this to use WC core API when possible.
		products: '/wgbp/v3/products' + query_string
	};

} )( ( { products, attributes } ) => {

	if ( ! products.data ) {
		return __( 'Loading' );
	}

	if ( 0 === products.data.length ) {
		return __( 'No products found' );
	}

	const classes = "wc-products-block-preview cols-" + attributes.columns;

	return (
		<div className={ classes }>
			{ products.data.map( ( product ) => (
				<ProductPreview key={ product.id } product={ product } attributes={ attributes } />
			) ) }
		</div>
	);
} );*/


var ProductsBlockPreview = function (_React$Component5) {
	_inherits(ProductsBlockPreview, _React$Component5);

	function ProductsBlockPreview(props) {
		_classCallCheck(this, ProductsBlockPreview);

		return _possibleConstructorReturn(this, (ProductsBlockPreview.__proto__ || Object.getPrototypeOf(ProductsBlockPreview)).call(this, props));
	}

	_createClass(ProductsBlockPreview, [{
		key: 'render',
		value: function render() {
			return wp.element.createElement(
				'div',
				{ className: 'wc-products-block-preview cols-3' },
				'THIS'
			);
		}
	}]);

	return ProductsBlockPreview;
}(React.Component);

/**
 * Information about current block settings rendered in the sidebar.
 */
/*const ProductsBlockSidebarInfo = withAPIData( ( { attributes } ) => {

	const { display, display_setting } = attributes;

	if ( 'attribute' === display && display_setting.length ) {
		const ID        = getAttributeID( display_setting[0] );
		const terms     = display_setting.slice( 1 ).join( ', ' );
		const endpoints = {
			attributeInfo: '/wc/v2/products/attributes/' + ID,
		}

		if ( terms.length ) {
			endpoints.termInfo = '/wc/v2/products/attributes/' + ID + '/terms?include=' + terms;
		}

		return endpoints;

	} else if ( 'category' === display && display_setting.length ) {
		return {
			categoriesInfo: '/wc/v2/products/categories?include=' + display_setting.join( ',' ),
		};
	}

	return {};

} )( ( { attributes, categoriesInfo, attributeInfo, termInfo } ) => {

	let descriptions = [
		// Standard description of selected scope.
		PRODUCTS_BLOCK_DISPLAY_SETTINGS[ attributes.display ].title
	];

	// Description of categories selected scope.
	if ( categoriesInfo && categoriesInfo.data && categoriesInfo.data.length ) {
		let descriptionText = __( 'Product categories: ' );
		const categories = [];
		for ( let category of categoriesInfo.data ) {
			categories.push( category.name );
		}
		descriptionText += categories.join( ', ' );

		descriptions = [
			descriptionText
		];

		// Description of attributes selected scope.
	} else if ( attributeInfo && attributeInfo.data ) {
		descriptions = [
			__( 'Attribute: ' ) + attributeInfo.data.name
		];

		if ( termInfo && termInfo.data && termInfo.data.length ) {
			let termDescriptionText = __( "Terms: " );
			const terms = []
			for ( const term of termInfo.data ) {
				terms.push( term.name );
			}
			termDescriptionText += terms.join( ', ' );
			descriptions.push( termDescriptionText );
		}
	}

	return (
		<div>
			{ descriptions.map( ( description ) => (
				<div className="scope-description">{ description }</div>
			) ) }
		</div>
	);
} );*/


var ProductsBlockSidebarInfo = function (_React$Component6) {
	_inherits(ProductsBlockSidebarInfo, _React$Component6);

	function ProductsBlockSidebarInfo(props) {
		_classCallCheck(this, ProductsBlockSidebarInfo);

		return _possibleConstructorReturn(this, (ProductsBlockSidebarInfo.__proto__ || Object.getPrototypeOf(ProductsBlockSidebarInfo)).call(this, props));
	}

	_createClass(ProductsBlockSidebarInfo, [{
		key: 'render',
		value: function render() {
			return "sidebar";
		}
	}]);

	return ProductsBlockSidebarInfo;
}(React.Component);

;

/**
 * The main products block UI.
 */

var ProductsBlock = function (_React$Component7) {
	_inherits(ProductsBlock, _React$Component7);

	/**
  * Constructor.
  */
	function ProductsBlock(props) {
		_classCallCheck(this, ProductsBlock);

		var _this9 = _possibleConstructorReturn(this, (ProductsBlock.__proto__ || Object.getPrototypeOf(ProductsBlock)).call(this, props));

		_this9.getInspectorControls = _this9.getInspectorControls.bind(_this9);
		_this9.getToolbarControls = _this9.getToolbarControls.bind(_this9);
		_this9.getBlockDescription = _this9.getBlockDescription.bind(_this9);
		_this9.getPreview = _this9.getPreview.bind(_this9);
		_this9.getSettingsEditor = _this9.getSettingsEditor.bind(_this9);
		return _this9;
	}

	/**
  * Get the components for the sidebar settings area that is rendered while focused on a Products block.
  *
  * @return Component
  */


	_createClass(ProductsBlock, [{
		key: 'getInspectorControls',
		value: function getInspectorControls() {
			var _props2 = this.props,
			    attributes = _props2.attributes,
			    setAttributes = _props2.setAttributes;
			var rows = attributes.rows,
			    columns = attributes.columns,
			    display = attributes.display,
			    display_setting = attributes.display_setting,
			    orderby = attributes.orderby,
			    edit_mode = attributes.edit_mode;


			var columnControl = wp.element.createElement(RangeControl, {
				label: __('Columns'),
				value: columns,
				onChange: function onChange(value) {
					return setAttributes({ columns: value });
				},
				min: wc_product_block_data.min_columns,
				max: wc_product_block_data.max_columns
			});

			var orderControl = null;
			if (supportsOrderby(display)) {
				orderControl = wp.element.createElement(SelectControl, {
					key: 'query-panel-select',
					label: __('Order Products By'),
					value: orderby,
					options: [{
						label: __('Newness - newest first'),
						value: 'date'
					}, {
						label: __('Price - low to high'),
						value: 'price_asc'
					}, {
						label: __('Price - high to low'),
						value: 'price_desc'
					}, {
						label: __('Rating - highest first'),
						value: 'rating'
					}, {
						label: __('Sales - most first'),
						value: 'popularity'
					}, {
						label: __('Title - alphabetical'),
						value: 'title'
					}],
					onChange: function onChange(value) {
						return setAttributes({ orderby: value });
					}
				});
			}

			// Row settings don't make sense for specific-selected products display.
			var rowControl = null;
			if ('specific' !== display) {
				rowControl = wp.element.createElement(RangeControl, {
					label: __('Rows'),
					value: rows,
					onChange: function onChange(value) {
						return setAttributes({ rows: value });
					},
					min: 1,
					max: 6
				});
			}

			return wp.element.createElement(
				InspectorControls,
				{ key: 'inspector' },
				this.getBlockDescription(),
				wp.element.createElement(
					'h3',
					null,
					__('Layout')
				),
				columnControl,
				wp.element.createElement(RangeControl, {
					label: __('Rows'),
					value: rows,
					onChange: function onChange(value) {
						return setAttributes({ rows: value });
					},
					min: wc_product_block_data.min_rows,
					max: wc_product_block_data.max_rows
				}),
				orderControl
			);
		}

		/**
   * Get the components for the toolbar area that appears on top of the block when focused.
   *
   * @return Component
   */

	}, {
		key: 'getToolbarControls',
		value: function getToolbarControls() {
			var props = this.props;
			var attributes = props.attributes,
			    setAttributes = props.setAttributes;
			var display = attributes.display,
			    display_setting = attributes.display_setting,
			    edit_mode = attributes.edit_mode;

			// Edit button should not do anything if valid product selection has not been made.

			var shouldDisableEditButton = ['', 'specific', 'category', 'attribute'].includes(display) && !display_setting.length;

			var editButton = [{
				icon: 'edit',
				title: __('Edit'),
				onClick: shouldDisableEditButton ? function () {} : function () {
					return setAttributes({ edit_mode: !edit_mode });
				},
				isActive: edit_mode
			}];

			return wp.element.createElement(
				BlockControls,
				{ key: 'controls' },
				wp.element.createElement(Toolbar, { controls: editButton })
			);
		}

		/**
   * Get a description of the current block settings.
   *
   * @return Component
   */

	}, {
		key: 'getBlockDescription',
		value: function getBlockDescription() {
			var _props3 = this.props,
			    attributes = _props3.attributes,
			    setAttributes = _props3.setAttributes;
			var display = attributes.display,
			    display_setting = attributes.display_setting,
			    edit_mode = attributes.edit_mode;


			if (!display.length) {
				return null;
			}

			function editQuicklinkHandler() {
				setAttributes({
					edit_mode: true
				});

				// @todo center in view
			}

			var editQuickLink = null;
			if (!attributes.edit_mode) {
				editQuickLink = wp.element.createElement(
					'div',
					{ className: 'wc-products-scope-description--edit-quicklink' },
					wp.element.createElement(
						'a',
						{ onClick: editQuicklinkHandler },
						__('Edit')
					)
				);
			}

			return wp.element.createElement(
				'div',
				{ className: 'wc-products-scope-descriptions' },
				wp.element.createElement(
					'div',
					{ className: 'wc-products-scope-details' },
					wp.element.createElement(
						'h3',
						null,
						__('Current Source')
					),
					wp.element.createElement(ProductsBlockSidebarInfo, { attributes: attributes })
				),
				editQuickLink
			);
		}

		/**
   * Get the block preview component for preview mode.
   *
   * @return Component
   */

	}, {
		key: 'getPreview',
		value: function getPreview() {
			return wp.element.createElement(ProductsBlockPreview, { attributes: this.props.attributes });
		}

		/**
   * Get the block edit component for edit mode.
   *
   * @return Component
   */

	}, {
		key: 'getSettingsEditor',
		value: function getSettingsEditor() {
			var _props4 = this.props,
			    attributes = _props4.attributes,
			    setAttributes = _props4.setAttributes;
			var display = attributes.display,
			    display_setting = attributes.display_setting;


			var update_display_callback = function update_display_callback(value) {

				// These options have setting screens that need further input from the user, so keep edit mode open.
				var needsFurtherSettings = ['specific', 'attribute', 'category'];

				if (display !== value) {
					setAttributes({
						display: value,
						display_setting: [],
						edit_mode: needsFurtherSettings.includes(value)
					});
				}
			};

			return wp.element.createElement(ProductsBlockSettingsEditor, {
				attributes: attributes,
				selected_display: display,
				selected_display_setting: display_setting,
				update_display_callback: update_display_callback,
				update_display_setting_callback: function update_display_setting_callback(value) {
					return setAttributes({ display_setting: value });
				},
				done_callback: function done_callback() {
					return setAttributes({ edit_mode: false });
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var attributes = this.props.attributes;
			var edit_mode = attributes.edit_mode;


			return [this.getInspectorControls(), this.getToolbarControls(), edit_mode ? this.getSettingsEditor() : this.getPreview()];
		}
	}]);

	return ProductsBlock;
}(React.Component);

/**
 * Register and run the products block.
 */


registerBlockType('woocommerce/products', {
	title: __('Products'),
	icon: 'screenoptions',
	category: 'widgets',
	description: __('Display a grid of products from a variety of sources.'),

	attributes: {

		/**
   * Number of columns.
   */
		columns: {
			type: 'number',
			default: wc_product_block_data.default_columns
		},

		/**
   * Number of rows.
   */
		rows: {
			type: 'number',
			default: wc_product_block_data.default_rows
		},

		/**
   * What types of products to display. 'all', 'specific', or 'category'.
   */
		display: {
			type: 'string',
			default: ''
		},

		/**
   * Which products to display if 'display' is 'specific' or 'category'. Array of product ids or category slugs depending on setting.
   */
		display_setting: {
			type: 'array',
			default: []
		},

		/**
   * How to order the products: 'date', 'popularity', 'price_asc', 'price_desc' 'rating', 'title'.
   */
		orderby: {
			type: 'string',
			default: 'date'
		},

		/**
   * Whether the block is in edit or preview mode.
   */
		edit_mode: {
			type: 'boolean',
			default: true
		}
	},

	/**
  * Renders and manages the block.
  */
	edit: function edit(props) {
		return wp.element.createElement(ProductsBlock, props);
	},


	/**
  * Save the block content in the post content. Block content is saved as a products shortcode.
  *
  * @return string
  */
	save: function save(props) {
		var _props$attributes = props.attributes,
		    rows = _props$attributes.rows,
		    columns = _props$attributes.columns,
		    display = _props$attributes.display,
		    display_setting = _props$attributes.display_setting,
		    orderby = _props$attributes.orderby;


		var shortcode_atts = new Map();
		shortcode_atts.set('limit', rows * columns);
		shortcode_atts.set('columns', columns);

		if ('specific' === display) {
			shortcode_atts.set('ids', display_setting.join(','));
		} else if ('category' === display) {
			shortcode_atts.set('category', display_setting.join(','));
		} else if ('featured' === display) {
			shortcode_atts.set('visibility', 'featured');
		} else if ('on_sale' === display) {
			shortcode_atts.set('on_sale', '1');
		} else if ('best_selling' === display) {
			shortcode_atts.set('best_selling', '1');
		} else if ('top_rated' === display) {
			shortcode_atts.set('top_rated', '1');
		} else if ('attribute' === display) {
			var attribute = display_setting.length ? (0, _attributeSelect.getAttributeSlug)(display_setting[0]) : '';
			var terms = display_setting.length > 1 ? display_setting.slice(1).join(',') : '';

			shortcode_atts.set('attribute', attribute);
			if (terms.length) {
				shortcode_atts.set('terms', terms);
			}
		}

		if (supportsOrderby(display)) {
			if ('price_desc' === orderby) {
				shortcode_atts.set('orderby', 'price');
				shortcode_atts.set('order', 'DESC');
			} else if ('price_asc' === orderby) {
				shortcode_atts.set('orderby', 'price');
				shortcode_atts.set('order', 'ASC');
			} else if ('date' === orderby) {
				shortcode_atts.set('orderby', 'date');
				shortcode_atts.set('order', 'DESC');
			} else {
				shortcode_atts.set('orderby', orderby);
			}
		}

		// Build the shortcode string out of the set shortcode attributes.
		var shortcode = '[products';
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = shortcode_atts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _ref = _step.value;

				var _ref2 = _slicedToArray(_ref, 2);

				var key = _ref2[0];
				var value = _ref2[1];

				shortcode += ' ' + key + '="' + value + '"';
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		shortcode += ']';

		return wp.element.createElement(
			RawHTML,
			null,
			shortcode
		);
	}
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var _wp$components = wp.components,
    Toolbar = _wp$components.Toolbar,
    Dropdown = _wp$components.Dropdown,
    Dashicon = _wp$components.Dashicon;
var _wp = wp,
    apiFetch = _wp.apiFetch;

/**
 * Product data cache.
 * Reduces the number of API calls and makes UI smoother and faster.
 */

var PRODUCT_DATA = {};

/**
 * When the display mode is 'Specific products' search for and add products to the block.
 *
 * @todo Add the functionality and everything.
 */

var ProductsSpecificSelect = exports.ProductsSpecificSelect = function (_React$Component) {
	_inherits(ProductsSpecificSelect, _React$Component);

	/**
  * Constructor.
  */
	function ProductsSpecificSelect(props) {
		_classCallCheck(this, ProductsSpecificSelect);

		var _this = _possibleConstructorReturn(this, (ProductsSpecificSelect.__proto__ || Object.getPrototypeOf(ProductsSpecificSelect)).call(this, props));

		_this.state = {
			selectedProducts: props.selected_display_setting || []
		};
		return _this;
	}

	/**
  * Add a product to the list of selected products.
  *
  * @param id int Product ID.
  */


	_createClass(ProductsSpecificSelect, [{
		key: 'addOrRemoveProduct',
		value: function addOrRemoveProduct(id) {
			var selectedProducts = this.state.selectedProducts;

			if (!selectedProducts.includes(id)) {
				selectedProducts.push(id);
			} else {
				selectedProducts = selectedProducts.filter(function (product) {
					return product !== id;
				});
			}

			this.setState({
				selectedProducts: selectedProducts
			});

			/**
    * We need to copy the existing data into a new array.
    * We can't just push the new product onto the end of the existing array because Gutenberg seems
    * to do some sort of check by reference to determine whether to *actually* update the attribute
    * and will not update it if we just pass back the same array with an extra element on the end.
    */
			this.props.update_display_setting_callback(selectedProducts.slice());
		}

		/**
   * Render the product specific select screen.
   */

	}, {
		key: 'render',
		value: function render() {
			return wp.element.createElement(
				'div',
				{ className: 'wc-products-list-card wc-products-list-card--specific' },
				wp.element.createElement(ProductsSpecificSearchField, {
					addOrRemoveProductCallback: this.addOrRemoveProduct.bind(this),
					selectedProducts: this.state.selectedProducts
				}),
				wp.element.createElement(ProductSpecificSelectedProducts, {
					columns: this.props.attributes.columns,
					productIds: this.state.selectedProducts,
					addOrRemoveProduct: this.addOrRemoveProduct.bind(this)
				})
			);
		}
	}]);

	return ProductsSpecificSelect;
}(React.Component);

/**
 * Product search area
 */


var ProductsSpecificSearchField = function (_React$Component2) {
	_inherits(ProductsSpecificSearchField, _React$Component2);

	/**
  * Constructor.
  */
	function ProductsSpecificSearchField(props) {
		_classCallCheck(this, ProductsSpecificSearchField);

		var _this2 = _possibleConstructorReturn(this, (ProductsSpecificSearchField.__proto__ || Object.getPrototypeOf(ProductsSpecificSearchField)).call(this, props));

		_this2.state = {
			searchText: '',
			dropdownOpen: false
		};

		_this2.updateSearchResults = _this2.updateSearchResults.bind(_this2);
		_this2.setWrapperRef = _this2.setWrapperRef.bind(_this2);
		_this2.handleClickOutside = _this2.handleClickOutside.bind(_this2);
		_this2.isDropdownOpen = _this2.isDropdownOpen.bind(_this2);
		return _this2;
	}

	/**
  * Hook in the listener for closing menu when clicked outside.
  */


	_createClass(ProductsSpecificSearchField, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('mousedown', this.handleClickOutside);
		}

		/**
   * Remove the listener for closing menu when clicked outside.
   */

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('mousedown', this.handleClickOutside);
		}

		/**
   * Set the wrapper reference.
   *
   * @param node DOMNode
   */

	}, {
		key: 'setWrapperRef',
		value: function setWrapperRef(node) {
			this.wrapperRef = node;
		}

		/**
   * Close the menu when user clicks outside the search area.
   */

	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside(evt) {
			if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
				this.setState({
					searchText: ''
				});
			}
		}
	}, {
		key: 'isDropdownOpen',
		value: function isDropdownOpen(isOpen) {
			this.setState({
				dropdownOpen: !!isOpen
			});
		}

		/**
   * Event handler for updating results when text is typed into the input.
   *
   * @param evt Event object.
   */

	}, {
		key: 'updateSearchResults',
		value: function updateSearchResults(evt) {
			this.setState({
				searchText: evt.target.value
			});
		}

		/**
   * Render the product search UI.
   */

	}, {
		key: 'render',
		value: function render() {
			var divClass = 'wc-products-list-card__search-wrapper';

			return wp.element.createElement(
				'div',
				{ className: divClass + (this.state.dropdownOpen ? ' ' + divClass + '--with-results' : ''), ref: this.setWrapperRef },
				wp.element.createElement(
					'div',
					{ className: 'wc-products-list-card__input-wrapper' },
					wp.element.createElement(Dashicon, { icon: 'search' }),
					wp.element.createElement('input', { type: 'search',
						className: 'wc-products-list-card__search',
						value: this.state.searchText,
						placeholder: __('Search for products to display'),
						onChange: this.updateSearchResults
					})
				),
				wp.element.createElement(ProductSpecificSearchResults, {
					searchString: this.state.searchText,
					addOrRemoveProductCallback: this.props.addOrRemoveProductCallback,
					selectedProducts: this.props.selectedProducts,
					isDropdownOpenCallback: this.isDropdownOpen
				})
			);
		}
	}]);

	return ProductsSpecificSearchField;
}(React.Component);

/**
 * Render product search results based on the text entered into the textbox.
 */
/*const ProductSpecificSearchResults = withAPIData( ( props ) => {

		if ( ! props.searchString.length ) {
			return {
				products: []
			};
		}

		return {
			products: '/wc/v2/products?per_page=10&search=' + props.searchString,
		};
	} )( ( { products, addOrRemoveProductCallback, selectedProducts, isDropdownOpenCallback } ) => {
		if ( ! products.data ) {
			return null;
		}

		if ( 0 === products.data.length ) {
			return <span className="wc-products-list-card__search-no-results"> { __( 'No products found' ) } </span>;
		}

		// Populate the cache.
		for ( let product of products.data ) {
			PRODUCT_DATA[ product.id ] = product;
		}

		return <ProductSpecificSearchResultsDropdown
			products={ products.data }
			addOrRemoveProductCallback={ addOrRemoveProductCallback }
			selectedProducts={ selectedProducts }
			isDropdownOpenCallback={ isDropdownOpenCallback }
		/>
	}
);*/


var ProductSpecificSearchResults = null;

/**
 * The dropdown of search results.
 */

var ProductSpecificSearchResultsDropdown = function (_React$Component3) {
	_inherits(ProductSpecificSearchResultsDropdown, _React$Component3);

	function ProductSpecificSearchResultsDropdown() {
		_classCallCheck(this, ProductSpecificSearchResultsDropdown);

		return _possibleConstructorReturn(this, (ProductSpecificSearchResultsDropdown.__proto__ || Object.getPrototypeOf(ProductSpecificSearchResultsDropdown)).apply(this, arguments));
	}

	_createClass(ProductSpecificSearchResultsDropdown, [{
		key: 'componentDidMount',


		/**
   * Set the state of the dropdown to open.
   */
		value: function componentDidMount() {
			this.props.isDropdownOpenCallback(true);
		}

		/**
   * Set the state of the dropdown to closed.
   */

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.isDropdownOpenCallback(false);
		}

		/**
   * Render dropdown.
   */

	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    products = _props.products,
			    addOrRemoveProductCallback = _props.addOrRemoveProductCallback,
			    selectedProducts = _props.selectedProducts;


			var productElements = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var product = _step.value;

					productElements.push(wp.element.createElement(ProductSpecificSearchResultsDropdownElement, {
						product: product,
						addOrRemoveProductCallback: addOrRemoveProductCallback,
						selected: selectedProducts.includes(product.id)
					}));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return wp.element.createElement(
				'div',
				{ role: 'menu', className: 'wc-products-list-card__search-results', 'aria-orientation': 'vertical', 'aria-label': __('Products list') },
				wp.element.createElement(
					'div',
					null,
					productElements
				)
			);
		}
	}]);

	return ProductSpecificSearchResultsDropdown;
}(React.Component);

/**
 * One search result.
 */


var ProductSpecificSearchResultsDropdownElement = function (_React$Component4) {
	_inherits(ProductSpecificSearchResultsDropdownElement, _React$Component4);

	/**
  * Constructor.
  */
	function ProductSpecificSearchResultsDropdownElement(props) {
		_classCallCheck(this, ProductSpecificSearchResultsDropdownElement);

		var _this4 = _possibleConstructorReturn(this, (ProductSpecificSearchResultsDropdownElement.__proto__ || Object.getPrototypeOf(ProductSpecificSearchResultsDropdownElement)).call(this, props));

		_this4.handleClick = _this4.handleClick.bind(_this4);
		return _this4;
	}

	/**
  * Add product to main list and change UI to show it was added.
  */


	_createClass(ProductSpecificSearchResultsDropdownElement, [{
		key: 'handleClick',
		value: function handleClick() {
			this.props.addOrRemoveProductCallback(this.props.product.id);
		}

		/**
   * Render one result in the search results.
   */

	}, {
		key: 'render',
		value: function render() {
			var product = this.props.product;
			var icon = this.props.selected ? wp.element.createElement(Dashicon, { icon: 'yes' }) : null;

			return wp.element.createElement(
				'div',
				{ className: 'wc-products-list-card__content' + (this.props.selected ? ' wc-products-list-card__content--added' : ''), onClick: this.handleClick },
				wp.element.createElement('img', { src: product.images[0].src }),
				wp.element.createElement(
					'span',
					{ className: 'wc-products-list-card__content-item-name' },
					product.name
				),
				icon
			);
		}
	}]);

	return ProductSpecificSearchResultsDropdownElement;
}(React.Component);

/**
 * List preview of selected products.
 */
/*const ProductSpecificSelectedProducts = withAPIData( ( props ) => {
		if ( ! props.productIds.length ) {
			return {
				products: []
			};
		}

		// Determine which products are not already in the cache and only fetch uncached products.
		let uncachedProducts = [];
		for( const productId of props.productIds ) {
			if ( ! PRODUCT_DATA.hasOwnProperty( productId ) ) {
				uncachedProducts.push( productId );
			}
		}

		return {
			products: uncachedProducts.length ? '/wc/v2/products?include=' + uncachedProducts.join( ',' ) : []
		};
	} )( ( { productIds, products, columns, addOrRemoveProduct } ) => {

		// Add new products to cache.
		if ( products.data ) {
			for ( const product of products.data ) {
				PRODUCT_DATA[ product.id ] = product;
			}
		}

		const productElements = [];

		for ( const productId of productIds ) {

			// Skip products that aren't in the cache yet or failed to fetch.
			if ( ! PRODUCT_DATA.hasOwnProperty( productId ) ) {
				continue;
			}

			const productData = PRODUCT_DATA[ productId ];

			productElements.push(
				<li className="wc-products-list-card__item" key={ productData.id + '-specific-select-edit' } >
					<div className="wc-products-list-card__content">
						<img src={ productData.images[0].src } />
						<span className="wc-products-list-card__content-item-name">{ productData.name }</span>
						<button
							type="button"
							id={ 'product-' + productData.id }
							onClick={ function() { addOrRemoveProduct( productData.id ) } } >
								<Dashicon icon="no-alt" />
						</button>
					</div>
				</li>
			);
		}

		return (
			<div className={ 'wc-products-list-card__results-wrapper wc-products-list-card__results-wrapper--cols-' + columns }>
				<div role="menu" className="wc-products-list-card__results" aria-orientation="vertical" aria-label={ __( 'Selected products' ) }>

					{ productElements.length > 0 && <h3>{ __( 'Selected products' ) }</h3> }

					<ul>
						{ productElements }
					</ul>
				</div>
			</div>
		);
	}
);*/


var ProductSpecificSelectedProducts = null;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var _wp$components = wp.components,
    Toolbar = _wp$components.Toolbar,
    Dropdown = _wp$components.Dropdown,
    Dashicon = _wp$components.Dashicon;
var _wp = wp,
    apiFetch = _wp.apiFetch;

/**
 * When the display mode is 'Product category' search for and select product categories to pull products from.
 */

var ProductsCategorySelect = exports.ProductsCategorySelect = function (_React$Component) {
	_inherits(ProductsCategorySelect, _React$Component);

	/**
  * Constructor.
  */
	function ProductsCategorySelect(props) {
		_classCallCheck(this, ProductsCategorySelect);

		var _this = _possibleConstructorReturn(this, (ProductsCategorySelect.__proto__ || Object.getPrototypeOf(ProductsCategorySelect)).call(this, props));

		_this.state = {
			selectedCategories: props.selected_display_setting,
			openAccordion: [],
			filterQuery: '',
			firstLoad: true
		};

		_this.checkboxChange = _this.checkboxChange.bind(_this);
		_this.accordionToggle = _this.accordionToggle.bind(_this);
		_this.filterResults = _this.filterResults.bind(_this);
		_this.setFirstLoad = _this.setFirstLoad.bind(_this);
		return _this;
	}

	/**
  * Handle checkbox toggle.
  *
  * @param Checked? boolean checked
  * @param Categories array categories
  */


	_createClass(ProductsCategorySelect, [{
		key: "checkboxChange",
		value: function checkboxChange(checked, categories) {
			var selectedCategories = this.state.selectedCategories;

			selectedCategories = selectedCategories.filter(function (category) {
				return !categories.includes(category);
			});

			if (checked) {
				var _selectedCategories;

				(_selectedCategories = selectedCategories).push.apply(_selectedCategories, _toConsumableArray(categories));
			}

			this.setState({
				selectedCategories: selectedCategories
			});

			this.props.update_display_setting_callback(selectedCategories);
		}

		/**
   * Handle accordion toggle.
   *
   * @param Category ID category
   */

	}, {
		key: "accordionToggle",
		value: function accordionToggle(category) {
			var openAccordions = this.state.openAccordion;

			if (openAccordions.includes(category)) {
				openAccordions = openAccordions.filter(function (c) {
					return c !== category;
				});
			} else {
				openAccordions.push(category);
			}

			this.setState({
				openAccordion: openAccordions
			});
		}

		/**
   * Filter categories.
   *
   * @param Event object evt
   */

	}, {
		key: "filterResults",
		value: function filterResults(evt) {
			this.setState({
				filterQuery: evt.target.value
			});
		}

		/**
   * Update firstLoad state.
   *
   * @param Booolean loaded
   */

	}, {
		key: "setFirstLoad",
		value: function setFirstLoad(loaded) {
			this.setState({
				firstLoad: !!loaded
			});
		}

		/**
   * Render the list of categories and the search input.
   */

	}, {
		key: "render",
		value: function render() {
			return wp.element.createElement(
				"div",
				{ className: "wc-products-list-card wc-products-list-card--taxonomy wc-products-list-card--taxonomy-category" },
				wp.element.createElement(ProductCategoryFilter, { filterResults: this.filterResults }),
				wp.element.createElement(ProductCategoryList, {
					filterQuery: this.state.filterQuery,
					selectedCategories: this.state.selectedCategories,
					checkboxChange: this.checkboxChange,
					accordionToggle: this.accordionToggle,
					openAccordion: this.state.openAccordion,
					firstLoad: this.state.firstLoad,
					setFirstLoad: this.setFirstLoad
				})
			);
		}
	}]);

	return ProductsCategorySelect;
}(React.Component);

/**
 * The category search input.
 */


var ProductCategoryFilter = function ProductCategoryFilter(_ref) {
	var filterResults = _ref.filterResults;

	return wp.element.createElement(
		"div",
		{ className: "wc-products-list-card__input-wrapper" },
		wp.element.createElement(Dashicon, { icon: "search" }),
		wp.element.createElement("input", { className: "wc-products-list-card__search", type: "search", placeholder: __('Search for categories'), onChange: filterResults })
	);
};

/**
 * Fetch and build a tree of product categories.
 */
/*const ProductCategoryList = withAPIData( ( props ) => {
		return {
			categories: '/wc/v2/products/categories'
		};
	} )( ( { categories, filterQuery, selectedCategories, checkboxChange, accordionToggle, openAccordion, firstLoad, setFirstLoad } ) => {
		if ( ! categories.data ) {
			return __( 'Loading' );
		}

		if ( 0 === categories.data.length ) {
			return __( 'No categories found' );
		}

		const handleCategoriesToCheck = ( evt, parent, categories ) => {
			let ids = getCategoryChildren( parent, categories ).map( category => {
				return category.id;
			} );

			ids.push( parent.id );

			checkboxChange( evt.target.checked, ids );
		};

		const getCategoryChildren = ( parent, categories ) => {
			let children = [];

			categories.filter( ( category ) => category.parent === parent.id ).forEach( function( category ) {
				children.push( category );
				children.push( ...getCategoryChildren( category, categories ) );
			} );

			return children;
		};

		const categoryHasChildren = ( parent, categories ) => {
			return !! getCategoryChildren( parent, categories ).length;
		};

		const isIndeterminate = ( category, categories ) => {

			// Currect category selected?
			if ( selectedCategories.includes( category.id ) ) {
				return false;
			}

			// Has children?
			let children = getCategoryChildren( category, categories ).map( category => {
				return category.id;
			} );

			for ( let child of children ) {
				if ( selectedCategories.includes( child ) ) {
					return true;
				}
			}

			return false;
		}

		const AccordionButton = ( { category, categories } ) => {
			let icon = 'arrow-down-alt2';

			if ( openAccordion.includes( category.id ) ) {
				icon = 'arrow-up-alt2';
			}

			let style = null;

			if ( ! categoryHasChildren( category, categories ) ) {
				style = {
					visibility: 'hidden',
				};
			};

			return (
				<button onClick={ () => accordionToggle( category.id ) } className="wc-products-list-card__accordion-button" style={ style } type="button">
					<Dashicon icon={ icon } />
				</button>
			);
		};

		const CategoryTree = ( { categories, parent } ) => {
			let filteredCategories = categories.filter( ( category ) => category.parent === parent );

			if ( firstLoad && selectedCategories.length > 0 ) {
				categoriesData.filter( ( category ) => category.parent === 0 ).forEach( function( category ) {
					let children = getCategoryChildren( category, categoriesData );

					for ( let child of children ) {
						if ( selectedCategories.includes( child.id ) && ! openAccordion.includes( category.id ) ) {
							accordionToggle( category.id );
							break;
						}
					}
				} );

				setFirstLoad( false );
			}

			return ( filteredCategories.length > 0 ) && (
				<ul>
					{ filteredCategories.map( ( category ) => (
						<li key={ category.id } className={ ( openAccordion.includes( category.id ) ? 'wc-products-list-card__item wc-products-list-card__accordion-open' : 'wc-products-list-card__item' ) }>
							<label className={ ( 0 === category.parent ) ? 'wc-products-list-card__content' : ''  } htmlFor={ 'product-category-' + category.id }>
								<input type="checkbox"
								       id={ 'product-category-' + category.id }
								       value={ category.id }
								       checked={ selectedCategories.includes( category.id ) }
								       onChange={ ( evt ) => handleCategoriesToCheck( evt, category, categories ) }
								       ref={ el => el && ( el.indeterminate = isIndeterminate( category, categories ) ) }
								/> { category.name }
								{ 0 === category.parent &&
									<AccordionButton category={ category } categories={ categories } />
								}
								<span className="wc-products-list-card__taxonomy-count">{ category.count }</span>
							</label>
							<CategoryTree categories={ categories } parent={ category.id } />
						</li>
					) ) }
				</ul>
			);
		};

		let categoriesData = categories.data;

		if ( '' !== filterQuery ) {
			categoriesData = categoriesData.filter( category => category.slug.includes( filterQuery.toLowerCase() ) );
		}

		return (
			<div className="wc-products-list-card__results">
				<CategoryTree categories={ categoriesData } parent={ 0 } />
			</div>
		);
	}
);*/
var ProductCategoryList = null;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getAttributeIdentifier = getAttributeIdentifier;
exports.getAttributeSlug = getAttributeSlug;
exports.getAttributeID = getAttributeID;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var _wp$components = wp.components,
    Toolbar = _wp$components.Toolbar,
    Dropdown = _wp$components.Dropdown,
    Dashicon = _wp$components.Dashicon;
var _wp = wp,
    apiFetch = _wp.apiFetch;

/**
 * Get the identifier for an attribute. The identifier can be used to determine
 * the slug or the ID of the attribute.
 *
 * @param string slug The attribute slug.
 * @param int|numeric string id The attribute ID.
 */

function getAttributeIdentifier(slug, id) {
	return slug + ',' + id;
}

/**
 * Get the attribute slug from an identifier.
 *
 * @param string identifier The attribute identifier.
 * @return string
 */
function getAttributeSlug(identifier) {
	return identifier.split(',')[0];
}

/**
 * Get the attribute ID from an identifier.
 *
 * @param string identifier The attribute identifier.
 * @return numeric string
 */
function getAttributeID(identifier) {
	return identifier.split(',')[1];
}

/**
 * When the display mode is 'Attribute' search for and select product attributes to pull products from.
 */

var ProductsAttributeSelect = exports.ProductsAttributeSelect = function (_React$Component) {
	_inherits(ProductsAttributeSelect, _React$Component);

	/**
  * Constructor.
  */
	function ProductsAttributeSelect(props) {
		_classCallCheck(this, ProductsAttributeSelect);

		/**
   * The first item in props.selected_display_setting is the attribute slug and id separated by a comma.
   * This is to work around limitations in the API which sometimes requires a slug and sometimes an id.
   * The rest of the elements in selected_display_setting are the term ids for any selected terms.
   */
		var _this = _possibleConstructorReturn(this, (ProductsAttributeSelect.__proto__ || Object.getPrototypeOf(ProductsAttributeSelect)).call(this, props));

		_this.state = {
			selectedAttribute: props.selected_display_setting.length ? props.selected_display_setting[0] : '',
			selectedTerms: props.selected_display_setting.length > 1 ? props.selected_display_setting.slice(1) : [],
			filterQuery: ''
		};

		_this.setSelectedAttribute = _this.setSelectedAttribute.bind(_this);
		_this.addTerm = _this.addTerm.bind(_this);
		_this.removeTerm = _this.removeTerm.bind(_this);
		return _this;
	}

	/**
  * Set the selected attribute.
  *
  * @param identifier string Attribute slug and id separated by a comma.
  */


	_createClass(ProductsAttributeSelect, [{
		key: 'setSelectedAttribute',
		value: function setSelectedAttribute(identifier) {
			this.setState({
				selectedAttribute: identifier,
				selectedTerms: []
			});

			this.props.update_display_setting_callback([identifier]);
		}

		/**
   * Add a term to the selected attribute's terms.
   *
   * @param id int Term id.
   */

	}, {
		key: 'addTerm',
		value: function addTerm(id) {
			var terms = this.state.selectedTerms;
			terms.push(id);
			this.setState({
				selectedTerms: terms
			});

			var displaySetting = [this.state.selectedAttribute];
			displaySetting = displaySetting.concat(terms);
			this.props.update_display_setting_callback(displaySetting);
		}

		/**
   * Remove a term from the selected attribute's terms.
   *
   * @param id int Term id.
   */

	}, {
		key: 'removeTerm',
		value: function removeTerm(id) {
			var newTerms = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.state.selectedTerms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var termId = _step.value;

					if (termId !== id) {
						newTerms.push(termId);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.setState({
				selectedTerms: newTerms
			});

			var displaySetting = [this.state.selectedAttribute];
			displaySetting = displaySetting.concat(newTerms);
			this.props.update_display_setting_callback(displaySetting);
		}

		/**
   * Update the search results when typing in the attributes box.
   *
   * @param evt Event object
   */

	}, {
		key: 'updateFilter',
		value: function updateFilter(evt) {
			this.setState({
				filterQuery: evt.target.value
			});
		}

		/**
   * Render the whole section.
   */

	}, {
		key: 'render',
		value: function render() {
			return wp.element.createElement(
				'div',
				{ className: 'wc-products-list-card wc-products-list-card--taxonomy wc-products-list-card--taxonomy-atributes' },
				wp.element.createElement(ProductAttributeFilter, { updateFilter: this.updateFilter.bind(this) }),
				wp.element.createElement(ProductAttributeList, {
					selectedAttribute: this.state.selectedAttribute,
					selectedTerms: this.state.selectedTerms,
					filterQuery: this.state.filterQuery,
					setSelectedAttribute: this.setSelectedAttribute.bind(this),
					addTerm: this.addTerm.bind(this),
					removeTerm: this.removeTerm.bind(this)
				})
			);
		}
	}]);

	return ProductsAttributeSelect;
}(React.Component);

/**
 * Search area for filtering through the attributes list.
 */


var ProductAttributeFilter = function ProductAttributeFilter(props) {
	return wp.element.createElement(
		'div',
		{ className: 'wc-products-list-card__input-wrapper' },
		wp.element.createElement(Dashicon, { icon: 'search' }),
		wp.element.createElement('input', { className: 'wc-products-list-card__search', type: 'search', placeholder: __('Search for attributes'), onChange: props.updateFilter })
	);
};

/**
 * List of attributes.
 */
/*const ProductAttributeList = withAPIData( ( props ) => {
		return {
			attributes: '/wc/v2/products/attributes'
		};
	} )( ( { attributes, selectedAttribute, filterQuery, selectedTerms, setSelectedAttribute, addTerm, removeTerm } ) => {
		if ( ! attributes.data ) {
			return __( 'Loading' );
		}

		if ( 0 === attributes.data.length ) {
			return __( 'No attributes found' );
		}


		const filter = filterQuery.toLowerCase();
		let attributeElements = [];
		for ( let attribute of attributes.data ) {
			// Filter out attributes that don't match the search query.
			if ( filter.length && -1 === attribute.name.toLowerCase().indexOf( filter ) ) {
				continue;
			}

			attributeElements.push(
				<ProductAttributeElement 
					attribute={ attribute } 
					selectedAttribute={ selectedAttribute } 
					selectedTerms={ selectedTerms } 
					setSelectedAttribute={ setSelectedAttribute}
					addTerm={ addTerm }
					removeTerm={ removeTerm } 
				/>
			);
		}

		return (
			<div className="wc-products-list-card__results">
				{ attributeElements }
			</div>
		);
	}
);*/
var ProductAttributeList = null;

/**
 * One product attribute.
 */

var ProductAttributeElement = function (_React$Component2) {
	_inherits(ProductAttributeElement, _React$Component2);

	function ProductAttributeElement(props) {
		_classCallCheck(this, ProductAttributeElement);

		var _this2 = _possibleConstructorReturn(this, (ProductAttributeElement.__proto__ || Object.getPrototypeOf(ProductAttributeElement)).call(this, props));

		_this2.handleAttributeChange = _this2.handleAttributeChange.bind(_this2);
		_this2.handleTermChange = _this2.handleTermChange.bind(_this2);
		return _this2;
	}

	/**
  * Propagate and reset values when the selected attribute is changed.
  *
  * @param evt Event object
  */


	_createClass(ProductAttributeElement, [{
		key: 'handleAttributeChange',
		value: function handleAttributeChange(evt) {
			if (!evt.target.checked) {
				return;
			}

			this.props.setSelectedAttribute(evt.target.value);
		}

		/**
   * Add or remove selected terms.
   *
   * @param evt Event object
   */

	}, {
		key: 'handleTermChange',
		value: function handleTermChange(evt) {
			if (evt.target.checked) {
				this.props.addTerm(evt.target.value);
			} else {
				this.props.removeTerm(evt.target.value);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var isSelected = this.props.selectedAttribute === getAttributeIdentifier(this.props.attribute.slug, this.props.attribute.id);

			var attributeTerms = null;
			if (isSelected) {
				attributeTerms = wp.element.createElement(AttributeTerms, {
					attribute: this.props.attribute,
					selectedTerms: this.props.selectedTerms,
					addTerm: this.props.addTerm,
					removeTerm: this.props.removeTerm
				});
			}

			var cssClasses = ['wc-products-list-card--taxonomy-atributes__atribute'];
			if (isSelected) {
				cssClasses.push('wc-products-list-card__accordion-open');
			}

			return wp.element.createElement(
				'div',
				{ className: cssClasses.join(' ') },
				wp.element.createElement(
					'div',
					null,
					wp.element.createElement(
						'label',
						{ className: 'wc-products-list-card__content' },
						wp.element.createElement('input', { type: 'radio',
							value: getAttributeIdentifier(this.props.attribute.slug, this.props.attribute.id),
							onChange: this.handleAttributeChange,
							checked: isSelected
						}),
						this.props.attribute.name
					)
				),
				attributeTerms
			);
		}
	}]);

	return ProductAttributeElement;
}(React.Component);

/**
 * The list of terms in an attribute.
 */
/*const AttributeTerms = withAPIData( ( props ) => {
		return {
			terms: '/wc/v2/products/attributes/' + props.attribute.id + '/terms'
		};
	} )( ( { terms, selectedTerms, attribute, addTerm, removeTerm } ) => {
		if ( ! terms.data ) {
			return ( <ul><li>{ __( 'Loading' ) }</li></ul> );
		}

		if ( 0 === terms.data.length ) {
			return ( <ul><li>{ __( 'No terms found' ) }</li></ul> );
		}

		function handleTermChange( evt ) {
			if ( evt.target.checked ) {
				addTerm( evt.target.value );
			} else {
				removeTerm( evt.target.value );
			}
		}

		return (
			<ul>
				{ terms.data.map( ( term ) => (
					<li className="wc-products-list-card__item">
						<label className="wc-products-list-card__content">
							<input type="checkbox"
								value={ term.id }
								onChange={ handleTermChange }
								checked={ selectedTerms.includes( String( term.id ) ) }
							/>
							{ term.name }
							<span className="wc-products-list-card__taxonomy-count">{ term.count }</span>
						</label>
					</li>
				) ) }
			</ul>
		);
	}
);*/


var AttributeTerms = null;

/***/ })
/******/ ]);