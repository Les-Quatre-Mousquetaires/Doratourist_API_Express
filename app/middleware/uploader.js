const fs = require('fs');
const multer = require('multer');
const path = require('path');
const filetype = require('../commons/filetype');

const { regexString, staticPath, uploadConfig } = require('../../config/index');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.user.role !== 'guest') {
            let pathResource = "";

            if (regexString.audiosType.test(file.originalname))
                pathResource = pathResource.concat(staticPath.audios);
            else if (regexString.imageType.test(file.originalname))
                pathResource += staticPath.images;

            desPath = path.join(global.appRoot, pathResource);
            if (!fs.existsSync(desPath)) fs.mkdirSync(desPath, { recursive: true });
            cb(null, desPath);
        }
        else cb(new Error('You need to log in to upload'), null);
    },
    filename: (req, file, cb) => {
        let { reqFile } = filetype(file);
        let filesBefore = req.reqFile || [];
        filesBefore.push(reqFile);
        req.reqFile = filesBefore;

        cb(null, reqFile.storagedName);
    }
});

const filter = (req, file, cb) => {
    if (regexString.imageType.test(file.originalname) || regexString.audiosType.test(file.originalname))
        cb(null, true);
    else cb(new Error('File format not accepted'), false);
}
const uploader = multer({
    storage: storage,
    limits: {
        fileSize: uploadConfig.uploadFileSize
    },
    fileFilter: filter
});

module.exports = uploader;