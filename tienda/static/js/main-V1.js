//Loviz Tienda
$(document).ready(function(){
	console.log('main.js loaded');
    
    //Urls
    window.routers.base = new Loviz.Routers.Base();   

    //Vista Tienda
    window.views.tienda = new Loviz.Views.Body( $('body') );
    galleta = window.views.tienda.obt_galleta();
    window.views.banner_header = new Loviz.Views.Header_banner({
        model:new Loviz.Models.Banner_header()
    });

    //Modelos de tienda
    window.models.pagina = new Loviz.Models.Pagina();

    //Usuario
    window.models.usuario = new Loviz.Models.Usuario();
    window.views.mini_usuario = new Loviz.Views.Mini_usuario({model:window.models.usuario});    

    //Carro
    window.models.carro = new Loviz.Models.Carro();
    window.views.mini_carro = new Loviz.Views.Mini_carro({model:window.models.carro});
    window.views.carro = new Loviz.Views.Carro({
        model:window.models.carro
    });

    //Colecciones de tienda
    window.collections.bloques = new Loviz.Collections.Bloques();
    window.collections.productos = new Loviz.Collections.Productos();
    window.collections.productos_single = new Loviz.Collections.Productos_single();

    //Catalogo
    window.views.catalogo = new Loviz.Views.Catalogo({
        collection:window.collections.productos
    });
    window.models.producto_single = new Loviz.Models.Producto_single();
    window.views.producto_single = new Loviz.Views.Producto_single({
        model:window.models.producto_single
    });

    //Vistas de pagina
    window.views.pagina = new Loviz.Views.Pagina({
        model:window.models.pagina
    });

    //buscar
    window.collections.productos.fetch().done(function () {
        Backbone.history.start({
            pushState:true,
        });    
    })    

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