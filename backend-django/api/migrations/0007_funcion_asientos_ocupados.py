# Generated by Django 5.0.6 on 2024-07-22 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_pelicula_promedio_votos'),
    ]

    operations = [
        migrations.AddField(
            model_name='funcion',
            name='asientos_ocupados',
            field=models.JSONField(default=list),
        ),
    ]
