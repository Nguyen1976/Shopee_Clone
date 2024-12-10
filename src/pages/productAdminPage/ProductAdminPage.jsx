import React, { useState } from 'react';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';

import InputFile from './components/InputFile/InputFile';
import * as ProductService from '~/services/ProductService';

function ProductAdminPage() {
    const [files, setFiles] = useState([]);
    const [fileCoverImg, setFileCoverImg] = useState([]);
    const [nameProduct, setNameProduct] = useState('');

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [rawHTML, setRawHTML] = useState('');

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        setRawHTML(draftToHtml(convertToRaw(editorState.getCurrentContent()))); // Cập nhật rawHTML từ editor
    };

    const handleCreateProduct = () => {
        try {
            const res = ProductService.createProduct({});
            console.log(res);
        } catch (error) {
            console.error('Error Create Product', error);
        }
    };

    return (
        <div className="bg-white py-6 px-16 rounded-md">
            <h1 className="font-medium text-xl">Thông tin cơ bản</h1>
            <div className="mt-5 gap-5 grid grid-cols-8">
                <p className="text-sm col-span-1 text-end">Hình ảnh sản phẩm</p>
                <div className="col-span-7">
                    <InputFile setFiles={setFiles} isMultiple={true}>
                        <FontAwesomeIcon icon={faImages} />
                        <div className="text-sm">
                            Thêm hình ảnh ({files.length}/6)
                        </div>
                    </InputFile>
                </div>
            </div>
            <div className="mt-5 gap-5 grid grid-cols-8">
                <p className="text-sm col-span-1 text-end">Ảnh bìa</p>
                <div className="col-span-7 flex gap-8">
                    <InputFile setFiles={setFileCoverImg} isMultiple={true}>
                        <FontAwesomeIcon icon={faImages} />
                        <div className="text-sm">{fileCoverImg.length}/1</div>
                    </InputFile>
                    <ul className="text-sm list-disc text-zinc-400">
                        <li>Tải lên hình ảnh 1:1</li>
                        <li>
                            Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm
                            kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ
                            thu hút thêm lượt truy cập vào sản phẩm của bạn
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-5 gap-5 grid grid-cols-8 items-center">
                <p className="text-sm col-span-1 text-end">Tên sản phẩm</p>
                <div className="col-span-7 text-zinc-400 flex border-1 p-2 hover:border-zinc-400 transition-all rounded-md">
                    <input
                        className="w-full outline-none pr-3"
                        type="text"
                        placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kĩ thuật"
                        onChange={(e) => setNameProduct(e.target.value)}
                    />
                    <span className="border-l-zinc-400 border-l-[1px] pl-3">
                        {nameProduct.length}/120
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-sm">Thông tin sản phẩm</p>
                <div className="grid grid-cols-2 gap-5 mt-5">
                    <div className="col-span-1 min-h-16 mt-2">
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleEditorChange}
                            placeholder="Write something"
                            wrapperClassName="border p-2"
                            editorClassName="p-2"
                        />
                    </div>
                    <div className="col-span-1">
                        <div
                            className="mt-2 h-full w-full overflow-x-scroll scrollbar scrollbar-x border p-2"
                            dangerouslySetInnerHTML={{ __html: rawHTML }}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5 text-end">
                <button
                    className="p-2 bg-primary text-white"
                    onClick={handleCreateProduct}
                >
                    Thêm sản phẩm
                </button>
            </div>
        </div>
    );
}

export default React.memo(ProductAdminPage);
