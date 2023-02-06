const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
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
    // serializing data 
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    // render to handlebars template
   
    res.render('homepage', {
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
    res.render('post', { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] }, include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
        ...user,
        logged_in: true
    });
} catch (err) {
    res.status(500).json(err);
}
})


// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
