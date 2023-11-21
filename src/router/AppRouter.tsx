import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroServico from "../components/Servico/CadastroServico";
import ListagemServico from "../components/Servico/ListagemServico";
import EditarServico from "../components/Servico/EditarServico";
import CadastroProfissional from "../components/Profissional/CadastroProfissional";
import ListagemProfissional from "../components/Profissional/ListagemProfissional";


const AppRouter = () => {
    return (
       <BrowserRouter>
         <Routes>
           <Route path="cadastroServico" element={<CadastroServico />}/>
           <Route path="listagemServico" element={<ListagemServico  />}/>
           <Route path="/servico/editar/:id" element={<EditarServico />}/>

           <Route path="cadastroProfissional" element={<CadastroProfissional />}/>
           <Route path="listagemProfissional" element={<ListagemProfissional />}/>

        </Routes>
       </BrowserRouter>
    );
}
 export default AppRouter;