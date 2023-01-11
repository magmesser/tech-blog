const { Post } = require('../models');

const postData = [
  {
    title: 'HTML',
    post_content: 'The head element contains meta information about the webpage. The body element represents the visible content shown to the user. The meta element defines the metadata or information about the data about an HTML document.',
    post_date: 'January 22, 2022 15:05:00',
    user_id: 1
  },
  {
    title: 'CSS',
    post_content: 'A margin indicates how much space we want around the outside of an element. A padding indicates how much space we want around the content inside an element. A box-shadow is described by X and Y offsets relative to the element, blur and spread radius, and color.',
    post_date: 'February 14, 2022 09:09:00',
    user_id: 1
  },
  {
    title: 'Git',
    post_content: 'git status: checks what branch we are currently on. git checkout -b branch-name: creates a new branch and switches to it. Save changes in Terminal: git add -A, git commit -m "comment", git pull origin main, git push origin feature/branch name. Save changes in GitHub: go to new branch, PR tab, new PR, main as base and new branch as compare, Create PR, add title, Merge PR, close issue.',
    post_date: 'March 17, 2022 18:57:00',
    user_id: 1
  },
  {
    title: 'JavaScript',
    post_content: 'A variable is a named container that allows us to store data in our code. Control flow is the order in which a computer executes code in a script. A function must be called to execute.',
    post_date: 'June 23, 2022 06:23:00',
    user_id: 1
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
