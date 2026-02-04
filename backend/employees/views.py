from rest_framework import generics, status
from rest_framework.response import Response
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from rest_framework.views import APIView

from django.core.validators import validate_email
from django.core.exceptions import ValidationError
# Employees

class EmployeeCreateView(APIView):
    def post(self, request):
        data = request.data

        try:
            validate_email(data.get("email"))
        except ValidationError:
            return Response(
                {"error": "Invalid email"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Employee.objects.filter(employee_id=data["employee_id"]).exists():
            return Response(
                {"error": "Employee ID already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        Employee.objects.create(**data)
        return Response({"message": "Employee created"}, status=201)


class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employee.objects.all()
    lookup_field = "employee_id"


# Attendance

class AttendanceCreateView(generics.CreateAPIView):
    serializer_class = AttendanceSerializer


class AttendanceListView(generics.ListAPIView):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        employee_id = self.kwargs["employee_id"]
        return Attendance.objects.filter(
            employee__employee_id=employee_id
        ).order_by("-date")

class EmployeeOptionsView(APIView):
    def get(self, request):
        data = Employee.objects.values("employee_id", "full_name")
        return Response(data)
    
class EmployeeAttendanceSummaryView(APIView):
    def get(self, request, employee_id):
        employee = Employee.objects.get(employee_id=employee_id)

        total_present = Attendance.objects.filter(
            employee=employee,
            status="PRESENT"
        ).count()

        return Response({
            "employee_id": employee.employee_id,
            "full_name": employee.full_name,
            "total_present_days": total_present
        })
    

class EmployeeAttendanceView(APIView):
    def get(self, request, employee_id):
        records = Attendance.objects.filter(
            employee__employee_id=employee_id
        ).order_by("date")

        data = [
            {
                "date": a.date,
                "status": a.status
            }
            for a in records
        ]

        return Response(data)
