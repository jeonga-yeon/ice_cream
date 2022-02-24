import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
});

const isHeroku = process.env.NODE_ENV === "production";

const s3AvatarUploader = multerS3({
    s3: s3,
    bucket: "myicecream/avatars",
    acl: "public-read"
});

const s3PostUploader = multerS3({
    s3: s3,
    bucket: "myicecream/contents",
    acl: "public-read"
});

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const onlyPublicMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};

export const avatarUpload = multer({ 
    dest: "uploads/avatars", 
    limits: {
        fileSize: 3000000,
    }, 
    storage: isHeroku ? s3AvatarUploader : undefined
});

export const postUploadMiddleware = multer({ 
    dest: "uploads/contents", 
    limits: {
    fileSize: 10000000,
    }, 
    storage: isHeroku ? s3PostUploader : undefined
});