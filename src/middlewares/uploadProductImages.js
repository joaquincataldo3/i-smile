const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype.startsWith('video/')){//Si es video
            cb(null,'./public/video/product');
            return 
        }
        cb(null, './public/img/product')
        return 
        
    },
    filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).substring(2, 2 + 10);
        cb(null, file.fieldname + '-' + randomString + path.extname(file.originalname))
    }
})

const uploadFile = multer( {storage} ); 

module.exports = uploadFile;