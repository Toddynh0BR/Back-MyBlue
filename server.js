require('dotenv').config();
const cors = require("cors");
const express = require('express');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send', async (req, res) => {
    const { text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS  
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: 'galaxyplay41@gmail.com',
        subject: '🔔 Novo Agendamento Realizado!',
        html: text,
        headers: {
          'X-Priority': '1 (Highest)',
          'X-MSMail-Priority': 'High',
          Importance: 'High'
        }
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.send(info);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 