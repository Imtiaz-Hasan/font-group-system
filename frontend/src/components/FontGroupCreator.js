import React, { useState } from 'react';
import { FontGroupService } from '../services/FontGroupService';

const FontGroupCreator = ({ fonts, onFontGroupCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [fontRows, setFontRows] = useState([
    { id: 1, fontName: '', selectedFontId: '' }
  ]);
  const [creating, setCreating] = useState(false);
  const fontGroupService = new FontGroupService();

  const addRow = () => {
    const newId = Math.max(...fontRows.map(row => row.id)) + 1;
    setFontRows([...fontRows, { id: newId, fontName: '', selectedFontId: '' }]);
  };

  const removeRow = (id) => {
    if (fontRows.length > 1) {
      setFontRows(fontRows.filter(row => row.id !== id));
    }
  };

  const updateRow = (id, field, value) => {
    setFontRows(fontRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleFontSelect = (rowId, fontId) => {
    const numericFontId = parseInt(fontId, 10);
    const selectedFont = fonts.find(font => font.id === numericFontId);
    setFontRows(fontRows.map(row => {
      if (row.id === rowId) {
        // Only update fontName if it is empty or matches the previous font's name
        const shouldUpdateFontName = !row.fontName || fonts.some(f => f.id === row.selectedFontId && f.name === row.fontName);
        return {
          ...row,
          selectedFontId: numericFontId,
          fontName: shouldUpdateFontName && selectedFont ? selectedFont.name : row.fontName
        };
      }
      return row;
    }));
  };

  const validateForm = () => {
    if (!groupName.trim()) {
      alert('Please enter a group name.');
      return false;
    }

    const selectedFonts = fontRows.filter(row => row.selectedFontId);
    if (selectedFonts.length < 2) {
      alert('Please select at least two fonts.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setCreating(true);
    try {
      const selectedFonts = fontRows
        .filter(row => row.selectedFontId)
        .map(row => ({
          font_id: parseInt(row.selectedFontId),
          font_name: row.fontName
        }));

      const response = await fontGroupService.createFontGroup({
        name: groupName,
        fonts: selectedFonts
      });

      if (response.data.success) {
        onFontGroupCreate(response.data.fontGroup);
        setGroupName('');
        setFontRows([{ id: 1, fontName: '', selectedFontId: '' }]);
        alert('Font group created successfully!');
      }
    } catch (error) {
      console.error('Error creating font group:', error);
      alert('Error creating font group. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Group Title */}
      <div>
        <input
          type="text"
          placeholder="Group Title"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Font Rows */}
      <div className="space-y-4">
        {fontRows.map((row) => (
          <div key={row.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            {/* Reorder Icon */}
            <div className="text-gray-400 cursor-move">
              ⋮⋮
            </div>

            {/* Font Name Input */}
            <input
              type="text"
              placeholder="Font Name"
              value={row.fontName}
              onChange={(e) => updateRow(row.id, 'fontName', e.target.value)}
              disabled
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed"
            />

            {/* Font Selection Dropdown */}
            <select
              value={row.selectedFontId}
              onChange={(e) => handleFontSelect(row.id, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Font</option>
              {fonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>

            {/* Delete Button */}
            {fontRows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Row</span>
        </button>

        {/* Create Button */}
        <button
          type="submit"
          disabled={creating}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default FontGroupCreator; 