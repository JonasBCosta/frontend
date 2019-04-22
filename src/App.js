import React, { Component } from 'react';
import './App.css';
import Routes from './routes' // Não precisa finalizar com /index pois por padrão o React busca o index.js da pasta

class App extends Component {
  render() {
    return <Routes />; // Além da forma que é chamado com ReactDOM.render, pode ser chamado a classe que extende Component desta forma
  }
}
/**
 * A classe acima também poderia ser chamada assim: (Pois é um objeto stateless)
 * function App () {
 *    return <Routes /> 
 * };
 * Ou
 * const App = () => <Routes />;
 */

export default App;

