import jwt from 'jsonwebtoken';

function VerifyUser (req, res, next) {
    const { Token } = req.cookies;
    if(!Token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    jwt.verify(Token, process.env.JWT_SECRET_KEY, (err, data) => {
        if(err){
            return res.status(401).json({
                message: "Unathorized"
            })
        }else{
            req.user = data;
            next();
        }
    })
}

export default VerifyUser;