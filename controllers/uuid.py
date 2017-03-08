import uuid
import json 

#Default controller to generate UUID
@request.restful()
def api():
    response.view = 'generic.'+request.extension
    def GET(*args,**vars):
        return json.dumps(str(uuid.uuid4()))
    return dict(GET=GET)
