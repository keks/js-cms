_foo = function () {
  var that;
  $.prototype.thumb = function(cfgObj){
    that=$(this);
    if((cfgObj!==undefined) && (cfgObj.dataSource !== undefined)){
      that.thumb.addJSON(cfgObj.dataSource);
    }
    that.thumb.update()
    return that;
  }

  $.prototype.thumb.addJSON = function(json){
      _.map(json, function(item){
        if( item === undefined) return false
        var img = $('<img src="'+item.src+'" />"' );
        var txt = $('<p>'+item.txt+'</p>');
        var ret=$('<div class="griditem" id="'+item.id+'"/>')
          .hover(function(e){
            $(this).find('img').fadeTo(175,.20);
          }, function(e){
            $(this).find('img').fadeTo(175,1);
          })
          .append(img)
          .append(txt)


        that.thumb.addElement(ret)
      })
    return that;
  }

  $.prototype.thumb.addElement = function(element){
    that.append(element);
    return that;
  }

  $.prototype.thumb.update = function(){
    that.find("div.griditem").each(function(i,element) {
      $(element).hover(function(e){
          $(this).find('img').fadeTo(175,.20);
        }, function(e){
          $(this).find('img').fadeTo(175,1);
        }
      )
    });
    return that;
  }

}()

