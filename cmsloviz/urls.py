from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
	url(r'^$',HomeView.as_view() , name='home'),
	url(r'^carro/$',HomeView.as_view() , name='catalogo'),	
	url(r'^catalogo/',HomeView.as_view() , name='catalogo'),
	url(r'^producto/',HomeView.as_view() , name='producto'),
	url(r'^user/',HomeView.as_view() , name='perfil'),
	url(r'^pagina/',HomeView.as_view() , name='perfil'),
	url(r'^comprar/',ComprarView.as_view() , name='perfil'),
	url(r'^ingresar/',HomeView.as_view() , name='perfil'),
)