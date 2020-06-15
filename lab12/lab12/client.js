const app = require('express')();
const fs = require('fs');
const { ServerSignShnorr, ClientVerifyShnorr } = require('./ESignatureShnorr');
const { ServerSignElgam, ClientVerifyElgam } = require('./ESignatureElgamal');
const { ServerSignRSA, ClientVerifyRSA } = require('./ESignatureRSA');
const request = require('request-promise');

const PORT = 3001;


app.listen(PORT, async () => {
    const SERVER_URI = 'http://localhost:3000'

    await request({
        method: 'GET',
        uri: `${SERVER_URI}/signature/rsa`,
        json: true
    })
        .then((response) => {
            let signature = response.sign;
            let txt = response.file;

            const text = fs.createReadStream(`${__dirname}/fileC.txt`);
            let data = '';
            text.on('data', (chunk) => {
                data += chunk.toString();
            });

            let cv = new ClientVerifyRSA();

            let timer = Date.now()

            cv.verify(signature, text, (result) => {
                if (result) {
                    console.log('RSA - верифицирована: ', data);
                }
                else {
                    console.log('RSA - не верифицирована');
                }
                timer = Date.now() - timer
                console.log("TIME:", timer)
            });


        })
        .catch((err) => {
            console.log(`RSA ERROR: ${err}`);
        });

    await request({
        method: 'GET',
        uri: `${SERVER_URI}/signature/elgamal`,
        json: true
    })
        .then((response) => {
            let signature = response.sign;
            let txt = response.file;

            const text = fs.createReadStream(`${__dirname}/fileC.txt`);
            let data = '';
            text.on('data', (chunk) => {
                data += chunk.toString();
            });

            let cv = new ClientVerifyElgam();

            let timer = Date.now()

            cv.verify(signature, text, (result) => {
                if (result) {
                    console.log('Эль-Гамаль - верифицирована: ', data);
                }
                else {
                    console.log('Эль-Гамаль - не верифицирована');
                }
                timer = Date.now() - timer
                console.log("TIME:", timer)
            });


        })
        .catch((err) => {
            console.log(`Эль-Гамаль ERROR: ${err}`);
        });

    await request({
        method: 'GET',
        uri: `${SERVER_URI}/signature/shnorr`,
        json: true
    })
        .then((response) => {
            let signature = response.sign;
            let txt = response.file;

            const text = fs.readFileSync(`${__dirname}/fileC.txt`, 'utf8');

            let cv = new ClientVerifyShnorr();

            let timer = Date.now()
            let result = cv.verify(signature, text);

            if (result) {
                console.log('Шнорр - верифицирована: ', text);
            }
            else {
                console.log('Шнорр - не верифицирована');
            }

            timer = Date.now() - timer
            console.log("TIME:", timer)
        })
        .catch((err) => {
            console.log(`Шнорр ERROR: ${err}`);
        });
})
    .on('error', (e) => { console.log(`Listener | error: ${e.code}`) });
