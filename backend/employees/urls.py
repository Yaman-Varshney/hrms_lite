from django.urls import path
from employees import views

urlpatterns = [
    path("employees", views.EmployeeCreateView.as_view()),
    path("employees/list", views.EmployeeListView.as_view()),
    path("employees/options", views.EmployeeOptionsView.as_view()),
    path("employees/<str:employee_id>", views.EmployeeDeleteView.as_view()),


    path("attendance", views.AttendanceCreateView.as_view()),
    path("attendance/<str:employee_id>", views.AttendanceListView.as_view()),

    path(
    "employees/<str:employee_id>/attendance",
    views.EmployeeAttendanceView.as_view()
    ),
    path(
    "employees/<str:employee_id>/attendance/summary",
    views.EmployeeAttendanceSummaryView.as_view()
    )
]
