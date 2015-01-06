//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
    
    //Urls
    window.routers.base = new Loviz.Routers.Base();

    //Modelos
    window.models.usuario = new Loviz.Models.Usuario();
    window.models.carro = new Loviz.Models.Carro();

    //Collecciones
    window.collections.pagina = new Loviz.Collections.Paginas();
    window.collections.bloques = new Loviz.Collections.Bloques();
    window.collections.menus = new Loviz.Collections.Menus();

    //Vista Tienda
    window.views.tienda = new Loviz.Views.Body( $('body') );
    
    galleta = window.views.tienda.obt_galleta();

    //buscar
    Backbone.history.start({
        pushState:true,
    });    

    //Funcion para el CRF
    function getCookie(name){
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?  
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }    
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        } 
    });
});