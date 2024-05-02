from django.urls import path
from django.http import HttpResponse
from .views import *
from .admin_views import *
from .views import SchoolListView, OfferedListView, FacilitiesListView, ActivitiesListView,ClubListView,FeaturesListView, NewsListView, SchoolListViewByID
urlpatterns = [
    # path('',lambda a: HttpResponse('working')),
    # path('add-school', AddSchoolView.as_view(), name='add-school'),
    #USER URLS
    path('schools', SchoolListView.as_view(), name='view-school'),
    path('schools-offered', OfferedListView.as_view(), name='view-program'),
    path('schools-admission', AdmissionListView.as_view(), name='view-admission'),
    path('schools-facilities', FacilitiesListView.as_view(), name='view-facility'),
    path('schools-activities', ActivitiesListView.as_view(), name='view-activity'),
    path('schools-clubs', ClubListView.as_view(), name='view-club'),
    path('schools-features', FeaturesListView.as_view(), name='view-features'),
    path('schools-news', NewsListView.as_view(), name='view-news'),
    path('representative', RepresentativeList.as_view(), name='view-rep'),
    path('school-by-id/<int:pk>', SchoolListViewByID.as_view(), name='view-schoolID'),
    path('admin/representatives', AdminRepresentativeList.as_view(), name='admin-representatives'),  
    path('login', LoginView.as_view(), name='login'),
    path('schools-search', SchoolSearchListView.as_view(), name='school-search'),
    #ADMIN URLS
   
    path('admin/schools', AdminSchoolListView.as_view(), name='admin-schools'),
    path('admin/admission/<int:id>', AdminAdmissionListView.as_view(), name='admin-admission'),
    path('admin/schools/<str:email>', AdminSchoolListViewByID.as_view(), name='admin-schools-by-id'),
    path('admin/offered/<int:id>', AdminOfferedListView.as_view(), name='admin-offered'),
    path('admin/activities/<int:id>', AdminActivitiesListView.as_view(), name='admin-activities'),
    path('admin/facilities/<int:id>', AdminFacilitiesListView.as_view(), name='admin-facilities'),
    path('admin/clubs/<int:id>', AdminClubListView.as_view(), name='admin-clubs'),
    path('admin/features/<int:id>', AdminFeaturesListView.as_view(), name='admin-features'),
    path('admin/news/<int:id>', AdminNewsListView.as_view(), name='admin-news'),
]