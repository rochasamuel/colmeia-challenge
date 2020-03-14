# Colmeia Challenge

Aplicação construída com [ReactJs](https://pt-br.reactjs.org/) com o intuito de cumprir o desafio proposto pela [Colmeia](https://aulascolmeia.com.br) no âmbito do processo seletivo para estágio.

## O que o App faz?
O app consiste em um sistema de busca assíncrona, em que os resultados são atualizados conforme digitado na barra de pesquisa, resultados esses que são extraídos do servidor disponibilizado, hospedado na plataforma de banco de dados [Parse](https://parseplatform.org/) (Criado pelo Facebook e que atualmente é Open Source :heart:).

![img](https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge/master/readmeutils/system.gif)

---

### Visualizar projeto
Para visualizar o projeto em funcionamento é necessário ter o Node.js instalado na máquina.

* No terminal navegue até a pasta raiz do projeto:

  `cd C:..\colmeia-challenge`

* Execute o comando: (roda o app em modo de desenvolvimento)

  `npm start`
  
  *A sída no console deve ser:*
  
  `>react-quickstart-example@0.1.0 start C:\Users\samuk\Desktop\colmeia\colmeia-challenge`
  
  `>react-scripts start`



>_*O navegador deverá abrir uma janela automaticamente direcionando para o endereço `localhost:3000`. Caso não ocorra, basta abrir manualmente uma janela e colocar o endereço em questão.*_

### Componentes e métodos
Os arquivos principais são 4: `App.js`, `SearchQuery.js`, `ViewQuery.js` e `Header.js` dentro deles estão resididos os componentes e métodos principais.

#### `Header.js`
Este arquivo contém apenas um `function component` declarado ArrowFunction, ele não recebe nenhum parâmetro e retorna um conjunto de marcações HTLM formando o cabeçalho da página.

```javascript
    const Header = () => {
        return (
            <nav>
                <div className="nav-wrapper grey lighten-5">
                    <a href="/" className="brand-logo"><img id="logo" src="https://aulascolmeia.com.br/img/header-logo.png" alt='Logo colmeia' /></a>
                    <ul className="right">
                    </ul>
                </div>
            </nav>
        );
    }
```

#### `App.js`
Neste arquivo reside o componente `App` que é o principal. No retorno do metodo `render()` são chamados os componentes `Header` e `SearchQuery` ambos sem parâmetros adicionais e com suas devidas importações.

```Node
class App extends Component {
  
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <SearchQuery />
        </div>
      </Fragment>
    );
  }
}
```

#### `SearchQuery.js`
Aqui acontece a parte principal do sistema, por meio do componente `SearchQuery` os dados são extraidos e enviados para a view logo após.

* No `constructor()` a conexão com o servidor do Parse é estabelecida utilizando métodos do própio componente da plataforma. É setado também o state inicial do componente.

  ```Node
  import Parse from 'parse'
  ......
    constructor(props) {
        super(props)

        this.stateInicial = {
            search: '',
        };

        this.state.search = this.stateInicial.search;
        Parse.initialize("APP_ID", "JAVASCRIPT_KEY");
        Parse.serverURL = 'https://parseapi.back4app.com/';
    }
  ```

* O `state` é setado inicialmente para nulo e se atualiza conforme os métods são executados. Ele possui dois atributos: `search: (String)` (que guarda o valor do campo de pesquisa, a cada alteração no campo ele é atualizado), `professores: (Array)` (que guarda o array de objetos capturados do banco de dados).

```Node
    state = {
        search: '',
        professores: null
    };
```

* O método `async componentDidMount()`  é executado depois que a saída do componente é renderizada no DOM. A palavra-chave `async` a sua frente indica que é um método assyncrono e a expressão `await` dentro dela, indica que a função vai parar para resolver o Promise da requisição. Dentro deste método é executada a Query para o banco de dados establecendo um array de com os resultados, logo é atribuida à variável `professoresArray` o vetor de resultado devidamente tratado com a função `map()`, após esse procedimento o state é atualizado com os dados capturados.

```Node
    async componentDidMount() {
        var professoresQuery = new Parse.Query("Professores");
        var resultArray = await professoresQuery.find();

        var professoresArray = resultArray.map(item => item.attributes);
        this.setState({
            professores: professoresArray,
        });

    };
```

* O método `escutadorDeInput` declarado com arrow function, é chamado cada vez que o valor do input é alterando, na propriedade `onChange` do HTML5 que escuta o evento de mudança, assim alterando o `state` de acordo com o `value` corrente no input.

```Html
    <input id="search" type="text" name="search" value={search} onChange={this.escutadorDeInput} placeholder="Digite o nome do instrutor" />
```

```Node
    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value

        });

    }
```
>Efeito desde trecho no sitema:

![gif](https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge/master/readmeutils/gif2.gif)

![gif](https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge/master/readmeutils/gif3.gif)

* No retorno método `render()` deste componente, contém o input para a pesquisa, e, caso o array de professores tenha sido populado ocorre a chamada para o componenete `ViewQuery` passando o `state` atual , este tratará da visualização dos dados. 

```Node
    render() {
        const { search } = this.state;

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
```

#### `ViewQuery.js`
Neste arquivo existe o componente `ViewQuery` e um `function component` chamado *`View`*. Eles que tratam da conversão de cada objeto da pesquisa em um card devidamente formatado (HTML) e estilizado (Materialize.css e CSS puro).

* O `fucntion component` chamado `View` recebe o parâmetro `props` que contém o `state` do componente `SearchQuery` que foi enviado como parâmetro na chamada do mesmo. O código aplica as regras de negócio requisitadas e "converte" os resultados da comparação do parâmetro `search` das `props` com o parâmetro `nome` de cada `professor` no array de professores em cards estruturados e estilizados.

```Node
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
```

* No método `render()` do componente `ViewQuery` é chamado o function component `View` o que executa a finalização do objetivo do sistema.

```Node
    class ViewQuery extends Component {
    render() {
        return (
            <View params={this.props.params} />
        );
    }
}
```
<!-- ```javascript
const store = createStore(reducer);
function reducer(state = [], action)
{ return 'x' };
``` -->
