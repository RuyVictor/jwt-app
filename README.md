<h1 align="center">
    JWT App
</h1>

<p align="center">
  <img src="./presentation.jpg">
</p>

### Objetivo:
> Este projeto consiste em um sistema simples de autenticação e autorização, onde o usuário faz o login no sistema de backend e recebe seus devidos dados. Apartir disso, o sistema irá gerar um token, o mesmo possui um tempo de expiração, quando expirado, o usuário não terá mais acesso ao login automático, então o app irá redirecionar automaticamente para a página de login para que o usuário possa fazer uma nova autenticação com o servidor e assim tentar criar um novo token de acordo com os credenciais certos.

### Backend:
```
$ cd jwt-app/backend
$ yarn dev
```

### Frontend:
- ##### Entre na pasta services e altere o ip de acordo com o ipv4 da sua máquina.
```
$ cd jwt-app/frontend
$ yarn start
```

### Database:
- ##### Crie uma database no postgresql com o nome jwt_app, em seguida conecte-se a ela e instale a extensão do uuid-ossp, com o comando CREATE EXTENSION 'uuid-ossp';
```
host: localhost;
port: 5432;
username: postgres;
password: postgres;
database: jwt_app;
```

>OBS: TODO BACKEND ESTÁ SENDO REFATORADO E MIGRADO PARA O NESTJS COM MAIS FUNCIONALIDADES COMO: RECUPERAR SENHA, CADASTRO E UPLOAD DE AVATAR!