import User from '../modals/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


dotenv.config();

const SECRET = process.env.SECRET;// for jwt token
const PORT = process.env.SMTP_PORT;
const HOST = process.env.SMTP_HOST;// for nodemailer
const USER = process.env.SMTP_USER;
const PASSWORD = process.env.SMTP_PASS;



export const signupController = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, bio } = req.body;


    try {
        // check if email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'you are already registered'
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'password does not match'
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user

        const newUser = await User.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}`, bio });
        // console.log(newUser);
        // token
        const token = jwt.sign({ _id: newUser._id, email: newUser.email }, SECRET, { expiresIn: '1h' });
        // console.log(token);
        // send token and user to the frontend
        res.status(200).json({
            newUser, token
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }

}

export const signinController = async (req, res) => {
    try {
        const existedUser = await User.findOne({ email: req.body.email });
        if (!existedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, existedUser.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }
        // if credentials are correct, assign a token to the user
        const token = jwt.sign({ email: existedUser.email, id: existedUser._id }, SECRET, { expiresIn: "1h" });
        // header is default(mentioned encryption algo), payload is the data we want to send, and options is for the expiration time of the token and secret key is for the encryption of the token

        // then we need to send the token to frontend
        return res.status(200).json({
            existedUser, token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

export const forgotPasswordController = async (req, res) => {
    // alg se frontend mein page bnana hai
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // // generate token
        // const toker = jwt.sign({_id : user._id, email : user.email}, SECRET, {expiresIn : '1h'});
        // send email
        // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
        const transporter = nodemailer.createTransport({

            host : HOST,
            port : PORT,
            auth: {
                user: USER,
                pass: PASSWORD
            },
            
        });


        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                console.log(err);
            }
            const token = buffer.toString('hex');

            const options = {
                to: user.email,
                from: "Record Keeper <hello@recordKeeper.com>",
                subject: "Password Reset request",
                html: `
                <p>You requested for a password reset</p>
                <p>Click this <a href="http://localhost:8000/users/reset/${token}">link</a> to set a new password</p>
                <p>Link is not clickable ? copy and paste the following url in your address bar </p>
                <p>http://localhost:8000/users/reset/${token}</p>
                <p>If this was a mistake, then just ignore this email and nothing will happen.</p>
                <p>This link will expire in 1 hour</p>
                `
            }

            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;
            user.save().then(result => {
                transporter.sendMail(options, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Message sent: %s', info);
                }
                )
                res.json({ message: 'check your email for password reset link' });
            }).catch(err => console.log(err));
        });


    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }

}

export const resetPasswordController = async (req, res) => {
    const {password} = req.body;
   
    try{
        const user = await User.findOne({resetToken : req.params.token, expireToken : {$gt : Date.now()}});
        if(!user){
            return res.status(404).json({
                message: 'user not found'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then(result => {
            res.status(200).json({
                message: 'password updated'
            });
        }).catch(err => console.log(err));
    }catch(err){
        return res.status(500).json({
            message: err
        });
    }

}