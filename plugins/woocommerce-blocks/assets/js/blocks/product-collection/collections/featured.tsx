/**
 * External dependencies
 */
import type { InnerBlockTemplate, BlockIcon } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Icon, starFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	DEFAULT_ATTRIBUTES,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
} from '../constants';
import {
	CoreCollectionNames,
	CoreFilterNames,
	SetPreviewStateArgs,
} from '../types';
import { ProductCollectionConfig } from './register-product-collection';

const collection = {
	name: CoreCollectionNames.FEATURED,
	title: __( 'Featured', 'woocommerce' ),
	icon: ( <Icon icon={ starFilled } /> ) as BlockIcon,
	description: __( 'Showcase your featured products.', 'woocommerce' ),
	keywords: [ 'product collection' ],
	scope: [],
};

const attributes = {
	...DEFAULT_ATTRIBUTES,
	displayLayout: {
		type: 'flex',
		columns: 5,
		shrinkColumns: true,
	},
	query: {
		...DEFAULT_ATTRIBUTES.query,
		inherit: false,
		featured: true,
		perPage: 5,
		pages: 1,
	},
	collection: collection.name,
	hideControls: [ CoreFilterNames.INHERIT, CoreFilterNames.FEATURED ],
};

const heading: InnerBlockTemplate = [
	'core/heading',
	{
		textAlign: 'center',
		level: 2,
		content: __( 'Featured products', 'woocommerce' ),
		style: { spacing: { margin: { bottom: '1rem' } } },
	},
];

const innerBlocks: InnerBlockTemplate[] = [
	heading,
	INNER_BLOCKS_PRODUCT_TEMPLATE,
];

/**
 * Example:
 * - How to access attributes and location in the preview state.
 * - How to use async operations
 * - How to use cleanup function as a return value.
 */
const setPreviewState = ( {
	setState,
	attributes: currentAttributes,
	location,
}: SetPreviewStateArgs ) => {
	// setPreviewState has access to the current attributes and location.
	console.log( 'setPreviewState' );
	console.log( currentAttributes, location );

	const timeoutID = setTimeout( () => {
		setState( {
			isPreview: false,
			previewMessage: '',
		} );
	}, 5000 );

	return () => clearTimeout( timeoutID );
};

export default {
	...collection,
	attributes,
	innerBlocks,
	preview: {
		setPreviewState,
		initialPreviewState: {
			isPreview: true,
			previewMessage: 'This is in preview mode',
		},
	},
} as ProductCollectionConfig;
