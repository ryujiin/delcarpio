Loviz.Views.Comprar = Backbone.View.extend({
	el:$('#contenido'),
	template : swig.compile($("#comprar_template").html()),
	events :{
		'click .pago .radio input[type=radio]':'mostrar_metodo',
		'keypress .envio #calle_envio': 'mostrar_botton_envio',
		'click .envio .siguiente_envio': 'siguiente_envio',
		'click .pago #metodo_tarjeta #payment-form .pago_stripe':'pagar_stripe',
	},
	initialize: function () {
		var self = this;
		this.render();
	},
	render:function () {		
		var html = this.template();
		this.$el.html(html);
		this.rellenar();
		this.verificar_envio();
	},
	rellenar:function () {
		this.envio();
		this.resumen();
		this.metodos();
	},
	envio:function () {
		if (window.models.usuario.direcciones.length!=0) {
	    	this.formu_envio = new Loviz.Views.Formu_envio({
	    		model:window.models.usuario.direcciones.first()
	    	});
	    }else{
	    	this.formu_envio = new Loviz.Views.Formu_envio({
	    		model:new Loviz.Models.Direccion()
	    	});
	    }
	    this.formu_envio.render();
	    this.$('.envio .panel-body').prepend(this.formu_envio.$el);
	    this.$('.siguiente_envio').hide();
	},
	resumen:function () {
		this.$('.resumen').addClass('carro');
		window.views.carro.addLineas('pagar');
		window.views.carro.addTotal('pagar');
	},
	metodos:function () {
		$('.cuerpo_metodo').hide();
	},
	mostrar_metodo:function (e) {
		$('.cuerpo_metodo').slideUp('slow');
		var div = $(e.currentTarget);
		var metodo = div.data('metodo');
		metodo = '#'+metodo;
		$(metodo+' .cuerpo_metodo').slideDown('slow')
	},
	verificar_envio:function () {
		this.$('.pago .panel-body').hide();
		var formu_valido = this.verificando();
		if (formu_valido===true) {
			this.$('.pago .panel-body').show();
		};
	},
	verificando:function () {
		if (this.formu_envio.model!==undefined) {
			var formu = this.formu_envio.model.toJSON();
			if (formu.departamento!='') {
				if (formu.provincia !='') {
					if (formu.distrito!='') {
						if (formu.direccion!='') {
							return true
						};
					};
				}
			}
			return false	
		};
		return false
	},
	siguiente_envio:function () {
		this.formu_envio.enviar_formu();
		this.verificar_envio();
	},
	mostrar_botton_envio:function () {
		var num = this.$('#calle_envio').val()
		if (num.length>10) {
			this.$('.siguiente_envio').fadeIn();
		}else{
			this.$('.siguiente_envio').fadeOut();
		}
	},
	pagar_stripe:function () {
		debugger;
		var stripeResponseHandler = function(status, response) {
			var $form = this.$('#payment-form');
			if (response.error) {
				// Show the errors on the form
				$form.find('.payment-errors').text(response.error.message);
				$form.find('button').prop('disabled', false);
			} else {
				// token contains id, last4, and card type
				var token = response.id;
				// Insert the token into the form so it gets submitted to the server
				$form.append($('<input type="hidden" name="stripeToken" />').val(token));
				// and re-submit
				$form.get(0).submit();
			}
		};
		$('#payment-form').submit(function(e) {
			var $form = $(this);
			// Disable the submit button to prevent repeated clicks
			$form.find('button').prop('disabled', true);
			Stripe.card.createToken($form, stripeResponseHandler);
			// Prevent the form from submitting with the default action
			return false;
		});
		debugger;
	}
});