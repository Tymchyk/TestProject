from .models import Users,Groups
from django.forms import ModelForm,TextInput,Textarea, Select

class UsersForm(ModelForm):
    class Meta:
        model = Users
        fields = ["username","groups"]
        widgets = {
            'username': TextInput(attrs={"class": "form-control", "placeholder":"Write your username"}),
            'groups': Select(attrs={"class": "form-control","placeholder":"Choose your group"}),
        }

class GroupsForm(ModelForm):
     class Meta:
        model = Groups
        fields = ["Name", "Descriptions"]
        widgets = {
            'Name': TextInput(attrs={"class": "form-control", "placeholder":"Write your Name"}),
            'Descriptions': Textarea(attrs={"class": "form-control","placeholder":"Write your Descriptions"}),
        }