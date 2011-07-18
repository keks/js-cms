Galleria.loadTheme("galleria/themes/classic/galleria.classic.min.js");

$(document).ready( function() {
  var breadcrumb=[];


  //make menu entries
  var menufy = function(){
    $("#menu").empty()
    var menu=[];
    var lowermenu=[];
    $.each( $("#content div"),
      function(i, e) {
        split = e.id.split('-');

        //don't make menu entries for thumbnails
        if( split[0] === "thumbs" ) return;

        var menulink=$('<a href="#!'+split[0]+'">'+split[0]+"</a>");
        var lowermenulink=$('<a class="menu-'+split[0]+'" href="#!'+split[0]+'/'+split[1]+'">'+split[1]+"</a>");
        var thumbdiv=$('<div id="thumbs-'+split[0]+'" />')

        if(menu.indexOf(menulink.html()) === -1){
          $("#menu").append(
            menulink[0]
          );

          menu.push(menulink.html());
        }

        thumbTarget = $("div#thumbs-"+split[0]);
        if( thumbTarget.length ===0  ){
          thumbTarget=thumbdiv.thumb();
          $("#content").append(
            thumbTarget
          );
        }
        Thumb.get(thumbTarget).addJSON(
        [{
          "id": "thumb-"+split[0]+"-"+split[1],
          "src": $(e).attr('thumb'),
          "txt": $(e).attr('alt'),
          "href": "#!"+split[0]+'/'+split[1]
          }])


        if(lowermenu.indexOf(lowermenulink.html()) == -1){
          $("#lowermenu").append(
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
      $("#intro-div").css({"height": "auto"});
    }
        
    //jQuery workaround, set the same duration for fadeOut and timeout for fadeIn
    $("#lowermenu a").not($("#lowermenu a.menu-"+breadcrumb[0])).fadeOut( 200);
    setTimeout(function(){
      $("#lowermenu a.menu-"+breadcrumb[0]).fadeIn();
    }, 200)

    $("#content div").fadeOut(200);

    // we have clicked a #lowermenu link
    if(breadcrumb[1] !== undefined){
      
      setTimeout(function(){
        if(breadcrumb[0] === "galleries") { //TODO: remove hardcode
          $("#"+breadcrumb[0]+"-"+breadcrumb[1]).galleria({
            width: "600px",
            extend: function(){
              if(hasBeenClicked.indexOf(path) !== -1){
                this.splice(0,1);
              }else{
                hasBeenClicked.push(path)
              }
                
            }
            
          });
        }
        $("#"+breadcrumb[0]+"-"+breadcrumb[1]).fadeIn();
      }, 201)
    } else {
      console.log("setting timer to show #thumbs-" + breadcrumb[0]);
      setTimeout(function(){
        console.log("fading in #thumbs-" + breadcrumb[0]);
        $("#content div#thumbs-"+breadcrumb[0] + " *, #content div#thumbs-"+breadcrumb[0]).fadeIn();
      }, 201)


    }
    
  });



});
