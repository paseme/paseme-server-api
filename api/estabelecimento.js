const { MongoClient } = require("mongodb");

module.exports = async function(req, res) {
    
    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        const estabelecimento = req.body.estabelecimento;

        await client.connect();

        const cursor = client.db("paseme").collection(estabelecimento).find({});

        const results = await cursor.toArray();

        await client.close();

        res.status(200).json(results);

    }
    
    catch(erro) {

        res.status(500).json({ mensagem: "Houve um erro!" });

    }

    finally {
        
        await client.close();

    }

}