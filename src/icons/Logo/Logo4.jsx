import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
        left: 23.5px;
        top: 4px;
        z-index: 3;
`


export default class Logo4 extends Component {
  render() {
    return (
    <Container>
      <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.25807 4.03371C1.14557 4.03371 1.03307 3.99037 0.947147 3.90356C0.77543 3.73007 0.77543 3.44878 0.947147 3.2753L3.22601 0.972924C3.30843 0.889655 3.42025 0.842773 3.53693 0.842773C3.65362 0.842773 3.76544 0.889519 3.84786 0.972924L6.10446 3.25295C6.27618 3.42643 6.27618 3.70772 6.10446 3.88121C5.93275 4.05456 5.65433 4.0547 5.48261 3.88121L3.5368 1.91546L1.569 3.90356C1.48307 3.99037 1.37057 4.03371 1.25807 4.03371Z" fill="white"/>
      </svg>
    </Container>
    )
  }
}
