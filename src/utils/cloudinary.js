import axios from 'axios';

export const uploadImageCloudinary = async (image, folder) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'aisbzcxo');
    formData.append('folder', folder);

    try {
        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/dcnfkcsln/image/upload',
            formData
        );
        return res.data.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.response);
    }
};

export const deleteImageCloudinary = async (imageUrl, folder) => {
    try {
        const publicId = `${folder}/${imageUrl.split('/').splice(-1)[0].split('.')[0]}`;

        const timestamp = Math.floor(Date.now() / 1000);

        const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/generate-signature`,
            {
                publicId,
                timestamp,
            }
        );

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('signature', data.signature);
        formData.append(
            'api_key',
            `${process.env.REACT_APP_API_KEY_CLOUDINARY}`
        );
        formData.append('timestamp', timestamp);

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dcnfkcsln/image/destroy`,
            formData
        );
        console.log(res);

        return res.data.result === 'ok';
    } catch (e) {
        console.error('Error deleting image from Cloudinary:', e);
    }
};
