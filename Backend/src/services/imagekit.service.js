const Imagekit = require('imagekit')

const imagekit = new Imagekit({
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY,
    urlEndpoint:process.env.URLENDPOINT
})

async function uploadfile(file , filename) {
    const result = await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"food-view"
    })

    return result
} 

module.exports = uploadfile