import jwt from 'jsonwebtoken'

// https://github.com/brianloveswords/node-jws/blob/master/lib/verify-stream.js#L100
// "MY_JwT_SECReT_VaLUE_SHoULD_CHANgE_ThIS_ShouLd_bE_RaNdOm"

export default (req, res, next) => {
    var token;

    if (req.header('x-auth-token')) {
        token = req.header('x-auth-token');
    }
    else if (req.body.auth_token) {
        token = req.body.auth_token;
    }

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorizaton denied' });
    }

    try {
        var verify = jwt.verify(token, "MY_JwT_SECReT_VaLUE_SHoULD_CHANgE_ThIS_ShouLd_bE_RaNdOm");
        req.user = verify
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: 'Bad token, authorizaton denied' });
    }

}
