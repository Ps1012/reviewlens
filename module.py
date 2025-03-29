from plotly.express import histogram,bar,pie
from plotly.io import to_html
from pandas import read_csv,DataFrame
from serpapi import GoogleSearch
from nltk import download
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from re import sub
download('vader_lexicon')

# Initialize VADER sentiment analyzer
sid = SentimentIntensityAnalyzer()

APIKEY = "6c47ac9485cdaf6ca898ed4f1e225096016364dccd39053d67b2bf6ba9a9dcd9"
#96868b081f3bb8c0949ab662603e17eb60ccfda44691d878f1abb95024e2126c
#a88daa5d0b5304fde4aa3358367fa842fab09d911ae1a6327073ac265a99620f
def search_single(topic, max_results=50):

        all_results = []
        for start_index in range(0, max_results, 10):
            params = {
                "q": topic,
                "api_key": APIKEY,
                "num": 10,
                "start": start_index,
                # Add other parameters like location, device, etc. as needed
            }
            search = GoogleSearch(params)
            results = search.get_dict()
            all_results.extend(results.get("organic_results", []))

        if not all_results:
            print("No results found for the topic.")
            df = DataFrame({'Text': [], 'Sentiment': [], 'Compound': []})
            return df, "Neutral",0,0,0

        text_data = []
        for item in all_results:
            text = item.get("snippet")
            if text:
                text = sub(r"http\S+", "", text)
                text = sub(r"#\S+", "", text)
                text_data.append(text)

        analyzer = SentimentIntensityAnalyzer()
        sentiment_scores = []
        for text in text_data:
            score = analyzer.polarity_scores(text)
            sentiment_scores.append(score)

        df = DataFrame({'Text': text_data})
        df['Sentiment'] = ['Neutral' if score['compound'] > -0.5 and score['compound'] < 0.5 else
                                   'Positive' if score['compound'] >= 0.5 else 'Negative'
                                   for score in sentiment_scores]
        df['Compound'] = [score['compound'] for score in sentiment_scores]

        # Count sentiments
        num_positive = df['Sentiment'].value_counts().get('Positive', 0)
        num_negative = df['Sentiment'].value_counts().get('Negative', 0)
        num_neutral = df['Sentiment'].value_counts().get('Neutral', 0)


        positive_scores = []
        negative_scores = []
        neutral_scores = []

        for score in sentiment_scores:
            positive_scores.append(score['pos'])
            negative_scores.append(score['neg'])
            neutral_scores.append(score['neu'])

        avg_positive = sum(positive_scores) / len(positive_scores) if positive_scores else 0
        avg_negative = sum(negative_scores) / len(negative_scores) if positive_scores else 0
        avg_neutral = sum(neutral_scores) / len(neutral_scores) if positive_scores else 0

        if avg_positive > avg_negative and avg_positive > avg_neutral:
            overall_sentiment = "Positive"
        elif avg_negative > avg_positive and avg_negative > avg_neutral:
            overall_sentiment = "Negative"
        else:
            overall_sentiment = "Neutral"


        return df, overall_sentiment,num_positive, num_negative, num_neutral

def performSearch(topic):
    # topic = input("Enter a topic: ")
    if "review" not in topic.lower():
       topic = topic + " review"

    # print(topic)

    df, overall_sentiment,num_positive, num_negative, num_neutral= search_single(topic, max_results=50)
    sentiments = ['Positive', 'Negative', 'Neutral']
    counts = [num_positive, num_negative, num_neutral]
    fig = bar(x=sentiments, y=counts, color=sentiments,
                 color_discrete_map={'Positive': 'green', 'Negative': 'red', 'Neutral': 'blue'},
                 title='Sentiment Analysis Results',
                 labels={'x': 'Sentiment', 'y': 'Number of Reviews'})
    fig.update_layout(
        paper_bgcolor="#414052",  # Change the outer background
        plot_bgcolor="#676274",  # Change the inner plot background
        font=dict(color="#fff7d6"),  # Change text color
        title=dict(font=dict(color="#efedff")),  # Title color
        xaxis=dict(title=dict(font=dict(color="#cee8e6"))),  # X-axis label color
        yaxis=dict(title=dict(font=dict(color="#cee8e6"))),  # Y-axis label color
        legend=dict(font=dict(color="#f1f1e6"))
    )
    # fig.show()
    # print(df)
    # print("Overall Sentiment:", overall_sentiment)
    # print("Positive:", num_positive)
    # print("Negative:", num_negative)
    # print("Neutral:", num_neutral)
    df.to_csv('sentiment_analysis_results.csv', index=False)

# performing here
    # return graph_html,updated_csv_path,df_preview,sentiment_counts

    
    graph_html = to_html(fig,full_html=False)
    df_preview = df[['Compound', 'Sentiment',"Text"]].head().to_html(classes='table table-striped')
    updated_csv_path = 'sentiment_analysis_results.csv'
    sentiment_counts =  {"Positive":num_positive,"Negative":num_negative,"Neutral":num_neutral}
    

    return graph_html,updated_csv_path,df_preview,sentiment_counts


