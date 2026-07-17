from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('skills', '0002_alter_skill_icon'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='skill',
            options={'ordering': ['order']},
        ),
        migrations.RemoveField(
            model_name='skill',
            name='category',
        ),
    ]