import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan, { format } from 'morgan';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import pdf from 'html-pdf';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

// import routes
import profileRoutes from './routes/Profile.js';
import userRoutes from './routes/User.js';
import recordRoutes from './routes/Record.js';
import clientRoutes from './routes/Client.js';

import pdfTemplate from './Templates/record.js';
import emailTemplate from './Templates/email.js';


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Creating a express App -----
const app = express();

// --- Middleware -----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

// --- conneting to mongodb -----
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


// --- Routes -----
app.use('/profiles', profileRoutes );// edit profile routes 
app.use('/users', userRoutes);// authentication routes -> signup, login, forgot password
app.use('/clients', clientRoutes);// client routes
app.use('/records', recordRoutes);// record routes



//Nodemailer for pdf sending 
const transporter = nodemailer.createTransport({
    port : process.env.SMTP_PORT,
    host : process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const options = {
    format: 'A4',   
}

// sending pdf via email

app.post('/send-pdf', (req,res) =>{
    const {email, company} = req.body;
    try{
        pdf.create(pdfTemplate(req.body),options).toFile('record.pdf', (err) => {
            if(err) return console.log(err);

            const mailOptions = {
                from : `${company?.buisnessName ? company?.buisnessName : "ApnaKhata.com"} <Hello@ApnaKhata.com>`,// sender address
                to : `${email}`,// list of receivers
                replyTo : `${company?.email}`,
                subject :  ` Record bill from ${company?.buisnessName ? company?.buisnessName : "ApnaKhata.com"}`,// Subject line
                text : ` Record bill from ${company?.buisnessName ? company?.buisnessName : "ApnaKhata.com"}`,// plain text body
                html : emailTemplate(req.body),
                attachments : [
                    {
                        filename : 'record.pdf',
                        path : `${__dirname}/record.pdf`
                    }
                ]

            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log(err);
                }
                console.log('Message sent: %s', info);
            })
            res.status(200).json({message : 'Email sent'});
        
        });
    }catch(err){
        console.log(err);
    }
})

// creating a pdf
app.post('/create-pdf', (req ,res) =>{
    try{
        pdf.create(pdfTemplate(req.body),{}).toFile('record.pdf', (err) => {
            if(err) {
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
        });
    }catch(err){
        console.log(err);
    }
} )

app.get('/get-pdf', (req, res) =>{
    res.sendFile(`${__dirname}/record.pdf`);
})


// --------- Starting a server -----------
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('root route of the app');
})

app.listen(port ,(req, res) =>{
    console.log('server is running on port ' + port);
})