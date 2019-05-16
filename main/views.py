from django.shortcuts import render, get_object_or_404, redirect

from django.contrib.auth.models import User
import json
from .models import My_list
from .forms import SignUp, LogIn
from django.http import HttpResponseRedirect, HttpResponse
from django import forms
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):
    
    return render(request, 'main/base.html')

def sign_up(request):
    if request.method == "POST":
        form = SignUp(request.POST)
        # return HttpResponse(form)  # form.POST.get("password1"))

        if form.is_valid():
            userObj = form.cleaned_data
            username = userObj['username']
            email = userObj['email']
            password = userObj['password']
            if not (User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()):
                User.objects.create_user(username, email, password)
                user = authenticate(username=username, password=password)
                login(request, user)
                return HttpResponseRedirect(reverse('browse'))
            else:
                raise forms.ValidationError('Looks like a username with that email or password already exists')
    else:
        form = SignUp()
    return render(request, 'main/register.html', {'form': form})


def log_in(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(reverse('browse'))
            else:
                return HttpResponse("Your account was inactive.")
        else:
            print("Someone tried to login and failed.")
            print("They used username: {} and password: {}".format(username, password))
            return HttpResponse("Invalid login details given")
    else:
        form = LogIn()
    return render(request, 'main/login.html', {'form': form})


@login_required
def log_out(request):
    logout(request)
    return redirect('home')


def browse(request):
    return render(request, 'main/home.html')


def my_list(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        perma = request.POST.get('perma')
        response_data = {}
        if not (My_list.objects.filter(title=title,user=request.user).exists()):
            post = My_list(title=title, user=request.user, perma=perma)
            post.save()

            response_data['result'] = 'Create post successful!'
            response_data['post_pk'] = post.pk
            response_data['title'] = post.title
            response_data['user'] = post.user.username
            response_data['perma'] = post.perma

            return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )


def detail(request, permalink):
    if not (My_list.objects.filter(perma=permalink,user=request.user).exists()):
        c=True
    else:
        c=False
    return render(request, 'main/detail.html', {'permalink': permalink,'c': c })


def list(request):
    post = My_list.objects.filter(user=request.user)
    return render(request, 'main/list.html', {'posts': post})

