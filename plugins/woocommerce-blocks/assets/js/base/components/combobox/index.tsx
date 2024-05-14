/**
 * External dependencies
 */
import {
	Combobox as AriakitCombobox,
	ComboboxLabel,
	ComboboxList,
	ComboboxPopover,
	ComboboxProvider,
	ComboboxItem,
	useComboboxStore,
} from '@ariakit/react';
import type { ComboboxProps as AriakitComboboxProps } from '@ariakit/react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	useTransition,
} from '@wordpress/element';
import { ValidationInputError } from '@woocommerce/blocks-components';
import { useDispatch, useSelect } from '@wordpress/data';
import { VALIDATION_STORE_KEY } from '@woocommerce/block-data';
import { useVirtualizer } from '@tanstack/react-virtual';

/**
 * Internal dependencies
 */
import './style.scss';
import {
	findBestMatchByLabel,
	findExactMatchBy,
	findMatchingSuggestions,
} from './util';

export interface ComboboxControlOption {
	label: string;
	value: string;
}

export type ComboboxProps = Omit< AriakitComboboxProps, 'onChange' > & {
	errorId: string | null;
	errorMessage?: string | undefined;
	instanceId?: string;
	onChange: ( newValue: string ) => void;
	options: ComboboxControlOption[];
	value: string;
	label: string;
};

/**
 * Wrapper for the Ariakit Combobox with validation support.
 */
