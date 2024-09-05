const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    if (req.query.userId) {
      console.log("Redirecting to /api/users/:userId/comments");
      res.redirect(`/api/users/${req.query.userId}/comments?api-key=${req.key}`);
      return;
    }
    const links = [
      {
        href: "comments/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ comments, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      comments.push(comment);
      res.json(comments[comments.length - 1]);
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
