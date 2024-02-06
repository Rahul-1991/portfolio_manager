from flask import render_template
from flask.views import MethodView
from app.service import PortfolioService
from app.common_utils import render_response
from flask import jsonify

class GetPortfolioDetails(MethodView):

    def get(self):
        response = PortfolioService(dict(), dict()).get_portfolio_details()
        return render_response(response, status_code=200)


class Homepage(MethodView):

    def get(self):
        # response = PortfolioService(dict(), dict()).get_portfolio_details()
        # print(response)
        return render_template('index.html')


class HomepageTemp(MethodView):

    def get(self):
        return render_template('index2.html')

class PortfolioData(MethodView):

    def get(self):
        response = PortfolioService(dict(), dict()).get_portfolio_details()
        return jsonify(response)
