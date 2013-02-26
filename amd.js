   ;(function( context ){

       //Global settings!
       var namespace = "APP",

           filepath = "modules/",

           filePrefix = 'APP.',

           definedModules = {},

           doc = document;

       //set app namespace
       context[namespace] = {};

       var loadScript = function(key, src, callback) {

           var head = document.getElementsByTagName("head")[0];

           var s = doc.createElement("script");

               s.setAttribute("type", 'text/javascript');

               s.setAttribute("src", src);

               s.onreadystatechange = function(){

                 if(s.readyState == 'complete' || s.readyState == 'loaded') { 

                        callback( key ) 
                  }
               } 

               s.onload = function() {

                 callback( key )
               }

               head.appendChild( s )
       };

       var forEach = function(arr, callback) {

           var n = arr.length;
  
           if(n > 0) {
              for(var index = 0;index < n; index++) {
                  callback(index, arr[index])
              } 
           } else {
              for(var key in arr) {
                  callback(arr[ key ])
              }  
           }
       };

       //check if dependencies exist, otherwise load them!
       var handleDependencies = function(dependencies, callback) {

           var _dependencies = [], 

               len = dependencies.length, 

               index = 0;

           if(len == 0) {

              callback( _dependencies );

              return true;
           } 

           forEach(dependencies, function(i, d){

                   if(definedModules[ d ]) {

                      _dependencies[i] = APP[ d ]

                      index++;

                      if(index == len){

                        callback( _dependencies )
                      }

                   } else {

                      loadScript({i: i, d: d}, filepath + filePrefix + d + '.js', function( obj ){

                             _dependencies[ obj.i ] = APP[ obj.d ]

                            index++; 

                            if(index === len) {

                               callback( _dependencies )
                            }

                      })
                   }
           }) 
       };

       context["define"] = function(name, dependencies, callback) {

              definedModules[ name ] = {
                   name: name,
                   dependencies: dependencies
              };

              handleDependencies(dependencies, function( d ){

                    context[ namespace ][ name ] = callback.apply(this, d)  
              })
       };


       context["require"] = function(dependencies, callback) {

              handleDependencies(dependencies, function( d ){

                    callback.apply(this, d)                       
              })
       };

    })( this );
