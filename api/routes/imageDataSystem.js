import { Router } from 'express';

import NormalImage from '../models/normal-image';
import CommentModel from '../models/commentModel';
import VotingModel from '../models/imageVoting';
import auth from '../../middleware/auth';
import { NScommentsystem } from './socketComment';


var router = Router();

router.get('/:name', async (req, res) => {
    // console.log(req.params.name);

    var imageName = req.params.name;

    try {
        var username = NormalImage.findOne({ name: imageName }).select('username');
        var likes = VotingModel.countDocuments({ imageName: imageName, vote: true });
        var dislikes = VotingModel.countDocuments({ imageName: imageName, vote: false });
        var comments = CommentModel.find({ imageName: imageName }).sort({ date: -1 });

        [username, likes, dislikes, comments] = await Promise.all([username, likes, dislikes, comments]);

        // console.log(username);
        // console.log(likes);
        // console.log(dislikes);
        // console.log(comments);

        res.json({ username, likes, dislikes, comments })

    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

router.post('/newcomment', auth, async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);

    try {
        if (!req.body.comment) {
            throw Error("No Comment Found");
        }
        else {
            var newComment = new CommentModel({
                username: req.user.username,
                imageName: req.body.imageName,
                comment: req.body.comment,
            });

            NScommentsystem.to(req.body.imageName).emit('newComment', newComment);

            var savedComment = await newComment.save();

            res.status(200).json(savedComment);
        }
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

router.post('/vote', auth, async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);

    try {
        var vote = await VotingModel.findOne({ imageName: req.body.imageName, username: req.user.username });

        // console.log(vote);

        if (!vote) {
            vote = new VotingModel({
                username: req.user.username,
                imageName: req.body.imageName,
                vote: req.body.vote
            });
            vote = await vote.save();
        }
        else if (vote.vote != req.body.vote) {
            vote.vote = req.body.vote;
            await vote.save();
        }
        else {
            throw Error("No Change");
        }

        var likes = VotingModel.countDocuments({ imageName: req.body.imageName, vote: true });
        var dislikes = VotingModel.countDocuments({ imageName: req.body.imageName, vote: false });
        [likes, dislikes] = await Promise.all([likes, dislikes]);

        NScommentsystem.to(req.body.imageName).emit('newVote', { likes, dislikes });

        res.status(200).json({ likes, dislikes })
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

export default router;