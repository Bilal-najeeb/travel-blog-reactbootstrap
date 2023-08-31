import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';




// @desc    Register a new user
// route    POST /api/users/
// @access  Public
const registerUser = asyncHandler( async (req, res) => {

    const {name, email, password, role} = req.body;

    const userExists = await User.findOne({email: email});

    if(userExists){
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    if (user) {
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    
}
)


// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler( async (req, res) => {

    const {email, password} = req.body;
    
    const user = await User.findOne({email: email});


    if(user && ( await user.matchPassword(password) ) ){

        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

    res.status(200).json({ message: 'Auth User'})
}
)


// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler( async (req, res) => {

    res.cookie('jwt', ' ', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'User Logged Out'})
}
)



// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler( async (req, res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
}
)

// ADMIN ROUTE
// @desc    Get all users profile
// route    GET /api/users/profileAll
// @access  Private
const getAllUsers = asyncHandler( async (req, res) => {

    const users = await User.find();

    res.status(200).json(users);
}
)

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updatetUserProfile = asyncHandler( async (req, res) => {

   

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }

    

    res.status(200).json(user._id);
}
)

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updatetUserProfileImage = asyncHandler( async (req, res) => {

     const user = await User.findById(req.user._id);

     if (user) {
        user.profile_image = req.file.filename || user.profile_image;
     } else {
        res.status(404);
        throw new Error ("user not found")
     }

     const updatedUser = await user.save();

     res.status(200).json({
        profile_image: updatedUser.profile_image,
     });

}
)





// ADMIN ROUTE
// @desc    Delete user profile
// route    DELETE /api/users/profile/delete
// @access  Private
const deleteAUser = asyncHandler( async (req, res) => {

    const {userId} = req.body;
    console.log(userId);
    const user = await User.findById(userId);

    if(!user){
        res.status(400);
        throw new Error('User not found');
       }

       await user.deleteOne();


       res.status(200).json(user._id);
}
)




// ADMIN ROUTE
// @desc    GET user profile
// route    GET /api/users/profile/single/:id
// @access  Private
const getUserFromAdmin = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if(!user){
        res.status(404);
        throw new Error ("User not found");
    }

    res.status(200).json({
        name: user.name,
        email: user.email,
    });
})




// ADMIN ROUTE
// @desc    UPDATE user profile
// route    UPDATE /api/users/profile/updatesingle
// @access  Private
const updateSingleAdmin = asyncHandler(async (req, res) => {



    const user = await User.findById(req.body._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }
})





export {
    registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updatetUserProfile,
    updatetUserProfileImage,
    
    getAllUsers,
    getUserFromAdmin,
    deleteAUser,
    updateSingleAdmin,
}