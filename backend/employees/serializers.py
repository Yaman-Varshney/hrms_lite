from rest_framework import serializers
from .models import Employee, Attendance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"

    def validate_employee_id(self, value):
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(write_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "employee_id", "date", "status"]

    def create(self, validated_data):
        employee_id = validated_data.pop("employee_id")

        try:
            employee = Employee.objects.get(employee_id=employee_id)
        except Employee.DoesNotExist:
            raise serializers.ValidationError("Employee not found.")

        attendance, _ = Attendance.objects.update_or_create(
            employee=employee,
            date=validated_data["date"],
            defaults={"status": validated_data["status"]}
        )
        return attendance
