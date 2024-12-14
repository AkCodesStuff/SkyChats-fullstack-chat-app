import {v2 as cloud} from 'cloudinary'
import {config} from 'dotenv'
config()
cloud.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

export default cloud