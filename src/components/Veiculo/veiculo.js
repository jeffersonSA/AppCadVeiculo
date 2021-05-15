import React, { Component } from 'react'
import VeiculosForm from './veiculo-form'
import VeiculosList from './veiculo-list'
import PubSub from 'pubsub-js'

import { 
    Alert
} from 'reactstrap'
export default class Veiculos extends Component { 

    Url = 'https://veiculosapi.herokuapp.com/api/veiculos'

    state = {
        veiculos: [],
        message: {
            text: '',
            alert: ''
        }
    }

    componentDidMount() { 
        fetch(this.Url)
            .then(response => response.json())
            .then(veiculos => {

                this.setState({ veiculos })
            })
            .catch(e => console.log(e))
    }

    save = (veiculo) => {
        let data = {
            'veiculo':veiculo.veiculo,
            'marca':veiculo.marca,
            'ano':parseInt(veiculo.ano),
            'descricao':veiculo.descricao,
            'vendido':veiculo.vendido
        }
        let header = new Headers()
        header.append("content-type","application/json")
        header.set("content-type","application/json")

        header.append("accepts","application/json")
        header.set("accepts","application/json")
        const requestInfo = {
            method: veiculo.id !== 0? 'PUT': 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'accept':'application/json',
                'Content-Type':'application/json'
            })
        }

        if(veiculo.id === 0) {
            fetch(this.Url, requestInfo)
                .then(response => response.json())
                .then(novoVeiculo => {
                    let { veiculos } = this.state
                    veiculos.push(novoVeiculo)
                    this.setState({ veiculos, message: { text: 'Novo veículo adicionado com sucesso!', alert: 'success' } })
                    this.timerMessage(3000)
                })
            .catch(e => console.log(e)) 
        } else {
            fetch(`${this.Url}/${veiculo.id}`, requestInfo)
            .then(response => response.json())
            .then(veiculoAtualizado => {
                let { veiculos } = this.state
                let position = veiculos.findIndex(vc => vc.id === veiculo.id)
                veiculos[position] = veiculoAtualizado.data
                this.setState({ veiculos, message: { text: 'Veículo atualizado com sucesso!', alert: 'info' } })
                this.timerMessage(3000)
            })
            .catch(e => console.log(e)) 
        }
    }

    delete = (id) => {
        fetch(`${this.Url}/${id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const veiculos = this.state.veiculos.filter(veiculo => veiculo.id !== id)
                this.setState({ veiculos,  message: { text: 'Veículo deletado com sucesso.', alert: 'danger' } })
                this.timerMessage(3000)
            })
            .catch(e => console.log(e))
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: '', alert: ''} })
        }, duration)
    }

    render() {
        return (
            <div>
                {
                    this.state.message.text !== ''? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : ''
                }
                <div className="row">
                    <div className="col-md-12 my-3">
                        <VeiculosForm createVeiculo={this.save} />
                    </div>
                    <div className="col-md-12 my-3">
                        <VeiculosList veiculos={this.state.veiculos}  deleteVeiculo={this.delete} />
                    </div>
                </div>
            </div>
        )
    }
}