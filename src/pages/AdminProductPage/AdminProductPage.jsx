import { useState } from "react";

import { imageToBase64 } from '~/utils/imageToBase64';


function AdminProductPage() {
    const [base64Image, setBase64Image] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await imageToBase64(file).then(res => res)
        setBase64Image(base64)
    };
    return (  
        <div>

        </div>
    );
}

export default AdminProductPage;