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
        var year ="";
		var selGenre="";

	
	function ajaxCall(track,selGenre,year,ofset,limit){
		
	
				 return $.ajax({

				async: true,
				crossDomain: true,
				url: "https://api.spotify.com/v1/search?q=" + track +"%20year:" + year +"%20genre:"+ selGenre+ "&type=track&offset=" + ofset + "&limit=" + limit,
				method: "GET",

				headers: {
					Authorization: "Bearer BQB6RnuDywq2JhEjUGvWF8lsY-W5gcL9pSXKuQRz36xOm6cTqZxt_flOlBi3lk2d2hpjpU1931eH5S-roOoXYL2OjKjS2enMU_i0xy_UMCKflQvDAusnlDSKdMITvnviPsmOo2WamWXehEFDSj-PRUVjaV2j8aWTajx8-IH-q22AePvbUQ",


				},
				dataType: "json",

				success: function (data) {
					var widget = show(data);
					$('#table').html(widget);
					$('#txtCity').val('');
					console.log(data);
				$("#hidesearch").hide();
				}


			});
				
			}

	$('#prev').click(function(e){
			e.preventDefault();			
			if(ofset>=5){
				ofset=ofset-5;
				ajaxCall(track,selGenre,year,ofset,limit);
			}
			else{
				return false;
			}
			
		});
	
	$('#nxt').click(function(e){
			
			e.preventDefault()
			ofset=ofset+5;
			ajaxCall(track,selGenre,year,ofset,limit);
			
		});
		
	$('#btn').click(function () {
		
		
		track = $('#txtCity').val();
		
			ajaxCall(track,selGenre,year,ofset,limit);
		$('html, body').animate({scrollTop:$('#mytable').height()});
		return false;
	});

	function durationFormat(milis){
		var minutes=Math.floor(milis/60000);
		var seconds=((milis%60000)/1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}
	
	
	
	function show(data) {
		$('#table').empty();
        //ofset = 5 ;
       // var limit = 5;

		for (var i = 0; i < data.tracks.items.length; i++) {
			$("tbody").append("<tr><td><a href=" + (data.tracks.items[i].preview_url) + "><i class='fas fa-link'></i></a></td><td>"+"<image src="+(data.tracks.items[i].album.images[2].url)+"/></td><td>" + (data.tracks.items[i].name) + "</td><td>" + (data.tracks.items[i].album.name) + "</td> <td > " + durationFormat(data.tracks.items[i].duration_ms) + "</td><td > " + (data.tracks.items[i].popularity) + "</td></tr>");
		}
	}
		function selectGenre() {


		return $.ajax({

			async: true,
			crossDomain: true,
			url: 	"https://api.spotify.com/v1/recommendations/available-genre-seeds",
			method: "GET",

			headers: {

				Authorization: "Bearer BQB6RnuDywq2JhEjUGvWF8lsY-W5gcL9pSXKuQRz36xOm6cTqZxt_flOlBi3lk2d2hpjpU1931eH5S-roOoXYL2OjKjS2enMU_i0xy_UMCKflQvDAusnlDSKdMITvnviPsmOo2WamWXehEFDSj-PRUVjaV2j8aWTajx8-IH-q22AePvbUQ",

			},
			dataType: "json",

			success: function (gen) {
				var genre = genreShow(gen);
				$('#selectGenre').html(genre);
				
				console.log(gen);
				
			}

		});

	
	}
	
	$('#filter').click(function () {

		selectGenre();
	
	});

		
	
	function genreShow(gen) {
		 $('#selectGenre').empty();

		for (var i = 0; i < gen.genres.length; i++) {
			//console.log(data.tracks.items[i].album.images[2]);

			$('#selectGenre').append('<option>'+(gen.genres[i])+'</option>');
		}
	}
	$('#saveChange').click(function(){
		selGenre = $('#selectGenre option:selected').text(); 
		year = $('#selectYear').val();
		console.log(selGenre+year);
		
	});
	
});
