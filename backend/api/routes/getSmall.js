import { Router } from 'express';

import SmallImage from '../models/small-image'

var router = Router();

router.get('/', async (req, res) => {

    try {
        var allSmall = await SmallImage.find().sort({ date: -1 })

        var arr = allSmall.map(x => ({ name: x.name }));

        res.status(200).json(arr);
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

router.get('/:name', async (req, res) => {
    // console.log(req.params.name);
    try {
        var smallPicture = await SmallImage.findOne({ name: req.params.name })
        // console.log(smallPicture);
        if (!smallPicture) {
            throw Error("Can't Find image");
        }
        else {
            res.sendFile(smallPicture.path, { root: './' });
        }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

export default router;