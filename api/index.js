export default function hello(req, res) 
{
    try 
    {
        const corpo = req.body;
        return res.status(200).json({ mensagem: corpo });
    }
    catch(erro) 
    {
        return res.status(400).json({ mensagem: "Houve um erro no body!" });
    }
}