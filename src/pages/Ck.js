import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import { useState } from "react";
import UploadAdapter from "../assets/js/ckeditor/UploadAdapter";

function Ck() {
    const [content, setContent] = useState('<h1>initialValue</h1>');

    const onConfirmConsole = () => {
        console.log(content);
    };

    // 화살표 함수로 작성하면 오류남
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
        };
    };

    const onSetContent = () => {
        setContent('<h1>테스트</h1><br/><p>테스트1234</p>');
    };

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                config={
                    {
                        language: 'ko',
                        extraPlugins: [uploadPlugin]
                    }
                }
                onChange={(event, editor) => {
                    setContent(editor.getData());
                }}
                data={content}
            />
            <button onClick={onConfirmConsole}>콘솔 확인</button>
            <button onClick={onSetContent}>내용 넣기</button>
        </>
    )
}

export default Ck;