import pytz
import json
from flask import Response
from datetime import datetime


def get_months_count(start_date, end_date):
    months_difference = (end_date.year - start_date.year) * 12 + end_date.month - start_date.month
    if start_date.month == end_date.month and end_date.day >= start_date.day:
        months_difference += 1
    return months_difference + 1


def get_current_datetime_object():
    return datetime.now(pytz.timezone('Asia/Kolkata'))


def render_response(response, status_code=200):
    return Response(json.dumps(response), status=status_code, content_type='application/json')
