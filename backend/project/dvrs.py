import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import numpy as np
from io import StringIO


def dvrs(database):
    def preprocess_data(data):
    # One-hot encode categorical columns
        categorical_columns = data.select_dtypes(include=['object']).columns
        data = pd.get_dummies(data, columns=categorical_columns)

    # Standardize numerical columns
        numerical_columns = data.select_dtypes(include=['float64', 'int64']).columns
        scaler = StandardScaler()
        data[numerical_columns] = scaler.fit_transform(data[numerical_columns])
        # print(data)
        return data

    def create_model(input_shape, output_shape):
        model = tf.keras.Sequential([
        tf.keras.layers.Dense(32, activation='relu', input_shape=input_shape),
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(output_shape, activation='softmax')
        ])

        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

        return model

    def train_model(data, target_column):
        X = data.drop(columns=[target_column])
        y = data[target_column]

    # Convert categorical features to numerical values
        le = LabelEncoder()
        for col in X.select_dtypes(include="object").columns:
            X[col] = le.fit_transform(X[col])
            print(X[col])

        y_final = le.fit_transform(y)
        data["Chart_Type"] = le.fit_transform(data["Chart_Type"])
        # Split the data into training and validation sets
        X_train, X_val, y_train, y_val = train_test_split(X, y_final, test_size=0.2, random_state=42)

        # Define the model architecture
        model = tf.keras.Sequential([
        tf.keras.layers.Dense(32, activation='relu', input_shape=(X_train.shape[1],)),
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(len(set(y)), activation='softmax')
        ])
        # Compile the model
        model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        # Train the model
        model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=50, batch_size=32, verbose=0)
        return model

    def get_chart_recommendations(data, model):
        chart_types = ['bar', 'line', 'scatter', 'pie']

        # Get predictions for each chart type
        chart_predictions = {}
        le = LabelEncoder()
        for col in data.select_dtypes(include="object").columns:
            data[col] = le.fit_transform(data[col])
        # print(X[col])

        for chart_type in chart_types:
            chart_data = data.copy()
            # chart_data['chart_type'] = chart_type
            chart_data = preprocess_data(chart_data)
            # print(chart_data)
            # chart_data = chart_data.drop(columns=['chart_type'])
            chart_pred = model.predict(data)
            chart_predictions[chart_type] = np.mean(chart_pred, axis=0)

        # Construct the output
        output = []
        for chart_type, prob in chart_predictions.items():
            columns = []
            for i in range(len(prob)):
                for j in range(i+1, len(prob)):
                    columns.append([data.columns[i], data.columns[j]])
            output.append({
                'columns': columns,
                'chart_type': chart_type,
                'probability': prob.tolist()
            })

        return output


    def filter_recommendations(recommendations):
        sorted_data = []

        for chart in recommendations:
            if chart['chart_type'] == 'bar':
                sorted_prob = sorted(zip(chart['columns'], chart['probability']), key=lambda x: x[1], reverse=True)[:1]
                sorted_data.append({'chart_type': chart['chart_type'], 'top_columns': [x[0] for x in sorted_prob], 'top_probabilities': [x[1] for x in sorted_prob]})
            elif chart['chart_type'] == 'scatter':
                sorted_prob = sorted(zip(chart['columns'], chart['probability']), key=lambda x: x[1], reverse=True)[1:2]
                sorted_data.append({'chart_type': chart['chart_type'], 'top_columns': [x[0] for x in sorted_prob], 'top_probabilities': [x[1] for x in sorted_prob]})
            else:
                sorted_prob = sorted(zip(chart['columns'], chart['probability']), key=lambda x: x[1], reverse=True)[2:3]
                sorted_data.append({'chart_type': chart['chart_type'], 'top_columns': [x[0] for x in sorted_prob], 'top_probabilities': [x[1] for x in sorted_prob]})
        
        bar_dict = {}
        line_dict = {}
        scatter_dict = {}
        pie_dict = {}

        for d in sorted_data:
            if d['chart_type'] == 'bar':
                bar_dict = d
            elif d['chart_type'] == 'line':
                line_dict = d
            elif d['chart_type'] == 'scatter':
                scatter_dict = d
            elif d['chart_type'] == 'pie':
                pie_dict = d

        print("Bar Chart Dictionary: ", bar_dict)
        print("Line Chart Dictionary: ", line_dict)
        print("Scatter Chart Dictionary: ", scatter_dict)
        print("Pie Chart Dictionary: ", pie_dict)

        return bar_dict,scatter_dict, pie_dict

    data = pd.read_csv('./files/test.csv')

    # Train the model
    model = train_model(data,"Chart_Type")

    # Get chart type recommendations for a new dataset
    data = pd.read_csv(StringIO(database))
    # Save DataFrame to CSV file
    data.to_csv('./files/my_data.csv', index=False)

    final_data = pd.read_csv('./files/my_data.csv')
    # print(new_data.columns)
    recommendations = get_chart_recommendations(final_data,model)
    final =  filter_recommendations(recommendations)
    print(final)
    return final


"""
1. top columns of each chart
2. {chart_type: 'scatter', top_columns :[[col1,col2]], probability:[dfdfbgfb]}
3. charts > dashboard > workspace. 
4. create chart instance. 
"""