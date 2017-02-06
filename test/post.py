import requests
from requests.auth import HTTPBasicAuth 
payload = {'teamMember': '[1,2,3,4,5,6]'}
r = requests.post("http://jlin53.pythonanywhere.com/QuickMeet/default/api/team.json", data=payload)
print "Result of post request add is", r

r = requests.delete("http://jlin53.pythonanywhere.com/QuickMeet/default/api/team/1.json")
print "Result of post delete request is ", r
