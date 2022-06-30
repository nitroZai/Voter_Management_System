from django.urls import path
from . import views, apiViews, apiJWTViews
from django.conf.urls.static import static
from hub import settings

urlpatterns = [

    path('apiJWTLogin', apiJWTViews.jwtLoginAPIView.as_view()),
    path('apiJWTRegister', apiJWTViews.jwtRegisterAPIView.as_view()),
    path('apiJWTLogout', apiJWTViews.jwtLogoutAPIView.as_view()),
    path('apiJWTUser', apiJWTViews.jwtUserAPIView.as_view()),
    path('apiJWTRefresh', apiJWTViews.jwtRefreshAPIView.as_view()),
    # path('apiJWTRegister', apiJWTViews.jwtRegisterAPIView),
    path('apiLoginCheck', apiViews.apiLoginCheck),
    path('apiLogin', apiViews.apiLogin),
    path('apiRegister', apiViews.apiRegister),
    path('apiLoginCheck', apiViews.apiLoginCheck),
    path('apiGetVoter', apiViews.apiGetVoter),
    path('apiAllCandidates', apiViews.apiAllCandidates),
    path('apiAnalytics', apiViews.apiAnalytics),
    path('apiSegregations', apiViews.apiSegregations),
    path('apiAdminPermissions', apiViews.apiAdminPermissions),
    path('apiAdminUserStatus', apiViews.apiAdminUserStatus),
    path('', views.home, name="home"),
    path('register/', views.register, name="register"),
    path('register-details-save', views.register_details_save, name="register-details-save"),
    path('loginn/', views.loginn, name="loginn"),
    path('loginn-output/', views.loginn_output, name="loginn-output"),
    path('analytics/', views.admin_analytics, name="admin-analytics"),
    path('permissons/', views.admin_permissions, name="admin-permissions"),
    path('search/', views.search, name="search"),
    path('segregation/', views.admin_segregation, name="admin-segregation"),
    path('admin-rights/<username>', views.admin_rights, name='admin-rights'),
    path('member-status-change/<username>', views.memeber_status_change, name='memeber-status-change'),
    path('member-vote-success/', views.member_vote_success, name = 'member-vote-success'),
    path('logoutt/', views.logoutt, name="logoutt"),
    
]
#  + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)