import twilio
# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client
import random # generate random number
otp = random.randint(1000,9999)
print("Your OTP is - ",otp)
# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
from dotenv import dotenv_values
config = dotenv_values(".env")
# Account SID : ACa481d650f990427b41fb48cd236aae3c
# Auth Token : 37a5acb6c9ec527d6c470e092a07fcbb
account_sid = "ACa481d650f990427b41fb48cd236aae3c"
auth_token = "37a5acb6c9ec527d6c470e092a07fcbb"
from_ = "+16073896742"
to = "+919079257789"
#from twilio import TwilioRestException
client = Client(account_sid, auth_token)
try:
    message = client.messages.create(
            body='Secure Device OTP is - ' + str(otp) + 'Dont share it.',
            from_=from_,
            to=to
        )
except Exception as ex:
    import pdb;pdb.set_trace()
    print(ex)

print(message.sid)