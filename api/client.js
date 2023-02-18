const { MongoClient } = require("mongodb");

function GetNumberRandom() {

    return Math.floor(Math.random() * 10);

}

function GetServiceCode() {

    const allowedLetters = "ABCDEFGHIJ";

    const letterRandom = allowedLetters[GetNumberRandom()];

    const NumbersRandom = [0, 0, 0];

    for (var index in NumbersRandom) {

        NumbersRandom[index] = GetNumberRandom().toString();

    }

    return letterRandom + NumbersRandom.join("");

}


export default async function(request, response) {

    try {

        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        const { esta } = request.query;

        const database = client.db("paseme").collection(esta) 

        const result = await database.insertOne({ 
            
            service: {

                code: GetServiceCode(),

                time: new Date(),

                status: false,

            },

            access: {

                ip: request.headers["x-real-ip"],

                country: request.headers["x-vercel-ip-country"],

                region: request.headers["x-vercel-ip-country-region"],

                city: request.headers["x-vercel-ip-city"]

            }
        
        })
        
        await client.close();

        const clientURL = new URL(process.env.CLIENT_URL);

        clientURL.searchParams.append("esta", esta);

        clientURL.searchParams.append("id", result.insertedId);

        return response.redirect(clientURL.toString());

    }

    catch(erro) {

        return response.status(500).json({ 
            
            message: "Something is wrong!" 
        
        });

    }

}