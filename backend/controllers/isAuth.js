const jwt= require('jsonwebtoken');

module.exports = async (req,res,next) => {
    console.log("HI");
    const token= req.header('auth-token');
    console.log(token);
    if(token==undefined || !token)
    return res.status(200).send('false');

    try{
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("check here");
        res.status(200).send("true");
        next();
    }
    catch(err){
        res.status(200).send("Invalid Token");
    }
};
