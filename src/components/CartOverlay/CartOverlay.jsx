import React , { Component } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import Add from '../../icons/Add-Remove/Add.jsx'
import Remove from '../../icons/Add-Remove/Remove.jsx'
import 
{ 
  AmountContainer, 
  AmountText, 
  Attribute, 
  AttributeElement, 
  AttributeTitle, 
  AttributeWrapper, 
  BottomContainer, 
  Checkout, 
  ColorElement, 
  Container, 
  Details, 
  IconContaner, 
  Image, 
  ImageContainer, 
  Info, 
  ItemContainer, 
  Name, 
  Number, 
  Price, 
  Quantity, 
  Title, 
  TitleContainer, 
  ViewBag 
} from './CartOverlayElements';
import { updateProductQuantity } from '../../Redux/cartRedux';

const withHoc = Component => props => {
    const location = useLocation();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const currency = useSelector(state =>state.currency)
    return <Component {...props} location={location} dispatch = {dispatch} cart = {cart} currency={currency}/>;
};

class CartOverlay extends Component {
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
    return (
      <Container>
        <TitleContainer>
            <Title>My Bag</Title>
            <Number>{this.props.cart.quantity} items</Number>            
        </TitleContainer>
        {this.props.cart.products.map(product => {
                return(
                  <ItemContainer key={product.id}>
                  <Info>
                    <Details>
                      <Link style={{textDecoration:"none",color:"black"}} to={`/product/${product.id}`}>
                        <Name>{product.name}</Name>
                      </Link>                      
                      <Price>{this.props.currency.symbol}{Math.floor(product.totalPrice)}</Price>
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
        <BottomContainer>
            <Link to={'/cart'}>
                <ViewBag>VIEW BAG</ViewBag>
            </Link>
            
            <Checkout>CHECKOUT</Checkout>
        </BottomContainer>
      </Container>
    )
  }
}

export default withHoc(CartOverlay)