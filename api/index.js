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

    const tempo = new Date().toLocaleDateString("pt-BR") 

    const atendido = false

    client.db("paseme").collection("atendimento").insertOne({ codigo, tempo, atendido })

        .then(function(result) {

            console.log(result)

            const trafego = {
                ip: req.headers["x-real-ip"],
                pais: req.headers["x-vercel-ip-country"],
                regiao: req.headers["x-vercel-ip-country-region"],
                cidade: req.headers["x-vercel-ip-city"]
            }

            return res.status(200).json({ mensagem: "DOCUMENTO SALVO!", trafego });

        })

        .catch(function(erro) {

            console.error(erro);

            return res.status(500).json({ mensagem: "ERRO AO SALVAR DOCUMENTO!" });

        });

    await client.close();

}