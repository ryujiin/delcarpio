# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0012_producto_video'),
    ]

    operations = [
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('unidad_compra', models.CharField(max_length=100, null=True, blank=True)),
                ('precio', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('foto', models.ImageField(null=True, upload_to=b'uploads/materiales/', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MaterialesProductos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad_docena', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('unidad_medida', models.CharField(max_length=100, null=True, blank=True)),
                ('cantidad_par', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('precio_docena', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('material', models.ForeignKey(blank=True, to='catalogo.Material', null=True)),
                ('producto', models.ForeignKey(related_name='materiales', to='catalogo.Producto')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
