import os
import gdown
import pandas as pd
import streamlit as st
import joblib

def download_file_from_google_drive(file_id, destination):
    if not os.path.exists(destination):
        url = f"https://drive.google.com/uc?id={file_id}"
        gdown.download(url, destination, quiet=False)

# Google Drive file IDs
phishing_emails_id = '1c1cr4yqlGnh-UnehDTGZ3lisD273Fyfo'
preprocessed_emails_id = '1tdMAHxjZQVCqTIZ38npCE1HplULy5im-'

# Download files if not already available
download_file_from_google_drive(phishing_emails_id, 'phishing_emails.csv')
download_file_from_google_drive(preprocessed_emails_id, 'preprocessed_emails.csv')

# Load model and vectorizer
vectorizer = joblib.load('vectorizer.pkl')
model = joblib.load('phishing_model.pkl')

st.title("Phishing Email Detector")

email_text = st.text_area("Enter email text here:")

if st.button("Check Email"):
    if email_text.strip() == '':
        st.warning("Please enter email text to check.")
    else:
        text_vec = vectorizer.transform([email_text])
        prediction = model.predict(text_vec)
        proba = model.predict_proba(text_vec)[0][1]

        if prediction[0] == 1:
            st.error(f"Phishing Email detected! Probability: {proba:.2f}")
        else:
            st.success(f"Email looks legitimate. Probability phishing: {proba:.2f}")
