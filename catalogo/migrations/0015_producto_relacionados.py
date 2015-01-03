# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0014_producto_detalles'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='relacionados',
            field=models.ManyToManyField(related_name='relacionados_rel_+', null=True, to='catalogo.Producto', blank=True),
            preserve_default=True,
        ),
    ]
