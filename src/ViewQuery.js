import React, { Component } from 'react'

const View = (props) => {
    const cards = props.params.professores.map((professor, index) => {
        if (props.params.search.toLowerCase() === professor.nome.toLowerCase().substr(0, props.params.search.length)) {
            return (
                <div className="col s6" key={index}>
                    <div className="card grey lighten-5">
                        <div className="card-content black-text">
                            <div className="top-container">
                                <div className="left-container">
                                    <div className="professor-img ">
                                        <img src={professor.imagem._url} alt="" className="circle img" />
                                    </div>
                                </div>
                                <div className="middle-container">
                                    <span className="card-title">{professor.nome}</span>
                                    <p>Disciplinas:</p>
                                    {professor.materia.map((item, index) => {
                                        return (<div key={index} className="professor-disciplina">{item}</div>);
                                    })}
                                </div>
                                <div className="right-container">
                                    <div className="professor-nota">{professor.nota}<i className="tiny material-icons">star</i></div>
                                </div>
                            </div>
                            <div className="curriculo-title">Currículo</div>
                            <p>{professor.curriculo}</p>
                        </div>
                        <div className="card-action">
                            <div className="top-container">
                                <div className="left-container"><i className="tiny material-icons icon">location_on</i>{professor.bairro}</div>
                                <div className="right-container">
                                    <a className="button" href="/">Selecionar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div key={index}></div>;
        }
    });
    return (
        <div className="row">{cards}</div>
    );
}


class ViewQuery extends Component {
    render() {
        return (
            <View params={this.props.params} />
        );
    }
}

export default ViewQuery