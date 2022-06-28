import React, { Component } from 'react'
import{ useDispatch , useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import Add from '../../icons/Add-Remove/Add';
import Remove from '../../icons/Add-Remove/Remove';
import { addProduct } from '../../Redux/cartRedux';
import 
{ 
    AddtoCart,
    AmountContainer,
    AmountText,
    Attribute, AttributeElement, AttributeTitle, AttributeWrapper, BuyContainer, ColorElement, Container, IconContaner, Quantity,
} from './PLPHoverElements';

const withHoc = Component => props => {
    const location = useLocation();
    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency);
    return <Component {...props} location={location} dispatch = {dispatch} currency={currency}/>;
  };

class PLPHover extends Component {
    constructor(props){
        super(props)
        this.state = {
            color:"",
            size:"",
            capacity:"",
            with3UsbPorts:"",
            touchID:"",
            quantity:1,
            price:0,
            default:""
        }
        this.handleAttribute = this.handleAttribute.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    componentDidMount(){
      // eslint-disable-next-line
        this.props.product.attributes.map(attribute => {
            if(attribute.name === "Color"){
              this.setState({color:attribute.items[0].value})
            }if(attribute.name === "Size"){
              this.setState({size:attribute.items[0].value})
            }if(attribute.name === "Capacity"){
              this.setState({capacity:attribute.items[0].value})
            }if(attribute.name === "With USB 3 ports"){
              this.setState({with3UsbPorts:attribute.items[0].value})
            }if(attribute.name === "Touch ID in keyboard"){
              this.setState({touchID:attribute.items[0].value})
            }
          })
    }

    handleAttribute = (e)=>{
        const att = e.currentTarget.parentNode.getAttribute("data-parent");
        const value = e.currentTarget.getAttribute("data-value");
        switch(att){
          case "Color":this.setState({color:value});break;
          case "Size":this.setState({size:value});break;
          case "Capacity":this.setState({capacity:value});break;
          case "With USB 3 ports":this.setState({with3UsbPorts:value});break;
          case "Touch ID in keyboard":this.setState({touchID:value});break;
          default:this.setState({default:""})
        }
      }

      handleQuantity(type){
        if(type === "dec" && this.state.quantity > 1){
          this.setState({quantity:this.state.quantity -1})
        }else if(type === "inc"){
          this.setState({quantity:this.state.quantity + 1})
        }
      }

      handleClick = () => {
        const color = this.state.color;
        const size = this.state.size;
        const capacity = this.state.capacity;
        const with3UsbPorts = this.state.with3UsbPorts;
        const touchID = this.state.touchID;
        const quantity = this.state.quantity;
        const priceElement = this.props.product.prices.find(item => item.currency.label === this.props.currency.label);
        const price = priceElement.amount;
        const totalPrice = price * quantity;
        this.props.dispatch(
          addProduct({...this.props.product,color,size,capacity,with3UsbPorts,touchID,quantity,price,totalPrice})
        );
      };

  render() {
    return (
      <Container>
        {
            this.props.product.attributes.map(attribute => {
              return(
                <Attribute key={attribute.id}>
                  <AttributeTitle>{attribute.name}</AttributeTitle>
                  <AttributeWrapper data-parent= {attribute.name}>
                    {
                      attribute.name ==="Color" &&attribute.items.map(item => {
                        if(this.state.color){
                          return(<ColorElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={this.state.color} onClick={this.handleAttribute}/>)
                        }else{
                          return(<ColorElement key={item.id} data-value={item.value} value={item.value} onClick={this.handleAttribute}/>)
                        }
                      })
                    }
                    {
                      attribute.name ==="Size" &&attribute.items.map(item => {
                        if(this.state.size){
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={this.state.size} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }else{
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }
                      })    
                    }
                    {
                      attribute.name ==="Capacity" &&attribute.items.map(item => {
                        if(this.state.capacity){
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={this.state.capacity} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }else{
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }
                      })    
                    }
                    {
                      attribute.name ==="Touch ID in keyboard" &&attribute.items.map(item => {
                        if(this.state.touchID){
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={this.state.touchID} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }else{
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }
                      })    
                    }
                    {
                      attribute.name ==="With USB 3 ports" &&attribute.items.map(item => {
                        if(this.state.with3UsbPorts){
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} selectedAttribute={this.state.with3UsbPorts} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }else{
                          return(<AttributeElement key={item.id} data-value={item.value} value={item.value} onClick={this.handleAttribute}>{item.value}</AttributeElement>)
                        }
                      })    
                    }
                  </AttributeWrapper>
                </Attribute>
              );
            })
          }
          <BuyContainer>
            <Quantity>
              <IconContaner onClick={()=> this.handleQuantity("inc")} >
                  <Add/>
              </IconContaner>
              <AmountContainer>
                  <AmountText>{this.state.quantity}</AmountText>
              </AmountContainer>
              <IconContaner onClick={()=> this.handleQuantity("dec")}>
                  <Remove/>
              </IconContaner>                   
              </Quantity>
            <AddtoCart onClick={this.handleClick}>BUY</AddtoCart>
            </BuyContainer>
      </Container>
    )
  }
}
export default withHoc(PLPHover);
