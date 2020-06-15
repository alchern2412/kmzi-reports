const crypto = require('crypto');

let prKey, pubKey, s;

class ServerSignRSA{
    constructor(){
        const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {type: 'pkcs1', format: 'pem'},
            privateKeyEncoding: {type: 'pkcs1', format: 'pem'}
        });

        prKey = privateKey;
        pubKey = publicKey;

        s = crypto.createSign('SHA256');
    }

    getSignContext(rs,cb){
        rs.pipe(s);
        rs.on('end', () => {
            cb({
                signature: s.sign(prKey).toString('hex'),
                publicKey: pubKey.toString('hex')
            });
        });
    };
}


// Client Verification

let v;

class ClientVerifyRSA{
    constructor(){
        v = crypto.createVerify('SHA256')
    }

    verify(signContext, rs, cb){
        rs.pipe(v);
        rs.on('end', () => {
            cb(v.verify(signContext.publicKey, signContext.signature, 'hex'));
        });
    };
}


module.exports.ServerSignRSA = ServerSignRSA;
module.exports.ClientVerifyRSA = ClientVerifyRSA;
