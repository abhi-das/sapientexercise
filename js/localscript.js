/* Validate Form */
var frm = $('.contact-form').validate({
	errorClass: "errorSty",
	rules:{
		uname : "required",
		pword : {
			required : true,
			minlength : 8
		},
		cpword : {
			required : true,
			minlength: 8,
			equalTo: "pword"
		},
		email : {
			required : true,
			email : true
		},
		website : {
			required : true,
			url : true
		},
		sp : "required"
	},
	 messages: {
		uname: "Enter your firstname and lastname",
		pword: "Enter your password.",
		cpword: "Enter your confirmed password",
		email: "Enter your email.",
		website: "Enter your website url.",
		sp: "Select your domain."
	}
});

$('#btn-submit').submit( function(ev){
	
	ev.preventDefault();
	if( $('.contact-form').valid() ){
		console.log( "success" );
		$('.validator-msg').toggle('400');
	}else{
		frm.focusInvalid();
	}
	//ev.stopPropagation();
	return false;
});

/* Add Top Slider - Javascript */
/*
	var custmCofig = {
		url : "http://localhost/Exercise/json/carousel-data.json",
		navSty : 'sd-nav-round',
		loop : true
	};

	new NewsSlider( $('.news-slider.top') , custmCofig );
*/
/* Add Footer Slider - Javascript */
/*
	var custmCofigFooter = {
		url : "http://localhost/Exercise/json/carousel-data.json",					
		navSty : 'sd-nav-round',
		loop : false
	};
	new NewsSlider( $('.news-slider.footer') , custmCofigFooter );
*/
/* Add Top Slider - jQuery */
	$('.top.news-slider').Newsupdate({
		url : "http://localhost/Exercise/json/carousel-data.json",
		navSty : 'sd-nav-round',
		loop : true
	});
/* Add Footer Slider - jQuery */
	$('.footer.news-slider').Newsupdate({
		url : "http://localhost/Exercise/json/carousel-data.json",
		navSty : 'sd-nav-round',
		loop : false
	});