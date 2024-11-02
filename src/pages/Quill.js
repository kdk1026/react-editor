import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Quill() {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];

    const imageHandler = () => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.accept = "image/*";

        fileInput.click();

        fileInput.addEventListener('change', function () {
            if ( fileInput.value !== '' ) {
                const formData = new FormData();
                formData.append('image', fileInput.files[0]);

                fetch(`${process.env.REACT_APP_API_URL}/editor/image-upload`, {
                    method: 'post',
                    body: formData
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const editor = editorRef.current.getEditor();
                    const range = editor.getSelection();
                    editor.insertEmbed(range.index, 'image', data.fileUrl);
                });
            }
        });
    };

   const modules = useMemo(() => {
    return {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: imageHandler
            }
        }   
    }
   }, []);

    const editorRef = useRef();

    const [content, setContent] = useState('<h1>initialValue</h1>');

    const onConfirmConsole = () => {
        console.log(content);
    };

    const onSetContent = () => {
        setContent('<h1>테스트</h1><br/><p>테스트1234</p>');
    };

    return (
        <>
            <ReactQuill
                theme="snow"
                modules={modules}
                onChange={setContent}
                ref={editorRef}
                value={content}
            />
            <button onClick={onConfirmConsole}>콘솔 확인</button>
            <button onClick={onSetContent}>내용 넣기</button>
        </>
    )
}

export default Quill;