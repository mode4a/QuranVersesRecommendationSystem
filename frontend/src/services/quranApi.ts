import axios from 'axios';
import { VerseData, VerseParameters } from '../types/types';
import { getVerseMapping } from '../data/verseMapping';

// Mock verse database for development until we have a proper backend
const mockVerses = getVerseMapping();

// This function would be replaced with actual API calls in production
export const getRandomVerse = async (parameters: VerseParameters): Promise<VerseData> => {
  // For demo purposes, we're using a mock implementation
  // In production, this would call a real backend API
  
  try {
    // Filter verses based on provided parameters
    let filteredVerses = [...mockVerses];
    
    if (parameters.theme) {
      filteredVerses = filteredVerses.filter(verse => verse.themes.includes(parameters.theme));
    }
    
    if (parameters.audience) {
      filteredVerses = filteredVerses.filter(verse => verse.audience.includes(parameters.audience));
    }
    
    if (parameters.length) {
      filteredVerses = filteredVerses.filter(verse => verse.length === parameters.length);
    }
    
    if (parameters.tone) {
      filteredVerses = filteredVerses.filter(verse => verse.tone === parameters.tone);
    }
    
    if (parameters.location) {
      filteredVerses = filteredVerses.filter(verse => verse.location === parameters.location);
    }
    
    // If no verses match the criteria, return a random verse from the full collection
    if (filteredVerses.length === 0) {
      const randomIndex = Math.floor(Math.random() * mockVerses.length);
      return mockVerses[randomIndex];
    }
    
    // Return a random verse from the filtered collection
    const randomIndex = Math.floor(Math.random() * filteredVerses.length);
    return filteredVerses[randomIndex];
  } catch (error) {
    console.error('Error fetching verse:', error);
    throw new Error('Failed to fetch a verse recommendation');
  }
};

// This function demonstrates how to call the actual Quran API
// It's not used in the current implementation but shows how it would be done
export const getVerseFromAPI = async (surahNumber: number, verseNumber: number): Promise<VerseData> => {
  try {
    const baseUrl = "http://api.alquran.cloud/v1/ayah";
    const edition = "ar.alafasy";
    const url = `${baseUrl}/${surahNumber}:${verseNumber}/${edition}`;
    
    const response = await axios.get(url);
    const data = response.data;
    
    if (data.code === 200 && data.data) {
      const verseData = data.data;
      
      // Also fetch English translation
      const translationResponse = await axios.get(`${baseUrl}/${surahNumber}:${verseNumber}/en.sahih`);
      const translationData = translationResponse.data;
      
      return {
        text: verseData.text,
        audio: verseData.audio,
        surah_name: verseData.surah.englishName,
        surah_number: surahNumber,
        verse_number: verseData.numberInSurah,
        translation: translationData.data?.text || '',
        themes: [],
        audience: [],
        length: 'medium', // Default
        tone: 'neutral', // Default
        location: verseData.surah.revelationType.toLowerCase()
      };
    } else {
      throw new Error(`API returned error: ${data}`);
    }
  } catch (error) {
    console.error('Error fetching from Quran API:', error);
    throw new Error('Failed to fetch verse from Quran API');
  }
};