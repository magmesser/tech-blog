const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
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

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
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

    const post = postData.get({ plain: true });
    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
