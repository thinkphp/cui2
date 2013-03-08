define("autosuggest", ["event"],  function( event ) {

var find = function(arr, fn) {

    if(typeof fn != 'function') {

        if(typeof fn == 'object') fn = objectToFunction( fn );
    } 

    for(var i=0; i < arr.length; i++) {

        if( fn(arr[i], i) ) return arr[i]
    }

function objectToFunction( obj ) {

    return function( o ) {

           for(var key in obj) {

               if(o[ key ] != obj[ key ]) return false
           }

       return true
    } 
}

};

var bind = function(obj, fn){

    return fn.binding( obj )
};

var events = {
 
    bind: function(elem, evType, fn, capture) {

       event.bind(elem, evType, fn, capture) 

       return fn
    },

    unbind: function(elem, evType, fn, capture) {

       event.unbind(elem, evType, fn, capture) 

       return fn
    }
};

function Autosuggest(elem, suggestions) {

   if(!(this instanceof Autosuggest)) return new Autosuggest(elem, suggestions)

   //store the input element
   this.elem = elem;

   //store the suggestions
   this.set(suggestions);

   this.oninput = bind(this, this.oninput)

   this.onkeydown = bind(this, this.onkeydown)

   //bind event listeners
   this.bind()
}

Autosuggest.prototype.get = function() {

   return this.suggestions 
}

Autosuggest.prototype.set = function( v ) {

   return this.suggestions = v
}


Autosuggest.prototype.oninput = function() {

      //user is pressing a key that we don't want to react
      if(this.ignore) return;

      //reference to input element
      var input = this.elem;

      //get current string value
      var value = input.value;

      //don't suggest if there is nothing there!
      if(value.length == 0)   return;

      var suggestions = this.get();

      //we have not suggestions
      if(!suggestions || suggestions.length == 0) return;  

      //attempt to find a suggestion
      var suggestion = this.suggest(value, suggestions);

      //got nothing
      if(null == suggestion) return;      

      //got a suggestion, set it as the input's new value
      input.value = suggestion 

      var start = value.length;
  
      var end = suggestion.length; 
 
      window.setTimeout(function(){

             input.setSelectionRange(start, end)
      }, 0)
}

Autosuggest.prototype.onkeydown = function( e ) {

       //get the code
       var code = e.keyCode;

       //ignore del & backspace
       this.ignore = 8 == code || 46 == code;  
}


Autosuggest.prototype.bind = function() {

      events.bind(this.elem, 'input', this.oninput)

      events.bind(this.elem, 'keydown', this.onkeydown)
}

Autosuggest.prototype.unbind = function() {

      events.unbind(this.elem, 'input', this.oninput)

      events.unbind(this.elem, 'keydown', this.onkeydown)
}

Autosuggest.prototype.suggest = function(value, suggestions) {

      var val = value.toLowerCase()

      return find(suggestions, function( s ){

             return s.toLowerCase().substring(0, val.length) === val
      }) 
}

  return {autosuggest: Autosuggest}
})