import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './styles.css';
import { 
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

export default class VeiculosForm extends Component {

    state = { 
        model: { 
            id:0,
            veiculo:'',
            marca:'',
            ano:'',
            descricao:'',
            vendido:false
        } 
    }

    setValues = (e, field) => {
        const { model } = this.state
        model[field] = e.target.value
        this.setState({ model })
    }

    create = () => {
        this.setState({ model: {id:0, veiculo:'',marca:'',ano:'',descricao:'',vendido:false}})
        this.props.createVeiculo(this.state.model)
    }

    componentWillMount() {
        PubSub.subscribe('edit-veiculo', (topic, veiculo) => {
            this.setState({ model: veiculo })
        })
    }

    render() {
        return (
            <Form className="container-controls">
                <FormGroup >
                <div className="row">
                    <div className="col">
                        <Label for="veiculo">Veículo:</Label>
                        <Input id="veiculo" type="text" value={this.state.model.veiculo} placeholder="Nome"
                        onChange={e => this.setValues(e, 'veiculo') } />
                    </div>
                    <div className="col">
                        <Label for="marca">Marca:</Label>
                        <Input id="marca" type="text" value={this.state.model.marca} placeholder="Marca"
                        onChange={e => this.setValues(e, 'marca') } />
                    </div>
                </div>
                </FormGroup>
                <FormGroup>
                    <div className="row">
                        <div className="col">
                            <Label for="ano">Ano:</Label>
                            <Input id="ano" type="text" value={this.state.model.ano} placeholder="Ano" 
                            onChange={e => this.setValues(e, 'ano') } />
                        </div>
                        <div className="col">
                            <Label for="vendido">Vendido:</Label>
                            <Input id="vendido" type="select" name="select"  value={this.state.model.vendido} placeholder="Vendido" 
                            onChange={e => this.setValues(e, 'vendido') }>
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                            </Input>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">Descrição:</Label>
                    <Input id="descricao" type="text" value={this.state.model.descricao} placeholder="Descrição" 
                        onChange={e => this.setValues(e, 'descricao') } />
                </FormGroup>
                <br />
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-6">
                            <Button color="primary" block onClick={this.create}> Salvar </Button>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        )
    }
}

