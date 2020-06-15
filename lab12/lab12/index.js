const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {ServerSignShnorr, ClientVerifyShnorr} = require('./ESignatureShnorr');
const {ServerSignElgam, ClientVerifyElgam} = require('./ESignatureElgamal');
const {ServerSignRSA, ClientVerifyRSA} = require('./ESignatureRSA');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/signature/rsa', (req, res) => {
    console.log('/rsa');
    try{
        const text = fs.createReadStream(`${__dirname}/file.txt`);

        const ss = new ServerSignRSA();
        ss.getSignContext(text, (signContext) => {
            res.json({
                file: text,
                sign: signContext});
        });
    }
    catch(e){
        console.log('RSA error: ', e);
        res.status(409).json({ msg: 'RSA error' });
    }
});

app.get('/signature/shnorr', (req, res) => {
    console.log('/shnorr');
    try{
        const text = fs.readFileSync(`${__dirname}/file.txt`, 'utf8');

        let ss = new ServerSignShnorr();
        ss = ss.getSignContext(text);
        res.json({
            file: text,
            sign: ss
        });
    }
    catch(e){
        console.log('Shnorr error: ', e);
        res.status(409).json({ msg: 'Shnorr error' });
    }
});

app.get('/signature/elgamal', (req, res) => {
    console.log('/elgamal');
    try{
        const text = fs.createReadStream(`${__dirname}/file.txt`);

        const ss = new ServerSignElgam();
        ss.getSignContext(text, (signContext) => {
            res.json({
                file: text,
                sign: signContext});
        });
    }
    catch(e){
        console.log('Elgamal error: ', e);
        res.status(409).json({ msg: 'Elgamal error' });
    }
});


app.listen(PORT, () =>{
  console.log(`Server listen ${PORT}`);
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
