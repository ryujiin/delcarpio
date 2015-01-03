from django.shortcuts import render
from django.views.generic import TemplateView
from models import *

class HomeView(TemplateView):
	template_name = "layout.html"

class ComprarView(TemplateView):
	template_name = "comprar.html"

from rest_framework import viewsets
from django.http import HttpResponse, Http404
from serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PaginaViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = PaginaSerializer

	def get_queryset(self):
		queryset = Pagina.objects.all()
		return queryset

class BloqueViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = BloqueSerializer

	def get_queryset(self):
		queryset = Bloque.objects.all()
		pagina = self.request.QUERY_PARAMS.get('pagina', None)
		cms = self.request.QUERY_PARAMS.get('cms', None)
		if pagina is not None:
			queryset = Bloque.objects.filter(pagina=pagina)
		if cms is not None:
			queryset = Bloque.objects.filter(pagina__isnull=True)
		return queryset

class MenuViewsets(viewsets.ReadOnlyModelViewSet):
	serializer_class = MenuSerialirzer

	def get_queryset(self):
		queryset = Menu.objects.all()
		pagina = self.request.QUERY_PARAMS.get('pagina', None)
		cms = self.request.QUERY_PARAMS.get('cms', None)
		if pagina is not None:
			queryset = Menu.objects.filter(pagina=pagina)
		if cms is not None:
			queryset = Menu.objects.filter(pagina__isnull=True)
		return queryset
		
class CarruselViewset(viewsets.ReadOnlyModelViewSet):
	serializer_class = CarruselSerializer

	def get_queryset(self):
		queryset = Carrusel.objects.all()
		pagina = self.request.QUERY_PARAMS.get('pagina', None)
		if pagina is not None:
			queryset = Carrusel.objects.filter(pagina=pagina)
		return queryset

class PaginaViewsApi(APIView):
	def get_object(self):
		slug = self.request.QUERY_PARAMS.get('slug', None)
		try:
			return Pagina.objects.get(slug=slug)
		except Pagina.DoesNotExist:
			raise Http404

	def get(self,request,format=None):
		pagina = self.get_object()
		serializer = PaginaSerializer(pagina)
		return Response(serializer.data,status=status.HTTP_200_OK)
