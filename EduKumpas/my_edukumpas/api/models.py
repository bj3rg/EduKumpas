from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
STATUS_CHOICES = [ ('Approved', 'Approved'), ('Not Approved', 'Not Approved')]

CHOICES = [ ('College', 'College'),
           ('Senior High School' , 'Senior High School'), ('Junior High School', 'Junior High School'), 
           ('Elementary' , 'Elementary'), ('Preschool', 'Preschool') ]

PUBLIC_PRIVATE = [('Public', 'Public') , ('Private', 'Private')]    

    
class Schools(models.Model):
    school_name = models.CharField(max_length=100, null=False)
    school_website = models.URLField(null=True)
    public_private = models.CharField(max_length=20, choices=PUBLIC_PRIVATE, null=True)
    school_representative = models.CharField(max_length=100, null=True)
    school_rep_phone_num = models.CharField(max_length=20, null=True)
    school_rep_email = models.EmailField(null=True)
    school_logo = models.ImageField(upload_to='logos/', null=True)
    school_image = models.ImageField(upload_to='images/', null=True)
    school_location = models.CharField(max_length=100, null=True)
    school_type = models.CharField(max_length=50, choices=CHOICES, blank=False, null=True)
    def __str__(self) -> str:
        return self.school_name

class Representative(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True)
    contact_number = models.CharField(max_length=20, null=True)
    email_address = models.EmailField(null=True)
    password = models.CharField(max_length=100)
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Not Approved", null=True)
    
    def __str__(self):
        return self.email_address

class ProgramsOffered(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    program_name = models.CharField(max_length=100)
    program_description = models.TextField()
    tuition_fee = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)

class Admission(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    requirements = models.TextField()
    process_guide = models.TextField()
    admission_fee = models.DecimalField(max_digits=10, decimal_places=2)
    
class Facilities(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    facility_name = models.CharField(max_length=100)
    facility_description = models.TextField()
    facility_image = models.ImageField(upload_to='facilities/')

class Activities(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    activity_name = models.CharField(max_length=100)
    activity_description = models.TextField()
    activity_image = models.ImageField(upload_to='activities/')

class Clubs(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    club_name = models.CharField(max_length=100)
    club_description = models.TextField()
    club_image = models.ImageField(upload_to='clubs/')

class News(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    news_header = models.CharField(max_length=100)
    news_description = models.TextField()
    news_image = models.ImageField(upload_to='news/')

class FeaturesHighlights(models.Model):
    school = models.ForeignKey(Schools, on_delete=models.CASCADE)
    feature_image = models.ImageField(upload_to='features/')

# admin.site.register(Representative)
# admin.site.register(Schools)
# admin.site.register(Location)
# admin.site.register(ProgramsOffered)
# admin.site.register(Admission)
# admin.site.register(Facilities)
# admin.site.register(Activities)
# admin.site.register(Clubs)
# admin.site.register(News)
# admin.site.register(FeaturesHighlights)