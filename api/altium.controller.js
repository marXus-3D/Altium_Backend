import AltiumDAO from "../dao/altiumDAO.js";

export default class AltiumController{
    static async PostUser(req,res,next){
        try {
            console.log('Posting user....');
            const user = {
                user_id : req.body.userId,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                f_name : req.body.fname,
                l_name : req.body.lname, 
                bio : req.body.bio,
                profile_picture : req.body.ppic,
                followers : parseInt(req.body.followers),
            };
            const userResponse = await AltiumDAO.addUser(user);
          res.status(200).json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
    }
}