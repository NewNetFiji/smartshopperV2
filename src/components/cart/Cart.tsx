import { Typography } from '@material-ui/core';
import { Wrapper } from './Cart.styles';
import CartItem from './CartItem';
import { Item, useCart } from "./store";

const Cart: React.FC = () => {

  const cartItems = useCart((state) => state.cartItems);
  
  const calculateTotal = (items: Item[]) =>
    items.reduce((ack: number, item) => ack + item.qty * item.price, 0);

  return (
    <Wrapper>
      <Typography variant="h5"> Your Shopping Cart</Typography>
      {cartItems.length === 0 ? <Typography component="p" variant="body1">No items in cart.</Typography> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}          
          
        />
      ))}
      <Typography variant="h6">Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
    </Wrapper>
  );
};

export default Cart;