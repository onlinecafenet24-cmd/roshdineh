from flask import Flask, render_template
from data.fake_data import *

app = Flask(__name__)
app.config.from_object('config')


@app.route('/')
def index():
    return render_template(
        'index.html',
        hero=hero_data,
        trust_logos=trust_logos,
        services=services,
        stats=stats,
        stats_title='آمار عملکرد، نه شعار تبلیغاتی',
        stats_desc='این اعداد از خروجی واقعی پروژه‌های سال ۱۴۰۳ استخراج شده‌اند',
        cases=featured_cases,
        process_steps=process_steps,
        testimonials=testimonials[:3],
        chart_data=chart_data,
        footer_services=footer_links['services'],
        footer_company=footer_links['company'],
        footer_resources=footer_links['resources'],
    )


@app.route('/services')
def services_page():
    return render_template('services.html', services=services)


@app.route('/cases')
def cases():
    return render_template('cases.html', cases=all_cases, all_tags=all_case_tags)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
