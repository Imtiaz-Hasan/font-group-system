import React, { useState, useEffect } from 'react';
import { FontService } from '../services/FontService';

const FontList = ({ fonts, onFontDelete }) => {
  const [deletingFonts, setDeletingFonts] = useState(new Set());
  const [loadedFonts, setLoadedFonts] = useState(new Set());
  const fontService = new FontService();

  // Load fonts when component mounts or fonts change
  useEffect(() => {
    fonts.forEach(font => {
      if (!loadedFonts.has(font.id)) {
        const fontFamily = `font-${font.id}`;
        // The file_path is already relative to storage/app/public, so we just need /storage/
        const fontUrl = `/storage/${font.file_path}`;
        const fontFace = new FontFace(fontFamily, `url(${fontUrl})`);
        
        fontFace.load().then(() => {
          document.fonts.add(fontFace);
          setLoadedFonts(prev => new Set([...prev, font.id]));
        }).catch(err => {
          console.error('Error loading font:', err);
          console.error('Font URL:', fontUrl);
        });
      }
    });
  }, [fonts, loadedFonts]);

  const handleDeleteFont = async (fontId) => {
    if (window.confirm('Are you sure you want to delete this font?')) {
      setDeletingFonts(prev => new Set([...prev, fontId]));
      
      try {
        await fontService.deleteFont(fontId);
        onFontDelete(fontId);
      } catch (error) {
        console.error('Error deleting font:', error);
        alert('Error deleting font. Please try again.');
      } finally {
        setDeletingFonts(prev => {
          const newSet = new Set(prev);
          newSet.delete(fontId);
          return newSet;
        });
      }
    }
  };

  const renderFontPreview = (font) => {
    const fontFamily = `font-${font.id}`;
    
    const style = {
      fontFamily: `"${fontFamily}", sans-serif`,
      fontSize: '16px',
      fontWeight: 'normal'
    };

    return (
      <span style={style} className="text-gray-700">
        Example Style
      </span>
    );
  };

  if (fonts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No fonts uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              FONT NAME
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              PREVIEW
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fonts.map((font) => (
            <tr key={font.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {font.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {renderFontPreview(font)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDeleteFont(font.id)}
                  disabled={deletingFonts.has(font.id)}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingFonts.has(font.id) ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FontList; 