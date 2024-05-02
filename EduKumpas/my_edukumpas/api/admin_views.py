from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse, HttpResponse
from .serializers import *
from django.db.models import Q  
from .models import Schools,ProgramsOffered, Admission, Facilities, Activities, Clubs, News, FeaturesHighlights
# Create your views here.
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from .models import Schools
from .models import *
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
CustomUser = get_user_model()
print(make_password('12345'))
print(check_password('1234','pbkdf2_sha256$720000$K9qlERHbhsZvGPXH8EFdJC$Hwo4oaNiBtC3UKtYmRlUzipdgtYIrzaEjph7J2bhQBo=' ))


class LoginView(APIView):
    def post(self, request):
        identifier = request.data.get('identifier')  # This can be either username or email
        password = request.data.get('password')

        if not identifier or not password:
            return Response('Please provide both identifier and password.', status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, Q(username=identifier) | Q(email=identifier))

        if not user.check_password(password):
            return Response('Incorrect identifier or password', status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({"token": token.key, "email": serializer.data['email']}, status=status.HTTP_200_OK)

class AdminRepresentativeList(APIView):
    def post(self,request):
        body = request.data
        try:
            existing_school = Schools.objects.filter(
                school_name = body['school']
            ).first()
            
            if existing_school:
                return Response('School already registered', status=status.HTTP_400_BAD_REQUEST)
            
            existing_email = User.objects.filter(
                email = body['email_address']
            ).exists()
            
            if existing_email:
                return Response("Email already registered", status=status.HTTP_400_BAD_REQUEST)
            
            new_user = User.objects.create_user(
                username=body['username'],
                email=body.get('email_address'),
                password=body.get('password'),
                first_name =body.get('first_name'),
                last_name =body.get('last_name')
            )
            
            full_name = str(body.get('first_name')+" "+body.get('last_name'))
            
            new_school = Schools.objects.create(
                school_name=body['school'],
                school_type=body['school_type'],
                school_representative=full_name,
                school_rep_email=body.get('email_address'),
                school_rep_phone_num=body.get('contact_number')
            )
            print("HERE " + str(new_user))
            new_representative = Representative.objects.create(
                user=new_user,
                name=full_name,
                school=new_school,
                email_address=body.get('email_address'),
                contact_number=body.get('contact_number'),
                password=body.get('password')
            )
            return Response(status=status.HTTP_200_OK)
        
        except Exception as e:
            error_message = str(e)
            return Response({'error': error_message,}, status=status.HTTP_400_BAD_REQUEST)
        

class AdminSchoolListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
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

class AdminSchoolListViewByID(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request,email):
        school= Schools.objects.filter(school_rep_email=email)
        serializer= SchoolsSerializer(school, many=True)
        mapped_data = serializer.data
        return Response(mapped_data)

class AdminAdmissionListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            offered = Admission.objects.filter(school=school)
        else:
            offered = Admission.objects.all()
        data = list(offered.values('id', 'name', 'description', 'fee'))
        return Response(data)
            
    def post(self, request, id=None):
        data =request.data
        school = data['name']
        offering = Admission.objects.filter(name= school).exists()
        if offering:
            return Response('Already listed', status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = AdmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            admission = Admission.objects.get(id=id)
            admission.delete()
            return Response({'message': 'Admission deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Admission.DoesNotExist:
            return Response({'error': 'Admission not found'}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, pk):
        try:
            admission = Admission.objects.get(pk=pk)
        except Admission.DoesNotExist:
            return Response({'error': 'Admission not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        serializer = AdmissionSerializer(admission, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminOfferedListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            offered = ProgramsOffered.objects.filter(school=school)
        else:
            offered = ProgramsOffered.objects.all()
        data = list(offered.values( 'program_name','program_description' , 'duration', 'tuition_fee_start_range', 'tuition_fee_end_range'))
        return Response(data)
    def post(self, request, id=None):
        data =request.data
        school = data['program_name']
        offering = ProgramsOffered.objects.filter(program_name= school).exists()
        if offering:
            return Response('Already listed', status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = ProgramsOfferedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            offer = ProgramsOffered.objects.get(id=id)
            offer.delete()
            return Response({'message': 'Program deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ProgramsOffered.DoesNotExist:
            return Response({'error': 'Program not found'}, status=status.HTTP_404_NOT_FOUND)
    
class AdminActivitiesListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            activities = Activities.objects.filter(school=school)
        else:
            activities = Activities.objects.all()
        data = list(activities.values('activity_name', 'activity_description', 'activity_image'))
        return Response(data)
    def post(self, request, id=None):
        data =request.data
        school = data['activity_name']
        offering = Activities.objects.filter(activity_name= school).exists()
        if offering:
            return Response('Already listed', status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = ActivitiesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            activity = Activities.objects.get(id=id)
            activity.delete()
            return Response({'message': 'Activity deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Activities.DoesNotExist:
            return Response({'error': 'Activity not found'}, status=status.HTTP_404_NOT_FOUND)
    
class AdminFacilitiesListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            facilities = Facilities.objects.filter(school=school)
        else:
            facilities = Facilities.objects.all()
        data = list(facilities.values('facility_name', 'facility_description', 'facility_image'))
        return Response(data)
    def post(self, request, id=None):
        data =request.data
        school = data['facility_name']
        offering = Facilities.objects.filter(facility_name= school).exists()
        if offering:
            return Response('Already listed', status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer = FacilitiesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            facility = Facilities.objects.get(id=id)
            facility.delete()
            return Response({'message': 'Facility deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Facilities.DoesNotExist:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)
    
class AdminClubListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            clubs = Clubs.objects.filter(school=school)
        else:
            clubs = Clubs.objects.all()
        data = list(clubs.values('club_name', 'club_description', 'club_image'))
        return Response(data)
    def post(self, request, id=None):
        data =request.data
        school = data['club_name']
        offering = Clubs.objects.filter(club_name= school).exists()
        if offering:
            return Response('Already listed', status=status.HTTP_406_NOT_ACCEPTABLE)
        serializer =ClubsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            club = Clubs.objects.get(id=id)
            club.delete()
            return Response({'message': 'Club deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Clubs.DoesNotExist:
            return Response({'error': 'Club not found'}, status=status.HTTP_404_NOT_FOUND)

class AdminFeaturesListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            features = FeaturesHighlights.objects.filter(school=school)
        else:
            features = FeaturesHighlights.objects.all()
        data = list(features.values('feature_image'))
        return Response(data)
    def post(self, request, id=None):
        serializer = FeaturesHighlightsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            feature = FeaturesHighlights.objects.get(id=id)
            feature.delete()
            return Response({'message': 'Features deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except FeaturesHighlights.DoesNotExist:
            return Response({'error': 'Features not found'}, status=status.HTTP_404_NOT_FOUND)
    
class AdminNewsListView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id=None):
        school = request.query_params.get('school')
        if school:
            news = News.objects.filter(school=school)
        else:
            news = News.objects.all()
        data = list(news.values('news_header', 'news_description', 'news_image'))
        return Response(data)
    def post(self, request, id=None):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            news = News.objects.get(id=id)
            news.delete()
            return Response({'message': 'News deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except News.DoesNotExist:
            return Response({'error': 'News not found'}, status=status.HTTP_404_NOT_FOUND)
    
