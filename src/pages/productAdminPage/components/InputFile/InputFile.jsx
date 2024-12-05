import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '~/context';

function InputFile({ setFiles, children, isMultiple }) {
    const inputFiles = useRef(null);

    const { addToast } = useToast();

    const handleFileChange = (e) => {
        if (e.target.files.length > 6) {
            addToast('Chỉ được thêm tối đa 6 ảnh');
            setFiles([]);
        } else {
            setFiles(e.target.files);
        }
    };

    const handleOpenFile = () => {
        inputFiles.current.click();
    };
    return (
        <div
            className="w-20 h-20 p-1 border-dashed border-1 border-red-500 rounded-md text-red-500 text-center hover:bg-red-100 cursor-pointer"
            onClick={handleOpenFile}
        >
            <input
                type="file"
                accept="image/jpeg, image/png"
                multiple={{ isMultiple }}
                onChange={handleFileChange}
                hidden
                ref={inputFiles}
            />
            {children}
        </div>
    );
}

InputFile.propTypes = {
    setFiles: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isMultiple: PropTypes.bool,
};

export default InputFile;
