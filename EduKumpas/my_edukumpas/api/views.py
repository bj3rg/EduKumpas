from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import *
from .models import Schools,ProgramsOffered, Admission, Facilities, Activities, Clubs, News, FeaturesHighlights
# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schools

class RepresentativeList(APIView):
    def post(self,request):
        body = request.data
        try:
            existing_school = Schools.objects.filter(
                school_name = body['school']
            ).first()
            
            if existing_school:
                return Response({'error': 'School already registered'}, status=status.HTTP_400_BAD_REQUEST)
            
            new_school = Schools.objects.create(
                school_name=body['school'],
                school_representative=body.get('name'),
                school_rep_email=body.get('email_address'),
                school_rep_phone_num=body.get('contact_number')
            )

            new_representative = Representative.objects.create(
                name=body['name'],
                school=new_school,
                email_address=body.get('email_address'),
                contact_number=body.get('contact_number'),
                password=body.get('password')
            )
            return Response(status=status.HTTP_200_OK)
        
        except Exception as e:
            error_message = str(e)
            return Response({'error': error_message,}, status=status.HTTP_400_BAD_REQUEST)
    # def get(self, request):
        

class SchoolListView(APIView):
    def get(self, request):
        school_type = request.query_params.get('school_type')
        if school_type:
            schools = Schools.objects.filter(school_type=school_type)
        else:
            schools = Schools.objects.all()
        data = list(schools.values('id','school_name', 'school_type', 'school_website', 'public_private', 'school_representative', 'school_rep_phone_num', 'school_rep_email', 'school_logo', 'school_image', 'school_location'))
        return Response(data)
    def post(self, request):
        body = request.data
        try:
            school_name = body['school_name']
            school_type = body.get('school_type', '')
            school_website = body.get('school_website', '')
            public_private = body.get('public_private', '')
            school_representative = body.get('school_representative', '')
            school_rep_phone_num = body.get('school_rep_phone_num', '')
            school_rep_email = body.get('school_rep_email', '')
            school_logo = body.get('school_logo', None)
            school_image = body.get('school_image', None)
            

            new_school = Schools(
                school_name=school_name,
                school_type=school_type,
                school_website=school_website,
                public_private=public_private,
                school_representative=school_representative,
                school_rep_phone_num=school_rep_phone_num,
                school_rep_email=school_rep_email,
                school_logo=school_logo,
                school_image=school_image
            )
            new_school.save()

            return Response({'message': 'School added successfully'}, status=status.HTTP_201_CREATED)
        except KeyError:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

class OfferedListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            offered = ProgramsOffered.objects.filter(school=school)
        else:
            offered = ProgramsOffered.objects.all()
        data = list(offered.values( 'program_name', 'duration', 'tuition_fee'))
        return Response(data)
    
class ActivitiesListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            activities = Activities.objects.filter(school=school)
        else:
            activities = Activities.objects.all()
        data = list(activities.values('activity_name', 'activity_description', 'activity_image'))
        return Response(data)
        
class FacilitiesListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            facilities = Facilities.objects.filter(school=school)
        else:
            facilities = Facilities.objects.all()
        data = list(facilities.values('facility_name', 'facility_description', 'facility_image'))
        return Response(data)
    
class ClubListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            clubs = Clubs.objects.filter(school=school)
        else:
            clubs = Clubs.objects.all()
        data = list(clubs.values('club_name', 'club_description', 'club_image'))
        return Response(data)

class FeaturesListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            features = FeaturesHighlights.objects.filter(school=school)
        else:
            features = FeaturesHighlights.objects.all()
        data = list(features.values('feature_image'))
        return Response(data)
    
class NewsListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            news = News.objects.filter(school=school)
        else:
            news = News.objects.all()
        data = list(news.values('news_header', 'news_description', 'news_image'))
        return Response(data)
    
