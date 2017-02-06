import requests
from requests.auth import HTTPBasicAuth 
payload = {'teamMember': '[1,2,3,4,5,6]'}
r = requests.post("http://jlin53.pythonanywhere.com/QuickMeet/default/api/teamMember.json", data=payload)

