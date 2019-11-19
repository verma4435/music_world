import { 
    default as multer
} from "multer";

let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
});
const uploadPhoto = multer({storage});

export default uploadPhoto;