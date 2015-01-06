Loviz.Views.Comentario_lista = Backbone.View.extend({
    className: 'comentario row',
    events: {
    },
    template: swig.compile($("#comentario_lista_template").html()),
    
    initialize: function () {
        this.quick =false;
    },
    
    render: function () {
        var album = this.model.toJSON()
        var html = this.template(album);
        this.$el.html(html);        
        this.pintar_estrellas();
        return this;
    },
    pintar_estrellas:function () {
        var estrellas_valor = 0;
        var valor = this.model.toJSON().valoracion;
        this.$('.estrellitas span').each(function (i,v) {
            if (valor>estrellas_valor) {
                $(v).addClass('activo');
            }else{
                $(v).addClass('no_activo');
            }
            estrellas_valor++;
        })
    },    
    navegar_producto : function () {
        if (this.quick = false) {
            window.routers.catalogo.navigate('/producto/'+this.model.toJSON().slug, {trigger:true});
        };
        this.quick = false
    },
});