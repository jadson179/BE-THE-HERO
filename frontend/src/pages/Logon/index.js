import React, {useState} from "react"
import {FiLogIn} from "react-icons/fi"
import {Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import heroesImg from '../../assets/heroes.png'
import logoImg from "../../assets/logo.svg"

import './index.css'

export default function Logon() {
        const [id,setID] = useState('')
        const history = useHistory()
        async function handleLogin(e){
            e.preventDefault()

            try {
                const response = await api.post('/sessions', {id})
                localStorage.setItem("ongId", id);
                localStorage.setItem('ongName', response.data.name);
                history.push('/profile')
            } catch (error) {
                alert("Falha no login, tente novamente")
            }
        }
    return (

        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Seu ID"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button className="button" >Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cLinkdastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>

    )
}
