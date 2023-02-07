const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/comments
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment_content: req.body.comment_content,
      // comment_date: req.body.comment_date,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// EDIT comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
