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

Example#1
---------
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

Example#3
--------

```html
   <div id="bd" role="main">

      <div id="w">
		<section id="sform">
			<input type="text" id="s" name="s" class="sfield" placeholder="Enter a search tag..." autocomplete="off">
		</section>
		
		<section id="photos"></section>
	</div>

	</div>
```

```js
require(["cui","dom","event","ajax"], function(cui, dom, event, ajaxobj){

    var sfield = dom.select("#s"),
        container = dom.select("#photos"),
        timer;


    function instaSearch() {

        dom.addClass(sfield, "loading")

        var q = dom.select("#s").value

        var url = "proxy.php?q=" + q;

        ajaxobj.ajax("GET", url, function( data ){
 
                    //eval JSON received from proxy.php
                    data = eval("(" + data + ")");

                    //remove the loading
                    dom.removeClass(sfield, "loading");
  
                    //define an empty variable
                    var output = ''; 

                    //for each object execute
		        dom.each(data, function(item, i) {
 
                        output += '<div class="p"><a href="'+data[i].src+'" class="fullsize" target="_blank"><img src="full-image.png" alt="fullsize"></a> <a href="'+data[i].url+'" target="_blank"><img src="'+data[i].thumb+'"></a></div>';

                    });

                    //insert the result to the container
                    container.html( output );

        }) 
    }

    sfield.Keydown( function( e ){

       if(e.keyCode == '32' || e.keyCode == '188' || e.keyCode == '189' || e.keyCode == '13' || e.keyCode == '190' || e.keyCode == '219' || e.keyCode == '221' || e.keyCode == '191' || e.keyCode == '220') {

         e.preventDefault();

       } else {

    		 clearTimeout(timer);

			timer = setTimeout(function() {

     		             instaSearch();

			}, 900);   
       }

    });
});

```

DEMOS
-----

   * [http://thinkphp.ro/apps/js-hacks/cui2/](http://thinkphp.ro/apps/js-hacks/cui2/)

## License

  MIT
