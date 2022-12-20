const { use } = require('passport');
const Review = require('../models/review');
const User = require('../models/user')


module.exports.destroySession = function(req,res){
    req.logOut(function(err){
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        return res.redirect('/users/SignIn')
    });
    
}

module.exports.editEmployee = async function(req,res){
    try {
        // fetching the selected user
        let user = await User.findById(req.params.id);
        // if the user was found, passing the same as emp to locals and redering employee edit view 
        if(user){
            return res.render('employee_details',{
                emp : user
            })
        }

    return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    
}

module.exports.createUser = async function(req,res){

    try {
        // checking if confirm password and password match
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        // checking if an user with the same email is already present
        let user = await User.findOne({email:req.body.email});

        if(!user){
            // creating an user if the above conditions are met
            await User.create(req.body);
            return res.redirect('/users/SignIn');
        }else{
            console.log('user could not be created');
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
   


}

module.exports.userSignIn = function(req,res){
    try {
        if(req.isAuthenticated()){
            return res.redirect('/home')
        }
    
        return res.render('signIn');

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

}

module.exports.userSignUp = function(req,res){
    
    try {
        if(req.isAuthenticated()){
            return res.redirect('/home');
        }
    
        return res.render('signUp'); 
    } catch (error) {
       console.log(error);
       return res.redirect('back'); 
    }
  
}

module.exports.createSession = async function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.redirect('users/signIn')
}

module.exports.updateUser = async function(req,res){

    try {
        // checking is the signed in user is an admin
        if(req.user.isAdmin){
            // finding the user who needs to be updated by id
            let user = await User.findById(req.params.id);
            // if the name was modified, updating it
            if(req.body.name){
                user.name = req.body.name;
            };
            // if the email was modified, updating it
            if(req.body.email){
                user.email = req.body.email;
            }
            // if the password was changed, updating it
            if(req.body.password){
                // checking if confirm password and password match
                if(req.body.password != req.body.confirm_password){
                    return res.redirect('back');
                }else{
                // updating the password if they match    
                    user.password = req.body.password;
                }
            }
            // saving the user document
            user.save();
        }

            return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back'); 
    }
    
}

module.exports.makeAdmin = async function(req,res){

    try {
        if(req.user.isAdmin){
        await User.findByIdAndUpdate(req.params.id,{isAdmin:true});
        }
        return res.redirect('/home');

    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.removeUser = async function(req,res){
    try {
        // confirming if the user sending the request is an admin
    if(req.user.isAdmin){
        // first deleting all the reviews associated with that user
        await Review.deleteMany({$or :[{reviewBy:req.params.id},{reviewOf:req.params.id}]});
        // the deleting the user itself
        await User.findByIdAndDelete(req.params.id);
        
    }
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    
}

module.exports.addNew = async function(req,res){
    try {
        // checking if the password and confirm password match
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // checking if an user is alreay present
    let user = await User.findOne({email:req.body.email});

    if(!user){
        // creating the user if he is unique
        await User.create(req.body);
        return res.redirect('/home');
    }else{
        // returning back if the user is a duplicate
        console.log('user could not be created');
        return res.redirect('back');
    }
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    

}

module.exports.createReview = async function(req,res){

    try {
       // cofirming if both the employee id's are different
    if(req.body.reviewOf != req.body.reviewBy){
        await Review.create(req.body);
    }

    return res.redirect('back'); 
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    

}
