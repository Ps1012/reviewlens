from flask import Flask, jsonify, render_template, request,send_file
from module import file_Upload,compare_brands,performSearch

app = Flask(__name__)

currentFiles = [""]



@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            # Save the file
            file.save("static/currFile/"+file.filename)
            currentFiles[0] = "static/currFile/"+file.filename
            return jsonify({'message': f'{"static/"+file.filename};;;1'}), 200
        
@app.route('/col', methods=['GET', 'POST'])
def upload_column():
    col_name = request.args.get("columnName")
    file = open(currentFiles[0],encoding="utf-8")
    graph_html,updated_csv_path,df_preview,sentiment_counts = file_Upload(file,col_name)
    return render_template('result.html', graph_html=graph_html,csv_file=updated_csv_path,df_preview=df_preview, positive=sentiment_counts["Positive"],negative=sentiment_counts["Negative"],neutral=sentiment_counts["Neutral"])

        # return render_template('result.html', graph_html=graph_html,csv_file=updated_csv_path,df_preview=df_preview, positive=sentiment_counts["Positive"],negative=sentiment_counts["Negative"],neutral=sentiment_counts["Neutral"])


@app.route('/file')
def fileRoute():
    # Getting and Opening the file
    file = request.args.get('name')
    file = open("static/"+file,encoding="utf-8")
    # getting the column name
    column_name = request.args.get('column')
    # calling the functions 
    graph_html,updated_csv_path,df_preview,sentiment_counts = file_Upload(file,column_name)
    return render_template('result.html', graph_html=graph_html,csv_file=updated_csv_path,df_preview=df_preview, positive=sentiment_counts["Positive"],negative=sentiment_counts["Negative"],neutral=sentiment_counts["Neutral"])


@app.route('/single')
def searchSingleRoute():
    # Getting and Opening the file
    column_name = request.args.get('name')
    # calling the functions 
    graph_html,updated_csv_path,df_preview,sentiment_counts = performSearch(column_name)
    return render_template('result.html', graph_html=graph_html,csv_file=updated_csv_path,df_preview=df_preview, positive=sentiment_counts["Positive"],negative=sentiment_counts["Negative"],neutral=sentiment_counts["Neutral"])

@app.route('/search')
def searchRoute():
    topic = request.args.get('topic')
    company = request.args.get('company')
    company = company.split(",;,")

    notNull = []
    for i in company:
        if len(i.strip()) > 1:
            notNull.append(i)

    brand_sentiment_data, best_brand, pie_charts = compare_brands(topic,notNull)

    if(len(notNull)==1):
        pie1 = pie_charts[notNull[0]]
        brand1 = brand_sentiment_data[notNull[0]]
        pie2 = ""
        brand2   = {
            "df": "",
            "num_positive": "",
            "num_negative": "",
            "num_neutral": ""
        }
        pie3 = ""
        brand3  = {
            "df": "",
            "num_positive": "",
            "num_negative": "",
            "num_neutral": ""
        }
    elif(len(notNull)==2):
        pie1 = pie_charts[notNull[0]]
        brand1 = brand_sentiment_data[notNull[0]]
        pie2 = pie_charts[notNull[1]]
        brand2 = brand_sentiment_data[notNull[1]]
        pie3 = ""
        brand3  = {
            "df": "",
            "num_positive": "",
            "num_negative": "",
            "num_neutral": ""
        }

    elif(len(notNull)==3):
        pie3 = pie_charts[notNull[2]]
        brand3 = brand_sentiment_data[notNull[2]]
        pie1 = pie_charts[notNull[0]]
        brand1 = brand_sentiment_data[notNull[0]]
        pie2 = pie_charts[notNull[1]]
        brand2 = brand_sentiment_data[notNull[1]]

    

    return render_template('search.html',product=topic,pie1=pie1,pie2=pie2,pie3=pie3,best=best_brand,brand1=company[0],brand2=company[1],brand3=company[2],positive1=brand1["num_positive"],negative1=brand1["num_negative"],neutral1=brand1["num_neutral"],table1=brand1["df"],positive2=brand2["num_positive"],negative2=brand2["num_negative"],neutral2=brand2["num_neutral"],table2=brand2["df"],positive3=brand3["num_positive"],negative3=brand3["num_negative"],neutral3=brand3["num_neutral"],table3=brand3["df"])


@app.route('/load')
def loadingRoute():
    return render_template('load.html')
@app.route('/temp')
def tempRoute():
    return render_template('abc.html')


@app.route('/download')
def download_file():
    filename = request.args.get('filename')
    # Adjust the path based on where your files are stored
    return send_file(filename, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, port=8000)

