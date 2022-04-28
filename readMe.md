# NODEJS-SOCKETIO-IIM-A4-DW2-EQUIPE1

## Project Link

The project has been deployed on every push upon master and is accessible on the following url : https://iim-node-equipe1.herokuapp.com/

## Required
- docker (https://www.docker.com/get-started/)
- node (https://nodejs.org/en/download/)

## Project installation

- Create a .env file and copy/past the example from .env.example
- Fill the information with your pg account and pg database
- In terminal, type command - docker-compose up --build

## ORM

We used the Sequelise ORM to create our Model for this project.

## Tests

Jest has been used to setup our tests.
To launch the tests , use the following command : 
```bash
npm test
```

## Rules
### Branches Rules

Add one of the following title to your branche :

- feature: Ajout d’une nouvelle fonctionnalité
- bugfix: Correction d’un bug
- hotfix: Correction d’un bug critique
- chore: Nettoyage du code
- experiment: Expérimentation de fonctionnalités

Then, you need to add /branch-name

Example : 
```
feature/edit-readMe
```

### Commits and PR Rules

Add between [] the main theme, then a little description.
Example: 
```
[Templating] update readMe
```
