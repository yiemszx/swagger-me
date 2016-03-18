var DDPClient = require("ddp");
var util = require('util');
var async = require('async');
var ddpclient = new DDPClient({
  // All properties optional, defaults shown
  host : "localhost",
  port : 4000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
  // uses the SockJs protocol to create the connection
  // this still uses websockets, but allows to get the benefits
  // from projects like meteorhacks:cluster
  // (for load balancing and service discovery)
  // do not use `path` option when you are using useSockJs
  useSockJs: true,
  // Use a full url instead of a set of `host`, `port` and `ssl`
  // do not set `useSockJs` option if `url` is used
  url: 'wss://example.com/websocket'
});

/*
 * Connect to the Meteor Server
 */

function performSearch(address, limit){
    var output;
    var limit = limit || 5;
    ddpclient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this callback will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        return;
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');



      var calls = [];

      calls.push(function(callback) {
        ddpclient.call(
             'performSearch',             // name of Meteor Method being called
             [address, limit],            // parameters to send to Meteor Method
             function (err, result) {   // callback which returns the method call results
              //  console.log('performSearch result: ' + result);
              //  console.log(util.inspect(result, false, null));
               output = result;
               callback(result);
             }
           );
      }
  );

      async.parallel(calls, function(err, result) {
          /* this code will run after all calls finished the job or
             when any of the calls passes an error */
          if (err)
              return console.log(err);
          console.log("result", result);
          console.log("output", util.inspect(output, false, null));
          return result;
      });




    //   async.series([
    //           //Load user to get userId first
    //     function(callback) {
    //       ddpclient.call(
    //            'performSearch',             // name of Meteor Method being called
    //            [address, limit],            // parameters to send to Meteor Method
    //            function (err, result) {   // callback which returns the method call results
    //             //  console.log('performSearch result: ' + result);
    //             //  console.log(util.inspect(result, false, null));
    //              output = result;
    //              callback(result);
    //            }
    //          );
    //     },
    //     function(callback){
    //       callback();
    //       return output;
    //     }
    //  ]);
        //  return output;
    });
    // return output;
}

function getBestAddress(inputAddress, arrAddress){
    // var output;

    ddpclient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this callback will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        return;
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');

      ddpclient.call(
           'getBestAddress',             // name of Meteor Method being called
           [inputAddress, arrAddress],            // parameters to send to Meteor Method
           function (err, result) {   // callback which returns the method call results
             console.log('getBestAddress result: ' + result);
             console.log(util.inspect(result, false, null));
           }
         );
    });
    // return output;
}

function tokenize(freeFormAddress){
    // var output;

    ddpclient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this callback will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log('DDP connection error!');
        return;
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');

      ddpclient.call(
           'tokenize',             // name of Meteor Method being called
           [freeFormAddress],            // parameters to send to Meteor Method
           function (err, result) {   // callback which returns the method call results
             console.log('tokenize result: ' + result);
             console.log(util.inspect(result, false, null));
           }
         );
    });
    // return output;
}
exports.performSearch = performSearch;
exports.tokenize = tokenize;
