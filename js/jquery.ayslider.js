(function($) {

    $.fn.aySlider = function(options){
        var defaults = { //set default attributes
            speed : 2000,
            pause : 1000,
            transition : 'slide'
        },

        options = $.extend(defaults, options);

        this.each(function() {

            var $this = $(this),
            $children = $this.children();

            $this.wrap('<div class="slider-wrap" />'); //wrapping imgs

            if(options.pause <= options.speed){
                options.pause = options.speed + 100;
            }

            $this.css({ //setting css
                'width' : '9000px',
                'position': 'relative',
                'padding' : 0
            });

            if(options.transition === 'slide'){
                $children.css({ //referring to all the imgs inside the <ul>
                    'float' : 'left',
                    'list-style' : 'none',
                    'width' : '400px',
                    'height' : '400px'
                });

                $('.slider-wrap').css({
                    'width' : $children.width(), //width of the content
                    'overflow': 'hidden'
                });

            }

            if(options.transition === 'fade'){
                $children.css({
                    'width' : $children.width(),
                    'position' : 'absolute',
                    'left' : 0, //this will create that stacking feature
                    'width' : '400px',
                    'height' : '400px'
                });

                for(var i = $children.length - 1, y = 0; i >= 0; i --, y++){
                    $children.eq(y).css('zIndex', i + 99999);     //this is going to find the first item in the list
                }

                fade();

            } // end slide if

            if(options.transition === 'slide'){
                slide();
            }

                function fade(){
                    setInterval(function(){
                        $this.children(':first').animate({
                             'opacity' : 0},
                              options.speed, 
                              function(){
                                $this
                                .children(':first')
                                .css('opacity' , 1)
                                .css('zIndex', $this.children(':last').css('zIndex') - 1)
                                .appendTo($this);
                        })
                    }, options.pause);
                } //end fade

                function slide(){
                    setInterval(function(){
                        $this.animate({
                             'left' : '-' + $this.parent().width()},
                              options.speed, 
                              function(){
                                $this
                                .css('left', 0)
                                .children(':first')
                                .appendTo($this);
                        })
                    }, options.pause);
                } //end fade

        });

    }

})(jQuery);