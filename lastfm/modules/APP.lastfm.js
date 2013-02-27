define("lastfm", ["cui", "dom", "event", "yql"], function(cui, dom, event, Y ){

      var _lastfm = function() {

          var user = 'thinkphp',

              url;              
         
          function init() {

              var href = dom.select("#lastFM a").toString().split("/");

              var username = href [ href.length - 1 ] || user;

              url = 'use "http://thinkphp.ro/apps/lastfm/YQL-open-data-table/recentlastfm.xml" as lastfm;select * from lastfm where username="'+ username +'" and api_key="2993c6e15c91a2890c2f11fa95673067"';
  
             return this;
          }

          function and() {

             return this;
          }

          function render() {

                Y.yql(url, function( data ){

                    dom.select("#result").html( data.query.results.result ) 
                })       
          }

          return {init: init, 
                  and: and, 
                  render: render}
      }();

      return _lastfm;
});


