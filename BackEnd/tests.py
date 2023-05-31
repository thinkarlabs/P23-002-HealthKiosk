import requests

url = "https://rubixapi.azurewebsites.net/sms/send"
headers = {"rubix-api-key": "f5882d56-3030-4d3e-86db-17ef10f2a50d"}
msg_to = "+919079257789" #Valid phone no
msg_body = "Test Messge From Twilio through Azure!" # Message to be sent.
payload = {"msg_to":msg_to,"msg_body":msg_body}
response = requests.request("POST", url, json=payload, headers=headers)       
print (response.text)