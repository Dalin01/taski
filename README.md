# Taski
## Organize your tasks in teams

### Introduction
Taski is a web-based task management tool focused on organizing tasks in teams (taskspaces) using cards. 
<img src="https://user-images.githubusercontent.com/17512992/128636843-b5fcee6a-3dcf-49f0-ac8a-394e7e4230a2.PNG" width=100%>

Taski was built using React on the front-end and Express on the back-end. PostgreSQL was used as the relational database management system. Redux was used for Global state management. The front-end and the back-end are Typed. 

### Features
Easily create Taskspaces
Easily add task members to your taskspace
Create Tasks - as many as you'd like
Edit and destroy tasks. 

### Getting Started

#### Clone the project repo
```
git clone https://github.com/Dalin01/taski.git
```
#### Install dependencies in both the Server and Client folders
```
npm install
```
#### Database
- Setup a PostgreSQL database locally.
- Choose a DB name and set DB_NAME in /server/.env
- Set DB user details in /server/.env -> DB_USERNAME, DB_PASSWORD
- Set your secrete key for bcrypt in /server/.env -> SECRETE_KEY

#### Start the app
- Run ``` npm run start ``` in \server and \client

### Technology Stack
#### Frontend
- Typescript
- React
- React bootstrap & Bootswatch

#### Backend
- Typescript
- Node.js
- Express
- PostgreSQL
- Bcrypt
- Typescript Sequelize
