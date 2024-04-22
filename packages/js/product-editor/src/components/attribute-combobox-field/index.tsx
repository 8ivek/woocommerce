/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { ComboboxControl as CoreComboboxControl } from '@wordpress/components';
import { createElement, useMemo, useState } from '@wordpress/element';
import { Icon, tip } from '@wordpress/icons';
import {
	EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME,
	ProductAttributesActions,
	WPDataActions,
} from '@woocommerce/data';
import { recordEvent } from '@woocommerce/tracks';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
import type {
	AttributeComboboxProps,
	ComboboxAttributeProps,
	NarrowedQueryAttribute,
} from './types';

function mapAttributeToComboboxOption(
	attr: NarrowedQueryAttribute
): ComboboxAttributeProps {
	return {
		label: attr.name,
		value: `attr-${ attr.id }`,
		disabled: !! attr.isDisabled,
	};
}

const temporaryOptionInitialState: ComboboxAttributeProps = {
	label: '',
	value: '',
	state: 'draft',
};

interface ComboboxControlProps extends CoreComboboxControl.Props {
	__experimentalRenderItem?: ( args: {
		item: ComboboxAttributeProps;
	} ) => string | JSX.Element;
}

const ComboboxControl =
	CoreComboboxControl as React.ComponentType< ComboboxControlProps >;

function ComboboxControlItem( { item }: { item: ComboboxAttributeProps } ) {
	if ( item.disabled ) {
		return <div className="item-wrapper is-disabled">{ item.label }</div>;
	}

	return <div className="item-wrapper">{ item.label }</div>;
}

const AttributeCombobox: React.FC< AttributeComboboxProps > = ( {
	currentItem = null,
	items = [],
	createNewAttributesAsGlobal = false,
	instanceId = 0,
	onChange,
} ) => {
	const { createErrorNotice } = useDispatch( 'core/notices' );
	const { createProductAttribute } = useDispatch(
		EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME
	) as unknown as ProductAttributesActions & WPDataActions;

	const [ temporaryOption, updateCreateOption ] =
		useState< ComboboxAttributeProps >( temporaryOptionInitialState );

	const clearCreateOption = () =>
		updateCreateOption( temporaryOptionInitialState );

	/**
	 * Map the items to the Combobox options.
	 * Each option is an object with a label and value.
	 * Both are strings.
	 */
	const attributeOptions: ComboboxAttributeProps[] = items?.map(
		mapAttributeToComboboxOption
	);

	const options = useMemo( () => {
		if ( ! temporaryOption.label.length ) {
			return attributeOptions;
		}

		return [
			...attributeOptions,
			{
				label:
					temporaryOption.state === 'draft'
						? sprintf(
								/* translators: The name of the new attribute term to be created */
								__( 'Create "%s"', 'woocommerce' ),
								temporaryOption.label
						  )
						: temporaryOption.label,
				value: temporaryOption.value,
			},
		];
	}, [ attributeOptions, temporaryOption ] );

	let currentValue = currentItem ? `attr-${ currentItem.id }` : '';
	if ( temporaryOption.state === 'creating' ) {
		currentValue = 'create-attribute';
	}

	const addNewAttribute = ( name: string ) => {
		recordEvent( 'product_attribute_add_custom_attribute', {
			source: TRACKS_SOURCE,
		} );
		if ( createNewAttributesAsGlobal ) {
			createProductAttribute(
				{
					name,
					generate_slug: true,
				},
				{
					optimisticQueryUpdate: {
						order_by: 'name',
					},
				}
			).then(
				( newAttr ) => {
					onChange( { ...newAttr, options: [] } );
					clearCreateOption();
				},
				( error ) => {
					let message = __(
						'Failed to create new attribute.',
						'woocommerce'
					);
					if ( error.code === 'woocommerce_rest_cannot_create' ) {
						message = error.message;
					}

					createErrorNotice( message, {
						explicitDismiss: true,
					} );
					clearCreateOption();
				}
			);
		} else {
			onChange( name );
		}
	};

	/*
	 * Hack to handle AttributeCombobox instances
	 * don't overlap each other.
	 */
	const style = { zIndex: 1000 - instanceId };

	let help = null;
	if ( ! items.length ) {
		help = (
			<div className="woocommerce-attribute-combobox-help">
				<Icon icon={ tip } size={ 20 } />
				{ __( 'Nothing yet. Type to create.', 'woocommerce' ) }
			</div>
		);
	}

	return (
		<div
			className={ classnames(
				'woocommerce-attribute-combobox-container',
				{
					'no-items': ! options.length,
				}
			) }
			style={ style }
		>
			<ComboboxControl
				className="woocommerce-attribute-combobox"
				allowReset={ false }
				options={ options }
				value={ currentValue }
				help={ help }
				onChange={ ( newValue ) => {
					if ( ! newValue ) {
						return;
					}

					if ( newValue === 'create-attribute' ) {
						updateCreateOption( {
							...temporaryOption,
							state: 'creating',
						} );
						addNewAttribute( temporaryOption.label );
						return;
					}

					const selectedAttribute = items?.find(
						( item ) =>
							item.id ===
							Number( newValue.replace( 'attr-', '' ) )
					);

					/*
					 * Do not select when it is disabled.
					 * `disabled` item option should be
					 * handled by the core ComboboxControl component.
					 */
					if ( ! selectedAttribute || selectedAttribute.isDisabled ) {
						return;
					}

					onChange( {
						id: selectedAttribute.id,
						name: selectedAttribute.name,
						slug: selectedAttribute.slug as string,
						options: [],
					} );
				} }
				onFilterValueChange={ ( filterValue: string ) => {
					updateCreateOption( {
						label: filterValue,
						value: 'create-attribute',
						state: 'draft',
					} );
				} }
				__experimentalRenderItem={ ComboboxControlItem }
			/>
		</div>
	);
};

export default AttributeCombobox;
