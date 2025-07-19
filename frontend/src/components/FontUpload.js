import React, { useState, useRef } from 'react';
import { FontService } from '../services/FontService';

const FontUpload = ({ onFontUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const fontService = new FontService();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const ttfFile = files.find(file => file.type === 'font/ttf' || file.name.toLowerCase().endsWith('.ttf'));
    
    if (ttfFile) {
      await uploadFont(ttfFile);
    } else {
      alert('Please upload only TTF files.');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'font/ttf' || file.name.toLowerCase().endsWith('.ttf')) {
        await uploadFont(file);
      } else {
        alert('Please select only TTF files.');
      }
    }
  };

  const uploadFont = async (file) => {
    setUploading(true);
    try {
      const response = await fontService.uploadFont(file);
      if (response.data.success) {
        onFontUpload(response.data.font);
        alert('Font uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading font. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-4">☁️</div>
          <p className="text-gray-700 font-medium mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-gray-500 text-sm">
            Only TTF File Allowed
          </p>
          {uploading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Uploading...</p>
            </div>
          )}
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".ttf"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default FontUpload; 