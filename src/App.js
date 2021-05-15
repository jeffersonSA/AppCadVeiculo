  
import React, { Component } from 'react'

import Header from './components/Header/header'
import Veiculos from './components/Veiculo/veiculo'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header title="Cadastro de veículos"  />
        <br />
        <Veiculos />
      </div>
    )
  }
}


export default App;
