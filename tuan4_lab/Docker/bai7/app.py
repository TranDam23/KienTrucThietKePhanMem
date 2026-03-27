import os

app_env = os.getenv("APP_ENV", "undefined")

print(f"App Environment: {app_env}")