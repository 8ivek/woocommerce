<?php

namespace Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\Templates;

use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\AbstractProductTemplate;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\BaseProductTemplate;
use Automattic\WooCommerce\Admin\Features\ProductBlockEditor\ProductTemplates\ProductTemplateInterface;

/**
 * Variable product template.
 */
class VariableProductTemplate extends AbstractProductTemplate implements ProductTemplateInterface {

    /**
     * Setup the template.
     */
    public function __construct() {}

	/**
	 * Get the slug of the template.
	 *
	 * @return string Template slug
	 */
    public function get_slug() {
        return 'variable';
    }

    /**
	 * Get the title of the template.
	 *
	 * @return string Template title
	 */
    public function get_title() {
        return __( 'Variable product editor template.', 'woocommerce' );
    }

    /**
	 * Get the description for the template.
	 *
	 * @return string Template description
	 */
    public function get_description() {
        return __( 'Product template for editing variable product types.', 'woocommerce' );
    }

    /**
	 * Get the template layout.
	 *
	 * @return array Array of blocks
	 */
    public function get_template() {
        return array(
            array(
                'woocommerce/product-tab',
                array(
                    'id'    => 'general',
                    'title' => __( 'General', 'woocommerce' ),
                    'order' => 10,
                ),
                array(
                    array(
                        'woocommerce/product-section',
                        array(
                            'title'       => __( 'Basic details', 'woocommerce' ),
                            'description' => __( 'This info will be displayed on the product page, category pages, social media, and search results.', 'woocommerce' ),
                        ),
                        array(
                            array(
                                'woocommerce/product-name-field',
                                array(
                                    'name' => 'Product name',
                                ),
                            ),
                            array(
                                'woocommerce/product-summary-field',
                            ),
                            array(
                                'core/columns',
                                array(),
                                array(
                                    array(
                                        'core/column',
                                        array(
                                            'templateLock' => 'all',
                                        ),
                                        array(
                                            array(
                                                'woocommerce/product-regular-price-field',
                                                array(
                                                    'name'  => 'regular_price',
                                                    'label' => __( 'List price', 'woocommerce' ),
                                                    'help'  => __( 'Manage more settings in <PricingTab>Pricing.</PricingTab>', 'woocommerce' ),
                                                ),
                                            ),
                                        ),
                                    ),
                                    array(
                                        'core/column',
                                        array(
                                            'templateLock' => 'all',
                                        ),
                                        array(
                                            array(
                                                'woocommerce/product-sale-price-field',
                                                array(
                                                    'label' => __( 'Sale price', 'woocommerce' ),
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    array(
                        'woocommerce/product-section',
                        array(
                            'title'       => __( 'Description', 'woocommerce' ),
                            'description' => __( 'What makes this product unique? What are its most important features? Enrich the product page by adding rich content using blocks.', 'woocommerce' ),
                        ),
                        array(
                            array(
                                'woocommerce/product-description-field',
                            ),
                        ),
                    ),
                    array(
                        'woocommerce/product-section',
                        array(
                            'title'       => __( 'Images', 'woocommerce' ),
                            'description' => sprintf(
                                /* translators: %1$s: Images guide link opening tag. %2$s: Images guide link closing tag.*/
                                __( 'Drag images, upload new ones or select files from your library. For best results, use JPEG files that are 1000 by 1000 pixels or larger. %1$sHow to prepare images?%2$s', 'woocommerce' ),
                                '<a href="http://woocommerce.com/#" target="_blank" rel="noreferrer">',
                                '</a>'
                            ),
                        ),
                        array(
                            array(
                                'woocommerce/product-images-field',
                                array(
                                    'images' => array(),
                                ),
                            ),
                        ),
                    ),
                    array(
                        'woocommerce/product-section',
                        array(
                            'title'       => __( 'Organization & visibility', 'woocommerce' ),
                            'description' => __( 'Help customers find this product by assigning it to categories or featuring it across your sales channels.', 'woocommerce' ),
                        ),
                        array(
                            array(
                                'woocommerce/product-category-field',
                                array(
                                    'name' => 'categories',
                                ),
                            ),
                        ),
                    ),
                    array(
                        'woocommerce/product-section',
                        array(
                            'title'       => __( 'Attributes', 'woocommerce' ),
                            'description' => sprintf(
                                /* translators: %1$s: Attributes guide link opening tag. %2$s: Attributes guide link closing tag.*/
                                __( 'Add descriptive pieces of information that customers can use to filter and search for this product. %1$sLearn more%2$s', 'woocommerce' ),
                                '<a href="https://woocommerce.com/document/managing-product-taxonomies/#product-attributes" target="_blank" rel="noreferrer">',
                                '</a>'
                            ),
                        ),
                        array(
                            array(
                                'woocommerce/product-attributes-field',
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}