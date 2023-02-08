import os
import openai

openai.api_key = "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"  # os.getenv("OPENAI_API_KEY")


def get_response(msg):
  response = openai.Completion.create(
    model="text-davinci-003",
    prompt=
    "Chat based on mood\n\nQuestion: How are you ?\n###\nI am good\n###\nQuestion: I am not feeling well today ?\n###\nLet me know how you are feeling ?\n###\nQuestion: I am suffering from a headache\n###\nDo not worry its normal \n###\nQuestion: I want  to learn swim\n###\nthis a great idea and it is very easy to learn.\n###\n"
    + msg + "\n###",
    temperature=0.51,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
    stop=["###"])
  return response["choices"][0]['text']  #response


#import pdb;pdb.set_trace()
#print( response["choices"][0]['text'])
#print(response)
