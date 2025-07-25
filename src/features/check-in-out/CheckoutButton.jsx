import Button from "../../ui/Button";
import {useCheckOut} from './useCheckout'
import SpinnerMini from '../../ui/SpinnerMini'

function CheckoutButton({ bookingId }) {
    const {checkout, isCheckingOut} = useCheckOut()

    return (
        <Button variation="primary" size="small" disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            {isCheckingOut ? <SpinnerMini /> : "Check out"}
        </Button>
    );
}

export default CheckoutButton;
