export interface VerseParameters {
  theme: string;
  audience: string;
  length: string;
  tone: string;
  location: string;
}

export interface VerseData {
  surah_number: number;
  verse_number: number;
  surah_name: string;
  text: string;
  translation?: string;
  audio: string;
  themes: string[];
  audience: string[];
  length: string;
  tone: string;
  location: string;
}