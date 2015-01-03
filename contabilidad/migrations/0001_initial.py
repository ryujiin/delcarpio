# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0013_material_materialesproductos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Compras',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('precio', models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)),
                ('material', models.ForeignKey(blank=True, to='catalogo.Material', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='VentasMinorista',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.PositiveIntegerField(default=1)),
                ('producto', models.ForeignKey(blank=True, to='catalogo.Producto', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
