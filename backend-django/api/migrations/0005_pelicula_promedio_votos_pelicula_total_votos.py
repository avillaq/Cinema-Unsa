# Generated by Django 5.0.6 on 2024-07-21 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_boleto_codigo_compra'),
    ]

    operations = [
        migrations.AddField(
            model_name='pelicula',
            name='promedio_votos',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=3),
        ),
        migrations.AddField(
            model_name='pelicula',
            name='total_votos',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
