import requests
import ast

url = "http://localhost:3000/api"

try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for non-2xx status codes
    data = ast.literal_eval(response.text)
    print(data)  # Display the fetched data
except requests.exceptions.RequestException as e:
    print("Error:", e)

