import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import styles from "../../App.module.css";

import axios from 'axios';
import { CadastroServicoInterface } from '../../interfaces/CadastroServicoInterface';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const ListagemServico = () => {

    const [servicos, setServicos] = useState<CadastroServicoInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {

                const response = await axios.post('http://localhost:8000/api/servico/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Tye": "application/json"
                        }
                    }).then(function (response) {
                        if (response.data.status === true){
                        setServicos(response.data.data);
                        }else{
                            setServicos([]);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }

    function handleDelete(id: number) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "O serviço foi excluido",
                    icon: "success"
                });

                axios.delete('http://127.0.0.1:8000/api/servico/delete/' + id)
                    .then(function (response) {
                        window.location.href = "/listagemServico"
                    }).catch(function (error) {
                        console.log("ocorreu um erro")
                    })
            } else if (
               
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "O serviço não foi excluido",
                    icon: "error"
                });
            }
        });



    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/servico/retornarTodos/');
                setServicos(response.data.data);

            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
        <nav className=" bg-info">
           <ul className="nav nav-tabs">
               <li className="nav-item dropdown btn-info">
                   <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Cadastros</a>
                   <ul className="dropdown-menu">
                       <li><Link to={"/CadastroServico"} className="dropdown-item" >Cadastro Serviço</Link></li>
                       <li><Link to={"/cadastroProfissional"} className="dropdown-item">Cadastro Profissional</Link></li>
                     
                   </ul>
               </li>
               <li className="nav-item dropdown btn-info">
                   <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Listagens</a>
                   <ul className="dropdown-menu">
                       <li><Link to={"/ListagemServico"} className="dropdown-item" >Listagem Serviço</Link></li>
                       <li><Link to={"/ListagemCliente"} className="dropdown-item">Listagem Cliente</Link></li>
                       <li><Link to={"/ListagemProfissional"} className="dropdown-item">Listagem Profissional</Link></li>
                       <li><Link to={"/ListagemAgenda"} className="dropdown-item">Listagem Agenda</Link></li>
    
                     
                   </ul>
               </li>
    
           </ul>
       </nav>
            <main className={styles.main}>
                <div className='container'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='table table-hover'>Listagem de Serviços</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Duração</th>
                                        <th>Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servicos => (
                                        <tr key={servicos.id}>
                                            <td>{servicos.id}</td>
                                            <td>{servicos.nome}</td>
                                            <td>{servicos.descricao}</td>
                                            <td>{servicos.duracao}</td>
                                            <td>{servicos.preco}</td>
                                            <td>
                                        
                                            <Link to={"/servico/editar/" + servicos.id} className='btn btn-primary btn-sm'>Editar</Link>
                                            <a onClick={()=> handleDelete(servicos.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                        
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ListagemServico;
