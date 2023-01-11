const { Comment } = require('../models');

const commentData = [
  {
    comment_content: 'I just learned about this in my coding bootcamp.',
    comment_date: 'August 1, 2022',
    post_id: 1,
    user_id: 2,
  },
  {
    comment_content: 'I love writing in HTML!',
    comment_date: 'December 17, 2022',
    post_id: 1,
    user_id: 2,
  },
  {
    comment_content: 'Soooo helful, thank you!!',
    comment_date: 'October 31, 2022',
    post_id: 2,
    user_id: 2,
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
