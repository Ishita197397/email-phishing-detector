import pandas as pd
import re

def clean_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def preprocess():
    df = pd.read_csv('phishing_emails.csv')
    df['clean_text'] = df['text_combined'].apply(clean_text)
    print(df[['text_combined', 'clean_text', 'label']].head(10))
    df[['clean_text', 'label']].to_csv('preprocessed_emails.csv', index=False)
    print("Preprocessed data saved as 'preprocessed_emails.csv'.")

if __name__ == "__main__":
    preprocess()
