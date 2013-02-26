var template = function(){

  var _template = function(tmp, ob) {

      return tmp.replace((RegExp("{([^{}]*)}","gi")), function(tag, prop){

             return ob[prop]
      })
  } 
  return {template: _template};
}();

define("template",[], function(){
      return template;
})
