Loviz.Views.Menu = Backbone.View.extend({
    tagName:'nav',
    className: 'menu',
    events: {
    },
    template: swig.compile($("#menu_template").html()),
    
    initialize: function () {
        this.sacar_datos();
    },    
    render: function () {
        var album = this.model.toJSON();
        var html = this.template(album);
        this.$el.html(html);
        $(this.contenedor).append(this.$el);
        if (this.css!=='') {
            this.$el.addClass(this.css);
        };    },
    sacar_datos:function () {
        this.que_template();
        this.css = this.model.toJSON().css;
        this.contenedor = this.model.toJSON().seccion;
        this.render();
    },
    que_template:function () {
        if (this.model.toJSON().template!==null) {
            var teme = this.model.toJSON().template;
            this.template = swig.compile($(teme).html());            
        };
    }
});