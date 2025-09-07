const express = require("express");
const router = express.Router();

const comments = require("../data/comments")
//const posts = require("../data/posts")
const error = require("../utilities/error")

//IDEA: Put into notes this interaction
//(undefined == undefined == undefined) = true

router.route("/")
      .get((req, res) => {
        res.json({comments})
      })
      .post((req, res, next) => {
        //console.log(`test: ${req.body.userId} && ${req.body.postId} && ${req.body.body} ${req.body.skinwalker}`);
        //TODO: Figure out way to optimize this, it's really looooooooooong
        if (req.body.userId != undefined && req.body.postId != undefined && req.body.body.length != 0) {
            //TODO: figure out cleaner solution
            let idValue = null;
            if (comments.length) {
                idValue = comments[comments.length - 1].id + 1;
            } else {
                idValue = 0;
            }
            const comment = {
                id: idValue, 
                userId: req.body.userId,
                postId: req.body.postId,
                body: req.body.body
            }

            comments.push(comment);
            res.json({comment}); 
        } else {
            next(error(400, "Insufficent Data"));
        }
      })

router.route("/:id")
      .get((req, res, next) => { 
        const comment = comments.filter((e) => req.params.id == e.id)
        if (comment) res.json({comment});
        else next(error(404, "No comment with that id"))
      })

module.exports = router;