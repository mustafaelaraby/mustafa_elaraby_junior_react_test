import React, { Component }  from 'react';
import CartBasket from './CartBasket'
import CartWheelLeft from './CartWheelLeft'
import CartWheelRight from './CartWheelRight'


export default class Cart extends Component {
  render() {
    return (
    <div>
      <CartBasket/>
      <CartWheelLeft/>
      <CartWheelRight/>
    </div>
    )
  }
}
