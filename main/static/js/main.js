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
});

function create_post(){
    console.log("create post is working!") // sanity check
    console.log($('#title_val').val())
    $.ajax({
        url : "my_list/", // the endpoint
        type : "POST", // http method
        data : { title : $('#title_val').val() }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            $('#title_val').val(''); // remove the value from the input
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
        console.log(data);

        $.each(data.tv_shows, function(index, value){
            console.log(value)

            var title = value.name
            console.log(title)
            var img = value.image_thumbnail_path

            $("#list-div").append('<h1>'+title+'</h1>'+'<a href=""><img src ="'+img+'"></a>')
        })
    })
}