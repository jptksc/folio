
/***********************************************************************************
Parallax Scrolling
************************************************************************************/

$(document).ready(function(){
    $(window).bind('scroll', function(){
        parallaxScroll();
    });

    function parallaxScroll(){
        var scrolledY = $(window).scrollTop();

        $('.pullup').css('top','-' + ((scrolledY*0.05)) + 'px');
        $('.pulldown').css('margin-top','+' + ((scrolledY*0.15)) + 'px');
        $('.pullleft').css('left','+' + ((scrolledY*0.05)) + '%');
        $('.pullrights').css('width','+' + ((scrolledY*0.035)) + 'px');
    }

    $(window).scroll(function(){
        $('.fadeout').css('opacity', 1 - $(window).scrollTop() / 750);
    });
});

/***********************************************************************************
Smooth Scrolling
************************************************************************************/

$(document).on('click', '.scroll', function() {
    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 60
    });

    return false;
});

/***********************************************************************************
In View Detection
************************************************************************************/

$(document).ready(function() {
    var $animation_elements = $('.animated');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
});

/***********************************************************************************
Button Transitions for Work
************************************************************************************/

$(document).ready(function() {
    $(document).on('mouseover', 'article .media', function() {
        $(this).find('a').removeClass('fade-out slower').addClass('animated fast fade-in');
    });

    $(document).on('mouseleave', 'article .media', function() {
        $(this).find('a').removeClass('fade-in fast').addClass('animated slower fade-out');
    });
});

/***********************************************************************************
Forms
************************************************************************************/

// Auto expanding textareas.
(function(e){var t,n={className:"autosizejs",append:"",callback:!1,resizeDelay:10},r='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',i=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(r).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&i.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(r){return this.length?(r=e.extend({},n,r||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function n(){var t,n;"getComputedStyle"in window?(t=window.getComputedStyle(h,null),n=h.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,r){n-=parseInt(t[r],10)}),s.style.width=n+"px"):s.style.width=Math.max(p.width(),0)+"px"}function o(){var o={};if(t=h,s.className=r.className,f=parseInt(p.css("maxHeight"),10),e.each(i,function(e,t){o[t]=p.css(t)}),e(s).css(o),n(),window.chrome){var u=h.style.width;h.style.width="0px",h.offsetWidth,h.style.width=u}}function u(){var e,i;t!==h?o():n(),s.value=h.value+r.append,s.style.overflowY=h.style.overflowY,i=parseInt(h.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,f&&e>f?(h.style.overflowY="scroll",e=f):(h.style.overflowY="hidden",l>e&&(e=l)),e+=d,i!==e&&(h.style.height=e+"px",v&&r.callback.call(h,h))}function a(){clearTimeout(c),c=setTimeout(function(){var e=p.width();e!==g&&(g=e,u())},parseInt(r.resizeDelay,10))}var f,l,c,h=this,p=e(h),d=0,v=e.isFunction(r.callback),m={height:h.style.height,overflow:h.style.overflow,overflowY:h.style.overflowY,wordWrap:h.style.wordWrap,resize:h.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(d=p.outerHeight()-p.height()),l=Math.max(parseInt(p.css("minHeight"),10)-d||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in h?"oninput"in h?p.on("input.autosize keyup.autosize",u):p.on("propertychange.autosize",function(){"value"===event.propertyName&&u()}):p.on("input.autosize",u),r.resizeDelay!==!1&&e(window).on("resize.autosize",a),p.on("autosize.resize",u),p.on("autosize.resizeIncludeStyle",function(){t=null,u()}),p.on("autosize.destroy",function(){t=null,clearTimeout(c),e(window).off("resize",a),p.off("autosize").off(".autosize").css(m).removeData("autosize")}),u())})):this}})(window.jQuery||window.$)

$(document).ready(function() {
    $('textarea').autosize();
});

// Hook the save button for forms.
$(document).on('click', '#submit', function() {
    $("#contact-form").submit();

    return false;
});

/***********************************************************************************
Contact Form Processing
************************************************************************************/

$(function() {

    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('#contact-form .message');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {

        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })

        .done(function(response) {

            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        })

        .fail(function(data) {

            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});

/***********************************************************************************
Project Toggles
************************************************************************************/

// Open
$(document).on('click', '.open', function() {
    var myelement = $(this).attr('href');

    // Project variables.
    var project = $(this).data('project');
    var $screenshot = '<div class="media" style="background-image: url(\'assets/demo/'+project+'-full.jpg\');"></div>';
    var $title = $('#'+project+' .copy').contents('h2');
    var $text = $('#'+project+' .copy').contents('p');

    $('#project .content .screenshot').empty().append($screenshot);
    $('#project .content .copy').empty().append($title.clone()).append($text.clone());

    $(myelement).removeClass('fade-out-left closed').addClass('opened animated slow slide-in');
    
    return false;
});

// Close
$(document).ready(function() {
    function project_close(){
        var myelement = '#project';
        
        $(myelement).removeClass('slide-in opened').addClass('animated fast fade-out-left');

        setTimeout(function(){  
            $(myelement).addClass('closed');
        }, 250);
    }

    $(document).on('click', '.close', function() {
        project_close();
        
        return false;
    });

    $(window).scroll(function(){
        project_close();
    });
});
