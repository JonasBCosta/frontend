import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Box from './pages/Box';

const Routes = () => ( // ("/" vai chamar tudo que começa com / (localhost:3000 (com barra implicita ou explicita)) a não ser que se use "exact" que procurará somente a root) BrowserRouter = Gerencia as rotas. path='/' vai acessar a root. Switch = Permite que somente uma rota seja chamada por vez. 
    <BrowserRouter>  
        <Switch>
            <Route path="/" exact component={Main}/>  
            <Route path="/box/:id" component={Box}/> 
        </Switch>
    </BrowserRouter>
);

export default Routes;