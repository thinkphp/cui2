CUI2 AMD (Asynchronous Module Definition)
-----------------------------------------

The overall goal for the AMD format is to provide a solution for modular JavaScript that developers can use today. It was born
out of Dojo's real world experience using XHR+eval and proponents of this format wanted to avoid any future solutions suffering
from the weaknesses of those in the past. When we say an app is modular, we generally mean it's composed of a set of highly decoupled,
distinct pieces of functionality stored in modules. As you probably know, loose coupling facilitates easier maintainability of apps
by removing dependencies where possible.


Usage:
------

```js

    define("core", [], function(){

                  return {x: 11, y: 33 }
    });


    define("dom", [], function(){

                  return {a: 1, b: 2 }
    });


    define("event", [], function(){

                  return {b: 3, b: 5 }
    });


    define("jsonp", [], function(){

                  return {c: 7, d: 8 }
    });

    define("yql", [], function(){

                  return {e: 100, f: 200 }
    });


    define("router", [], function(){

          return {get: function(){}, run: function(){}} 
    });

    require(["core","dom","event","jsonp", "router"], function(core, dom, event, jsonp, yql, app){

             app.get("search/:what", function( data ){
                     console.log( data )
             })

             app.run();

             //core object is available and ready to use
             console.log(core)

             //dom object is available and ready to use
             console.log(dom)

             //event object is available and ready to use
             console.log(event)

             //jsonp object is available and ready to use
             console.log(jsonp)

             //yql object is available and ready to use
             console.log(yql)
    });

```

Example
-------
```html

Select a programming language <input type="text" id="tags" />

```

```js
require(["ready", "dom", "autosuggest"], function(app, dom, widget){

var Autosuggest = widget.autosuggest

 var suggestions = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"];

  app.ready(function(){
   
      var suggest = Autosuggest(dom.select("#tags"), suggestions)
  })

});
```

Example#2
---------

```html
<ul id="menu">

<li>
   <a href="#">Event Delegation List 1</a>
   <ul>
       <li>item1</li>
       <li>item2</li>
       <li>item3</li>
       <li>item4</li>
       <li>item5</li>
   </ul>
</li>

<li>
   <a href="#">Event Delegation List 2</a>
   <ul>
       <li>item1</li>
       <li>item2</li>
       <li>item3</li>
       <li>item4</li>
       <li>item5</li>
   </ul>
</li>

<li>
   <a href="#">Event Delegation List 3</a>
   <ul>
       <li>item1</li>
       <li>item2</li>
       <li>item3</li>
       <li>item4</li>
       <li>item5</li>
   </ul>
</li>

</ul>

```


```js
require(["ready","dom","delegate"], function(r, dom, d){

var ready = r.ready, 
    delegate = d.delegate;

ready(function(){

   delegate(dom.select("#menu"), 'li a', 'click', function( e ){

              var ul = e.target.parentNode.querySelector("ul")

                  if(ul.style.display == "none") {

                     ul.css("display: block") 

                  } else {

                     ul.css("display: none")
                  }

                  if(window.console) console.log(e.target)
    }, false);
       
})

});

```

DEMOS
-----

   * [http://thinkphp.ro/apps/js-hacks/cui2/](http://thinkphp.ro/apps/js-hacks/cui2/)
