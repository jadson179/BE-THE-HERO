import React, {useState,useEffect} from "react"
import {Link,useHistory } from "react-router-dom"
import {FiPower, FiTrash2 }from 'react-icons/fi'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import './index.css'

export default function Profile(){
        const ongName = localStorage.getItem('ongName')
        const OngId = localStorage.getItem('ongId')
        const [incidents, setIncidents] = useState([])

        const history = useHistory()
        
        useEffect(()=>{
            api.get('/incidents',{
                headers:{
                    Authorization: OngId
                }
            }).then(response => {
                setIncidents(response.data)  
            })
        },[OngId])

         async function handleDeleteIncident(id){
            try {
                console.log(id)
                await api.delete(`/incidents/${id}`,{
                    headers: {
                        Authorization: OngId
                    }
                })

                setIncidents(incidents.filter(incident => incident.id !== id))
            } catch (error) {
                alert("Erro ao deletar caso, tente novamente")
            }
        }

        async function handleLogout(){
            localStorage.clear()
            history.push('/')

        }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>{`Bem vinda, ${ongName}`}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={()=> handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                       
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(incident.value)}</p>
    
                        <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="a8a8n3" />
                        </button>
                    </li>
    
                    ))
                }   
            </ul>
            
        </div>
    )
}