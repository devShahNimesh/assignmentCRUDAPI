
const User = require('../models/user');

exports.createUser = (req,res) => {
    const {userName, firstName, lastName} = req.body;

    // create a new user if does not exist
    const create = (user) => {

        if(user) {
            throw new Error('User Already Exist!!!')
        } else {
            return User.create(userName, firstName, lastName)
        }
    };

    // respond to the client
    const respond = () => {
       
        res.status(200).json({
            status: 0,
            message:'User created successfully.'
        });
    };

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            status:1,
            message: "User name already exist."
        })
    };

    // check username duplication
    User.findOneByUserName(userName)
        .then(create)
        .then(respond)
        .catch(onError)
};

exports.userDetails = (req,res) =>{

    let id = req.params.id;
    
    const checkUser = (user) => {

        if (!user)
            throw new Error();

        return user;
    }
    
    const respond = (user) =>{
        res.json({
            status : 0,
            message : 'User found',
            body: {userName:user.userName,
                firstName:user.firstName,
                lastName:user.lastName,
                updatedAt:user.updatedAt,
                createdAt:user.createdAt,
                isActive:user.isActive}
            });
    };

    const onError = (error) => {
        res.status(204).json({
            status:1,
            message: error.message
        })
    };

   
        User.findOneByID(id)
        .then(checkUser)
        .then(respond)
        .catch(onError)
}

exports.userDetailsList = (req,res) =>{

    const listRespond = (userList) => {
        res.status(200).json({
            status:0,
            message : 'User found',
            body: { users:userList}
        })
    }

    const onError = (error) => {
        res.status(204).json({
            message: error.message
        })
    };

    User.getLastTenUsers()
        .then(listRespond)
        .catch(onError)

}

exports.updateUser = (req,res) => {

    const {id,firstName,lastName,isActive} = req.body;
    const check = (user) =>{
                if(user){
                    return user;
                }else{

                    throw new Error('User does not found');
                }
    };

    const updateUser = (user) => {
        if(User.updateUser(id,firstName,lastName,isActive)){
            return (user)

        }else{
            throw new Error("Some error, please check and try again.");
        }
    };

    const respond = (user) =>{
        res.status(200).json({
            status : 0,
            message : 'User updated sucessfully',

        })
    };

    const onError = (error) => {
        res.status(204).json({
            message: error.message
        })
    };

    User.findOneByID(id)
        .then(check)
        .then(updateUser)
        .then(respond)
        .catch(onError)
};

exports.deleteUser = (req,res) => {

    const id = req.params.id;

    const check = (user) =>{
       
                if(user){
                    return user;
                }else{

                    throw new Error('User does not found');
                }

    };

    const deleteUser = (user) => {

        if(User.deleteUser(id)){
            return (user)

        }else{
            throw new Error("Some error, please check and try again.");
        }

    };

    const respond = (user) =>{
        res.status(200).json({
            status : 0,
            message : 'User deleted sucessfully',

        })
    };

    const onError = (error) => {
        res.status(204).json({
            status:1,
            message: error.message
        })
    };

    User.findOneByID(id)
        .then(check)
        .then(deleteUser)
        .then(respond)
        .catch(onError)
};
