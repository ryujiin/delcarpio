Loviz.Views.Login = Backbone.View.extend({
    tagName: 'bloque',
    events: {
    },
    template: swig.compile($("#usuario_login_bloque_template").html()),
    
    initialize: function () {
        
    },    
    render: function () {
        var html = this.template();
        this.$el.html(html);
        return this;
    },
});