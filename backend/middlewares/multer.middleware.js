import multer from "multer";

//Image Storage Engine

const storage = multer.diskStorage({
    // destination: "uploads",
    destination: (req, file, cb) => {
        // console.log(file);
        // console.log(req);
        cb(null, "./public/temp")  //upload files to public/temp folder
    },
    filename: (req, file, cb) => {

        // console.log(file);
        // console.log(req);
        // file is {
        //     fieldname: 'image',
        //     originalname: 'idli.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg'
        // }
        return cb(null, `${Date.now()}${file.originalname}`); //Date.now for unique filename
    }
})
//File is stored in public/temp folder and once it is uploaded to cludinary we are removing it

export const upload = multer({storage})