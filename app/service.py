import requests
import math
import yfinance as yf
from config import Config
from datetime import datetime
from app.common_utils import get_months_count, get_current_datetime_object


class PortfolioService:

    def __init__(self, params, headers):
        self.params = params
        self.headers = headers

    @staticmethod
    def get_latest_nav(url):
        response = requests.get(url).json()
        return float(response.get('data')[0].get('nav'))

    @staticmethod
    def get_stock_price_details():
        stock_details = {'type': 'Stocks', 'investments': []}
        total_invested, total_current_amount = 0, 0
        for data in Config.INCLUDED_STOCKS:
            stock = yf.Ticker(data.get('symbol'))
            stock_info = stock.info
            current_amount = data.get('qty') * stock_info.get('currentPrice')
            return_percent = ((current_amount - data.get('invested')) / data.get('invested')) * 100
            stock_details.get('investments').append({'name': data.get('name'), 'invested': data.get('invested'),
                'currentAmount': current_amount, 'currentPrice': stock_info.get('currentPrice'), 'returnPercent': return_percent,
                'qty': data.get('qty'), 'unrealisedGain': current_amount - data.get('invested')
            })
            total_invested += data.get('invested')
            total_current_amount += current_amount
        stock_details.update({'invested': total_invested, 'current': total_current_amount, 'gain': total_current_amount - total_invested})
        return stock_details

    @staticmethod
    def get_rd_maturity_amount(monthly_installment, rate, duration_in_months):
        monthly_rate = rate / 1200
        p_amount = monthly_installment
        for month in range(duration_in_months - 1):
            interest = p_amount * monthly_rate
            p_amount += interest + monthly_installment
        p_amount += p_amount * monthly_rate
        return p_amount

    def get_recurring_deposit_details(self):
        rd_details = {'type': 'Recurring Deposit', 'investments': []}
        total_invested, total_maturity_amount = 0, 0
        for data in Config.RD_DETAIL:
            # month_count = get_months_count(datetime.strptime(data.get('startDate'), '%Y-%m-%d'), get_current_datetime_object())
            amount_invested = data.get('durationInMonths') * data.get('installment')
            maturity_amount = self.get_rd_maturity_amount(data.get('installment'), data.get('roi'), data.get('durationInMonths'))
            rd_details.get('investments').append({
                'installment': data.get('installment'), 'rate': data.get('roi'), 'startDate': data.get('startDate'),
                'invested': amount_invested, 'maturityAmount': maturity_amount, 'name': data.get('name'), 
                'maturityDate': datetime.strptime(data.get('maturityDate'), "%Y-%m-%d").strftime("%d %B %Y").replace(" 0", " ")
            })
            total_invested += amount_invested
            total_maturity_amount += maturity_amount
        rd_details.update({'invested': total_invested, 'maturity': total_maturity_amount, 'gain': total_maturity_amount - total_invested})
        return rd_details

    def get_mutual_funds_details(self):
        mf_details = {'type': 'Mutual Funds', 'investments': []}
        total_invested, total_current_amount = 0, 0
        for portfolio_data in Config.MF_DETAILS:
            mf_current_nav = self.get_latest_nav(portfolio_data.get('api'))
            current_amount = mf_current_nav * portfolio_data.get('units_owned')
            return_percent = round(((current_amount - portfolio_data.get('amount_invested')) / portfolio_data.get('amount_invested')) * 100, 2)
            mf_details.get('investments').append({'name': portfolio_data.get('fund_name'), 'currentAmount': current_amount,
                'invested': portfolio_data.get('amount_invested'), 'currentPrice': mf_current_nav, 'returnPercent': return_percent,
                'qty': portfolio_data.get('units_owned'), 'unrealisedGain': current_amount - portfolio_data.get('amount_invested')})
            total_invested += portfolio_data.get('amount_invested')
            total_current_amount += current_amount
        mf_details.update({'invested': total_invested, 'current': total_current_amount, 'gain': total_current_amount - total_invested})
        return mf_details

    @staticmethod
    def get_nsc_details():
        nsc_details = {'type': 'Nsc', 'investments': []}
        total_invested, total_maturity = 0, 0
        for data in Config.NSC_DETAILS:
            nsc_details.get('investments').append({
                'name': data.get('name'), 'invested': data.get('deposit'), 'maturityDate': data.get('payment_date'),
                'maturityAmount': data.get('payment_amount'), 'rate': data.get('roi')
            })
            total_invested += data.get('deposit')
            total_maturity += data.get('payment_amount')
        nsc_details.update({'invested': total_invested, 'maturity': total_maturity, 'gain': total_maturity - total_invested})
        return nsc_details

    @staticmethod
    def get_crypto_price(crypto_symbol):
        base_url = "https://api.coingecko.com/api/v3/simple/price"
        params = {
            'ids': crypto_symbol,
            'vs_currencies': 'inr',
        }
        try:
            response = requests.get(base_url, params=params)
            data = response.json()
            print(data)
            if crypto_symbol in data:
                return data[crypto_symbol]['inr']
            else:
                return 'NA'
        except Exception as e:
            return 'NA'

    def get_crypto_details(self):
        crypto_details = {'type': 'Crypto', 'investments': []}
        total_invested, total_current_amount = 0, 0
        for data in Config.CRYPTO_DETAILS:
            current_price = self.get_crypto_price(data.get('symbol'))
            if current_price == 'NA':
                return crypto_details
            current_amount = current_price * data.get('qty')
            return_percent = ((current_amount - data.get('invested')) / data.get('invested')) * 100
            crypto_details.get('investments').append({
                'name': data.get('name'), 'qty': data.get('qty'), 'invested': data.get('invested'), 'currentAmount': current_amount, 
                'unrealisedGain': current_amount - data.get('invested'), 'currentPrice': current_price, 'returnPercent': return_percent
            })
            total_invested += data.get('invested')
            total_current_amount += current_amount
        crypto_details.update({'invested': total_invested, 'current': total_current_amount, 'gain': total_current_amount - total_invested})
        return crypto_details

    def get_external_app_details(self):
        cred_details = {'type': 'External App', 'investments': []}
        total_invested, total_current_amount = 0, 0
        for data in Config.EXT_APP_DETAILS:
            invested_date = datetime.strptime(data.get('invested_at'), "%Y-%m-%d")
            current_date = datetime.now()
            num_days = (current_date - invested_date).days
            interest = (data.get('invested') * data.get('roi') * num_days) / (100 * 365)
            current_amount = data.get('invested') + interest
            return_percent = ((current_amount - data.get('invested')) / data.get('invested')) * 100
            cred_details.get('investments').append({
                'name': data.get('name'), 'invested': data.get('invested'), 'roi': data.get('roi'), 'currentAmount': current_amount,
                'unrealisedGain': current_amount - data.get('invested'), 'returnPercent': return_percent
            })
            total_invested += data.get('invested')
            total_current_amount += current_amount
        cred_details.update({'invested': total_invested, 'current': total_current_amount, 'gain': total_current_amount - total_invested})
        return cred_details

    def get_portfolio_details(self):
        rd_data = self.get_recurring_deposit_details()
        mf_data = self.get_mutual_funds_details()
        stock_data = self.get_stock_price_details()
        nsc_data = self.get_nsc_details()
        crypto_data = self.get_crypto_details()
        cred_data = self.get_external_app_details()
        total_investment = rd_data.get('maturity') + mf_data.get('current') + stock_data.get('current') \
            + nsc_data.get('maturity') + crypto_data.get('current') + cred_data.get('current')
        return {
            'totalInvestment': total_investment,
            'transactions': [
                rd_data,
                mf_data,
                stock_data,
                nsc_data,
                crypto_data,
                cred_data
            ]
        }
