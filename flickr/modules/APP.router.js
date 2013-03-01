/**
 *
 *  Router.js
 *
 */


define("router",[], function(){

return function() {

     var _rules = [],

         _compiled = [];
 
     function get(rule, handler) {
 
         _rules.push([rule, handler]);

     };

     function _compile() {

          var i, n = _rules.length, keys = [];

          for(i = 0; i < n; i++) {

              var re = _rules[i][0].replace(/:[^\/]+/gi, function( key ) {

                  keys.push(key.substring(1));

                  return "([^\/]+)";
              })
                             _compiled.push({
                             keys: keys,
                             handler: _rules[i][1],
                             re: new RegExp(re)
                             })

          }//endfor
     };

     function _attach() {

         window.addEventListener("hashchange", function() {

                _match( document.location.hash )
         });
     };

     function _match( url ) {

              var i, n = _compiled.length, data = {};

              for(i = 0; i < n; i++) {

                  var match = url.match( _compiled[ i ].re );
                
                  if( match ) {

                      var keys = _compiled[ i ].keys, m = keys.length;

                      for(var j = 0; j < m; j++) {

                          data[ keys[ j ] ] = match[i+1]                           
                      }

                      var handler = _compiled[i].handler;

                      if( handler ) {

                          handler( data )
                      }
                  }
              }  
     };

     function run() {
 
         _attach();
   
         _compile();    
     };

     return { get: get, run: run };
}();

});//end router