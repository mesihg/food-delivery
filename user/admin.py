from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("get_full_name", 
                    "email",
                    "phone",
                    "dob",
                    "gender",
                    "address",
                    "role",
                    )
    list_editable = ["role"]
    list_display_links = ('get_full_name',)

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    get_full_name.short_description = 'Customer Name'


# admin.site.register(User)
