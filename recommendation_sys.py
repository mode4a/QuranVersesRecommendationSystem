from pyswip import Prolog
from quran_api import fetch_quran_verse


def get_valid_input(prompt, valid_options, allow_empty=True):
    while True:
        user_input = input(prompt).strip().lower()
        if allow_empty and user_input == '':
            return ''
        if user_input in valid_options:
            return user_input
        print(f"Invalid input. Please choose from {valid_options} or leave blank.")

def main():

    prolog = Prolog()
    prolog.consult("quran_dataset.pl")

    themes = ['knowledge', 'story', 'rule', 'patience', 'justice', 'charity']
    audiences = ['believers', 'humanity', 'disbelievers', 'prophet']
    lengths = ['short', 'medium', 'long']
    tones = ['hopeful', 'sad', 'encouragement', 'warning', 'command', 'glad_tidings']
    locations = ['makki', 'madani']

    print("Enter the following details (leave blank for no preference):")
    theme = get_valid_input(
        f"Theme ({', '.join(themes)}): ",
        themes
    )
    audience = get_valid_input(
        f"Audience ({', '.join(audiences)}): ",
        audiences
    )
    length = get_valid_input(
        f"Length ({', '.join(lengths)}): ",
        lengths
    )
    tone = get_valid_input(
        f"Tone ({', '.join(tones)}): ",
        tones
    )
    location = get_valid_input(
        f"Location ({', '.join(locations)}): ",
        locations
    )

    query = f"recommend('{theme}', '{audience}', '{length}', '{tone}', '{location}', Pairs)"

    try:
        results = list(prolog.query(query))
    except Exception as e:
        print(f"Error executing Prolog query: {e}")
        return

    if not results:
        print("No matching verses found or invalid query.")
        return

    pairs = results[0].get('Pairs', [])
    
    myfile = open("output.txt", "w")
    if not pairs:
        print("No matching verses found.")
    else:
        print("\nRecommended Verses are shown in file:")
        for pair in pairs:
            surah, verse = pair
            verse_data = fetch_quran_verse(surah, verse)
            if verse_data:
                print(f"Surah: {verse_data['surah_name']}", file=myfile)
                print(f"Verse: {verse_data['verse_number']}", file=myfile)
                print(f"Text: {verse_data['text']}...", file=myfile)
                print(f"Audio: {verse_data['audio']}", file=myfile)
            else:
                print(f"Failed to fetch verse for Surah from the Api {surah}, Verse {verse}", file=myfile)

if __name__ == "__main__":
    main()