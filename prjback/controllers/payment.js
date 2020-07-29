var braintree = require("braintree");
const { response } = require("express");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "3p48kh57b3mvhbzp",
    publicKey: "jx54s7m38kdkg3tb",
    privateKey: "ee68158ef0967007381cb9f3afbd39e5"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
}
