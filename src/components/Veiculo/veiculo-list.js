
import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import { 
    Table, 
    Button
} from 'reactstrap'

export default class VeiculoList extends Component {

    delete = (id) => {
        this.props.deleteVeiculo(id) 
    }

    onEdit = (veiculo) => {
        PubSub.publish('edit-veiculo', veiculo)
    }

    render() {
        const { veiculos } = this.props
        return (
            <Table className="table-bordered text-center" striped>
                <thead className="thead-dark">
                    <tr>
                        <th>Veiculo</th>
                        <th>Marca</th>
                        <th>Ano</th>
                        <th>Vendido</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        veiculos.map(veiculo => (
                            <tr key={veiculo.id}>
                                <td>{veiculo.veiculo}</td>
                                <td>{veiculo.marca}</td>
                                <td>{veiculo.ano}</td>
                                <td>{veiculo.vendido == true ? 'Sim' : 'Não' }</td>
                                <td>{veiculo.descricao}</td>
                                <td>
                                    <Button color="info" size="sm" onClick={e => this.onEdit(veiculo)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(veiculo.id)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }   
}
