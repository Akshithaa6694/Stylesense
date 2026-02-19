import openai
import json
import random

openai.api_key = "YOUR_API_KEY_HERE"

def generate_recommendations(occasion, budget, style, gender):

    prompt = f"""
    You are a professional fashion stylist.

    Generate 3 outfit recommendations.

    Gender: {gender}
    Occasion: {occasion}
    Budget: {budget}
    Style Preference: {style}

    RULES:

    If gender = Women:
    Suggest outfits like:
    - Dresses
    - Sarees
    - Ethnic wear
    - Office wear

    If gender = Men:
    Suggest outfits like:
    - Shirts
    - Suits
    - Casual wear
    - Formal wear

    Return STRICT JSON:

    [
      {{
        "name": "...",
        "description": "...",
        "reason": "...",
        "confidence": "85"
      }}
    ]
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=400
        )

        text = response.choices[0].message.content
        outfits = json.loads(text)

        # Gender-specific images
        women_images = [
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2",
            "https://images.unsplash.com/photo-1520975916090-3105956dac38",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c"
        ]

        men_images = [
            "https://images.unsplash.com/photo-1593032465171-8c3b0f28c6a9",
            "https://images.unsplash.com/photo-1520975954732-35dd22299614",
            "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc"
        ]

        for outfit in outfits:
            if gender.lower() == "women":
                outfit["image"] = random.choice(women_images)
            else:
                outfit["image"] = random.choice(men_images)

        return outfits

    except:
        return [
            {
                "name": "Classic Outfit",
                "description": "Elegant and stylish combination",
                "reason": "Safe fallback",
                "confidence": "80",
                "image": "https://images.unsplash.com/photo-1520975916090-3105956dac38"
            }
        ]
