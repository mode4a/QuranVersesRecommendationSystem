import { VerseData } from '../types/types';

// This is a small sample dataset for demonstration purposes
// In a production environment, this would be replaced with a proper database
export const getVerseMapping = (): VerseData[] => [
  {
    surah_number: 2,
    verse_number: 255,
    surah_name: "Al-Baqarah",
    text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3",
    themes: ['knowledge'],
    audience: ['believers', 'humanity'],
    length: 'long',
    tone: 'encouragement',
    location: 'madinah'
  },
  {
    surah_number: 96,
    verse_number: 1,
    surah_name: "Al-Alaq",
    text: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
    translation: "Read in the name of your Lord who created.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5744.mp3",
    themes: ['knowledge'],
    audience: ['prophet', 'believers'],
    length: 'short',
    tone: 'command',
    location: 'makkah'
  },
  {
    surah_number: 4,
    verse_number: 135,
    surah_name: "An-Nisa",
    text: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنْفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ ۚ إِنْ يَكُنْ غَنِيًّا أَوْ فَقِيرًا فَاللَّهُ أَوْلَىٰ بِهِمَا ۖ فَلَا تَتَّبِعُوا الْهَوَىٰ أَنْ تَعْدِلُوا ۚ وَإِنْ تَلْوُوا أَوْ تُعْرِضُوا فَإِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا",
    translation: "O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives. Whether one is rich or poor, Allah is more worthy of both. So follow not [personal] inclination, lest you not be just. And if you distort [your testimony] or refuse [to give it], then indeed Allah is ever, with what you do, Acquainted.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/649.mp3",
    themes: ['justice', 'rule'],
    audience: ['believers'],
    length: 'medium',
    tone: 'command',
    location: 'madinah'
  },
  {
    surah_number: 12,
    verse_number: 3,
    surah_name: "Yusuf",
    text: "نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ وَإِنْ كُنْتَ مِنْ قَبْلِهِ لَمِنَ الْغَافِلِينَ",
    translation: "We relate to you, [O Muhammad], the best of stories in what We have revealed to you of this Qur'an although you were, before it, among the unaware.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1640.mp3",
    themes: ['story'],
    audience: ['prophet', 'believers'],
    length: 'medium',
    tone: 'encouragement',
    location: 'makkah'
  },
  {
    surah_number: 2,
    verse_number: 153,
    surah_name: "Al-Baqarah",
    text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/160.mp3",
    themes: ['patience'],
    audience: ['believers'],
    length: 'short',
    tone: 'encouragement',
    location: 'madinah'
  },
  {
    surah_number: 2,
    verse_number: 261,
    surah_name: "Al-Baqarah",
    text: "مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَنْ يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
    translation: "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills. And Allah is all-Encompassing and Knowing.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/268.mp3",
    themes: ['charity'],
    audience: ['believers'],
    length: 'medium',
    tone: 'encouragement',
    location: 'madinah'
  },
  {
    surah_number: 16,
    verse_number: 125,
    surah_name: "An-Nahl",
    text: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُمْ بِالَّتِي هِيَ أَحْسَنُ ۚ إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِمَنْ ضَلَّ عَنْ سَبِيلِهِ ۖ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ",
    translation: "Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best. Indeed, your Lord is most knowing of who has strayed from His way, and He is most knowing of who is [rightly] guided.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2138.mp3",
    themes: ['knowledge', 'rule'],
    audience: ['prophet', 'believers'],
    length: 'medium',
    tone: 'command',
    location: 'makkah'
  },
  {
    surah_number: 103,
    verse_number: 1,
    surah_name: "Al-Asr",
    text: "وَالْعَصْرِ",
    translation: "By time,",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6157.mp3",
    themes: ['knowledge'],
    audience: ['humanity'],
    length: 'short',
    tone: 'warning',
    location: 'makkah'
  },
  {
    surah_number: 25,
    verse_number: 63,
    surah_name: "Al-Furqan",
    text: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا",
    translation: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace,",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3170.mp3",
    themes: ['knowledge', 'patience'],
    audience: ['believers'],
    length: 'medium',
    tone: 'encouragement',
    location: 'makkah'
  },
  {
    surah_number: 17,
    verse_number: 9,
    surah_name: "Al-Isra",
    text: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ وَيُبَشِّرُ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا كَبِيرًا",
    translation: "Indeed, this Qur'an guides to that which is most suitable and gives good tidings to the believers who do righteous deeds that they will have a great reward.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2143.mp3",
    themes: ['knowledge'],
    audience: ['believers', 'humanity'],
    length: 'medium',
    tone: 'glad_tidings',
    location: 'makkah'
  }
];