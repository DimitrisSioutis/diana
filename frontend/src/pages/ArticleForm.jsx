import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RiCloseLine } from "react-icons/ri";

const ArticleForm = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [submittedArticle, setSubmittedArticle] = useState(null);
  const [image,setImage] = useState(null)
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState('')
  const imgInputRef = useRef(null);

  const modules = {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  function readImage(file){
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setThumbnail(file);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleInputImage = (e) => {
    const file = e.target.files[0];
    readImage(file)
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    imgInputRef.current.value = null;
    const file = e.dataTransfer.files[0];
    readImage(file)
  };

  const handleRemoveImage = () =>{
    setImage(null)
    setThumbnail(null)
    imgInputRef.current.value = null;
  }

  // Prevent default behavior for drag events
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const articleData = {
      title,
      description,
      content,
      thumbnail,
    };

    setSubmittedArticle(articleData);

    setTitle('');
    setDescription('');
    setContent('');
    setThumbnail(null);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 flex justify-center arial ">
      <form onSubmit={handleSubmit} className="grid grid-cols-[400px_60%] gap-4 mx-auto w-4/6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 bg-slate-50 border rounded-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 sm:text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-10 bg-slate-50 border rounded-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 sm:text-sm resize-none"
            required
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnailURL(e.target.value)}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 sm:text-sm"
          />
          <input
            type="file"
            ref={imgInputRef}
            onChange={handleInputImage}
            className="w-full text-sm text-gray-900 bg-gray-50 border border-slate-600 rounded-md cursor-pointer focus:outline-none"
            accept="image/*"
          />
          <div
            onDrop={handleDropImage}
            onDragOver={handleDragOver}
            className="w-full h-48 border border-slate-300 rounded-md flex items-center justify-center"
          >
            {image ? (
              <div onClick={handleRemoveImage} className="relative w-full h-full flex items-center justify-center cursor-pointer">
                <span className="absolute z-10 ">
                  <RiCloseLine size={100} />
                </span>
                <img src={image} alt="Dropped" className="w-full h-full object-cover" />
              </div>

            ) : (
              <p className="text-slate-600">Drag and drop an image here</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <div className="border h-[272px] w-full  border-slate-300 rounded-lg overflow-hidden ">
            <ReactQuill theme="snow" value={content} modules={modules} onChange={setContent} className='w-full h-full'/>
          </div>
        </div>

        <div className="col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
          >
            Submit Article
          </button>
        </div>
      </form>
      {submittedArticle && (
        <div className="mt-8 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-bold mb-4">Submitted Article</h2>
          <h3 className="text-lg font-semibold">{submittedArticle.title}</h3>
          <p className="text-sm text-gray-600">{submittedArticle.description}</p>

          <div dangerouslySetInnerHTML={{ __html: submittedArticle.content }} className="prose mt-4 markdown" />
          <img src={submittedArticle.thumbnail} alt={submittedArticle.title} />
        </div>
      )}
    </div>
  );
};

export default ArticleForm;

