const express = require('express');

const db = require('../data/db-config.js');

const Users = require('./user-model.js');
const { isValidUser } = require('./user-helpers.js');

const router = express.Router();


/*
seperate our db code from the routers they should not be intermingled
and create a user-model file and place it there

*/

router.get('/', (req, res) => {

  // db('users')
  Users.find()  /* <<  this router now only deals with the stuff (ie. res and req)that has to do with the outside world and for everything else it is relying/depending on the User-Model, so the model doesn t know or care that you are using express */
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
}); 

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log({id})
  // const  id  = req.params.id


  // db('users').where({ id })
  Users.findById( id )
  .then(user => { //now we also change users >>> user because of line 35 where we are caling first 
    // const user = users[0];   << not needed now because in the model file we use .first()

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;

    // db('users').insert(userData)
    if (isValidUser(userData)) {
      Users.add(userData)
      // .then(ids => {
      //   res.status(201).json({ created: ids[0] });
      // })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new user' });
      });
    } else {
      res
        .status(400)
        .json({ message: 'please include the username for the user' });
    }  
});

////////  << go back and refactor put and delete

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('users').where({ id }).update(changes)
  .then(count => {
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where({ id }).del()
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

router.get('/:id/posts', (req, res) => {
  // select * from posts where user_id = 2;

  const id = req.params.id;
  
  Users.findUserPosts(id)
  // db('posts as p')
  //   .select("p.id", "p.contents as Quote" , "u.username as SaidBy")
  //   .join ("users as u", "u.id", "=", "p.user_id")
  //   .where({ user_id : id })
   
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'error retrieving posts for the user', error });
    });
});

module.exports = router;