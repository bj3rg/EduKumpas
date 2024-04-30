from django.contrib import admin
from .models import *
# Register your models here.
class SchoolsAdmin(admin.ModelAdmin):
    list_display = ('school_name', 'public_private', 'school_location', 'school_type')
    search_fields = ['school_name', 'school_type', 'public_private']
    
class OfferedAdmin(admin.ModelAdmin):
    list_display = ('school', 'program_name', 'tuition_fee', 'duration')
    search_fields = ['program_name', 'school']
    
class AdmissionAdmin(admin.ModelAdmin):
    list_display = ('school', 'requirements', 'process_guide', 'admission_fee')
    search_fields = ['requirements', 'process_guide']
    
class FacilitiesAdmin(admin.ModelAdmin):
    list_display = ('school', 'facility_name', 'facility_description', 'facility_image')
    search_fields = ['facility_name', 'facility_description']
    
class ActivitiesAdmin(admin.ModelAdmin):
    list_display = ('school', 'activity_name', 'activity_description', 'activity_image')
    search_fields = ['activity_name', 'activity_description']
    
class ClubsAdmin(admin.ModelAdmin):
    list_display = ('school', 'club_name', 'club_description', 'club_image')
    search_fields = ['club_name', 'club_description']
    
class NewsAdmin(admin.ModelAdmin):
    list_display = ('school', 'news_header', 'news_description', 'news_image')
    search_fields = ['news_header', 'news_description']
    
class FeaturesHighlightsAdmin(admin.ModelAdmin):
    list_display = ('school', 'feature_image')
    
class RepresentativeAdmin(admin.ModelAdmin):
    list_display = ( 'user','name', 'email_address', 'school', 'status')
    
admin.site.register(Schools, SchoolsAdmin)
admin.site.register(ProgramsOffered, OfferedAdmin)
admin.site.register(Admission, AdmissionAdmin)
admin.site.register(Facilities, FacilitiesAdmin)
admin.site.register(Activities, ActivitiesAdmin)
admin.site.register(Clubs, ClubsAdmin)
admin.site.register(News, NewsAdmin)
admin.site.register(FeaturesHighlights, FeaturesHighlightsAdmin)
admin.site.register(Representative, RepresentativeAdmin)