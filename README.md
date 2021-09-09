# VX boilerplate

Esse projeto é um template dos backends usados na vortx, a ideia é que ele seja um ponto de  partida para que você possa construir suas aplicações no mesmo padrão da maioria dos projetos desenvolvidos internamente, com logger, autenticação, herbs e muito mais já configurado. 
## Sumário
- [Arquitetura](##Arquitetura)
- [Definições](##Definições)
- [Executar o projeto](##Executar-o-Projeto)
	- [Docker](###Docker)
	- [Desenvolver](###Desenvolver)
- [Testes](##Testes)
- [Autenticação](##Autenticação)
- [Token de usuário](###Token-de-usuário)
- [Token de aplicação](###Token-de-aplicação)
- [Documentação](###Documentação)


## Arquitetura

- Para este projeto, utilizamos o [HerbsJS](https://github.com/herbsjs) como base para o desenvolvimento.
- Utilizamos um modelo influenciado pelo DDD (Domain Driven Design) 

## Definições

- O projeto utiliza o [Herbs2knex](https://github.com/herbsjs/herbs2knex) para o acesso ao banco de dados postgres.
- Geramos automaticamente a camada graphql a através do [Herbs2gql](https://github.com/herbsjs/herbs2gql) 
- O projeto conta com uma camada rest gerada automaticamente através do [Herbs2rest](https://github.com/herbsjs/herbs2rest) 
- Para configuração das entidades utilizamos o [Gotu](https://github.com/herbsjs/gotu).
- Para controle dos processos e geração de meta dados auditáveis utilizamos o [Buchu](https://github.com/herbsjs/buchu).
- Para testes utilizamos o [Mocha](https://mochajs.org/) juntamente com o [Chai](https://www.chaijs.com/) e o [Sinon](https://sinonjs.org/).
- Para identificar a cobertura dos testes, utilizamos o [Istanbul](https://istanbul.js.org/).

## Executar o Projeto
### Docker
Para rodar via docker você pode utilizar os códigos:

Construir imagem:    

	docker image build -t vxboilerplate .

Executar imagem:
  
    docker run --publish 80:80 --name vxapi vxboilerplate

### Desenvolver
- Configurar o arquivo **.env**, você pode pegar como exemplo o **.env.example**
- Para rodar o projeto você deve instalar as dependências, você pode usar um dos dois códigos:
	
		yarn
		npm i
	
- Para subir o **banco de dados** você pode utilizar os seguintes comandos:
	
		npm run knex:migrate
		npm run knex:runSeeds
 
 - Para rodar o projeto você pode utilzar o comando:
 
		npm run dev

## Testes
Para os testes utilizamos o Mocha para executar, o Chai para melhor identificar os parâmetros de teste, o sinon para mockar os parametros necessários e além disso, usamos o o Istanbul para identificarmos a cobertura de testes.

- Para executar os testes você pode utilizar o comando:

		npm run test
	
- Para ver a cobertura dos testes utilize o comando:

		npm run coverage  

## Autenticação
Utilizamos dois tipos de autenticação, token de usuário e token de aplicação.

### Token de usuário
Esse token é o token que utilizamos nas outras aplicações, ele é um JWT gerado pelo vxLoginUnico por intermédio do Gateway que criptografa o JWT. Para consumir basta colocar as instruções no authentication header da aplicação, por exemplo:

"Authentication": "`Bearer JWT`"

Para gerar esse token JWT é necessário realizar uma requisição para a seguinte url:

 - Url: https://frontgtw.vortx.com.br/apivxloginunicouat/api/user/AuthUserApi (Stage)
 - Url: https://frontgtw.vortx.com.br/apivxloginunico/api/user/AuthUserApi (Production)

E enviar no corpo da requisição seus dados de usuário:

```
{
	"token": "exemplo-token",
	"login": "exemplo-login"
}
```

Então será retornado um objeto nesse modelo:

```
{
  "authenticated": true,
  "username": "nome do usuário",
  "document": "exemplo-doc",
  "email": "teste@vortx.com.br",
  "created": "2020-10-10 00:00:00",
  "expiration": "2020-10-10 02:00:00",
  "token": "exemplo-token",
  "tokenV2": "exemplo-tokenV2",
  "acceptPolicy": true
}
```

E para a autenticação deve ser utilizado como token JWT o campo **tokenV2**.

### Token de aplicação
Esse token é uma chave fixa diferenciada para cada ambiente (Stage e Produção), para que outros serviços possam consumir algumas informações deste micros-serviço.

Observação: Para implementar este método de autenticação é necessário descomentar o código presente no arquivo: ```src\infra\api\middlewares\auth.js```

### Documentação
Além do readme e do [vxdocs](https://docs.vortx.com.br/), utilizamos o [Herbsshelf](https://github.com/herbsjs/herbsshelf) onde você pode consultar sobre os usecases.