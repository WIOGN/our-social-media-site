import { Router } from 'express';

import NormalImage from '../models/normal-image';

var router = Router();

router.get('/:name', async (req, res) => {
    // console.log(req.params.name);

    try {
        var normalImage = await NormalImage.findOne({ name: req.params.name });
        // console.log(smallPicture);
        if (!normalImage) {
            throw Error("Can't Find image");
        }
        else {
            res.sendFile(normalImage.path, { root: './' });
        }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }


});

export default router;