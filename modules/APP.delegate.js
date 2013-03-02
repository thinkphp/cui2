define("delegate", ["event"], function( event ){

    return {

    delegate: function(elem, selector, type, fn, useCapture) {

          var match = function(el, selector) {
 
              var nodes = el.parentNode.querySelectorAll( selector );
 
              for(var i=0, len = nodes.length; i < len; i++) {

                   if(nodes[i] == el) {

                      return true
                   }
              }        
                      return false;   
           }     

          return event.bind( elem, type, function( e ){

                  if(match(e.target, selector)) {

                     fn.call(elem, e)
                  }

          }, useCapture)
    }

    }

});
