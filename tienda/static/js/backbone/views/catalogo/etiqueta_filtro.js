Loviz.Views.Etiqueta_filtro = Backbone.View.extend({
    tagName: 'span',
    className: 'filtro',
    events: {
        'click .link_filtro' : 'filtrar',
    },
    template: swig.compile($("#etique_filtro_template").html()),
    
    initialize: function () {
        this.quick =false;
    },
    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        return this;
    },
});