const {User,UserAuth,Colleague,Post}=require('./models')
/**************************** Create Operations *****************************/

exports.storeUser=async(userID,name,email)=>{
   
    try {
        await User.create({userID,name,email})
    } catch (err) {
        console.log(err);
    }
    return "User Sucessfully stored";
}

exports.storeUserAuth=async(userID,pass)=>{
   
    try {
        await UserAuth.create({userID,pass})
    } catch (err) {
        console.log(err);
    }
    return "User Auth Sucessfully stored";
}
exports.storeColleague=async(userID,colleagueID,colleagueName)=>{
   
    try {
        await Colleague.create({userID,colleagueID,colleagueName})
    } catch (err) {
        console.log(err);
    }
    return "Colleague Sucessfully stored";
}
exports.storePost=async(userID,name,fileName,caption)=>{
   
    try {
        await Post.create({userID,name,fileName,caption})
    } catch (err) {
        console.log(err);
    }
    return "Post Sucessfully stored";
}
/**************************** Read Operations *****************************/

exports.getUserAuth=async(userID)=>{
    try{
        const user=await UserAuth.findOne({
            where:{userID:userID}
        });
        if(user)
        return user.dataValues.pass;
        else
        return 0;
        } 
          catch(err){
            console.log(err);
                }
    
}
exports.getUser=async(userID)=>{
    try{
        const user=await User.findOne({
            where:{userID:userID}
        });
        console.log(user.dataValues);
        if(user)
        return user.dataValues;
        else
        return 0;
        } 
          catch(err){
            console.log(err);
                }
}

exports.getAllColleagues=async(userID)=>{
    let users=[];
    try{
     const demo=await Colleague.findAll({
        where:{userID:userID}
    });
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users;
    }
    catch(err){
        console.log(err);
            }
}
exports.getAllFriends=async(userID)=>{
    let users=[];
    try{
     const demo=await Colleague.findAll({
        where:{colleagueID:userID}
    });
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users;
    }
    catch(err){
        console.log(err);
            }
}
exports.getUserPosts=async(userID)=>{
    let users=[];
    try{
     const demo=await Post.findAll({
        where:{userID:userID}
    });
     demo.forEach(user => {
         users.push(user.dataValues);
     });
     return users;
    }
    catch(err){
        console.log(err);
            }
}

exports.getUserFeed=async(userID)=>{
    let a,feeds=[];
    try{
     const friends = await module.exports.getAllFriends(userID);
     console.log("friends: ");
     console.log(friends);
     console.log("friends length: ");
     console.log(friends.length);

    for(a=0;a<friends.length;a++){
        console.log("friend id: ");
        console.log(friends[a].userID);
      const posts=await module.exports.getUserPosts(friends[a].userID);
        posts.forEach(post => {
          feeds.push(post);
        });
    }
     return feeds;
    }
    catch(err){
        console.log(err);
            }
}
/**************************** Update Operations *****************************/
exports.updateUserPost=async(userID,postN)=>{
    try{
        await User.update(
            {postN: postN},
            {where:{userID:userID}
        });
    }
    catch(err){
        console.log(err);
            }
}
exports.updateCaption=async(postID,caption)=>{
    try{
        await Post.update(
            {caption: caption},
            {where:{id:postID}
        });
    }
    catch(err){
        console.log(err);
            }
}
/**************************** Delete Operations *****************************/

exports.delColleague=async(userID,colleagueID)=>{
   
    try {
        await Colleague.destroy({where:{userID:userID,colleagueID:colleagueID}})
    } catch (err) {
        console.log(err);
    }
    return "Colleague Sucessfully Deleted";
}

exports.delPost=async(postID)=>{
   
    try {
        await Post.destroy({where:{id:postID}})
    } catch (err) {
        console.log(err);
    }
    return "Post Sucessfully Deleted";
}