$(document).ready(function () {


	//Auto Scroll Up button

	var offset = 50;
var track = "";
	var duration = 300;

	$(window).scroll(function () {

		if (jQuery(this).scrollTop() > offset) {

			$('.back-to-top').fadeIn(duration);

		} else {

			$('.back-to-top').fadeOut(duration);

		}

	});



	$('.back-to-top').click(function (event) {

		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, duration);

		return false;

	})
	//Auto Scroll Button Finish

	//Ajax call start................
	var ofset = 0;
       var limit = 5;
	
	function ajaxCall(track,ofset,limit){
		
	
				 return $.ajax({

				async: true,
				crossDomain: true,
				url: "https://api.spotify.com/v1/search?type=track&q=" + track + "&offset="+ofset+"&limit="+limit,
				method: "GET",

				headers: {
					Authorization: "Bearer BQCoTgb7XKEb4ZFnT4lTnU5WktofizjNJFhZ54NqbALPCqPBcLHxC3UmLiAPgtIqPXmiVHyNG_z4-yvGbXTsoKz3j7mrLvkk1WLvvTMsKgbOHYXWpOhJFkDKnUI2l530Qp-4UvG2176FA84bEt3wxR4YPR3cf7l6OgkxWAhm6bBKTtUs8w",


				},
				dataType: "json",

				success: function (data) {
					var widget = show(data);
					$('#table').html(widget);
					$('#txtCity').val('');
					console.log(data);
				}

			});
				
			}
	
	$('#prev').click(function(e){
			e.preventDefault();
			if(ofset>=5){
				ofset=ofset-5;
				ajaxCall(track,ofset,limit);
			}
			else{
				return false;
			}
			
		});
	
	$('#next').click(function(e){
			
			
			e.preventDefault();
			ofset=ofset+5;
			ajaxCall(track,ofset,limit);
			
		});
	
	$('#btn').click(function () {
		
		
		track = $('#txtCity').val();
		
			ajaxCall(track,ofset,limit);
		

	});
	
	
	
	function show(data) {
		$('#table').empty();
        //ofset = 5 ;
       // var limit = 5;

		for (var i = 0; i < data.tracks.items.length; i++) {
			$("tbody").append("<tr><td>" + (data.tracks.items[i].id) + "</td><td>" + (data.tracks.items[i].name) + "</td><td>" + (data.tracks.items[i].album.name) + "</td> <td > " + (((data.tracks.items[i].duration_ms) / 1000) / 60) + "</td><td > " + (data.tracks.items[i].popularity) + "</td></tr>");
		}
	}
});
