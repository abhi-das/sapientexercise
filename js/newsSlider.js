/*
	Custom Plug-in Logic
	Developer : Abhishek 
	Release Date : 10/7/2013
*/
function NewsSlider( ele, conf ){

	var self = this;
	
	self.ele = ele;
	self.cf = $.extend({},self.config, conf );
	
	//console.log( this );
	
	this.methods.fetchDataFn.call( this );
}
NewsSlider.prototype.config = {
	url : null,
	thumbSize : '202',
	navSty : 'sd-nav-round',
	counter : 1,
	loop : true,
	setLoop : null
}
NewsSlider.prototype.methods = {
	
	fetchDataFn : function(){
		var $this  = this;
		//console.log(this.cf.url);
		$.ajax({
			url: $this.cf.url,
			cache: false,
			dataType: 'json',
			success: function( result ){
				//console.log(result);
				$this.methods.elementFrgmtFn.call( $this, result );
			}
		});
	},
	elementFrgmtFn : function( rst ){
	
		var $this = this;
		//console.log(rst);
		
		var hldWd = $this.cf.thumbSize * rst.length + "px";
			
		$('<div></div>').addClass('slider-wapper').appendTo($this.ele);		
		$('<ul></ul>').addClass('slider-holder').appendTo($this.ele.find('.slider-wapper'));
		
		var sdhd = $this.ele.find('.slider-wapper .slider-holder');

		$this.ele.find('.slider-wapper')
		.css('width', $this.cf.thumbSize+"px")
		.find('.slider-holder').css({
			width : hldWd
		});
		
		$("<ul></ul>")
		.addClass("slider-nav")
		.appendTo($this.ele.find('.slider-wapper'));
		
		$.each( rst, function( idx, res ){
			//Start adding element into DOM
			
			$("<li></li>").appendTo($this.ele.find('.slider-nav'));
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
		
		
		$this.ele.find('ul.slider-nav').find('li').addClass( $this.cf.navSty );
		$this.ele.find('.slider-nav li').eq(0).css('background', "#000");
		
		//console.log( $this.cf.loop );
		
		if( $this.cf.loop ){
			$this.cf.setLoop = setInterval(function(){
				$this.methods.displaySlideFn.call( $this, $this.ele );
			},3000);
		}else{
			$this.ele.find('.slider-nav li').bind('click', { sfObj:$this, rtEle:$this.ele }, $this.methods.navIconEventFn);
			$this.ele.find('.slider-nav li').css('cursor', 'pointer');
		}
		//console.log( rootEle );
	},
	navIconEventFn : function(ev){
		
		var sf = ev.data.sfObj,
			rootEle = ev.data.rtEle;
		
		//console.log(this);
		sf.methods.displaySlideFn.call( sf, rootEle );
	
	},
	displaySlideFn: function( rtEle ){
		
		var $this = this;
		//console.log( this );
		var prevCtr = $this.cf.counter; 
		var sdAmt = ($this.cf.thumbSize * $this.cf.counter)* -1;
		
		if( $this.cf.counter < 2 ){
			$this.cf.counter++;
		}else{
			$this.cf.counter = 0;
		}
		
		$this.ele.find('.slider-holder').stop().animate({marginLeft: sdAmt+"px"},500);
		$this.ele.find('.slider-nav li').each( function(){
			$(this).css('background', "#fff");
		});
		$this.ele.find('.slider-nav li').eq(prevCtr).css('background', "#000");
	}	
}
