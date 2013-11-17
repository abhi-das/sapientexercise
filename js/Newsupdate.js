//http://msdn.microsoft.com/en-us/magazine/ff608209.aspx

(function( $, window, document, undefined ){

	Newsupdate = function( ele, opts ){
		
		ele.data( 'Newsupdate' , this );
		this.init( ele, opts );
	};
	
	Newsupdate.prototype.init = function( ele, opts ){

		var sfl = this;
		sfl.df = {
			url : 'http://address.com',
			thumbSize : '202',
			navSty : 'sd-nav-round',
			counter : 1,
			loop : false,
			setLoop : null,
			rootObj : null
		}
		sfl.df = $.extend( {}, sfl.df, opts );
		sfl.df.rootObj = this;
		//console.log( this );
		//console.log( ele );
		
		sfl.fetchDataFn(sfl).done(function( rst ){
			
			sfl.alignElementFn.call( sfl, ele, rst );
			
		}).fail( function( xhr, st ){
		
			console.log( st );
			
		});
		
	};
	Newsupdate.prototype.fetchDataFn = function(){
	
		//console.log(this);
		return $.ajax({
			url: this.df.url,
			cache : false,
			dataType: 'json'
		});

	};
	Newsupdate.prototype.alignElementFn = function( elem, rst ){
	
		var rootEle = elem, 
			rootObj = this;
		var hldWd = rootObj.df.thumbSize * rst.length + "px";
		//console.log( rootObj.df );
		
		
		$('<div></div>').addClass('slider-wapper').appendTo(rootEle);		
		$('<ul></ul>').addClass('slider-holder').appendTo(rootEle.find('.slider-wapper'));
		
		var sdhd = rootEle.find('.slider-wapper .slider-holder');

		rootEle.find('.slider-wapper')
		.css('width', rootObj.df.thumbSize+"px")
		.find('.slider-holder').css({
			width : hldWd
		});
		
		$("<ul></ul>")
		.addClass("slider-nav")
		.appendTo(rootEle.find('.slider-wapper'));
		
		$.each( rst, function( idx, res ){
			//Start adding element into DOM
			
			$("<li></li>").appendTo(rootEle.find('.slider-nav'));
			$("<li></li>").appendTo(sdhd);
			
			$('<img>',{
				src: res.image,
				alt: "image descption",
				title: res.heading
			}).appendTo( sdhd.find('li').eq(idx) );
			
			$('<h2></h2>',{
				text: res.heading
			}).addClass('adv-title')
			.appendTo( sdhd.find('li').eq(idx) );
			
			$('<p></p>',{
				text: res.text
			}).addClass('adv-decs')
			.appendTo( sdhd.find('li').eq(idx) );
			
			$('<a></a>',{
				href: "javascript: void(0);",
				text: "Hot Jobs"
			}).appendTo( sdhd.find('li').eq(idx) );
		
		});
			
		rootEle.find('ul.slider-nav').find('li').addClass( rootObj.df.navSty );
		rootEle.find('.slider-nav li').eq(0).css('background', "#000");

		
		if( rootObj.df.loop ){
			rootObj.df.setLoop = setInterval(function(){
				rootObj.displaySlideFn.call( rootObj, rootEle );
			},3000);
		}else{
			rootEle.find('.slider-nav li').bind('click', { sfObj:rootObj, rtEle:rootEle }, rootObj.navIconEventFn);
			rootEle.find('.slider-nav li').css('cursor', 'pointer');
		}
	
	};
	Newsupdate.prototype.displaySlideFn = function( rEle ){
	
		var $this = this,
			$rEle = rEle;

		var prevCtr = $this.df.counter; 
		var sdAmt = ($this.df.thumbSize * $this.df.counter)* -1;
		
		if( $this.df.counter < 2 ){
			$this.df.counter++;
		}else{
			$this.df.counter = 0;
		}
		
		$rEle.find('.slider-holder').stop().animate({marginLeft: sdAmt+"px"},500);
		$rEle.find('.slider-nav li').each( function(){
			$(this).css('background', "#fff");
		});
		$rEle.find('.slider-nav li').eq(prevCtr).css('background', "#000");
	
	};
	Newsupdate.prototype.navIconEventFn = function(ev){
		
		var sf = ev.data.sfObj,
			rootEle = ev.data.rtEle;
		
		//console.log(this);
		sf.displaySlideFn.call( sf, rootEle );
	
	};	
	$.fn.Newsupdate = function( opts ){
	
		return this.each( function(){
			( new Newsupdate( $(this), opts ) );
		});
	}
})(jQuery, window, document);