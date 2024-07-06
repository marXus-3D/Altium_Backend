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
}