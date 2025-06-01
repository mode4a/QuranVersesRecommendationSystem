import { VerseParameters, VerseData } from "../types/types";

// Configuration
const API_BASE_URL = "http://localhost:5000"; // Change this to your Flask server URL
const QURAN_API_BASE = "https://api.alquran.cloud/v1";

// Helper function to generate audio URL
const generateAudioUrl = (surahNumber: number, verseNumber: number): string => {
  // Using Al-Afasy recitation from EveryAyah.com
  // Format: surah number (3 digits) + verse number (3 digits)
  const formattedSurah = surahNumber.toString().padStart(3, "0");
  const formattedVerse = verseNumber.toString().padStart(3, "0");
  return `https://everyayah.com/data/Alafasy_128kbps/${formattedSurah}${formattedVerse}.mp3`;
};

// Helper function to get Surah name from number
const getSurahName = (surahNumber: number): string => {
  const surahNames: { [key: number]: string } = {
    1: "Al-Fatiha",
    2: "Al-Baqarah",
    3: "Aal-E-Imran",
    4: "An-Nisa",
    5: "Al-Maidah",
    6: "Al-An'am",
    7: "Al-A'raf",
    8: "Al-Anfal",
    9: "At-Tawbah",
    10: "Yunus",
    11: "Hud",
    12: "Yusuf",
    13: "Ar-Ra'd",
    14: "Ibrahim",
    15: "Al-Hijr",
    16: "An-Nahl",
    17: "Al-Isra",
    18: "Al-Kahf",
    19: "Maryam",
    20: "Ta-Ha",
    21: "Al-Anbiya",
    22: "Al-Hajj",
    23: "Al-Mu'minun",
    24: "An-Nur",
    25: "Al-Furqan",
    26: "Ash-Shu'ara",
    27: "An-Naml",
    28: "Al-Qasas",
    29: "Al-Ankabut",
    30: "Ar-Rum",
    31: "Luqman",
    32: "As-Sajdah",
    33: "Al-Ahzab",
    34: "Saba",
    35: "Fatir",
    36: "Ya-Sin",
    37: "As-Saffat",
    38: "Sad",
    39: "Az-Zumar",
    40: "Ghafir",
    41: "Fussilat",
    42: "Ash-Shura",
    43: "Az-Zukhruf",
    44: "Ad-Dukhan",
    45: "Al-Jathiya",
    46: "Al-Ahqaf",
    47: "Muhammad",
    48: "Al-Fath",
    49: "Al-Hujurat",
    50: "Qaf",
    51: "Adh-Dhariyat",
    52: "At-Tur",
    53: "An-Najm",
    54: "Al-Qamar",
    55: "Ar-Rahman",
    56: "Al-Waqi'ah",
    57: "Al-Hadid",
    58: "Al-Mujadila",
    59: "Al-Hashr",
    60: "Al-Mumtahanah",
    61: "As-Saff",
    62: "Al-Jumu'ah",
    63: "Al-Munafiqun",
    64: "At-Taghabun",
    65: "At-Talaq",
    66: "At-Tahrim",
    67: "Al-Mulk",
    68: "Al-Qalam",
    69: "Al-Haqqah",
    70: "Al-Ma'arij",
    71: "Nuh",
    72: "Al-Jinn",
    73: "Al-Muzzammil",
    74: "Al-Muddaththir",
    75: "Al-Qiyamah",
    76: "Al-Insan",
    77: "Al-Mursalat",
    78: "An-Naba",
    79: "An-Nazi'at",
    80: "Abasa",
    81: "At-Takwir",
    82: "Al-Infitar",
    83: "Al-Mutaffifin",
    84: "Al-Inshiqaq",
    85: "Al-Buruj",
    86: "At-Tariq",
    87: "Al-A'la",
    88: "Al-Ghashiyah",
    89: "Al-Fajr",
    90: "Al-Balad",
    91: "Ash-Shams",
    92: "Al-Layl",
    93: "Ad-Duha",
    94: "Ash-Sharh",
    95: "At-Tin",
    96: "Al-Alaq",
    97: "Al-Qadr",
    98: "Al-Bayyinah",
    99: "Az-Zalzalah",
    100: "Al-Adiyat",
    101: "Al-Qari'ah",
    102: "At-Takathur",
    103: "Al-Asr",
    104: "Al-Humazah",
    105: "Al-Fil",
    106: "Quraysh",
    107: "Al-Ma'un",
    108: "Al-Kawthar",
    109: "Al-Kafirun",
    110: "An-Nasr",
    111: "Al-Masad",
    112: "Al-Ikhlas",
    113: "Al-Falaq",
    114: "An-Nas",
  };
  return surahNames[surahNumber] || `Unknown Surah ${surahNumber}`;
};

