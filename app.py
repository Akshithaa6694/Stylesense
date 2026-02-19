from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/recommend', methods=['POST'])
def recommend():

    data = request.json

    occasion = data.get("occasion")
    budget = data.get("budget")
    style = data.get("style")

    outfits = [
        {
            "name": "Elegant Saree",
            "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
            "description": "A graceful saree perfect for special occasions.",
            "reason": "Matches your style & occasion beautifully.",
            "confidence": random.randint(85, 98)
        },
        {
            "name": "Chic Casual Dress",
            "image": "https://images.unsplash.com/photo-1520975922284-8b456906c813",
            "description": "Comfortable yet stylish for casual outings.",
            "reason": "Perfect blend of comfort & fashion.",
            "confidence": random.randint(80, 95)
        },
        {
            "name": "Modern Office Wear",
            "image": "https://images.unsplash.com/photo-1593032465171-8f0e2d0c4d5f",
            "description": "Professional and confident look.",
            "reason": "Ideal for a smart & polished appearance.",
            "confidence": random.randint(82, 96)
        }
    ]

    return jsonify(outfits)

if __name__ == "__main__":
    app.run(debug=True)
