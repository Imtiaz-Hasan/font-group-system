import React, { useState, useEffect, useCallback, useMemo } from 'react';
import FontUpload from './components/FontUpload';
import FontList from './components/FontList';
import FontGroupCreator from './components/FontGroupCreator';
import FontGroupList from './components/FontGroupList';
import { FontService } from './services/FontService';
import { FontGroupService } from './services/FontGroupService';

function App() {
  const [fonts, setFonts] = useState([]);
  const [fontGroups, setFontGroups] = useState([]);

  const fontService = useMemo(() => new FontService(), []);
  const fontGroupService = useMemo(() => new FontGroupService(), []);

  const loadFonts = useCallback(async () => {
    try {
      const response = await fontService.getAllFonts();
      setFonts(response.data.fonts);
    } catch (error) {
      console.error('Error loading fonts:', error);
    }
  }, [fontService]);

  const loadFontGroups = useCallback(async () => {
    try {
      const response = await fontGroupService.getAllFontGroups();
      setFontGroups(response.data.fontGroups);
    } catch (error) {
      console.error('Error loading font groups:', error);
    }
  }, [fontGroupService]);

  useEffect(() => {
    loadFonts();
    loadFontGroups();
  }, [loadFonts, loadFontGroups]);

  const handleFontUpload = async (fontData) => {
    setFonts(prevFonts => [...prevFonts, fontData]);
  };

  const handleFontDelete = async (fontId) => {
    setFonts(prevFonts => prevFonts.filter(font => font.id !== fontId));
  };

  const handleFontGroupCreate = async (fontGroupData) => {
    setFontGroups(prevGroups => [...prevGroups, fontGroupData]);
  };

  const handleFontGroupUpdate = async (updatedGroup) => {
    setFontGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  const handleFontGroupDelete = async (groupId) => {
    setFontGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Font Group System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Font Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload Font</h2>
            <FontUpload onFontUpload={handleFontUpload} />
          </div>

          {/* Font List Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Fonts</h2>
            <p className="text-gray-600 mb-4">Browse a list of uploaded fonts to build your font group.</p>
            <FontList 
              fonts={fonts} 
              onFontDelete={handleFontDelete}
            />
          </div>
        </div>

        {/* Font Group Creator Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Font Group</h2>
          <p className="text-gray-600 mb-4">You have to select at least two fonts.</p>
          <FontGroupCreator 
            fonts={fonts}
            onFontGroupCreate={handleFontGroupCreate}
          />
        </div>

        {/* Font Group List Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Font Groups</h2>
          <p className="text-gray-600 mb-4">List of all available font groups.</p>
          <FontGroupList 
            fontGroups={fontGroups}
            fonts={fonts}
            onFontGroupUpdate={handleFontGroupUpdate}
            onFontGroupDelete={handleFontGroupDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 