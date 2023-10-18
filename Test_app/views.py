from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Users,Groups
from .forms import UsersForm, GroupsForm
from .serizlizers import GroupsSerializer
import datetime
import json

@csrf_exempt
def users(request):
     # Отримуємо дані з форми та заносимо їх до таблиці
    if request.method == "POST":
        data = UsersForm(request.POST)
        if data.is_valid():
            username = data.cleaned_data["username"]
            group = data.cleaned_data["groups"]
            users = Users(username = username, groups = group,created = datetime.datetime.now())
            users.save()
    # Оновлюємо дані, що отримуємо з fetch
    elif request.method == "PUT":
        data = json.loads(request.body)
        Users.objects.filter(id = data["id"]).update(username = data["username"], groups = Groups.objects.get(Name = data["groups"]))
    # Видаляємо вказану групу
    elif request.method == "DELETE":
        data = json.loads(request.body)
        Users.objects.filter(id = data["id"]).delete()
    form = UsersForm()
    users = Users.objects.filter().all()

    return render(request,"Test_app/users.html",{
        "form": form,
        "users": users
    })

@csrf_exempt
def groups(request):
    # Отримуємо дані з форми та заносимо їх до таблиці
    if request.method == "POST":
        data = GroupsForm(request.POST)
        if data.is_valid():
            name = data.cleaned_data["Name"]
            description = data.cleaned_data["Descriptions"]
            group = Groups(Name = name, Descriptions = description)
            group.save()
    # Оновлюємо дані, що отримуємо з fetch
    elif request.method == "PUT":
        data = json.loads(request.body)
        Groups.objects.filter(id = data["id"]).update(Name = data["Name"], Descriptions = data["Descriptions"])
    # Видаляємо вказану групу
    elif request.method == "DELETE":
        data = json.loads(request.body)
        Groups.objects.filter(id = data["id"]).delete()
    form = GroupsForm()
    groups = Groups.objects.filter().all()

    return render(request,"Test_app/groups.html",{
        "form":form,
        "groups":groups
    })

def users_list(request):
    values = Groups.objects.filter().all()
    groups_serialize = GroupsSerializer(values,many=True)
    return JsonResponse(groups_serialize.data, safe=False)
