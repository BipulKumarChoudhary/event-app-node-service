var express = require('express');

routes = function(Event){
    var eventRouter = express.Router();

    // ROUNTING CODE FROM APP.JS TO BE MOVED HERE
    eventRouter.route('/events')
    .get(function(req,res){
        var query = req.query
         Event.find(query,function (err, events) {
             console.log(err)
             console.log(events)
            if (err)
                console.log(err);
            else
                res.json(events);
        });
    })
    .post(function(req,res){
        var event = new Event(req.body)
        event.save()
        res.status(201).send(event)
    })


 eventRouter.route('/events/:Id')
    .get(function(req,res){         
        Event.findById(req.params.Id,function (err, event) {
           if (err)
               res.status(500).send(err);
           else
               res.json(event);
       });        
   })


  eventRouter.route('/sessions')
  .get(function(req,res){      
   var searchString =  req.query.searchTerm
   console.log(searchString)

   Event.find({ "sessions.name" : { $regex: searchString, $options: 'i' } },
   function (err, event) {
            console.log(event)
            if (err)  
                res.status(500).send(err);
            else
                res.json(event);
});

      
 })

    return eventRouter;
}

module.exports = routes;