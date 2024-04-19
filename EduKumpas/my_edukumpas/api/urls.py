from django.urls import path
from django.http import HttpResponse
from .views import *
from .views import SchoolListView, OfferedListView, FacilitiesListView, ActivitiesListView,ClubListView,FeaturesListView, NewsListView
urlpatterns = [
    # path('',lambda a: HttpResponse('working')),
    # path('add-school', AddSchoolView.as_view(), name='add-school'),
    path('schools', SchoolListView.as_view(), name='view-school'),
    path('schools-offered', OfferedListView.as_view(), name='view-program'),
    path('schools-facilities', FacilitiesListView.as_view(), name='view-facility'),
    path('schools-activities', ActivitiesListView.as_view(), name='view-activity'),
    path('schools-clubs', ClubListView.as_view(), name='view-club'),
    path('schools-features', FeaturesListView.as_view(), name='view-features'),
    path('schools-news', NewsListView.as_view(), name='view-news'),
    path('representative', RepresentativeList.as_view(), name='view-rep'),
]