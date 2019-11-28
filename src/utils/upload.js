import { 
    default as multer
} from "multer";

/**
 * storage for photo upload
 */
let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
});

export const uploadPhoto = multer({storage});

/**
 * storage for music upload
 */
let storageMusic = multer.diskStorage({
    destination: ( req, res, cb ) => {
        cb(null, 'public/music/uploads');
    },
    filename: ( req, file, cb ) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
})
export const uploadMusic = multer({storageMusic});