const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Post.findAll({
      order: ['id', 'DESC'],
      attributes: [
        'id', 'title', 'post_content', 'post_date'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'post_id', 'user_id', 'comment_date'],
          include: {
            model: User, 
            attributes: ['username']
          }
        },
        {
          model: User, 
          attributes: ['username']
        }
      ],
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

// GET /api/posts/1
router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 'title', 'post_content', 'post_date'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'post_id', 'user_id', 'comment_date'],
          include: {
            model: User, 
            attributes: ['username']
          }
        },
        {
          model: User, 
          attributes: ['username']
        }
      ],
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    } 
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new post
router.post('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      post_date: req.body.post_date,
      user_id: req.session.user_id
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// EDIT post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
