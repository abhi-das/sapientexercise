(function( $, window, document, undefined ){

	simple = function( elem, opts ){
	
		elem.data( 'simple', opts );
		//console.log(elem);
		this.initialiseSimple( elem, opts );

	};
	simple.prototype.initialiseSimple = function( elem, opts ){

		var self = this;
		self.def ={
			url: 'http://localhost/Exercise/data.json',
			urlType: 'post',
			color: '#88f585',
			navType: 'round'
		};
		self.def = $.extend( {}, self.def, opts );

		//console.log( self.def );
		self.eventList.navActionFn.call( self, elem );
	};
	
	simple.prototype.eventList = {
	
		navActionFn : function( elem ){
			var self = this;
			console.log( self );
		}
	
	};
	
	$.fn.simple = function( opts ){
		
		return this.each(function(){
			( new simple( $(this), opts ) )
		});
	}
})(jQuery, window, document)