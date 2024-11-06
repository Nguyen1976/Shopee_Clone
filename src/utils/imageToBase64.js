export const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

        if (!file) {
            reject(new Error('No file provided'));
            return;
        }

        const validFileTypes = ['image/jpeg', 'image/png'];
        if (!validFileTypes.includes(file.type)) {
            reject(new Error('Chỉ chấp nhận các định dạng .JPEG, .PNG'));
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            reject(new Error('Dung lượng file tối đa là 1 MB'));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(new Error('Error reading file: ' + error));
        };
        reader.readAsDataURL(file);
    });
};
