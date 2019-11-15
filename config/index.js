module.exports = {
    api: {
        domain: process.env.API_DOMAIN
    },
    mongoDb: {
        hostname: process.env.MONGODB_HOSTNAME,
        databaseName: process.env.MONGODB_DATABASENAME,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    jwt: {
        key: process.env.JWT_KEY
    },
    ggAuth: {
        clientID: process.env.GG_CLIENT_ID,
        clientSecret: process.env.GG_CLIENT_SECRET
    },
    fbAuth: {
        appID: process.env.FB_APP_ID,
        appSecret: process.env.FB_APP_SECRET,
        displayName: process.env.FB_DISPLAY_NAME
    },
    email: {
        gmailUsername: process.env.GMAIL_USERNAME,
        gmailPassword: process.env.GMAIL_PASSWORD,
        imageCover: process.env.IMAGE_COVER
    },
    staticPath: {
        resources: process.env.RESOURCE_PATH,
        images: process.env.RESOURCE_PATH + process.env.IMAGES_PATH,
        audios: process.env.RESOURCE_PATH + process.env.AUDIOS_PATH
    },
    regexString: {
        imageType: /\.(jpg|jpeg|png|gif)$/i,
        audiosType: /\.(mp3|flac|aac|wav|ogg)$/i
    },
    uploadConfig: {
        uploadFileSize: Number(process.env.UPLOAD_FILE_SIZE) * 1048576
    }
};