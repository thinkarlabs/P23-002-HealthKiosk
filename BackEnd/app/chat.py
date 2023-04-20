import os
import openai

openai.api_key = OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


system  = """
I want you to act as a virtual doctor. Ask questions one at a time only and do not provide answers."""

def get_response(msg):
    completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": system },
            {"role": "user", "content": msg},
        ]
    )

    return completion.choices[0].message['content']

# def get_response(msg):
#     response = openai.Completion.create(
#       model="text-davinci-003",
#       prompt=
#       "Chat based on mood\n\nQuestion: How are you ?\n###\nI am good\n###\nQuestion: I am not feeling well today ?\n###\nLet me know how you are feeling ?\n###\nQuestion: I am suffering from a headache\n###\nDo not worry its normal \n###\nQuestion: I want  to learn swim\n###\nthis a great idea and it is very easy to learn.\n###\n"
#       + msg + "\n###",
#       temperature=0.51,
#       max_tokens=256,
#       top_p=1,
#       frequency_penalty=0,
#       presence_penalty=0,
#       stop=["###"])
#     return response["choices"][0]['text']  #response


def get_transcript_summary(transcript):
    """
    """
    response = openai.Completion.create(
      model="text-davinci-003",
      prompt="summarize following text:\n\n\nBot: Hi How can I help you? \n Patient: hello I have fever\nBot: \nI am sorry to hear that. You should rest and take care of yourself. \n Patient: hello I have fever\nBot: \nI am sorry to hear that. You should rest and take care of yourself. \n Patient: I didn't take any medicine right now\nBot: \nIt is best to take medicine for headache as soon as possible. Have you tried any home remedies? \n\n Patient: suggest medicine\nBot: \nIt is best to take medicine for headache as soon as possible. Have you tried any home remedies? \n Patient: medicine thank you\nBot: \nIt is best to take medicine for headache as soon as possible. Have you tried any home remedies? \n Patient: medicine thank you\nBot: \nYou are welcome. I hope you feel better soon. \n \n Patient: suggest some medicine\nBot: \nYou are welcome. I hope you feel better soon. \n Patient: suggest some medicine\nBot: \nYou are welcome. I hope you feel better soon. \n Patient: suggest some medicine\nBot: \nI suggest you take some over-the-counter pain medication like ibuprofen or acetaminophen to help with the headache. \n\nThe bot responds to the patient's inquiries about fever and suggests taking over-the-counter pain medication like ibuprofen or acetaminophen to help with the headache. It also encourages the patient to rest and take care of themselves.\n"
      + transcript ,
      temperature=0.7,
      max_tokens=1233,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )
    return response["choices"][0]['text']


txt = """Bot: Hi How can I help you? 
 Patient: hello I have fever
Bot: 
I am sorry to hear that. You should rest and take care of yourself. 
 Patient: hello I have fever
Bot: 
I am sorry to hear that. You should rest and take care of yourself. 
 Patient: I didn't take any medicine right now
Bot: 
It is best to take medicine for headache as soon as possible. Have you tried any home remedies? 

 Patient: suggest medicine
Bot: 
It is best to take medicine for headache as soon as possible. Have you tried any home remedies? 
 Patient: medicine thank you
Bot: 
It is best to take medicine for headache as soon as possible. Have you tried any home remedies? 
 Patient: medicine thank you
Bot: 
You are welcome. I hope you feel better soon. 
 
 Patient: suggest some medicine
Bot: 
You are welcome. I hope you feel better soon. 
 Patient: suggest some medicine
Bot: 
You are welcome. I hope you feel better soon. 
 Patient: suggest some medicine
Bot: 
I suggest you take some over-the-counter pain medication like ibuprofen or acetaminophen to help with the headache."""

#get_transcript_summary(txt)