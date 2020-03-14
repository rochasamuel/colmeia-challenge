import React, { Component } from 'react'
import Parse from 'parse';
import ViewQuery from './ViewQuery';


class SearchQuery extends Component {
    constructor(props) {
        super(props)

        this.stateInicial = {
            search: '',
        };

        this.state.search = this.stateInicial.search;
        Parse.initialize("SU0myMIe1AUitLKar0mum8My8RbQ87lEaRjjKDgh", "GtvnNXChRLZRYBbWxNy9fM0LPloMfpYICCtMdJIL");
        Parse.serverURL = 'https://parseapi.back4app.com/';
    }

    state = {
        search: '',
        professores: null
    };

    async componentDidMount() {
        var professoresQuery = new Parse.Query("Professores");
        var resultArray = await professoresQuery.find();

        var professoresArray = resultArray.map(item => item.attributes);
        this.setState({
            professores: professoresArray,
        });

        // console.log(this.state + 'primeiro');
        // console.log(this.state.professores);
    };


    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value

        });

    }

    render() {
        const { search } = this.state;
        console.log(this.state)

        return (
            <div>
                <div className="input-field col s4">
                    <input id="search" type="text" name="search" value={search} onChange={this.escutadorDeInput} placeholder="Digite o nome do instrutor" />
                </div>
                {this.state.professores ? (
                    <ViewQuery params={this.state} />
                ) : (console.log('...'))}
            </div>
        );
    }
}

export default SearchQuery