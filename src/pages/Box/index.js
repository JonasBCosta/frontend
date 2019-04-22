import React, { Component } from 'react';
import logo from "../../assets/logo.ico";
import api from "../../services/api";
import { MdInsertDriveFile } from "react-icons/md"; // Importar biblioteca de icones "/md" Material Desing
import "./styles.css"; // './' significa para referenciar a pasta atual (esta) 
import { distanceInWords } from "date-fns"; // Trabalha com datas para transformar timestamp em formato legivel
import pt from 'date-fns/locale/pt'; // importa o idioma português
import Dropzone from 'react-dropzone'; // (Sintaxe de componente 'react-dropzone' (dropzone é um componente do react))(Dropzone utilizado para arrastar icones) 
import socket from 'socket.io-client';

export default class Box extends Component {
    state = { box: {} } // (Cria a variável do tipo estado) Toda informação manipulada no componente é salva no estado
    async componentDidMount() {             // Esta função é executada assim que seu componente é renderizado em tela
        this.subscribeToNewFiles(); // Chamaremos uma função
       
        const box = this.props.match.params.id; // Vai pegar o parametro passado pela URL path="/box/:id" de routes.js
        const response = await api.get(`boxes/${box}`); // Vai passar os dados da box para response
        
        this.setState({ box: response.data}); // Preenche o box de estado
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id; // Pega o ID do box
        const io  = socket('https://omnistack-backend9.herokuapp.com'); // Abre conexão
        io.emit('connectRoom', box); //Envia uma mensagem. Lá no back-end, "connectRoom é é a mensagem de conexão do usuário em uma box". Agora este socket ouvirá todas as mensagens dessa box
        io.on('file', data => { // file é o tipo do arquivo, e data é o arquivo 
            // Para adicionar um arquivo no state, é necessário pegar o box inteiro, copiar tudo de novo o que ele já tem com a adição do arquivo novo
            // Segue-se o conceito de imutabilidade, que não altera a informação mas cria uma nova informação
            this.setState({ box: { ... this.state.box, files: [data, ... this.state.box.files]} }) // Coloca o data no inicio da fila
        });
    }

    handleUpload = (files) => { // Função que recebe um array de arquivos (files)
        files.forEach(file => {
            const data = new FormData(); // Igual o getAttribute/getParameter do Java
            const box = this.props.match.params.id;

            data.append('file', file); // Guarda a informação (tipo form) (atributo form e valor form do foreach)
            
            api.post(`boxes/${box}/files`, data); // Envia com post o "form" dentro da box
        });

    }

    

    render() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt=""/>
                <h1>{this.state.box.title}</h1>
            </header>
            
            <Dropzone onDropAccepted={this.handleUpload}>
                {({ getRootProps, getInputProps}) => (
                    <div className="upload" {...getRootProps()}>
                        <input { ... getInputProps()} />
                        <p>Arraste os arquivos aqui ou clique aqui</p>
                    </div>
                )}
            </Dropzone>

            <ul>
                { this.state.box.files && this.state.box.files.map(file => (
                <li key={file._id}>
                    <a className="fileInfo" href={file.url} target="_blank">
                        <MdInsertDriveFile size={24} color="#A5Cfff" />
                        <strong>{file.title}</strong> 
                    </a>
                    <span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
                </li>
                )) }
            </ul>
        </div>
    );
  }
}

// this.state.box.files.map(file => ( 
// Poderia colocar { } mas com ( ) já faz o return de forma automática
// Esta função javascript .map vai iterar entre todos os elementos do .files da box do estado do componente
// Para cada iteração, será executado o que está dentro da arrowfunction.
// Repare que a importação de "Dropzone" foi utilizada como uma TAG!!!
// GetRootProps: Retorna um objeto com propriedades necessárias. com o " ... " ele copia as propriedades em formato de atributo.
// GetInputProps: não precisa colocar o "type = 'file'" o " ... " faz isso automaticamente. (Abre o InputFile do sistema operacional (FileTree))
// FormData(): Passa arquivos para o back-end sem precisar de um form. Simula o form (ou Map da Java), não poderá enviar Json por exemplo.