import axios from 'axios';
import React, { useState } from 'react';
import { Sidebar } from './index';

const SidebarContainer = ({
  lyrics,
  setActiveParole,
  clearSearchedLyrics,
  addSearchedLyrics,
  activeAddLyric,
  isExpanded
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchLyrics = async (searchTerm) => {
    try {
      const { data } = await axios.get(`/api/lyrics/${searchTerm}`);
      addSearchedLyrics(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (event) => {
    if (event.target.value === '') {
      // clear searched lyrics
      clearSearchedLyrics();
      setSearchTerm('');
      return;
    }
    if (searchTerm.includes(event.target.value)) {
      // if new value is included in search term, we don't need to make another API call, just need to set the search term value so the lyrics can be filtered in the rendering
      setSearchTerm(event.target.value);
      return;
    }
    await searchLyrics(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <Sidebar
      lyrics={lyrics}
      setActiveParole={setActiveParole}
      activeAddLyric={activeAddLyric}
      handleChange={handleChange}
      isExpanded={isExpanded}
    />
  );
};

export default SidebarContainer;
