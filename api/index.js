const { MongoClient } = require("mongodb");

module.exports = async function(req, res) {

    const client = new MongoClient(process.env.MONGODB_URI);

    client.connect()

        .then(function() {
            
            return res.status(200).json({ mensagem: "Conectado com o BANCO DE DADOS!" })

        })

        .catch(function(erro) {

            console.log(erro)

            return res.status(500).json({ mensagem: "eRRO ao conectar" })

        });

}