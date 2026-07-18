import os
import secrets

DEBUG = True
SECRET_KEY = os.environ.get('SECRET_KEY', secrets.token_hex(16))
SITE_NAME = 'رشدینه'
SITE_DESCRIPTION = 'آژانس دیجیتال مارکتینگ داده‌محور و نتیجه‌گرا'
