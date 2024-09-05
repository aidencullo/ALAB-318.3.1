const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    let updatedComments = comments;
    if (req.query.userId) {
      if (isNaN(req.query.userId)) {
	return res.status(400).json({ error: "Invalid userId" });
      }
      const userId = parseInt(req.query.userId);
      updatedComments = updatedComments.filter(comment => comment.userId === userId)
    }
    if (req.query.postId) {
      if (isNaN(req.query.postId)) {
	return res.status(400).json({ error: "Invalid postId" });
      }
      const postId = parseInt(req.query.postId);
      updatedComments = updatedComments.filter(comment => comment.postId === postId)
    }
    const links = [
      {
        href: "comments/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ updatedComments, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.postId && req.body.body) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body,
      };

      comments.push(comment);
      res.status(201).json(comment);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (comment) res.json({ comment, links });
    else next();
  })
  .patch((req, res, next) => {
    const comment = comments.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          comments[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  })
  .delete((req, res, next) => {
    const comment = comments.find((p, i) => {
      if (p.id == req.params.id) {
        comments.splice(i, 1);
        return true;
      }
    });

    if (comment) res.json(comment);
    else next();
  });

module.exports = router;
