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

import pdb;pdb.set_trace()

account_sid = config['YOUR_ACCOUNT_SID']
auth_token = config['TWILIO_AUTH_TOKEN']
verify_sid = config['YOUR_VERIFY_SID']
from_ = config['NO_FROM']
to = config['SM_TO']

client = Client(account_sid, auth_token)

message = client.messages.create(
         body='Secure Device OTP is - ' + str(otp) + 'Dont share it.',
         from_=from_,
         to=to
     )

print(message.sid)