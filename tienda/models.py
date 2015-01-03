from django.db import models
from django.template.defaultfilters import slugify

def url_imagen_pr(self,filename):
	url = "uploads/tienda/imagen/%s" % (filename)
	return url

class ImagenesWeb(models.Model):
	nombre = models.CharField(max_length=120)
	imagen = models.ImageField(upload_to=url_imagen_pr,blank=True,null=True)

