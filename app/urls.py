from flask import Blueprint
from app import views


modules = Blueprint('portfolio_mods', __name__)


modules.add_url_rule('/portfolioDetails', view_func=views.GetPortfolioDetails.as_view('portfolio_details'))
modules.add_url_rule('/', view_func=views.Homepage.as_view('homepage'))
modules.add_url_rule('/temp', view_func=views.HomepageTemp.as_view('homepage_temp'))
