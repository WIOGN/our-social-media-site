import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import auth from '../../middleware/auth'
import userModel from "../models/userModel";

var router = Router();

router.post('/register', async (req, res) => {

    var { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter username or password' });
    }

    try {
        var user = await userModel.findOne({ username: username });

        if (user) {
            throw Error('Username Taken');
        }

        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password, salt);

        var newUser = new userModel({
            username: username,
            password: hash
        });
        var savedUser = await newUser.save();
        var token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            "MY_JwT_SECReT_VaLUE_SHoULD_CHANgE_ThIS_ShouLd_bE_RaNdOm",
            { expiresIn: "1d" });

        res.json({
            token: token,
            user: {
                id: newUser._id,
                username: newUser.username
            }
        })


    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

router.post('/login', async (req, res) => {
    var { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter username or password' });
    }

    try {
        var user = await userModel.findOne({ username: username });

        if (!user) {
            throw Error('Username or password does not match');
        }

        var passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw Error('Username or password does not match');
        }

        var token = jwt.sign(
            { id: user._id, username: user.username },
            "MY_JwT_SECReT_VaLUE_SHoULD_CHANgE_ThIS_ShouLd_bE_RaNdOm",
            { expiresIn: "1d" });

        res.json({
            token: token,
            user: {
                id: user._id,
                username: user.username
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message });
    }

});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) throw Error('User Does not exist');
        res.json(user);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

export default router;