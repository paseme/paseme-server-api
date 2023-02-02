const { MongoClient } = require("mongodb");
const { customAlphabet } = require("nanoid");

module.exports = async function(req, res) {

    const client = new MongoClient(process.env.MONGODB_URI);

    client.connect()

        .then(function() {
            
            console.log("CONECTADO COM O BANCO DE DADOS!");

            //return res.status(200).json({ mensagem: "CONECTADO COM O BANCO DE DADOS!" });

        })

        .catch(function(erro) {

            console.error(erro);

            //return res.status(500).json({ mensagem: "ERRO AO CONECTAR COM O BANCO DE DADOS!" });

        });

    const nanoid = customAlphabet("012345abcd", 4); 

    const codigo = nanoid();

    client.db("paseme").collection("atendimento").insertOne({ codigo })

        .then(function(result) {

            console.log(result)

            return res.status(200).json({ mensagem: "DOCUMENTO SALVO!" });

        })

        .catch(function(erro) {

            console.error(erro);

            return res.status(500).json({ mensagem: "ERRO AO SALVAR DOCUMENTO!" });

        });

    await client.close();

}