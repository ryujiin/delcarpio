from django.db import models
from catalogo.models import Producto,Material

# Create your models here.
class Compras(models.Model):
	date_created = models.DateTimeField(auto_now_add=True)
	precio = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
	material = models.ForeignKey(Material,blank=True,null=True)

class VentasMinorista(models.Model):
	producto = models.ForeignKey(Producto,blank=True,null=True)
	cantidad = models.PositiveIntegerField(default=1)