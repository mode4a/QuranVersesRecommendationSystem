from pyswip import Prolog

prolog = Prolog()
prolog.consult("quran_dataset.pl")


def get_recommendations(query):
    try:
        results = list(prolog.query(query))
        return {
            "status": True,
            "data": results,
        }
    except Exception as e:
        return {
            "status": False,
            "error": str(e),
        }