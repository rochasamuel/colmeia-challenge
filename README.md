# Colmeia Challenge

Aplicação construída com [ReactJs](https://pt-br.reactjs.org/) com o intuito de cumprir o desafio proposto pela [Colmeia](https://aulascolmeia.com.br) no âmbito do processo seletivo para estágio.

## O que o App faz?
O app consiste em um sistema de busca assíncrona, em que os resultados são atualizados conforme digitado na barra de pesquisa, resultados esses que são extraídos do servidor disponibilizado, hospedado na plataforma de banco de dados [Parse](https://parseplatform.org/) (Criado pelo Facebook e que atualmente é Open Source :heart:).

![img](https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge/master/system.gif)

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
Os componente principais são 4: `App`, `SearchQuery`, `ViewQuery` e `Header`.

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

![gif]()

<!-- ```javascript
const store = createStore(reducer);
function reducer(state = [], action)
{ return 'x' };
``` -->