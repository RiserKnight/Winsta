const {User,UserAuth,Colleague}=require('./models')
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
     return users
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