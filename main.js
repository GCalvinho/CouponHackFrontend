var mensagem = "Ooops, algo correu mal. Tenta mais tarde!"
var fetchedCoupons;

$( window ).on("load", function() {
    reset();
    integration();
});

$(document).on('click','.fetch',function(e) {
    reset();
   integration();
});

$(document).on('click','.refresh',function(e) {
    $(".cupaoValido").html("<img src='resources/Spinner.gif'/>");

    var indexRefresh = parseInt($( ".cupaoValido" ).attr("refreshIndex")) + 1;
    var coupon = fetchedCoupons[fetchedCoupons.length - (1+parseInt(indexRefresh))];
    $( ".cupaoValido" ).attr("refreshIndex", indexRefresh);
    $( ".cupaoValido" ).text(coupon);
});


function integration(){
    $(".cupaoValido").html("<img src='resources/Spinner.gif'/>");
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'text',
        url: 'https://couponhack.herokuapp.com/',
        success: function(response) {
            if(response != " " || response != null){
                var coupons = JSON.parse( response );
                fetchedCoupons = coupons;
                var coupon = fetchedCoupons[fetchedCoupons.length - 1];
                $( ".cupaoValido" ).text(coupon);
                $( ".cupaoValido" ).attr("index",coupons.length - 1);
            }
        },
        error: function(error){
            $( ".cupaoValido" ).text(mensagem);
            console.log(error);
        }
    });
}

function reset(){
   $( ".cupaoValido" ).attr("refreshIndex", parseInt(0));
}