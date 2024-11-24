import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

function InputForm({
    isError,
    onChange,
    onBlur,
    message = '',
    placeholder,
    type = 'text',
    value,
}) {
    // Sử dụng state để điều khiển kiểu hiển thị của input
    const [inputType, setInputType] = useState(type);

    const handleShowPassword = () => {
        // Thay đổi giữa 'text' và 'password'
        setInputType((prevType) =>
            prevType === 'password' ? 'text' : 'password'
        );
    };
    return (
        <>
            <div className="flex relative">
                <input
                    onChange={onChange}
                    className={`w-full border-1 border-[#adadad] border-[2px] p-2 outline-custom ${
                        isError ? 'border-red-300' : ''
                    }`}
                    type={inputType}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    value={value}
                />
                {type === 'password' && (
                    <FontAwesomeIcon
                        onClick={handleShowPassword}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        icon={inputType === 'password' ? faEye : faEyeSlash}
                    />
                )}
            </div>
            <span className="text-xs text-[#f33a58] ml-2 select-none">
                {message}
            </span>
        </>
    );
}

export default React.memo(InputForm);

InputForm.propTypes = {
    isError: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
};
