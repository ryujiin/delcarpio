Loviz.Views.Comentarios = Backbone.View.extend({
	className: 'comentario_cliente',	
    template: swig.compile($("#comentarios_template").html()),

	events: {
		'mouseenter .formulario_estrellas button':'encima_estrella',
		'mouseleave .formulario_estrellas button':'salir_estrella',
		'click .formulario_estrellas button':'votar',
		'submit #formulario_comentario':'enviar_voto',
		'keyup #titulo_comentario':'vericadar_input',
		'keyup #comentario_texto':'vericadar_input',
		'keyup #email_comentario':'vericadar_email',

		'click .escribir':'mostrar_formulario',
		'click .leer':'mostrar_lista',
	},
	initialize : function () {
		var self = this;
		this.render();
	},
	render:function () {
		var html = this.template();
        this.$el.html(html);
        this.mostrar();
	},
	mostrar:function () {
		if (this.collection.length!==0) {
			this.$('.formulario').hide();
			this.crear_lista_comentarios();
		}else{
			this.$('.lista_comentarios').hide();
		}
		if (window.models.usuario.toJSON().email!==undefined) {
			this.$('#email_comentario').val(window.models.usuario.toJSON().email);
		};
	},
	crear_lista_comentarios:function  () {
		this.collection.forEach(this.addOne,this);
	},
	addOne: function (modelo) {
		var comentario = new Loviz.Views.Comentario_lista({ model: modelo });
		this.$('#lista_comentarios').append(comentario.render().el);
	},
	mostrar_formulario:function () {
		this.$('.lista_comentarios').slideUp();
		this.$('.formulario').slideDown();
	},
	mostrar_lista:function () {
		this.$('.formulario').slideUp();
		this.$('.lista_comentarios').slideDown();		
	},
	encima_estrella:function (e) {
		var valor = $(e.currentTarget).data('valor');
		var texto = $(e.currentTarget).data('texto');
		this.$('.texto-explicacion').html(texto);
		for (var i = 1; i <= valor; i++) {
			this.$('.formulario_estrellas button.'+i).addClass('contraste');
			this.$('.formulario_estrellas button.'+i+' span').addClass('glyphicon-star').removeClass('glyphicon-star-empty');
		};
	},
	salir_estrella:function () {		
		this.$('.formulario_estrellas button').removeClass('contraste');
		this.$('.texto-explicacion').html('click para puntuar!');
		var texto = this.$('.texto-explicacion').data('elegido')
		if (texto!='') {
			this.$('.texto-explicacion').html(texto);
			this.$('.formulario_estrellas button span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
			this.$('.formulario_estrellas button.contraste_fijo span').addClass('glyphicon-star').removeClass('glyphicon-star-empty');
		};
	},
	votar:function (e) {
		var valor = $(e.currentTarget).data('valor');
		var texto = $(e.currentTarget).data('texto');
		this.$('#valor_estrellas').val(valor)
		this.$('.formulario_estrellas button').removeClass('contraste_fijo')
		for (var i = 1; i <= valor; i++) {
			this.$('.formulario_estrellas button.'+i).addClass('contraste_fijo')
		};
		this.$('.texto-explicacion').data('elegido',texto);
		this.$('.puntuacion').removeClass('has-error').addClass('has-success');
		this.$('.puntuacion .verificar').removeClass('glyphicon-remove-sign').addClass('glyphicon-ok-sign')
	},
	enviar_voto:function (e) {
		e.preventDefault();
		var verificado;
		verificado = this.verificar_comentario('#valor_estrellas');
		if (verificado==true) {
			verificado = this.verificar_comentario('#titulo_comentario');
			if (verificado==true) {
				verificado = this.verificar_comentario('#comentario_texto');
				if (verificado===true) {
					verificado = this.vericadar_email('#email_comentario');
					if (verificado===true) {
						this.comentario_verifiado();
					};					
				};
			};
		};
	},
	comentario_verifiado:function () {
		var self = this;
		var nuevo_comentario = new Loviz.Models.Comentario();
		nuevo_comentario.set({
			valoracion : this.$('#valor_estrellas').val(),
			titulo_comentario : this.$('#titulo_comentario').val(),
			comentario : this.$('#comentario_texto').val(),
			producto : window.views.producto_single.model.id,
			usuario : window.models.usuario.id,
			email_invitado : this.$('#email_comentario').val(),
		});
		nuevo_comentario.save().done(function () {
			self.render();
			var comentario = new Loviz.Views.Comentario_lista({ model: nuevo_comentario });
			self.$('#lista_comentarios').prepend(comentario.render().el);
		})
	},
	verificar_comentario:function (div) {
		var voto = this.$(div).val();
		var contenedor = this.$(div).data('contenedor');
		var contenedor = $('.'+contenedor)
		if (voto !=='' ) {
			contenedor.removeClass('has-error');
			return true
		}else{
			contenedor.addClass('has-error');
			if (this.$(div).data('contenedor') ==='puntuacion') {
				$('.puntuacion .verificar').addClass('glyphicon-remove-sign').removeClass('glyphicon-ok-sign')
			};
			return false
		}
	},
	vericadar_input:function (e) {
		var contador = $(e.currentTarget).val()
		var contenedor = $(e.currentTarget).data('contenedor');
		if (contador.length>5) {
			$('.'+contenedor).removeClass('has-error');
			$('.'+contenedor).addClass('has-success has-feedback');
			$('.'+contenedor+' .verificado').addClass('glyphicon glyphicon-ok');
		}else{
			$('.'+contenedor).removeClass('has-success has-feedback');
			$('.'+contenedor+' .verificado').removeClass('glyphicon glyphicon-ok');
		}
	},
	vericadar_email:function () {
		email = this.$('#email_comentario').val();
		verificado = validarEmail(email);
		if (verificado===true) {
			this.$('.email_comentario').addClass('has-success has-feedback')
			this.$('.email_comentario .verificado').addClass('glyphicon glyphicon-ok');
		}else{
			this.$('.email_comentario').removeClass('has-success has-feedback');
			$('.email_comentario .verificado').removeClass('glyphicon glyphicon-ok');
		}
		return verificado
		function validarEmail( email ) {
		    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		    if ( !expr.test(email) ){
		    	return false
		    }else{
		    	return true
		    }
		}
	}
});