// Fetch verse text from Al-Quran Cloud API
export const fetchVerseText = async (
  surahNumber: number,
  verseNumber: number
): Promise<{ text: string; translation: string }> => {
  try {
    console.log(`Fetching verse text for ${surahNumber}:${verseNumber}`);

    // Fetch Arabic text and English translation in parallel
    const [arabicResponse, translationResponse] = await Promise.all([
      fetch(`${QURAN_API_BASE}/ayah/${surahNumber}:${verseNumber}/ar.alafasy`),
      fetch(`${QURAN_API_BASE}/ayah/${surahNumber}:${verseNumber}/en.sahih`),
    ]);

    const arabicData = await arabicResponse.json();
    const translationData = await translationResponse.json();

    if (!arabicResponse.ok || arabicData.code !== 200) {
      throw new Error(
        `Failed to fetch Arabic text: ${arabicData.data || "Unknown error"}`
      );
    }

    if (!translationResponse.ok || translationData.code !== 200) {
      throw new Error(
        `Failed to fetch translation: ${
          translationData.data || "Unknown error"
        }`
      );
    }

    return {
      text: arabicData.data?.text || "",
      translation: translationData.data?.text || "",
    };
  } catch (error) {
    console.error("Error fetching verse text:", error);
    throw new Error(
      `Failed to fetch verse text: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const getRandomVerse = async (
  parameters: VerseParameters
): Promise<VerseData> => {
  try {
    console.log("Sending request to API with parameters:", parameters);

    // Check if Flask server is reachable
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          "API endpoint not found. Please check if the Flask server is running on the correct port."
        );
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    if (!result.success) {
      throw new Error(result.error || "API returned unsuccessful response");
    }

    if (!result.data || result.data.length === 0) {
      throw new Error(
        "No verses found matching your criteria. Try different parameters or skip some selections."
      );
    }

    // Get a random verse from the results
    const randomIndex = Math.floor(Math.random() * result.data.length);
    const selectedPair = result.data[randomIndex];

    console.log("Selected pair:", selectedPair);

    // Extract surah and verse numbers from the pair format
    let surahNumber: number;
    let verseNumber: number;

    if (Array.isArray(selectedPair) && selectedPair.length >= 2) {
      surahNumber = selectedPair[0];
      verseNumber = selectedPair[1];
    } else {
      throw new Error("Invalid verse pair format received from API");
    }

    // Validate the verse numbers
    if (surahNumber < 1 || surahNumber > 114) {
      throw new Error(`Invalid surah number: ${surahNumber}`);
    }
    if (verseNumber < 1) {
      throw new Error(`Invalid verse number: ${verseNumber}`);
    }

    // Fetch the actual verse text
    let verseText = "";
    let translation = "";

    try {
      const textData = await fetchVerseText(surahNumber, verseNumber);
      verseText = textData.text;
      translation = textData.translation;
    } catch (textError) {
      console.warn("Failed to fetch verse text, using placeholder:", textError);
      verseText = `Verse ${verseNumber} from Surah ${getSurahName(
        surahNumber
      )}`;
      translation = "Translation not available";
    }

    // Create the verse data object
    const verseData: VerseData = {
      surah_number: surahNumber,
      verse_number: verseNumber,
      surah_name: getSurahName(surahNumber),
      text: verseText,
      translation: translation,
      audio: generateAudioUrl(surahNumber, verseNumber),
      themes: parameters.theme ? [parameters.theme] : [],
      audience: parameters.audience ? [parameters.audience] : [],
      length: parameters.length || "",
      tone: parameters.tone || "",
      location: parameters.location || "",
    };

    console.log("Final verse data:", verseData);
    return verseData;
  } catch (error) {
    console.error("Error fetching verse from API:", error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out. Please check your connection and try again."
        );
      } else if (error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to the server. Please ensure the Flask API is running on http://localhost:5000"
        );
      }
      throw error;
    }

    throw new Error("An unexpected error occurred while fetching the verse.");
  }
};
