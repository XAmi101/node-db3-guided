const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findUserPosts,
  add,
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findUserPosts(userId) {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents as quote', 'u.username as saidBy')
    .where({ user_id: userId });
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findById(id); // makes you not need line 57-59 in the router
    });
}
