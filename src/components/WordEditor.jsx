import React, { useState } from 'react';
import Mammoth from 'mammoth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './WordEditor.css';

const WordEditor = () => {
  const [html, setHtml] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const { value } = await Mammoth.convertToHtml({ arrayBuffer });
        setHtml(value);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'] // removes formatting
    ]
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <div className='editor-container'>
        <h4 className='editor-title'>Word Document Editor</h4>
        <div className='editor-wrapper'>
            <ReactQuill value={html} onChange={setHtml} className="custom-quill" modules={modules} />
        </div>
      </div>
    </div>
  );
};

export default WordEditor;
