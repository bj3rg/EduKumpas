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
        return Response({"token": token.key, "user": serializer.data['username']}, status=status.HTTP_200_OK)

class RepresentativeList(APIView):
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

class SchoolSearchListView(APIView):
    # authentication_classes = [SessionAuthentication, TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('q', '')
        search_fields = ['school_name__icontains', 'school_type__icontains', 'school_location__icontains',]
        
        search_q = Q()
        if query:
            for field in search_fields:
                search_q |= Q(**{field: query})

        schools = Schools.objects.filter(search_q)
        serializer = SchoolsSerializer(schools, many=True)
        return JsonResponse(serializer.data, safe=False)

class AdmissionListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            offered = Admission.objects.filter(school=school)
        else:
            offered = Admission.objects.all()
        data = list(offered.values( 'name', 'description', 'fee'))
        return Response(data)
    
class SchoolListView(APIView):
    # authentication_classes = [SessionAuthentication, TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        school_type = request.query_params.get('school_type')
        if school_type:
            schools = Schools.objects.filter(school_type=school_type)
        else:
            schools = Schools.objects.all()
        data = list(schools.values('id','school_name', 'school_type', 'school_website', 'public_private', 'school_representative', 'school_rep_phone_num', 'school_rep_email', 'school_logo', 'school_image', 'school_location'))
        return Response(data)
    # def post(self, request):
    #     body = request.data
    #     try:
    #         school_name = body['school_name']
    #         school_type = body.get('school_type', '')
    #         school_website = body.get('school_website', '')
    #         public_private = body.get('public_private', '')
    #         school_representative = body.get('school_representative', '')
    #         school_rep_phone_num = body.get('school_rep_phone_num', '')
    #         school_rep_email = body.get('school_rep_email', '')
    #         school_logo = body.get('school_logo', None)
    #         school_image = body.get('school_image', None)
            

    #         new_school = Schools(
    #             school_name=school_name,
    #             school_type=school_type,
    #             school_website=school_website,
    #             public_private=public_private,
    #             school_representative=school_representative,
    #             school_rep_phone_num=school_rep_phone_num,
    #             school_rep_email=school_rep_email,
    #             school_logo=school_logo,
    #             school_image=school_image
    #         )
    #         new_school.save()

    #         return Response({'message': 'School added successfully'}, status=status.HTTP_201_CREATED)
    #     except KeyError:
    #         return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

class SchoolListViewByID(APIView):
    # authentication_classes = [SessionAuthentication, TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request,pk):
        school= Schools.objects.filter(id=pk)
        serializer= SchoolsSerializer(school, many=True)
        mapped_data = serializer.data
        return Response(mapped_data)
    
class OfferedListView(APIView):
    # def get(self, request):
    #     school = request.query_params.get('school')
    #     if school:
    #         offered = ProgramsOffered.objects.filter(school=school)
    #     else:
    #         offered = ProgramsOffered.objects.all()
    #     data = list(offered.values( 'program_name','program_description' , 'duration', 'tuition_fee_start_range', 'tuition_fee_end_range'))
    #     return Response(data)
    def get(self, request):
        school_id = request.query_params.get('school')
        if school_id:
            offered = ProgramsOffered.objects.filter(school_id=school_id)
        else:
            offered = ProgramsOffered.objects.all()

        combined_data = []
        for program in offered:
            program_data = {
                
                'program_name': program.program_name,
                'program_description': program.program_description,
                'tuition_fee_start_range': program.tuition_fee_start_range,
                'tuition_fee_end_range': program.tuition_fee_end_range,
                'duration': program.duration,
            }
            school = Schools.objects.filter(id=program.school_id).first()
            if school:
                school_data = {
                    'school_name': school.school_name,
                    'school_location': school.school_location,
                    'school':school.id
                    # Add other school fields as needed
                }
                combined_data.append({**program_data, **school_data})

        return Response(combined_data)
    # def post(self, request):
    #     serializer = ProgramsOfferedSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ActivitiesListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            activities = Activities.objects.filter(school=school)
        else:
            activities = Activities.objects.all()
        data = list(activities.values('activity_name', 'activity_description', 'activity_image'))
        return Response(data)
    # def post(self, request):
    #     serializer = ActivitiesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FacilitiesListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            facilities = Facilities.objects.filter(school=school)
        else:
            facilities = Facilities.objects.all()
        data = list(facilities.values('facility_name', 'facility_description', 'facility_image'))
        return Response(data)
    # def post(self, request):
    #     serializer = FacilitiesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ClubListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            clubs = Clubs.objects.filter(school=school)
        else:
            clubs = Clubs.objects.all()
        data = list(clubs.values('club_name', 'club_description', 'club_image'))
        return Response(data)
    # def post(self, request):
    #     serializer =ClubsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeaturesListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            features = FeaturesHighlights.objects.filter(school=school)
        else:
            features = FeaturesHighlights.objects.all()
        data = list(features.values('feature_image'))
        return Response(data)
    # def post(self, request):
    #     serializer = FeaturesHighlightsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class NewsListView(APIView):
    def get(self, request):
        school = request.query_params.get('school')
        if school:
            news = News.objects.filter(school=school)
        else:
            news = News.objects.all()
        data = list(news.values('news_header', 'news_description', 'news_image'))
        return Response(data)
    # def post(self, request):
    #     serializer = NewsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
