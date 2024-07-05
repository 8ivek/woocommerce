<?php

namespace Automattic\WooCommerce\Admin\Features\Blueprint\Importers;

use Automattic\WooCommerce\Blueprint\StepProcessor;
use Automattic\WooCommerce\Blueprint\StepProcessorResult;
use WC_Tax;

class SetWCTaxRates implements StepProcessor {
	private StepProcessorResult $result;
	public function process($schema): StepProcessorResult {
		$this->result = StepProcessorResult::success('ConfigureTaxRaes');
		foreach ($schema->values->rates as $rate ) {
			$this->add_rate($rate);
		}

		foreach ($schema->values->locations as $location) {
			$this->add_location($location);
		}

		return $this->result;
	}

	protected function exist($id) {
		global $wpdb;
		return $wpdb->get_row(
			$wpdb->prepare(
				"
					SELECT *
					FROM {$wpdb->prefix}woocommerce_tax_rates
					WHERE tax_rate_id = %d
				",
				$id
			),
			ARRAY_A
		);
	}

	protected function add_rate($rate) {
		$tax_rate = (array) $rate;

		if ($this->exist($tax_rate['tax_rate_id'])) {
			$this->result->add_info("Tax rate with I.D {$tax_rate['tax_rate_id']} already exist. Skipped creating it.'");
			return false;
		}

		$tax_rate_id = WC_Tax::_insert_tax_rate( $tax_rate );

		if ( isset( $rate->postcode ) ) {
			$postcode = array_map( 'wc_clean', explode(';', $rate->postcode) );
			$postcode = array_map( 'wc_normalize_postcode', $postcode );
			WC_Tax::_update_tax_rate_postcodes( $tax_rate_id, $postcode );
		}
		if ( isset( $rate->city ) ) {
			$cities = explode(';', $rate->city);
			WC_Tax::_update_tax_rate_cities( $tax_rate_id, array_map( 'wc_clean', array_map( 'wp_unslash', $cities ) ) );
		}

		return $tax_rate_id;
	}

	public function add_location($location) {
		global $wpdb;
		$location = (array) $location;
		$columns = implode(',', array_keys($location));
		$format =  implode(',', array('%d', '%s', '%d', '%s'));
		$table = $wpdb->prefix.'woocommerce_tax_rate_locations';
		$sql = $wpdb->prepare("REPLACE INTO $table ($columns) VALUES ($format)", $location);
		$wpdb->query($sql);
	}

	public function get_supported_step(): string {
		return 'configureTaxRates';
	}
}
