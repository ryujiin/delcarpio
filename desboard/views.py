from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class DesboardView(TemplateView):
	template_name = "desboard.html"