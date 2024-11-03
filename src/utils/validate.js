
// Kiểm tra email
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Kiểm tra số điện thoại (10-11 số, bắt đầu với 0)
export const isValidPhoneNumber = (phone) => {
    const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return regex.test(phone);
};

// Kiểm tra độ dài chuỗi (ví dụ: tối thiểu và tối đa)
export const isValidLength = (str, min = 0, max = 100) => {
    return str.length >= min && str.length <= max;
};

// Kiểm tra xem tên có chỉ gồm chữ cái và số không
export const isValidName = (name) => {
    const regex = /^[a-zA-Z0-9]+$/; // Chỉ cho phép chữ cái (a-z, A-Z) và số (0-9)
    return regex.test(name);
};

// Kiểm tra mật khẩu (ít nhất 8 ký tự, bao gồm chữ và số)
export const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
};

export const isPasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

// Kiểm tra xem chuỗi có trống không
export const isNotEmpty = (str) => {
    return str.trim().length > 0;
};

// Kiểm tra số (integer)
export const isValidInteger = (num) => {
    return Number.isInteger(num);
};
