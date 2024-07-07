import AltiumDAO from "../dao/altiumDAO.js";

export default class AltiumController{
    static async postUser(req,res,next){
        try {
            console.log('Posting user....');
            const uid = AltiumController.uuidv4();
            const user = {
                user_id : uid,
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
          res.status(200).json({ status: "success" });
          console.log(user);
        } catch (e) {
            console.log(e);
          res.status(500).json({ error: e.message })
        }
    }

    static async updateUser(req,res,next)
    {
        try {
            console.log('updating user....');
            const user = {
                user_id : req.params.id,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                f_name : req.body.fname,
                l_name : req.body.lname, 
                bio : req.body.bio,
                profile_picture : req.body.ppic,
                followers : parseInt(req.body.followers),
            };
            const userResponse = await AltiumDAO.updateUser(user);

          res.status(200).json({ status: "success" });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
    }

    static async getUser(req,res,next)
    {
        try {
            console.log(`getting user.... ${req.params.id}`);

            const id = req.params.id;
            const userResponse = await AltiumDAO.getUser(id);

          res.status(200).json(userResponse);
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
    }

    static async getUsers(req,res,next){
        try {
            console.log(`getting users....`);
            const userResponse = await AltiumDAO.getUsers();

            res.status(200).json(userResponse);
        } catch (e) {
        res.status(500).json({ error: e.message });
        }
    }

    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, 
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static async postFollower(req,res,next)
    {
        try {
            console.log(`${req.body.follower_id} Following user ${req.body.following_id}`);
            const followers = {
                follower_id : req.body.follower_id, 
                following_id : req.body.following_id,
            };
            let userResponse;
            const followResponse = await AltiumDAO.addFollowers(followers).then(
                userResponse = await AltiumDAO.getUser(followers.follower_id),
                userResponse.followers++,
                AltiumDAO.updateUser(userResponse),
            );
          res.status(200).json({ status: "success" });
          console.log(userResponse);
        } catch (e) {
            console.log(e);
          res.status(500).json({ error: e.message })
        }
    }
    static async getFollowers(req,res,next)
    {
        try {
            console.log(`getting user.... ${req.params.id}`);

            const id = req.params.id;
            const userResponse = await AltiumDAO.getFollowers(id);

          res.status(200).json(userResponse);
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
    }
    static async deleteFollowers(req,res,next)
    {
        try {
            console.log(`${req.body.follower_id} Following user ${req.body.following_id}`);
            const followers = {
                follower_id : req.body.follower_id, 
                following_id : req.body.following_id,
            };
            let userResponse;
            const followResponse = await AltiumDAO.deleteFollowers(followers).then(
                userResponse = await AltiumDAO.getUser(followers.follower_id),
                userResponse.followers--,
                AltiumDAO.updateUser(userResponse),
            );
          res.status(200).json({ status: "success" });
          console.log(userResponse);
        } catch (e) {
            console.log(e);
          res.status(500).json({ error: e.message })
        }
    }
}