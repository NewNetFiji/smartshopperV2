import Button from '@material-ui/core/Button';
// Types
import {  Product } from '../../generated/graphql';
// Styles
import { Wrapper } from './CartItem.styles';

type Props = {
  item: Product;
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.basePrice}</p>
        <p>Total: ${(item.basePrice * item.basePrice).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.basePrice}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.images?.[0].url as string} alt={item.title} />
  </Wrapper>
);

export default CartItem;