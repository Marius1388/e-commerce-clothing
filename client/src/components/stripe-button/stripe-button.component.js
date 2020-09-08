import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

// import axios from 'axios';
import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, clearCart }) => {
	// const priceForStripe = parseInt(price.slice(1)) * 100;
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_INy53guAQjoOPmMFPUIVZt7A004EpodQ5z';

	const onToken = (token) => {
		axios({
			url: '/payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((response) => {
				alert('Payment successful');
				clearCart();
			})
			.catch((error) => {
				console.log('Payment error: ', error);
				alert(
					'There was an issue with your payment. Please make sure you use the provided credit card.'
				);
			});
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="e-commerce cloting Ltd."
			billingAddress
			shippingAddress
			image="https://sendeyo.com/up/d/f3eb2117da"
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
