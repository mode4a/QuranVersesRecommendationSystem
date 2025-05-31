export interface Option {
  value: string;
  label: string;
  image: string;
  description: string;
}

export const themeOptions: Option[] = [
  {
    value: "knowledge",
    label: "Knowledge & Wisdom",
    image: "https://images.pexels.com/photos/3769697/pexels-photo-3769697.jpeg",
    description: "Verses about learning, understanding, and divine wisdom",
  },
  {
    value: "justice",
    label: "Justice & Equity",
    image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg",
    description: "Verses about fairness, balance, and moral righteousness",
  },
  {
    value: "rule",
    label: "Divine Commands",
    image: "https://images.pexels.com/photos/1164572/pexels-photo-1164572.jpeg",
    description: "Verses containing guidance and commandments from Allah",
  },
  {
    value: "story",
    label: "Quranic Stories",
    image: "https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg",
    description: "Narratives of prophets and historical events",
  },
  {
    value: "patience",
    label: "Patience & Perseverance",
    image: "https://images.pexels.com/photos/1428277/pexels-photo-1428277.jpeg",
    description: "Verses about endurance and steadfastness",
  },
  {
    value: "charity",
    label: "Charity & Giving",
    image:
      "https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg",
    description: "Verses about generosity and helping others",
  },
];

export const audienceOptions: Option[] = [
  {
    value: "believers",
    label: "The Believers",
    image: "https://images.pexels.com/photos/8851634/pexels-photo-8851634.jpeg",
    description: "Messages specifically addressed to the Muslim community",
  },
  {
    value: "humanity",
    label: "All Humanity",
    image:
      "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg",
    description: "Universal messages for all of mankind",
  },
  {
    value: "prophet",
    label: "Prophet Muhammad",
    image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg",
    description:
      "Verses specifically addressing the Prophet (peace be upon him)",
  },
];

export const lengthOptions: Option[] = [
  {
    value: "short",
    label: "Brief & Concise",
    image: "https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg",
    description: "Short verses that deliver clear messages",
  },
  {
    value: "medium",
    label: "Moderate Length",
    image: "https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg",
    description: "Balanced verses with detailed guidance",
  },
  {
    value: "long",
    label: "Extended Wisdom",
    image: "https://images.pexels.com/photos/1112186/pexels-photo-1112186.jpeg",
    description: "Longer verses with comprehensive teachings",
  },
];

export const toneOptions: Option[] = [
  {
    value: "encouragement",
    label: "Encouragement",
    image: "https://images.pexels.com/photos/1624600/pexels-photo-1624600.jpeg",
    description: "Uplifting verses that inspire and motivate",
  },
  {
    value: "hopeful",
    label: "Hope & Optimism",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
    description: "Messages of hope and positive outlook",
  },
  {
    value: "command",
    label: "Divine Instructions",
    image: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg",
    description: "Clear guidance and commands from Allah",
  },
  {
    value: "glad_tidings",
    label: "Glad Tidings",
    image: "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg",
    description: "Good news and divine promises",
  },
  {
    value: "warning",
    label: "Divine Warnings",
    image: "https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg",
    description: "Cautionary messages and reminders",
  },
];

export const locationOptions: Option[] = [
  {
    value: "makkah",
    label: "Makkan Period",
    image: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg",
    description:
      "Revelations from the early period focusing on faith and spirituality",
  },
  {
    value: "madinah",
    label: "Madinan Period",
    image: "https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg",
    description: "Later revelations focusing on social and legal guidance",
  },
];
