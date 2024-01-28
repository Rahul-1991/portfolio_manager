from flask import render_template
from flask.views import MethodView
from app.service import PortfolioService
from app.common_utils import render_response


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
        response = PortfolioService(dict(), dict()).get_portfolio_details()
        # response = {'totalInvestment': 190000, 'transactions': [{'type': 'Recurring Deposit', 'investments': [{'installment': 10000, 'rate': 7, 'startDate': '2022-06-14', 'invested': 190000, 'maturityAmount': 201481.04926873092, 'name': 'HDFC RD'}], 'invested': 190000}, {'type': 'Mutual Funds', 'investments': [{'name': 'HDFC Gold', 'currentAmount': 82069.2728601, 'invested': 68979, 'currentPrice': 19.9131, 'qty': 4121.371, 'unrealisedGain': 13090.272860099998}, {'name': 'Nippon Pharma', 'currentAmount': 47426.770462500004, 'invested': 32408, 'currentPrice': 447.2325, 'qty': 106.045, 'unrealisedGain': 15018.770462500004}, {'name': 'Kotak Flexicap', 'currentAmount': 42216.890894, 'invested': 30936, 'currentPrice': 75.982, 'qty': 555.617, 'unrealisedGain': 11280.890893999996}, {'name': 'SBI Equity Hybrid - Growth', 'currentAmount': 45852.9262976, 'invested': 34998, 'currentPrice': 264.9968, 'qty': 173.032, 'unrealisedGain': 10854.926297600003}, {'name': 'ICICI Technology - Growth', 'currentAmount': 68979.55975, 'invested': 56004, 'currentPrice': 196.09, 'qty': 351.775, 'unrealisedGain': 12975.55975}], 'invested': 223325}]}
        print(response)
        return render_template('index2.html', response=response)
