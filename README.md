### [apnakhata(Server)](https://apnakhata01.herokuapp.com)

  * [Introduction](#introduction)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Client](#client)
      - [Server](#server)
      - [Database](#database)
  * [Configuration and Setup](#configuration-and-setup)

## Introduction
ApnaKhata is an invoicing Application designed for small buisnesses to maintain their financial record book and send invoices to their clients in a easier way

## Key Features
- Send invoices, receipts, estimates and bills via email
- Generate and send/download pdf invoices, receipts, estimates and bills via email
- Automatic status change when payment record is added
- Payment history section for each invoice with record about payment date, payment method and extra note.
- Clean admin dashboard for displaying all invoice statistics including total amount received, total pending, recent payments, total invoice paid, total unpaid and partially paid invoices. 
- Multiple user registration.
- Authentication using jsonwebtoken (jwt) and Google auth


## Technologies used
This project was created using the following technologies.

#### Client

- React JS
- Redux (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI , CSS and SASS Module (for User Interface)
- Cloudinary (to allows users to upload their business logo)
- React Apex-Charts (to display payment history)
- React-google-login (To enable authentication using Google)

#### Server

- Express
- Mongoose
- JWT (For authentication)
- bcryptjs (for data encryption)
- Nodemailer (for sending invoice via email)
- html-pdf (for generating invoice PDFs)

#### Database
MongoDB (MongoDB Atlas)

## Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine. 
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

```
REACT_APP_GOOGLE_CLIENT_ID = 
REACT_APP_API = http://localhost:8000
REACT_APP_URL = http://localhost:3000

```

To get your Google ClientID for authentication, go to the [credential Page ](https://console.cloud.google.com/apis/credentials) (if you are new, then [create a new project first](https://console.cloud.google.com/projectcreate) and follow the following steps;

- Click Create credentials > OAuth client ID.
- Select the Web application type.
- Name your OAuth client and click Create
- Remember to provide your domain and redirect URL so that Google identifies the origin domain to which it can display the consent screen. In development, that is going to be `http://localhost:3000` and `http://localhost:3000/login`
- Copy the Client ID and assign it to the variable `REACT_APP_GOOGLE_CLIENT_ID` in your .env file

```
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```
In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
DB_URL = 
SECRET = 
SMTP_HOST = 
SMTP_PORT = 
SMTP_USER = 
SMTP_PASS = 

```

Please follow [This tutorial](https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i) to create your mongoDB connection url, which you'll use as your DB_URL

```
$ cd server
$ npm install (to install server-side dependencies)
& npm start (to start the server)
```
