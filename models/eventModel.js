var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventModel = new Schema(
{
    id: {type : 'number'},
    name: {type : 'string'},
    date: {type : 'date'},
    time: {type : 'string'},
    price: {type : 'number'},
    imageUrl: {type : 'string'},
    location: {
      address: {type : 'string'},
      city: {type : 'string'},
      country:{type : 'string'},
    },
    sessions: [
      {
        id: {type : 'number'},
        name: {type : 'string'},
        presenter: {type : 'string'},
        duration: {type : 'number'},
        level: {type : 'string'},
        abstract: {type : 'string'},
        voters: []
      }
    ]
  });

  //eventModel.index({name: 'text', 'sessions.name': 'text'});

// This is going to add a new model called 'event' into mongoose.Schema 
// which later can be accessed using 'Event'
// Connectin string -> 'mongodb://localhost/eventsDB'
// collection under eventsDB is 'eventsCollection' which is the third parameter
module.exports = mongoose.model('Event',eventModel,'eventsCollection');

