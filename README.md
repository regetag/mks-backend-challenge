# Back-end challenge MKS Desenvolvimento de Sistemas
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Índice
- [Sobre](#sobre)
- [Deploy](#deploy)
- [Inicializão utilizando o docker](#inicialização-da-aplicação-containeres-docker)
- [Experiências utilizando as tecnologias](#experiência-com-cada-tecnologia)
# Sobre

Este repositório foi criado para a realização da challenge proposta pela **MKS Desenvolvimento de Sistemas**, onde é foi necessária a construção de uma API-Restful (JSON), utilizando as seguintes tecnologias:
- TypeScript
- Nest.js
- TypeORM
- Swagger
- Docker
- Redis
- PostgreSQL




[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Deploy
Para o deploy foram utilizadas duas plataformas: 
- [Fly.io](fly.io/) (Aplicação e PostgreSQL)
- [Upstash](https://upstash.com/) (Redis)

O deploy da aplicação está hospedado [neste link](https://fragrant-thunder-7263.fly.dev/).

# Inicialização da aplicação (Containeres docker)

## Requisitos
- [git](https://git-scm.com/) 
- [docker](https://docs.docker.com/engine/install/ubuntu/)
- [docker-compose](https://docs.docker.com/compose/install/)

---

Para executar a aplicação, é necessário a execução dos comandos a baixo:

``` bash
# Download do repositório para a máquina local:
$ git clone https://github.com/regetag/mks-backend-challenge

# Entrada no diretório do projeto:
$ cd ./mks-backend-challenge

# Inicialização de todo o ambiente para a execução da aplicação:
$ docker-compose up -d
```

Pronto!

A aplicação já está sendo executada. Para visualizá-la acesse o link: [http://localhost:3692](http://localhost:3692)

Para encerrar a execução da aplicação, execute o comando a baixo:
```bash
# Este comando destrói todo o ambiente contruído para a aplicação.
$ docker-compose down

# É de extrema importância que este comando seja executado no diretório da aplicação.
```
# Experiência com cada tecnologia

Como é complicado saber exatamente o tempo de experiência com cada tecnologia solicitada, farei a medição através de projetos construidos utilizando as mesmas.

- TypeScript: 8 aplicações
- Nest.js: 3 aplicações
- TypeORM: 5 aplicações
- Swagger: 2 aplicações
- Docker: 5 aplicações
- Redis: 2 aplicações
- PostgreSQL: 5 aplicações
