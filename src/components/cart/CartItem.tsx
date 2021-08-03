import React from "react";
import Button from "@material-ui/core/Button";
import { Wrapper } from "./CartItem.styles";
import { Item, useCart } from "./store";
import { Typography } from "@material-ui/core";

interface props {
  item: Item;
}

const CartItem: React.FC<props> = ({ item }) => {
  const removeFromCart = useCart((state) => state.removeItem);
  const incrementQty = useCart((state) => state.incrementQty);

  const handleRemoveFromCart = (id: number, qty: number) =>{
    if (qty > 1) {
      incrementQty(id, -1)
    }else if (qty===1){
      removeFromCart(id)
    }
  }

  return (
    <Wrapper>
      <div>
      <Typography  variant="subtitle2">{item.product.title}</Typography>
        <div className="information">
        <Typography component="p" variant="body1">Price: ${item.product.basePrice}</Typography>
        <Typography component="p" variant="body1">Total: ${(item.qty * item.product.basePrice).toFixed(2)}</Typography>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => handleRemoveFromCart(item.id, item.qty)}
          >
            -
          </Button>
          <Typography component="p" variant="body1">Quantity: {item.qty}</Typography>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => incrementQty(item.id, 1)}
          >
            +
          </Button>
        </div>
      </div>
      <img
        src={item.product.images?.[0].url as string}
        alt={item.product.title}
      />
    </Wrapper>
  );
};
export default CartItem;
