import axios from 'axios';

export const uploadImageCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'aisbzcxo');

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
