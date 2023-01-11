const router = require('express').Router();
const { Comment } = require('../../models');

// CREATE new comment
router.post('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment_content: req.body.comment_content,
      comment_date: req.body.comment_date,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
