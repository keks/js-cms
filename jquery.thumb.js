(function () {
  var thumbs = {};

  Thumb = function(cfgObj){
    if(typeof(cfgObj) !== "object") throw("config object missing!")
    if(cfgObj.parentElement!= null){
      this.parentElement = cfgObj.parentElement
    }else{
      throw("no parent element!");
    }
    return this;
  }

  Thumb.prototype.addElement = function(element){
    this.parentElement.append(element);
    return this.update();
  }

  Thumb.prototype.addJSON = function(json){
    var self = this;
    $.each(json, function(i, item){
      console.log(self);
      var img = $('<a href="'+item.href+'"><img src="'+item.src+'" /></a>' );
      var txt = $('<p>'+item.txt+'</p>');
      ret=$('<div class="griditem" id="'+item.id+'"/>')
        .append(img)
        .append(txt);

      self.addElement(ret)
    })
    return this;
  }


  Thumb.prototype.update = function(){
    $(this.parentElement).find("div.griditem").each(function(i, element ) {
      $(element).hover(function(e){
        $(this).find('img').fadeTo(175,.20);
      }, function(e){
        $(this).find('img').fadeTo(175,1);
      })
    });
    return this;
  }

  Thumb.get = function(jqryElement){
    return thumbs[jqryElement[0]];
  }

  $.fn.thumb = function(obj){
    if( obj === undefined) obj = {parentElement: this};
     
    thumbs[this[0]] = new Thumb(obj);
    console.log(thumbs)
    thumbs[this[0]].update()

    return this;
  }


})()

