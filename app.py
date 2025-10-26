import os
import gdown
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

def download_file_from_google_drive(file_id, destination):
    if not os.path.exists(destination):
        url = f"https://drive.google.com/uc?id={file_id}"
        gdown.download(url, destination, quiet=False)

phishing_emails_id = '1c1cr4yqlGnh-UnehDTGZ3lisD273Fyfo'
preprocessed_emails_id = '1tdMAHxjZQVCqTIZ38npCE1HplULy5im-'

download_file_from_google_drive(phishing_emails_id, 'phishing_emails.csv')
download_file_from_google_drive(preprocessed_emails_id, 'preprocessed_emails.csv')

vectorizer = joblib.load('vectorizer.pkl')
model = joblib.load('phishing_model.pkl')

app = Flask(__name__)
CORS(app)  # Cross Origin allowed for React frontend

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_text = data.get('email', '')
    text_vec = vectorizer.transform([email_text])
    prediction = int(model.predict(text_vec)[0])
    proba = float(model.predict_proba(text_vec)[0][1])
    return jsonify({
        'prediction': prediction,
        'probability': proba
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render or fallback port
    app.run(host="0.0.0.0", port=port, debug=True)


if __name__ == '__main__':
    app.run(debug=True)
