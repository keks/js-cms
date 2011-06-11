Galleria.loadTheme("galleria/themes/classic/galleria.classic.min.js");

$(document).ready( function() {
  var breadcrumb=[];


  var menufy = function(){
    $("#menu").empty()
    var menu=[];
    var lowermenu=[];
    _.each( $("#content div"),
      function(e) {
        split = e.id.split('-');

        var menulink=$('<a href="#!'+split[0]+'">'+split[0]+"</a>");
        var lowermenulink=$('<a class="menu-'+split[0]+'" href="#!'+split[0]+'/'+split[1]+'">'+split[1]+"</a>");

        if(menu.indexOf(menulink.html()) === -1){
          $("#menu")
          .append(
            menulink[0]
          );
          menu.push(menulink.html());
        }

        if(lowermenu.indexOf(lowermenulink.html()) == -1){
          $("#lowermenu")
          .append(
            lowermenulink[0]
          );
          lowermenu.push(lowermenulink.html());
        }

      }
    )
    $("#lowermenu a").hide();


  }()
  
  // hide intro
  $("body").click(function () { 
    $("#intro-div").animate({height: "0", "padding-bottom": "0%", "padding-top": "0%"}, 600, function () { $("#intro-div").css({ 'border-top': '0px'}) });
   })
  
  var hasBeenClicked=[];
  // restore state when we load the page
  $(window).bind("load popstate", function(){
    var path = location.hash.substr(2);
    var breadcrumb = path.split('/');
    
    a = {};

    if(JSON.stringify(breadcrumb) == JSON.stringify([""])){
    console.log(breadcrumb);
      $("#intro-div").css({"height": "auto"});
    }
        
    //jQuery workaround, set the same duration for fadeOut and timeout for fadeIn
    $("#lowermenu a").fadeOut( 200);
    setTimeout(function(){
      $("#lowermenu a.menu-"+breadcrumb[0]).fadeIn();
      $("#content div").fadeOut();
    }, 200)

    // we have clicked a #lowermenu link yet
    if(breadcrumb[1] !== undefined){
      $("#content div").fadeOut(200);
      
      setTimeout(function(){
          if(breadcrumb[0] === "galleries") //TODO: remove hardcode
            console.log($("#"+breadcrumb[0]+"-"+breadcrumb[1]).galleria({
              width: "600px",
              extend: function(){
                  if(hasBeenClicked.indexOf(path) !== -1){
                    this.splice(0,1);
                  }else{
                    hasBeenClicked.push(path)
                  }
                  
                }
              
              }));
            //.splice(0,1);
          $("#"+breadcrumb[0]+"-"+breadcrumb[1]).fadeIn();
      }, 201)
    }
    
  });



});
