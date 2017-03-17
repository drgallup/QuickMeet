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
            print "BEFORE LOOKUP"
            data = db(db.users.username == uid).select()
            print data
            print "BEFORE NAME ASSINGMENT"
            if (len(data) >= 1):
                name = data[0].firstName
        print "AFTER ASSINGMENT"
        if (name == None) :
            name = uid
        return (name)
    return dict(GET=GET)
