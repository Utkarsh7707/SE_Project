from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load the trained model
model = tf.keras.models.load_model("model.h5")

def preprocess_image(image):
    """Convert image to required model input format"""
    image = image.convert("L")  # Convert to grayscale
    image = image.resize((48, 48))  # Resize to match model input
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=-1)  # Add channel dimension (48, 48, 1)
    image = np.expand_dims(image, axis=0)  # Add batch dimension (1, 48, 48, 1)
    return image


@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Sad", 5: "Surprised", 6: "Neutral"}

    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        # Read and log the file
        image_file = request.files["image"]
        print(f"Received file: {image_file.filename}")

        # Convert file to image
        image = Image.open(image_file).convert("RGB")  

        # Preprocess image
        input_image = preprocess_image(image)

        # Make prediction
        prediction = model.predict(input_image)
        predicted_class = np.argmax(prediction)  # Assuming classification task
        predicted_class_name = emotion_dict[predicted_class]

        return jsonify({"prediction": predicted_class_name, "confidence": float(np.max(prediction))}), 200

    except Exception as e:
        print("Error:", str(e))  # Log error to console
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
