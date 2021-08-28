import StripeCheckout from "react-stripe-checkout";


const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100;

    const publishableKey = 'pk_test_51JTNBESAsWssYgy3KwOMgE5wjK57czx0vb52jWx4lkJxzwu7aQejzGT4KmYkYfeViiCp4yJGWvME9Yjs5apZ93kF00mRiTzLgN'

    const onToken = token =>{
        console.log(token);
        alert('Payment Successful');
    }

    return (
    <StripeCheckout 
    label='Pay Now'
    name = 'CRWN CLOTHING'
    billingAddress
    shippingAddress
    image = 'https://svgshare.com/i/CUz.svg'
    description = {`Your total is $${price}`}
    amount = {priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey} />);

};

export default StripeCheckoutButton;