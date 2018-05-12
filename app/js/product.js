$('input[class=radio]').change(function() {
    $(".price").empty().append(this.value);
});