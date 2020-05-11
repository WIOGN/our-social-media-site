import { Router } from 'express';

import SmallImage from '../models/small-image'
import auth from '../../middleware/auth';

var router = Router();

router.get('/smallimages', auth, async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);

    try {
        var allSmall = await SmallImage.find({ username: req.user.username }).sort({ date: -1 });

        var arr = allSmall.map(x => ({ name: x.name }));

        res.status(200).json(arr);
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

export default router;