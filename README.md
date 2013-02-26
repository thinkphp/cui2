CUI2 AMD (Asynchronous Module Definition)
-----------------------------------------

The overall goal for the AMD format is to provide a solution for modular JavaScript that developers can use today. It was born
out of Dojo's real world experience using XHR+eval and proponents of this format wanted to avoid any future solutions suffering
from the weaknesses of those in the past. When we say an app is modular, we generally mean it's composed of a set of highly decoupled,
distinct pieces of functionality stored in modules. As you probably know, loose coupling facilitates easier maintainability of apps
by removing dependencies where possible.


Usage:
------

    define("core", [], function(){

                  return {x: 11, y: 33 }
    });


    define("dom", [], function(){

                  return {a: 1, b: 2 }
    });


    define("event", [], function(){

                  return {b: 3, b: 5 }
    });


    define("jsonp",[], function(){

                  return {c: 7, d: 8 }
    });

    define("yql",[], function(){

                  return {e: 100, f: 200 }
    });


    require(["core","dom","event","jsonp"], function(core, dom, event, jsonp, yql){

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

Demos
-----

   * [http://thinkphp.ro/apps/js-hacks/cui2/](http://thinkphp.ro/apps/js-hacks/cui2/)
