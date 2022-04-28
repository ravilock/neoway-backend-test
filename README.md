# nodejs-api-template

### 1. Requirements

* docker
* docker-compose
* makefile

### 2. How to run this project

#### 2.1 Start in development environment

* Copy file `.env.dist` with name `.env` and insert env variables
* Copy file `docker-compose.override.yml.dist` with name `docker-compose.override.yml`

Commands to start project using docker
| COMMAND | DESCRIPTION|
| --- | --- |
| make build | Build docker |
| make dev | Execute application in development mode |

**NOTE:**
* If you want to run the app in `development` mod set `NODE_ENV=development`