const Combobox = ( {
	id,
	label,
	options,
	value,
	// Not the native onChange, a custom onChange that is called when the selected value changes.
	onChange,
	errorId: incomingErrorId,
	required = false,
	autoComplete = 'list',
	errorMessage = __( 'Please select a valid option', 'woocommerce' ),
	className,
	...restOfProps
}: ComboboxProps ): JSX.Element => {
	const scrollerRef = useRef( null );
	const controlRef = useRef< HTMLDivElement >( null );
	const fallbackId = useId();
	const controlId = id || 'control-' + fallbackId;
	const errorId = incomingErrorId || controlId;
	const store = useComboboxStore();

	const { setValidationErrors, clearValidationError } =
		useDispatch( VALIDATION_STORE_KEY );

	const [ , startTransition ] = useTransition();

	const { error, validationErrorId } = useSelect( ( select ) => {
		const validationStore = select( VALIDATION_STORE_KEY );
		return {
			error: validationStore.getValidationError( errorId ),
			validationErrorId: validationStore.getValidationErrorId( errorId ),
		};
	} );

	const initialOption = options.find( ( option ) => option.value === value );

	const [ searchTerm, setSearchTerm ] = useState(
		initialOption?.label || ''
	);

	const [ selectedOption, setSelectedOption ] = useState( initialOption );

	useEffect( () => {
		setSearchTerm( initialOption?.label || '' );
		setSelectedOption( initialOption );
	}, [ initialOption ] );

	// If the list of options changes and the currently selected option is no longer available,
	// we should unset the search term and deselect the option.
	useEffect( () => {
		if (
			options.length > 0 &&
			! options.some( ( option ) => option.value === value )
		) {
			store.setSelectedValue( initialOption?.value || '' );
		}
	}, [ initialOption, value, options, store ] );

	const matchingSuggestions = useMemo( () => {
		return findMatchingSuggestions( searchTerm, options );
	}, [ searchTerm, options ] );

	const rowVirtualizer = useVirtualizer( {
		count: matchingSuggestions.length,
		getScrollElement: () => scrollerRef.current,
		estimateSize: () => 35,
	} );

	useEffect( () => {
		if ( ! required || value ) {
			clearValidationError( errorId );
		} else {
			setValidationErrors( {
				[ errorId ]: {
					message: errorMessage,
					hidden: true,
				},
			} );
		}
		return () => {
			clearValidationError( errorId );
		};
	}, [
		clearValidationError,
		value,
		errorId,
		errorMessage,
		required,
		setValidationErrors,
	] );

	const outerWrapperClasses = classnames(
		'wc-block-components-combobox',
		className || '',
		{
			'is-active': selectedOption?.value,
			'has-error': error?.message && ! error?.hidden,
		}
	);

	const ariaInvalid = error?.message && ! error?.hidden ? 'true' : 'false';
	const activeValue = store.useState( 'activeValue' );

	const onClose = useCallback( () => {
		// If the search term doesn't match the selected option, try do an exact value match.
		// e.g. if the user leaves "NZ" in the search box, select "New Zealand" on close.
		// If not just leave the last selected value.
		if ( searchTerm && selectedOption?.label !== searchTerm ) {
			const exactValueMatch = findExactMatchBy(
				'value',
				searchTerm,
				options
			);

			const bestMatch = findBestMatchByLabel( searchTerm, options );

			const match = exactValueMatch || bestMatch;

			if ( match ) {
				store.setSelectedValue( match.value );
			} else {
				setSearchTerm( selectedOption?.label || '' );
			}
		} else {
			setSearchTerm( selectedOption?.label || '' );
		}
	}, [ setSearchTerm, selectedOption, searchTerm, options, store ] );

	const minHeight =
		matchingSuggestions.length * 35 > 300
			? 300
			: matchingSuggestions.length * 35;

	return (
		<div
			ref={ controlRef }
			id={ controlId }
			className={ outerWrapperClasses }
		>
			<div className="components-combobox-control components-base-control wc-block-components-combobox-control">
				<ComboboxProvider
					store={ store }
					value={ searchTerm }
					selectedValue={ selectedOption?.value || '' }
					setValue={ ( val: string ) => {
						startTransition( () => {
							setSearchTerm( val );

							if ( val?.length ) {
								const exactLabelMatch = findExactMatchBy(
									'label',
									val,
									options
								);

								const exactValueMatch = options.find(
									( option ) => option.value === val
								);

								const match =
									exactLabelMatch || exactValueMatch;

								if (
									match &&
									match.value !== selectedOption?.value
								) {
									store.setSelectedValue( match.value );
								} else {
									setSearchTerm(
										selectedOption?.label || ''
									);
								}
							}
						} );
					} }
					setSelectedValue={ ( val ) => {
						const option = options.find(
							( opt ) => opt.value === val
						);

						if ( option ) {
							setSearchTerm( option.label );
							setSelectedOption( option );
							onChange( option.value );
							store.setOpen( false );
						}
					} }
				>
					<div className="components-base-control__field">
						<ComboboxLabel className="components-base-control__label">
							{ label }
						</ComboboxLabel>

						<div className="components-combobox-control__suggestions-container">
							<AriakitCombobox
								className="components-combobox-control__input components-form-token-field__input"
								autoComplete="list"
								aria-invalid={ ariaInvalid }
								aria-errormessage={ validationErrorId }
								type="text"
								onFocus={ () => {
									setSearchTerm( '' );
								} }
								render={
									<input
										autoComplete={ autoComplete }
										type="text"
									/>
								}
								{ ...restOfProps }
							/>

							<ComboboxPopover
								className="components-form-token-field__suggestions-list"
								sameWidth
								flip={ false }
								onClose={ onClose }
							>
								<div
									ref={ scrollerRef }
									style={ {
										height: minHeight,
										overflow: 'auto',
										width: '100%',
										position: 'relative',
										zIndex: 10,
									} }
								>
									<ComboboxList
										style={ {
											height: rowVirtualizer.getTotalSize(),
											position: 'relative',
											zIndex: 9,
										} }
										className="components-form-token-field__suggestions-list-inner"
									>
										{ rowVirtualizer
											.getVirtualItems()
											.map( ( virtualItem ) => {
												const option =
													matchingSuggestions[
														virtualItem.index
													];

												return (
													<ComboboxItem
														key={ virtualItem.key }
														// For backwards compatibility we retain the is-selected class, in future we could target aria or data attributes in CSS instead.
														className={ `components-form-token-field__suggestion ${
															activeValue ===
															option.label
																? 'is-selected'
																: ''
														}` }
														value={ option.label }
														style={ {
															height: `${ virtualItem.size }px`,
															transform: `translateY(${ virtualItem.start }px)`,
															position:
																'absolute',
															top: 0,
															left: 0,
															width: '100%',
														} }
													>
														{ option.label }
													</ComboboxItem>
												);
											} ) }
									</ComboboxList>
								</div>
							</ComboboxPopover>
						</div>
					</div>
				</ComboboxProvider>
			</div>
			<ValidationInputError propertyName={ errorId } />
		</div>
	);
};

export default Combobox;
