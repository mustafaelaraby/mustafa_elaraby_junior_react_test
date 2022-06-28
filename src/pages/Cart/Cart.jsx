import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import Add from '../../icons/Add-Remove/Add';
import Remove from '../../icons/Add-Remove/Remove';
import { 
  AmountContainer, 
  AmountText, 
  Attribute, 
  AttributeElement, 
  AttributeTitle, 
  AttributeWrapper, 
  BottomContainer, 
  CartContainer, 
  ColorElement, 
  Container, 
  Details,  
  EmptyCartContainer, 
  EmptyCartText, 
  IconContaner, 
  Image, 
  ImageContainer, 
  Info, 
  ItemContainer, 
  Name, 
  OrderButton, 
  Price, 
  Quant, 
  Quantity, 
  ShopLink, 
  Tax, 
  Title, 
  TopContainer, 
  Total, 
  Wrapper 
} from './CartElements'
import { updateProductQuantity } from '../../Redux/cartRedux';

const withHoc = Component => props => {
  const location = useLocation();
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart);
  const currency = useSelector(state =>state.currency)
  return <Component {...props} location={location} dispatch = {dispatch} cart = {cart} currency={currency}/>;
};


class Cart extends Component {
  constructor(props){
    super(props)
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  handleQuantity = (type,id)=> {
    this.props.dispatch(
      updateProductQuantity({type,id})
    )
  };

  render() {
    const cart = this.props.cart;
    const currency = this.props.currency;
    const tax = 0.21;
    const total = cart.total + (cart.total * tax)
    return (
      <Container>
        <Wrapper>
          <Title>Cart</Title>
          <CartContainer>
            <TopContainer>
              {cart.products.map(product => {
                return(
                  <ItemContainer key={product.id}>
                  <Info>
                    <Details>
                      <Link style={{textDecoration:"none",color:"black"}} to={`/product/${product.id}`}>
                        <Name>{product.name}</Name>
                      </Link> 
                      <Price>{currency.symbol}{Math.floor(product.totalPrice)}</Price>
                      {
                        product.attributes.map(attribute => {
                          return(
                            <Attribute key={attribute.id}>
                              <AttributeTitle>{attribute.name}</AttributeTitle>
                              <AttributeWrapper data-parent= {attribute.name}>
                                {
                                  attribute.name ==="Color" &&attribute.items.map(item => {
                                    if(product.color){
                                      return(<ColorElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={product.color}/>)
                                    }else{
                                      return(<ColorElement key={item.id} data-value={item.value} value={item.value}/>)
                                    }
                                  })
                                }
                                {
                                  attribute.name ==="Size" &&attribute.items.map(item => {
                                    if(product.size){
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={product.size}>{item.value}</AttributeElement>)
                                    }else{
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value}>{item.value}</AttributeElement>)
                                    }
                                  })    
                                }
                                {
                                  attribute.name ==="Capacity" &&attribute.items.map(item => {
                                    if(product.capacity){
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={product.capacity}>{item.value}</AttributeElement>)
                                    }else{
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value}>{item.value}</AttributeElement>)
                                    }
                                  })    
                                }
                                {
                                  attribute.name ==="Touch ID in keyboard" &&attribute.items.map(item => {
                                    if(product.touchID){
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={product.touchID}>{item.value}</AttributeElement>)
                                    }else{
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value}>{item.value}</AttributeElement>)
                                    }
                                  })    
                                }
                                {
                                  attribute.name ==="With USB 3 ports" &&attribute.items.map(item => {
                                    if(product.with3UsbPorts){
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={product.with3UsbPorts}>{item.value}</AttributeElement>)
                                    }else{
                                      return(<AttributeElement key={item.id} data-value={item.value} value={item.value}>{item.value}</AttributeElement>)
                                    }
                                  })    
                                }
                              </AttributeWrapper>
                            </Attribute>
                          );
                        })
                      }
                    </Details>
                    <Quantity>
                      <IconContaner onClick={()=> this.handleQuantity("inc",product.id)} >
                          <Add/>
                      </IconContaner>
                      <AmountContainer>
                          <AmountText>{product.quantity}</AmountText>
                      </AmountContainer>
                      <IconContaner onClick={()=> this.handleQuantity("dec",product.id)}>
                          <Remove/>
                      </IconContaner>                   
                  </Quantity>
                  </Info>
                  <ImageContainer>
                    <Image src={product.gallery[0]} alt='img'/>
                  </ImageContainer>
                </ItemContainer>
                )
              })}
            </TopContainer>
            <BottomContainer>
              {cart.quantity > 0
                ?<>
                  <Tax>Tax 21%: <b>{currency.symbol}{Math.floor(tax * cart.total)}</b></Tax>
                  <Quant>Quantity: <b>{cart.quantity}</b></Quant>
                  <Total><b>Total: {currency.symbol}{Math.floor(total)}</b></Total>
                  <OrderButton>Order</OrderButton>
                </>
                :<EmptyCartContainer>
                    <EmptyCartText>Your cart is empty</EmptyCartText>
                    <Link to={'/'}>
                      <ShopLink>Shop today's deals</ShopLink>
                    </Link>  
                </EmptyCartContainer>
              }  
            </BottomContainer>
          </CartContainer>
        </Wrapper>        
      </Container>
    )
  }
}
export default withHoc(Cart);