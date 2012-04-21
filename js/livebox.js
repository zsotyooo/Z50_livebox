/*
 *	@author: Zsotyooo
 *	@description:
 *
 */

(function($){
	$.fn.liveBox=function(options)
	{
		$(this).each(
			function(elementIndex)
			{
//				return;
				new $liveBox(elementIndex,this,options);
			}
		);
	}

	//konstruktor
	$.liveBox=function(elementIndex,element,options)
	{
		this.instanceID=$liveBox.instanceCnt;
		$liveBox.instances.push(this);
		$liveBox.instanceCnt++;

		this.element=element;

		if(options == undefined)options={};
		this.options={};
		$.extend(
			this.options,
			$liveBox.defaultoptions,
			options
		);

//		this.hoverOnly();
		var This=this;
                this.addEvents();

		
	}

	//shortcutok
	$liveBox=$.liveBox;
	$liveBox.fn=$liveBox.prototype={};
	//egyszerÅ±sÃ©g kedvÃ©Ã©rt a jQuery extend fgv-Ã©t hasznÃ¡ljuk a statikus Ã©s pÃ©ldÃ¡ny szintÅ± elemeknÃ©l is
	$liveBox.fn.extend = $liveBox.extend = $.extend;

	//statikus vÃ¡ltozÃ³k, fÃ¼ggvÃ©nyek:
	$liveBox.extend(
	{
		defaultoptions: {
			timeoutTime: 1000,
			animationDuration: 'fast',
			dropClass: 'BreadCrumbItem_active',
			hoverClass: 'BreadCrumbItem_hover',
			hideAll: true,
			mode: 'over'
		},
		instances:[],
		instanceCnt: 0,
		/*
		 * Itt adhatÃ³ak meg a konstansok
		 */
		constants: {

		}
	});

	//Instance fÃ¼ggvÃ©nyei
	$liveBox.fn.extend({
		createElements: function()
		{
			var This=this;
			
		},
		/*
		 * Ez rakja rÃ¡ az esemÃ©nyeket
		 */
		addEvents: function()
		{
			var This=this;

			$(document).bind(
				'mousemove', function(e){

                                        var domTransformProperty = Modernizr.prefixed('transform');
                                        var cssTransformProperty = domToCss(domTransformProperty);
                                        var $el=$(This.element);
                                        var $doc=$(document);
                                        var pX = e.pageX;
                                        var pY = e.pageY;
                                        var eW = $el.outerWidth();
                                        var eH = $el.outerHeight();
                                        var eL = $el.offset().left;
                                        var eT = $el.offset().top;
                                        var eHW = eW/2;
                                        var eHH = eH/2;
                                        var rX = pX-eL;
                                        var rY = pY-eT;
                                        var dW = $doc.width();
                                        var dH = $doc.height();
                                        
                                        var scaleX = 0;
                                        if(rX>0){
                                            if(rX < eHW) scaleX = (rX/eHW * 0.04);
                                            else if(rX < eW) scaleX = ((eW-rX)/eHW * 0.04);
                                        }
                                        var scaleY = 0;
                                        if(rY>0){
                                            if(rY < eHH) scaleY = (rY/eHH * 1.04);
                                            else if(rY < eH) scaleY = ((eH-rY)/eHH * 1.04);
                                        }
                                        
                                        var scale = 1+scaleX*scaleY;
                                        
                                        
                                        var rotY = -15 + (30 * pX / dW);
                                        var rotX = (-1)*(-15 + (30 * pY / dH));
                                        


                                        var sceneTransform = 'scale3d(' + scale + ', ' + scale + ', ' + scale + ') translateY(100px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
//                                        console.log(sceneTransform);
                                        $el.css(cssTransformProperty, sceneTransform);
                                        
                                        if(scale>1) {
                                            $el.css('z-index', '100');
//                                            $el.css('margin-top', (-150*(scale-1))+'px');
//                                            $el.css('margin-bottom', (150*(scale-1))+'px');
                                        }
                                        else $el.find('div').css('z-index', '1');
                                        
				}
			);

		}
	});
        function domToCss(property) {

                var css = property.replace(/([A-Z])/g, function (str, m1) {
                        return '-' + m1.toLowerCase();
                }).replace(/^ms-/,'-ms-');

                return css;
        }
})(jQuery)
