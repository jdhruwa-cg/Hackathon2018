#API call to Deployed Model of IBM Watson Studio from IBM Cloud

import urllib3, requests, json

# retrieve your wml_service_credentials_username, wml_service_credentials_password, and wml_service_credentials_url from the
# Service credentials associated with your IBM Cloud Watson Machine Learning Service instance

wml_credentials={
"url": wml_service_credentials_url,
"username": wml_service_credentials_username,
"password": wml_service_credentials_password
}

headers = urllib3.util.make_headers(basic_auth='{username}:{password}'.format(username=wml_credentials['username'], password=wml_credentials['password']))
url = '{}/v3/identity/token'.format(wml_credentials['url'])
response = requests.get(url, headers=headers)
mltoken = json.loads(response.text).get('token')

header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

# NOTE: manually define and pass the array(s) of values to be scored in the next line
payload_scoring = {"fields": ["List of fields"], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}

response_scoring = requests.post('https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/0bed642e-f41a-45f0-adcb-f7e1ceef96dd/deployments/6568109c-02a6-4558-b9e5-1b37bc9bcf6b/online', json=payload_scoring, headers=header)
print("Scoring response")
print(json.loads(response_scoring.text))