$(function () {
    var $tasksList = $("#tasksList");
    var $taskInput = $("#taskInput");
    var $notification = $("#notification");

    var displayNotification = function(){
        if (!$tasksList.children().length){
            $notification.fadeIn("fast");
        } else (
            $notification.css("display", "none")
        )
    };
    $("#taskClear").on('click', function () {
        $taskInput.val("");
    })
    $("#taskAdd").on("click", function() {
        if(!$taskInput.val()) {return false;}
        $tasksList.append("<li class='task'>" + $taskInput.val() + "<button class='delete pull-right'>&#10006</button></li>");
        $taskInput.val("");
        displayNotification();
        $(".delete").on("click", function(){
            var $parent = $(this).parent();
            $parent.css("animation", "fadeOut .3s linear");
            setTimeout(function () {
                $parent.remove();
                displayNotification()
            }, 295)
        })
    })
});