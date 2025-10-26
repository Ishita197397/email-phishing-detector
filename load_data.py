import pandas as pd

def load_data():
    df = pd.read_csv('phishing_emails.csv')
    print("Dataset shape:", df.shape)
    print(df.head())
    print("Class distribution:\n", df['label'].value_counts())
    return df

if __name__ == "__main__":
    load_data()
