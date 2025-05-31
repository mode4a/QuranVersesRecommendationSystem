import requests
from typing import Dict, Optional

class QuranAPI:
    BASE_URL = "http://api.alquran.cloud/v1/ayah"
    EDITION = "ar.alafasy"
    
    @staticmethod
    def get_verse(surah_number: int, verse_number: int) -> Optional[Dict]:
        try:
            reference = f"{surah_number}:{verse_number}"
            url = f"{QuranAPI.BASE_URL}/{reference}/{QuranAPI.EDITION}"

            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get('code') == 200 and 'data' in data:
                verse_data = data['data']
                
                return {
                    'text': verse_data.get('text', ''),
                    'audio': verse_data.get('audio', ''),
                    'surah_name': verse_data.get('surah', {}).get('englishName', ''),
                    'verse_number': verse_data.get('numberInSurah', verse_number)
                }
            else:
                print(f"API returned error: {data}")
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None
        except Exception as e:
            print(f"Error processing response: {e}")
            return None

def fetch_quran_verse(surah_number: int, verse_number: int) -> Optional[Dict]:
    return QuranAPI.get_verse(surah_number, verse_number)