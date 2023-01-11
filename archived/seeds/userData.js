const { User } = require('../models');

const userData = [
  {
    username: 'testuser01',
    email: 'testuser01@email.com',
    password: 'testuser010203',
  },
  {
    username: 'testuser02',
    email: 'testuser02@email.com',
    password: 'testuser24680',
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
