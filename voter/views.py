from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import *
from django.contrib.auth import authenticate,login,logout

def home(request):

    return render(request, 'home.html')

def register(request):
    areas = Area.objects.all()
    context = {'areas': areas}
    return render(request, 'register.html', context)

def register_details_save(request):

    if request.method == "POST":
        username = request.POST.get('username')
        email    = request.POST.get('email')
        area     = request.POST.get('area')
        password1= request.POST.get('password1')
        password2= request.POST.get('password2')

        if User.objects.filter(username = username).exists():
            errString = "Username is already present!"
            return render(request, 'not-found.html', {'context': errString})

        if password1 == password2:
            user = User.objects.create_user(username = username, email = email)
            user.set_password(password1)
            user.save()

            area = Area.objects.get(area = area)
            voter = Voter()
            voter.user = user
            voter.area = area
            voter.is_admin = False
            voter.status = "Pending"
            voter.save()
        else:
            errString = "Passwords didn't match"
            return render(request, 'not-found.html', {'context': errString})

            
    return render(request, 'loginn.html')

def loginn(request):
    return render(request, 'loginn.html')

def loginn_output(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = User.objects.get(username = username)
        except:
            errString = "Username is not found in our DB"
            return render(request, 'not-found.html', {'context': errString})

        userLogin = authenticate(username = username, password = password)

        if userLogin is not None:
            login(request, userLogin)
            voter = Voter.objects.get(user = user)
            admin_decide = voter.is_admin
            status_check = voter.status
            vote_check = voter.is_voted

            context = {
                'name': user.username
            }

            if admin_decide is True:
                return render(request, 'admin-panel.html', context)
            else:
                if status_check == "Accepted":

                    if vote_check == False:
                        candidates = Candidate.objects.all()
                        context = {
                            'candidates':candidates
                        }
                        return render(request, 'member-panel.html', context)
                    else:
                        return render(request, 'member-done-voting.html')

                else:
                    errString = "Your Account isn't verified yet."
                    return render(request, 'not-found.html', {'context': errString})
        else:
            errString = "Wrong Credentials!"
            return render(request, 'not-found.html', {'context': errString})

    return render(request, 'loginn-output.html')


def admin_analytics(request):

    candidates = Candidate.objects.all()

    context = {
        'candidates': candidates
    }

    return render(request, 'admin-analytics.html', context)

def admin_permissions(request):
    voter = Voter.objects.select_related('user').all()

    context = {
        'voters': voter,
    }

    return render(request, 'admin-permissions.html', context)

def admin_segregation(request):

    voter = Voter.objects.select_related('user').all()

    context = {
        'voters': voter,
    }

    return render(request, 'admin-segregation.html', context)

def admin_rights(request, username):
    
    if request.method == 'POST':
        voters = Voter.objects.select_related('user').all()

        admin_rights = request.POST.get('admin_rights')
        # status_change = request.POST.get('status_change')

        if admin_rights == "True" or admin_rights == "False":
            user = User.objects.get(username = username)


            print("Here")
            print(user.username)
            if admin_rights == str(True):
                Voter.objects.filter(user = user).update(is_admin = True)
            else:
                Voter.objects.filter(user = user).update(is_admin = False)
        
    context = {
        'voters': voters,
    }

    return render(request, 'admin-permissions.html', context)

def memeber_status_change(request, username):
  
    if request.method == 'POST':
        voters = Voter.objects.select_related('user').all()

        status_change = request.POST.get('status_change')
        # status_change = request.POST.get('status_change')

        if status_change == "Pending" or status_change == "Denied" or status_change == "Accepted":
            user = User.objects.get(username = username)
            print(user.username)
            Voter.objects.filter(user = user).update(status = status_change)
            
    context = {
        'voters': voters,
    }

    return render(request, 'admin-permissions.html', context)

def member_vote_success(request):

    if request.method == 'POST':

        candidate = request.POST.get('candi')

        user = User.objects.get(username = request.user.username)
        Voter.objects.filter(user = user).update(is_voted = True)

        candy = Candidate.objects.get(candidate_name = candidate)
        candyVotes = candy.votes + 1

        Candidate.objects.filter(candidate_name = candidate).update(votes = candyVotes)

    return render(request, 'member-vote-success.html')

def search(request):

    if request.method == 'POST':

        searchValue = request.POST.get('search')

        if searchValue == '':
            voters = Voter.objects.prefetch_related('user').all()
            return render(request, 'admin-permissions.html', {'voters': voters})

        print(searchValue)
        user = User.objects.get(username = searchValue)
        voters = Voter.objects.prefetch_related('user').filter(user=user)
        context = {'voters': voters}

    else:

        pass

    return render(request, 'admin-permissions.html', context)

def logoutt(request):
    logout(request)
    return redirect('home')