import React, { useState, useRef, PropsWithChildren } from 'react';



const ImageUploadPreview: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName('');
      setPreviewSrc('');
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the default behavior (opening the image in a new tab)
    const file = event.dataTransfer.files?.[0];

    if (file) {
      setFileName('');
      setPreviewSrc('');
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the default behavior to allow the drop event
  };

  return (
    <section className="container items-center py-2">
      <div className="max-w-[10rem] bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden items-center">
        <div className="px-4 py-4">
          <div
            id="image-preview"
            className={`p-3 mb-4 bg-gray-100 dark:bg-gray-800 border-dashed border-2 border-gray-400 rounded-full items-center text-center cursor-pointer ${
              previewSrc ? '' : 'border-gray-400'
            }`}
            onClick={handleImageClick}
            onDrop={handleDrop} // Handle drop
            onDragOver={handleDragOver} // Allow drag over
          >
            {previewSrc ? (
              <img
                src={previewSrc}
                className="rounded-full"
                alt="Image preview"
                draggable="false"
              />
            ) : null}
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {!previewSrc && (
              <label htmlFor="upload" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-700  dark:text-gray-200 mx-auto mb-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <h5 className="mb-2 text-[1rem] font-bold tracking-tight text-gray-700 dark:text-gray-200">
                  Upload picture
                </h5>
                <span id="filename" className="text-gray-500 bg-gray-200 z-50">
                  {fileName}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUploadPreview;
