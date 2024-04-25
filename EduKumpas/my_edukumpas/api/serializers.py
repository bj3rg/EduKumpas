from .models import *
from rest_framework import serializers
from .models import Schools, ProgramsOffered, Admission, Facilities, Activities, Clubs, News, FeaturesHighlights

class SchoolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schools
        fields = [
            'id',
            'school_name',
            'school_website',
            'public_private',
            'school_representative',
            'school_rep_phone_num',
            'school_rep_email',
            'school_logo',
            'school_image',
            'school_location',
            'school_type',
        ]

class RepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = ['id','school', 'name', 'email_address', 'contact_number', 'school' ]
        
class ProgramsOfferedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramsOffered
        fields = ['id', 'school', 'program_name', 'program_description', 'tuition_fee', 'duration']

class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = ['id','school', 'requirements', 'process_guide', 'admission_fee']

class FacilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilities
        fields = ['id', 'school','facility_name', 'facility_description']

class ActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = ['id', 'school', 'activity_name', 'activity_description','activity_image']
    # def create(self, validated_data):
    #     # Assuming 'school' is provided in the request data or serializer context
    #     school = validated_data.pop('school', None)
    #     if school:
    #         activity = Activities.objects.create(school=school, **validated_data)
    #         return activity
    #     else:
    #         raise serializers.ValidationError("School is required for creating an activity.")

class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = ['id','school', 'club_name', 'club_description', 'club_image']

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id','school', 'news_header', 'news_description', 'news_image']

class FeaturesHighlightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturesHighlights
        fields = ['id','school', 'feature_image']

# class SchoolsSerializer(serializers.ModelSerializer):
#     # location = LocationSerializer(many=True)
#     programs_offered = ProgramsOfferedSerializer(many=True)
#     admission = AdmissionSerializer(many=True)
#     facilities = FacilitiesSerializer(many=True)
#     activities = ActivitiesSerializer(many=True)
#     clubs = ClubsSerializer(many=True)
#     news = NewsSerializer(many=True)
#     features_highlights = FeaturesHighlightsSerializer(many=True)

#     class Meta:
#         model = Schools
#         fields = ['id', 'school_name', 'school_website', 'public_private', 'school_representative',
#                   'school_rep_phone_num', 'school_rep_email', 'school_logo', 'school_image',
#                    'programs_offered', 'admission', 'facilities', 'activities',
#                   'clubs', 'news', 'features_highlights',
#                 #   'location',
#                   ]