def file_Upload(file,column_name):
    df = read_csv(file,encoding='latin-1')

    # Check if the column exists in the DataFrame
    if column_name not in df.columns:
        return f"Column '{column_name}' not found in the CSV file {file}", 400
    
    # Perform sentiment analysis using VADER
    df['Sentiment Scores'] = df[column_name].apply(lambda x: sid.polarity_scores(str(x)))
    df['Compound'] = df['Sentiment Scores'].apply(lambda x: x['compound'])
    df['Sentiment'] = df['Compound'].apply(lambda x: 'Positive' if x >= 0.05 else 'Negative' if x <= -0.05 else 'Neutral')
    # Generate a sentiment distribution graph
    sentiment_counts = df['Sentiment'].value_counts()
    fig1 = histogram(df, x="Sentiment", color="Sentiment", title="Sentiment Distribution")
    fig1.update_layout(
        paper_bgcolor="#414052",  # Change the outer background
        plot_bgcolor="#676274",  # Change the inner plot background
        font=dict(color="#fff7d6"),  # Change text color
        title=dict(font=dict(color="#efedff")),  # Title color
        xaxis=dict(title=dict(font=dict(color="#cee8e6"))),  # X-axis label color
        yaxis=dict(title=dict(font=dict(color="#cee8e6"))),  # Y-axis label color
        legend=dict(font=dict(color="#f1f1e6"))
    )
    # Save graph as HTML string to pass to frontend
    graph_html = to_html(fig1,full_html=False)
    # Save the updated DataFrame to a new CSV file
    updated_csv_path = 'updated_sentiment_analysis.csv'
    df.to_csv(updated_csv_path, index=False)
    # Get the top 5 rows of the updated DataFrame
    df_preview = df[['Compound', 'Sentiment',column_name]].head().to_html(classes='table table-striped')
    # Return the updated CSV file and graph as response
    sentiment_counts =sentiment_counts.to_dict()
    return graph_html,updated_csv_path,df_preview,sentiment_counts

def search_and_analyze(topic, max_results=50):
    all_results = []
    
    for start_index in range(0, max_results, 10):
        params = {
            "q": topic,
            "api_key": APIKEY,
            "num": 10,
            "start": start_index,
        }
        search = GoogleSearch(params)
        results = search.get_dict()
        all_results.extend(results.get("organic_results", []))
        # sleep(1)
    
    text_data = [sub(r"http\S+", "", item.get("snippet", "")) for item in all_results if item.get("snippet")]
    sentiment_scores = [sid.polarity_scores(text) for text in text_data]
    
    df = DataFrame({'Text': text_data})
    df['Compound'] = [score['compound'] for score in sentiment_scores]
    df['Sentiment'] = df['Compound'].apply(lambda x: 'Positive' if x >= 0.05 else 'Negative' if x <= -0.05 else 'Neutral')
    
    num_positive = (df['Sentiment'] == 'Positive').sum()
    num_negative = (df['Sentiment'] == 'Negative').sum()
    num_neutral = (df['Sentiment'] == 'Neutral').sum()
    
    return df, num_positive, num_negative, num_neutral

def compare_brands(product, brands):
    brand_sentiment_data = {}
    threads = []

    def my_func(search_query):
        df, num_positive, num_negative, num_neutral = search_and_analyze(search_query, max_results=50)
        df_preview = df[['Compound', 'Sentiment',"Text"]].head().to_html(classes='table table-striped')
        brand_sentiment_data[brand] = {
            "df": df_preview,
            "num_positive": num_positive,
            "num_negative": num_negative,
            "num_neutral": num_neutral
        }
    for brand in brands:
        search_query = f"{product} {brand} review"
        my_func(search_query)

    best_brand = max(brand_sentiment_data, key=lambda brand: brand_sentiment_data[brand]["num_positive"])
    print(f"\n📢 The best brand for {product} is: {best_brand} ✅")
    
    pie_charts = {}
    for brand, data in brand_sentiment_data.items():
        sentiment_counts = {
            "Positive": data["num_positive"],
            "Negative": data["num_negative"],
            "Neutral": data["num_neutral"]
        }

        fig = pie(
            names=sentiment_counts.keys(),
            values=sentiment_counts.values(),
            title=f"Sentiment Distribution for {brand}",
            color_discrete_map={"Positive": "green", "Negative": "red", "Neutral": "blue"}
        )
        fig.update_layout(
            paper_bgcolor="#161625",  # Outer background
            plot_bgcolor="white",       # Inner plot background
            font=dict(color="darkblue"),  # Change text color
            title=dict(font=dict(color="#86aaf9")),  # Title color
            xaxis=dict(title=dict(font=dict(color="whitesmoke"))),  # X-axis label color
            yaxis=dict(title=dict(font=dict(color="whitesmoke"))),  # Y-axis label color
            legend=dict(font=dict(color="#f1f1e6"))  
        )
        
        pie_charts[brand] = to_html(fig, full_html=False)
    
    return brand_sentiment_data, best_brand, pie_charts
