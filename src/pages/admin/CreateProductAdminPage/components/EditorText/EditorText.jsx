import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '~/redux/slices/ProductSlice';

function EditorText() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [rawHTML, setRawHTML] = useState('');
    const [typingTimeout, setTypingTimeout] = useState(null);

    const dispatch = useDispatch();

    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        setRawHTML(draftToHtml(convertToRaw(editorState.getCurrentContent()))); // Cập nhật rawHTML từ editor
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(
            setTimeout(() => {
                dispatch(createProduct({ description: rawHTML }));
            }, 500)
        );
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    return (
        <div className="mt-10">
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
    );
}

export default EditorText;
