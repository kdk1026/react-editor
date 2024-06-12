import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef } from "react";

function Tui() {
    const editorRef = useRef();

    const onConfirmConsole = () => {
        // initialEditType이 markdown이면 getMarkdown()
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };

    const onUploadImage = async (blob, callback) => {
        //console.log(blob);

        const formData = new FormData();
        formData.append('image', blob);

        await fetch(`${process.env.REACT_APP_API_URL}/editor/image-upload`, {
            method: 'post',
            body: formData
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            callback(data.fileUrl);
        })
    };

    const onSetContent = () => {
        const content = '<h1>테스트</h1><br/><p>테스트1234</p>';
        editorRef.current.getInstance().setHTML(content);
    };

    return (
        <>
        <Editor
            initialValue="initialValue"
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            language="ko-KR"
            ref={editorRef}
            hooks={
                {
                    addImageBlobHook: onUploadImage
                }
            }
        />
        <button onClick={onConfirmConsole}>콘솔 확인</button>
        <button onClick={onSetContent}>내용 넣기</button>
        </>
    )
}

export default Tui;