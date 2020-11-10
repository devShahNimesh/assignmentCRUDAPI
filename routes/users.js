var express = require('express');
var router = express.Router();

const user = require('../controllers/user.controller');



/**
 * Create USer
 * METHOD :-  POST
 * INPUT :-  userName, firstName, lastName, isActive
 *
 */
router.post('/create_user', user.createUser);

/**
 * Update User
 * METHOD :- PUT
 * INPUT :- id,firstName, lastName, isActive 
 *
 */
router.put('/update_user',user.updateUser);


/**
 *
 * Delete User
 * METHOD :- DELETE
 * INPUT : id
 */
router.delete('/delete_user/:id',user.deleteUser);


/**
 * Get User Detail
 * METHOD :- GET
 * INPUT : id
 */
router.get('/get_user/:id',user.userDetails);

/**
 * Get User List
 * METHOD :- GET
 */
router.get('/get_users',user.userDetailsList);


module.exports = router;
