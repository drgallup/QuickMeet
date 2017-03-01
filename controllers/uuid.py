import uuid
import json 

#Default controller to generate UUID
@request.restful()
def api():
   return json.dumps(uuid.uuid4())

