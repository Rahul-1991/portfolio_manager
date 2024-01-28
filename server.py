from app import app
# from flask import Flask, render_template

# app = Flask(__name__)
#
# # Sample investment data (replace with your own data)
# investments = [
#     {'name': 'Stocks', 'amount': 5000},
#     {'name': 'Bonds', 'amount': 3000},
#     # Add more investments
# ]
#
# @app.route('/')
# def home():
#     return render_template('index.html', investments=investments)
#
#
#
# @app.route('/net_worth')
# def net_worth():
#     total_worth = sum(item['amount'] for item in investments)
#     return render_template('net_worth.html', total_worth=total_worth)

if __name__ == '__main__':
    app.run(debug=True)
