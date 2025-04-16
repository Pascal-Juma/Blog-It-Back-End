import zxcvbn from 'zxcvbn';

function passwordStrength(req, res, next){
    const { password } = req.body;
    const result = zxcvbn(password);

    if(result.score < 3) {
        res.status(400).json({
            message: "Please pick a stronger password"
        })
    }
    next();
}

export default passwordStrength;