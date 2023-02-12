const { MongoClient } = require("mongodb");

const { customAlphabet } = require("nanoid");

module.exports = async function(req, res) {

    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        const nanoid = customAlphabet("012345abcd", 4); 

        const estabelecimento = req.body.estabelecimento;

        await client.connect();

        const result = await client.db("paseme").collection(estabelecimento).insertOne({ 
            
            codigo: nanoid(), 
            
            tempo: new Date().toLocaleString("pt-BR"), 
            
            trafego: {

                ip: req.headers["x-real-ip"],
        
                pais: req.headers["x-vercel-ip-country"],
        
                regiao: req.headers["x-vercel-ip-country-region"],
        
                cidade: req.headers["x-vercel-ip-city"],
        
            }, 
            
            atendido: false,
        
        })
        
        res.status(200).json(result);

    }

    catch(erro) {

        res.status(500).json({ mensagem: "Houve um erro!" });

    }

    finally {
        
        await client.close();

    }

}