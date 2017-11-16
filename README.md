# Hipster: compartilhe experiências musicais.

![Hipster logo](https://github.com/jvmafra/hipster/blob/master/H.png?raw=true)

## Visualizar execução

Execute `ng serve` e vá para `http://localhost:4200/`. A aplicação recarrega automaticamente se qualquer arquivo-fonte for modificado.

# Requisitos

Node v8.9.1
- Caso esteja com uma versão desatualizada, faça o download em https://nodejs.org/en/

Npm v5.5.1
- Caso esteja com uma versão desatualizada, faça a atualização: npm install npm@latest -g

Instale o angular-cli através do npm:
- npm install -g @angular/cli

# Clone o repositório:

- git clone https://github.com/jvmafra/hipster.git

- Para funcionar o post, é necessário instalar o curs:
> - npm install cors

- Em seguida:
 > - cd hipster
 
 > - npm install

- Para executar:
 > - ng build (espere terminar)

 > - babel-node server.js

- Para executar com o nodemon (atualização do server a cada modificação):
Antes é recomendado instalar o nodemon globalmente:
    - npm install -g nodemon

Para executar com o nodemon:
> - nodemon --exec npm run babel-node -- ./server.js

Ou você pode simplesmente executar:
> - npm start

