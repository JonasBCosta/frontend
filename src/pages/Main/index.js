import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import logo from "../../assets/logo.ico";

export default class Main extends Component {
  state = {
    newBox: ''
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('boxes', { /** Aqui vou dar um post na url de boxes e buscar sua resposta */
      title: this.state.newBox // Contém o texto que o usuário digitou
    });

    this.props.history.push(`/box/${response.data._id}`); // Properties são os atributos, "src" é uma propriedade da tag "img". Usamos o props do RouterDom para usálas (são enviadas através da URL). O History é uma propriedade de rotas
                          // '${}' são template strings, que só podem ser acessados dentro de ` `
  };

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  };
  
  render() {
    return (
        <div id="main-container">
          <form onSubmit={this.handleSubmit}>
            <img src={logo} alt=""/>
            <input 
              placeholder="Criar um box"
              value={this.state.newBox}
              onChange={this.handleInputChange}
            />
            <button type="submit">Criar</button>
          </form>
        </div>
    );
  }
}
//Linha-> onSubmit porque não é como se fosse um formulário html (disparada quando o usuário clicar no botão ou apertar enter)
// Foi colocado {} no onSubmit pois irá chamar uma função deste componente
// O método handleSubmit será chamado toda vez que o form receber um submit
// ...
// Criaremos um objeto React usando o tipo "state" que é armazenado dentro da própria classe (Estado da Classe)
// state no React é uma mistura de Observer com setAttribute, sempre for detectado aluma alteração o metodo render será executado atualizando o front-end
// *setState, guarda alterações do estado usando o React
// 