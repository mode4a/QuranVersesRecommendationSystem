from flask import Flask, request, jsonify
from flask_cors import CORS
from prolog_api import get_recommendations

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


VALID_OPTIONS = {
    'themes': ['knowledge', 'story', 'rule', 'patience', 'justice', 'charity'],
    'audiences': ['believers', 'humanity', 'disbelievers', 'prophet'],
    'lengths': ['short', 'medium', 'long'],
    'tones': ['hopeful', 'sad', 'encouragement', 'warning', 'command', 'glad_tidings'],
    'locations': ['makki', 'madani']
}

def validate_choices(choices):
    """Validate user choices against valid options"""
    errors = []
    
    if not isinstance(choices, dict):
        return ["Invalid request format. Expected a JSON object with user choices."]

    if 'theme' in choices and choices['theme'] and choices['theme'] not in VALID_OPTIONS['themes']:
        errors.append(f"Invalid theme. Valid options: {VALID_OPTIONS['themes']}")
    
    if 'audience' in choices and choices['audience'] and choices['audience'] not in VALID_OPTIONS['audiences']:
        errors.append(f"Invalid audience. Valid options: {VALID_OPTIONS['audiences']}")
    
    if 'length' in choices and choices['length'] and choices['length'] not in VALID_OPTIONS['lengths']:
        errors.append(f"Invalid length. Valid options: {VALID_OPTIONS['lengths']}")
    
    if 'tone' in choices and choices['tone'] and choices['tone'] not in VALID_OPTIONS['tones']:
        errors.append(f"Invalid tone. Valid options: {VALID_OPTIONS['tones']}")
    
    if 'location' in choices and choices['location'] and choices['location'] not in VALID_OPTIONS['locations']:
        errors.append(f"Invalid location. Valid options: {VALID_OPTIONS['locations']}")
    
    return errors

@app.route('/recommend', methods=['POST'])
def recommend_verses():

    try:
        choices = request.get_json()
        
        if not choices:
            return jsonify({
                "success": False,
                "error": "No JSON data provided"
            }), 400
        
        validation_errors = validate_choices(choices)
        if validation_errors:
            return jsonify({
                "success": False,
                "error": "Validation failed",
                "details": validation_errors
            }), 400
        
        theme = choices.get('theme', '')
        audience = choices.get('audience', '')
        length = choices.get('length', '')
        tone = choices.get('tone', '')
        location = choices.get('location', '')
        
        query = f"recommend('{theme}', '{audience}', '{length}', '{tone}', '{location}', Pairs)"
        
        results = get_recommendations(query)
        if not results['status']:
            return jsonify({
                "success": False,
                "error": f"Error fetching recommendations: {results['error']}"
            }), 500
        
        results = results['data']
        pairs = results[0].get('Pairs', [])
        
        if not pairs:
            return jsonify({
                "success": True,
                "data": [],
                "message": "No matching verses found"
            })
        
        return jsonify({
            "success": True,
            "data": pairs,
            "total_found": len(pairs)
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Internal server error: {str(e)}"
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "success": False,
        "error": "Method not allowed"
    }), 405

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)