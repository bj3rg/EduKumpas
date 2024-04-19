from .models import *
from rest_framework import serializers
from .models import Schools, ProgramsOffered, Admission, Facilities, Activities, Clubs, News, FeaturesHighlights

class SchoolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schools
        fields = '__all__' 

class RepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = ['id', 'name', 'email_address' ]
        
class ProgramsOfferedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramsOffered
        fields = ['id', 'program_name', 'program_description', 'tuition_fee', 'duration']

class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = ['id', 'requirements', 'process_guide', 'admission_fee']

class FacilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilities
        fields = ['id', 'facility_name', 'facility_description']

class ActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = ['id', 'activity_name', 'activity_description']

class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = ['id', 'club_name', 'club_description', 'club_image']

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'news_header', 'news_description', 'news_image']

class FeaturesHighlightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturesHighlights
        fields = ['id', 'feature_name', 'feature_description', 'feature_image']

class SchoolsSerializer(serializers.ModelSerializer):
    # location = LocationSerializer(many=True)
    programs_offered = ProgramsOfferedSerializer(many=True)
    admission = AdmissionSerializer(many=True)
    facilities = FacilitiesSerializer(many=True)
    activities = ActivitiesSerializer(many=True)
    clubs = ClubsSerializer(many=True)
    news = NewsSerializer(many=True)
    features_highlights = FeaturesHighlightsSerializer(many=True)

    class Meta:
        model = Schools
        fields = ['id', 'school_name', 'school_website', 'public_private', 'school_representative',
                  'school_rep_phone_num', 'school_rep_email', 'school_logo', 'school_image',
                   'programs_offered', 'admission', 'facilities', 'activities',
                  'clubs', 'news', 'features_highlights',
                #   'location',
                  ]