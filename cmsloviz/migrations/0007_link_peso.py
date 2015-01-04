# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsloviz', '0006_auto_20141205_0254'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='peso',
            field=models.PositiveIntegerField(default=0),
            preserve_default=True,
        ),
    ]
