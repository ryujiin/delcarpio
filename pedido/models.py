from django.db import models
from carro.models import Carro
from django.contrib.auth.models import User as User
from cliente.models import Direccion
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class Pedido(models.Model):
	numero = models.CharField('Numero de Pedido',max_length=128,db_index=True)
	carro_id = models.ForeignKey(Carro,null=True,blank=True)
	usuario = models.ForeignKey(User,related_name='pedidos',null=True, blank=True)
	direccion = models.ForeignKey(Direccion, null=True,blank=True)
	total_sin_envio = models.DecimalField(decimal_places=2, max_digits=12,default=0)
	total_con_envio = models.DecimalField(decimal_places=2, max_digits=12,default=0)
	metodo_envio = models.CharField('Metodo de envio',max_length=150,blank=True,null=True)
	estado = models.CharField('Estado de la orden',max_length=128,blank=True,null=True)
	email_invitado = models.EmailField(_("Email de Invitado"), null=True, blank=True)
	fecha_orden = models.DateTimeField(auto_now_add=True, db_index=True)

class PedidoNota(models.Model):
	orden = models.ForeignKey(Pedido,related_name='notas',)
	usuario = models.ForeignKey(User,related_name='ordenes',null=True, blank=True)
	INFO, WARNING, ERROR, SYSTEM = 'Info', 'Warning', 'Error', 'System'
	note_type = models.CharField('Tipo de Nota', max_length=128, null=True)
	mensaje = models.TextField('Mensajes')
	date_created = models.DateTimeField(_("Date Created"), auto_now_add=True)
	date_updated = models.DateTimeField(_("Date Updated"), auto_now=True)

class PagoEventoTipo(models.Model):
	nombre = models.CharField("Nombre", max_length=128, unique=True)
	code = models.SlugField("Code", max_length=128, unique=True)
	explicacion = models.TextField('Explicacion')	
	secuencia_numero = models.PositiveIntegerField('Secuencia', default=0)

	def save(self, *args, **kwargs):
		if not self.code:
			self.code = slugify(self.nombre)
		super(PagoEventoTipo, self).save(*args, **kwargs)

	def __unicode__(self):
		return self.nombre

class PagoEvento(models.Model):
	order = models.ForeignKey(Pedido, related_name='pago eventos', verbose_name=_("Order"))
	amount = models.DecimalField(_("Amount"), decimal_places=2, max_digits=12)
	event_type = models.ForeignKey(PagoEventoTipo, verbose_name=_("Event Type"))
	date = models.DateTimeField(_("Date Created"), auto_now_add=True)


#Envios
class EnvioEvento(models.Model):
	order = models.ForeignKey(Pedido, related_name='envio_evento', verbose_name=_("Order"))
	event_type = models.ForeignKey('EnvioEventoTipo', verbose_name=_("Event Type"))
	notes = models.TextField(_("Event notes"), blank=True, null=True,help_text=_("This could be the dispatch reference, or a tracking number"))
	date = models.DateTimeField(_("Date Created"), auto_now_add=True)

class EnvioEventoTipo(models.Model):
	name = models.CharField(_("Name"), max_length=255, unique=True)
	code = models.SlugField(_("Code"), max_length=128, unique=True)
	is_required = models.BooleanField(_("Is Required"), default=True,help_text=_("This event must be passed before the next shipping event can take place"))
	sequence_number = models.PositiveIntegerField(_("Sequence"), default=0)

	def save(self, *args, **kwargs):
		if not self.code:
			self.code = slugify(self.name)
		super(EnvioEventoTipo, self).save(*args, **kwargs)