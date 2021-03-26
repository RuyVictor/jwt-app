# Desafio Eagle Bank Digital Backend
### JWT
![](https://img.shields.io/github/repo-size/RuyVictor/desafio-eagle-bank-digital-backend) ![](https://img.shields.io/github/contributors/RuyVictor/desafio-eagle-bank-digital-backend)

### Objetivo:
> Este projeto consiste em ser um sistema simples de autenticação e autorização,
> onde o usuário faz login ao sistema de backend, gerando um token válido ao mesmo 
> com um tempo de expiração propositado. Apartir do momento em que este token é expirado, ao usuário abrir o app novamente, não será mais possível fazer o login automático, ou seja, o app irá redirecionar automáticamente para a página de login para que o usuário possa fazer uma nova autenticação com o servidor e assim tentar criar um novo token de acordo com os credenciais certos.

### Backend:
```
$ cd desafio-eagle-bank-digital-backend/backend
$ yarn start
```

### Frontend:
- ##### Entre na pasta config e altere a variável BACKEND_HOST_IP de acordo com o IP da máquina local.
```
$ cd desafio-eagle-bank-digital-backend/frontend
$ yarn android
```