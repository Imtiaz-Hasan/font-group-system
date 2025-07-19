import React, { useState } from 'react';
import { FontGroupService } from '../services/FontGroupService';

const FontGroupList = ({ fontGroups, fonts, onFontGroupUpdate, onFontGroupDelete }) => {
  const [editingGroup, setEditingGroup] = useState(null);
  const [deletingGroups, setDeletingGroups] = useState(new Set());
  const fontGroupService = new FontGroupService();

  const handleEdit = (group) => {
    setEditingGroup({
      ...group,
      fonts: group.fonts.split(', ').map(fontName => {
        const font = fonts.find(f => f.name === fontName);
        return {
          font_id: font ? font.id : null,
          font_name: fontName
        };
      })
    });
  };

  const handleDelete = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this font group?')) {
      setDeletingGroups(prev => new Set([...prev, groupId]));
      
      try {
        await fontGroupService.deleteFontGroup(groupId);
        onFontGroupDelete(groupId);
      } catch (error) {
        console.error('Error deleting font group:', error);
        alert('Error deleting font group. Please try again.');
      } finally {
        setDeletingGroups(prev => {
          const newSet = new Set(prev);
          newSet.delete(groupId);
          return newSet;
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!editingGroup.name.trim()) {
      alert('Please enter a group name.');
      return;
    }

    const selectedFonts = editingGroup.fonts.filter(font => font.font_id);
    if (selectedFonts.length < 2) {
      alert('Please select at least two fonts.');
      return;
    }

    try {
      const response = await fontGroupService.updateFontGroup(editingGroup.id, {
        name: editingGroup.name,
        fonts: selectedFonts
      });

      if (response.data.success) {
        onFontGroupUpdate(response.data.fontGroup);
        setEditingGroup(null);
        alert('Font group updated successfully!');
      }
    } catch (error) {
      console.error('Error updating font group:', error);
      alert('Error updating font group. Please try again.');
    }
  };

  const updateEditingGroup = (field, value) => {
    setEditingGroup(prev => ({ ...prev, [field]: value }));
  };

  const updateEditingGroupFont = (index, field, value) => {
    setEditingGroup(prev => ({
      ...prev,
      fonts: prev.fonts.map((font, i) => 
        i === index ? { ...font, [field]: value } : font
      )
    }));
  };

  const addFontToEditingGroup = () => {
    setEditingGroup(prev => ({
      ...prev,
      fonts: [...prev.fonts, { font_id: '', font_name: '' }]
    }));
  };

  const removeFontFromEditingGroup = (index) => {
    setEditingGroup(prev => ({
      ...prev,
      fonts: prev.fonts.filter((_, i) => i !== index)
    }));
  };

  if (fontGroups.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No font groups created yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NAME
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              FONTS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              COUNT
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fontGroups.map((group) => (
            <tr key={group.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {group.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {Array.isArray(group.fonts)
                  ? group.fonts.map(f => f.name || f.font_name).join(', ')
                  : group.fonts}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {group.count}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => handleEdit(group)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(group.id)}
                  disabled={deletingGroups.has(group.id)}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingGroups.has(group.id) ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Font Group</h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={editingGroup.name}
                  onChange={(e) => updateEditingGroup('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fonts
                </label>
                <div className="space-y-2">
                  {editingGroup.fonts.map((font, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <select
                        value={font.font_id || ''}
                        onChange={(e) => {
                          const selectedFont = fonts.find(f => f.id === e.target.value);
                          updateEditingGroupFont(index, 'font_id', e.target.value);
                          updateEditingGroupFont(index, 'font_name', selectedFont ? selectedFont.name : '');
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a Font</option>
                        {fonts.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeFontFromEditingGroup(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFontToEditingGroup}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Font
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingGroup(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontGroupList; 