# Generated by Django 4.0.5 on 2022-07-05 00:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voter', '0004_alter_candidatecampaigns_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='candidate_username',
            field=models.CharField(default='f', max_length=255),
            preserve_default=False,
        ),
    ]
