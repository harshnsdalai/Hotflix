function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$('#title').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  // sanity check
    create_post();
    $(this).hide();
});

function create_post(){
    console.log("create post is working!") // sanity check
    console.log($('#title_val').val())
    $.ajax({
        url : "my_list/", // the endpoint
        type : "POST", // http method
        data : { title : $('#title_val').val(), perma : $("#perma_val").val() }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            //$('#title_val').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};

function popular(){
    $.getJSON("https://www.episodate.com/api/most-popular?page=1", function(data){
        //console.log(data);

        $.each(data.tv_shows, function(index, value){
            ///console.log(value)

            var title = value.name
            //console.log(title)
            var img = value.image_thumbnail_path
            var permalink = value.permalink
            //var url = "{% url 'detail' permalink="+permalink+" %}"

            $("#list-div").append('<h1>'+title+'</h1>'+'<a class="detail" href="detail/'+permalink+'" id="'+permalink+'"><img src ="'+img+'"></a>')
        })
    })
}

function detail(permalink){
    console.log("create post is working!") // sanity check
    permalink_val = permalink
    console.log(permalink_val)
    console.log("https://www.episodate.com/api/show-details?q=" + permalink_val)
    $.getJSON("https://www.episodate.com/api/show-details?q=" + permalink_val, function(data){
        var permalink_data = data.tvShow;
        var description = permalink_data.description;
        var name = permalink_data.name
        var url = permalink_data.url
        var img = permalink_data.image_path
        var status = permalink_data.status

        $("#name").html(name)
        $("#description").html(description)
        $("#status").html(status)
        $("#moreinfo").html('<a>'+url+'</a>')
        console.log(url)
        $("#title_val").val(name);
        console.log("hola bro"+$("#title_val").val())
        $.each(permalink_data.episodes, function(index,value){
            //console.log(index)
            //console.log(value.name)
            //console.log(permalink_data.episodes)

            var season = value.season;
            //console.log(season)
            var episode = value.episode;
            //console.log(episode)

            var name = value.name;
            //console.log(name)
            var date = value.air_date;
            //console.log(date)
            //var url = "{% url 'detail' permalink="+permalink+" %}"
            
            $("#detail-div").append('<h1>Season:'+season+'</br>Episode'+episode+'</h1>'+'<h1>Name:'+name+'</br>Air date'+date+'</h1>')
        })
    })
    
    /*$.ajax({
        url : "detail/", // the endpoint
        type : "POST", // http method
        data : { data : permalink_data}, // data sent with the post request

        // handle a successful response
        success : function(json) {
            
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });*/
};
