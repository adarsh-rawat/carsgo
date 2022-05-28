from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd
import datetime as dt

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#importing csv data
sale_data = pd.read_csv('data.csv') 

@app.route("/")
def m():
    return 'Hello, Alvin!'

# Route for seeing data
@app.route('/sales', methods=["POST"])
def sales():
    req = request.json
    duration = int(req) #convert str value for number of days to integer
    new_data = sale_data[sale_data["Date"] > str(dt.date(2021, 12, 31) - dt.timedelta(days=duration))]
    
    body_type_data = new_data['Body_Type'].value_counts().head().tolist()
    body_type_labels = new_data['Body_Type'].value_counts().head().index.tolist()

    fuel_type_data = new_data['Fuel_Type'].value_counts().head().tolist()
    fuel_type_labels = new_data['Fuel_Type'].value_counts().head().index.tolist()


    sales_data = {
        0: {
            'title': 'Top 5 Models /Sales',
            'name': 'bar',
            'data': new_data['Model_x'].value_counts().head().tolist(),
            'labels': new_data['Model_x'].value_counts().head().index.tolist()
        },
        1: {
            'title': 'Top 5 Brands (Make) /Sales',
            'name': 'bar',
            'data': new_data['Make'].value_counts().head().tolist(),
            'labels': new_data['Make'].value_counts().head().index.tolist()
        },
        2: {
            'title': 'Top 5 Body Type /Sales',
            'name': 'pie',
            'data': body_type_data,
            'labels': body_type_labels
        },
        3: {
            'title': 'Top 5 Fuel Types /Sales',
            'name': 'doughnut',
            'data': fuel_type_data,
            'labels': fuel_type_labels
        }
    }
    return sales_data

@app.route('/geo', methods=["POST"])
def geo():
    req = request.json
    duration = int(req)
    new_data = sale_data[sale_data["Date"] > str(dt.date(2021, 12, 31) - dt.timedelta(days=duration))]
    
    top_regions = new_data['Region'].value_counts().head(6)

    lowest_regions = new_data['Region'].value_counts().tail(6)

    top_models_in_top_regions = [new_data[new_data['Region'] == i]['Model_x'].value_counts().index[0] for i in top_regions.index.tolist()]
    top_models_sales = [int(new_data[new_data['Region'] == i]['Model_x'].value_counts()[0]) for i in top_regions.index.tolist()]

    region_top = top_regions.index[0]
    body_type_in_top_region = new_data[new_data['Region'] == region_top]['Body_Type'].value_counts().head()
    body_type_sales = body_type_in_top_region.values.tolist()

    fuel_type_in_top_region = new_data[new_data['Region'] == region_top]['Fuel_Type'].value_counts().head()
    fuel_type_sales = fuel_type_in_top_region.values.tolist()

    brand_in_top_region = new_data[new_data['Region'] == region_top]['Make'].value_counts().head()
    brand_sales = brand_in_top_region.values.tolist()

    geo_data = {
        0: {
            'title': 'Top 5 Regions /Sales, Best Region: {}'.format(top_regions.index[0]),
            'name': 'bar',
            'data': top_regions.tolist(),
            'labels': top_regions.index.tolist()
        },
        1:{
            'title': 'Lowest 5 Regions /Sales',
            'name': 'bar',
            'data': lowest_regions.tolist(),
            'labels': lowest_regions.index.tolist()
        },
        2: {
            'title': 'Top 5 Body Type /Sales in {}'.format(top_regions.index[0]),
            'name': 'pie',
            'data': body_type_sales,
            'labels': body_type_in_top_region.index.tolist()
        },
        3: {
            'title': 'Top 5 Fuel Type /Sales in {}'.format(top_regions.index[0]), #gets top region's name
            'name': 'doughnut',
            'data': fuel_type_sales,
            'labels': fuel_type_in_top_region.index.tolist()
        },
        4: {
            'title': 'Top 5 Brands in {}'.format(top_regions.index[0]),
            'name': 'bar',
            'data': brand_sales,
            'labels': brand_in_top_region.index.tolist()
        }
    }
    return geo_data

@app.route('/custom', methods=['POST'])
def custom():
    req = request.json
    if req == {}:
        return {}
    
    custom_data = {}

    new_data = sale_data[sale_data["Date"] > str(dt.date(2021, 12, 31) - dt.timedelta(days=int(req['duration'])))]
    custom_data['title'] = 'Sales numbers for Top {}'.format(req['field'])
    
    if(req['field'] in ['Doors', 'Emission_Norm', 'Fuel_Type', 'Odometer', 'Speedometer', 'Body_Type']):
        custom_data['name'] = 'pie'
        custom_data['data'] = new_data[req['field']].value_counts().head().tolist()
        custom_data['labels'] = new_data[req['field']].value_counts().head().index.tolist()
    
    if(req['field'] in ['City_Mileage', 'Highway_Mileage', 'Make', 'Model_x', 'Power', 'Torque']):
        if(req['field'] in ['Torque', 'Power']):
            custom_data['name'] = 'line'   #line chart will be drawn for power and torque
        else:
            custom_data['name'] = 'bar'
        custom_data['title'] = 'Top 5 Popular {}'.format(req['field'])
        custom_data['data'] = new_data[req['field']].value_counts().head(6).tolist()
        custom_data['labels'] = new_data[req['field']].value_counts().head(6).index.tolist()

    return custom_data


if __name__ == '__main__':
    app.run(debug=True)
