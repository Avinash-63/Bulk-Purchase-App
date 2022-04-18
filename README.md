# MERN Stack 

## Setup

#### Node

For Linux:

curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs


#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React


npm install -g create-react-app


To create a new React app:

create-react-app name_of_app


To run the app, cd into the directory and do:

npm start


## Running the boilerplate

Run Mongo daemon:

sudo mongod

Mongo will be running on port 27017.

To create a database:

mongo
 
This will open the mongo shell. Type in use users to create a new database called users.

Run Express:

cd backend/
npm install (or) npm i
npm start


Run React:

cd frontend
npm install/ (or) npm i
npm start

Navigate to localhost:3000/ in your browser to experience the app.
Navigate to localhost:5000/ to view get request of routes.