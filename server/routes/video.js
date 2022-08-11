const express = require('express');
const router = express.Router();
//const { Video } = require("../models/User");
const multer = require("multer");

const { auth } = require("../middleware/auth");


//STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "uploads/");
    },
    filename:(req, file, cb)=>{
        cb(null, `${Data.now()}_${file.originalname}`);
    },
    fileFilter:(req, file, cb)=>{
        const ext = path.extname(file.originalname);
        if(ext !=='.txt'){
            return cb(res.status(400).end('only txt is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({storage:storage}).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res)=>{
    //비디오를 서버에 저장한다.
    upload(req, res, err=>{
        if(err){
            return res.json({success:false, err})
        }
        return res.json({success:true, url: res.req.file.path})
    })
})

module.exports = router;
