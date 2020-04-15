import { Router } from 'express';

import SmallImage from '../models/small-image'

var router = Router();

router.get('/', async (req, res) => {

    try {
        var allSmall = await SmallImage.find().sort({ date: -1 })

        var arr = allSmall.map(x => ({ name: x.name }));
        console.log(arr);

        res.status(200).json(arr);
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

export default router;