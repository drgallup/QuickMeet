import json 

#Default controller to generate UUID
@request.restful()
def api():
    response.view = 'generic.'+request.extension
    def GET(*args,**vars):
        uid = args[0]
        name = None
        print uid
        if (uid != None):
            data = db(db.users.username == uid).select()
            print data
            if (len(data) >= 1):
                name = data[0].firstName
        if (name == None) :
            name = uid
        return (name)
    return dict(GET=GET)
