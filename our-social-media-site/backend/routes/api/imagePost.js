import { Router } from 'express';
import ImagePost from '../../models/ImagePost'

var router = Router();

router.get('/', async (req, res) => {
    try {
        var imagePosts = await ImagePost.find();
        res.status(200).json(imagePosts);
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

router.post('/', async (req, res) => {
    var newImagePost = new ImagePost({
        name: req.body.name,
        image: req.body.data
    });

    try {
        var imagePost = await newImagePost.save();
        if (!imagePost) throw Error('Something went wrong saving the item');

        console.log(imagePost._id)
        res.status(200).json(imagePost);
    }
    catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

export default router;