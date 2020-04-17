import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import base64url from 'base64url';
import sharp from 'sharp';

import NormalImage from '../models/normal-image';
import SmallImage from '../models/small-image'

var router = Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/originals/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + base64url(crypto.randomBytes(8)) + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage });

router.post('/', upload.single('image'), async function (req, res, next) {
    // console.log(req.file);

    try {

        var smallPath = 'uploads/smalls/' + req.file.filename;

        sharp(req.file.path)
            .resize(150, 150)
            .toFile(smallPath)

        var newNormalImage = new NormalImage({
            name: req.file.filename,
            path: req.file.path
        });

        var newSmallImage = new SmallImage({
            name: req.file.filename,
            path: smallPath
        });

        var promise1 = await newNormalImage.save();
        var promise2 = await newSmallImage.save();

        if (!promise1 || !promise2) {
            throw Error('Something went wrong saving the item');
        }

        res.status(200).json({ name: req.file.filename });
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }


});

export default router;