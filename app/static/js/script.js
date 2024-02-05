document.addEventListener("DOMContentLoaded", function() {
        window.onload = function () {
                fetchInvestmentData();
            };
        const backendData = {
        mutualFunds: [],
        recurringDeposit: [],
        stocks: [],
        nsc: [],
        crypto: [],
        };
        const charts = {};

        async function fetchInvestmentData() {
            const response = await fetch('http://localhost:5000/portfolio_data');
            const data = await response.json();

            const investmentTypes = ['mutualfunds', 'recurringdeposit', 'stocks', 'nsc', 'crypto'];

            investmentTypes.forEach(type => {
            const transaction = data.transactions.find(transaction =>
                transaction.type.toLowerCase() === type.toLowerCase());
            if (transaction && transaction.investments) {
                backendData[type] = transaction.investments;
                renderData(type, backendData[type]);
                updateAdditionalData(type, backendData[type]);
                console.log(type);
                switch (type) {
                    case 'mutualfunds':
                        renderPieChart('mutualfundsSection','mutualfundschart', 'Mutual Funds', backendData.mutualFunds);
                        break;
                    case 'stocks':
                        renderPieChart('stocksSection','stockschart', 'Stocks', backendData.stocks);
                        break;
                    case 'crypto':
                        renderPieChart('cryptoSection','cryptochart', 'Crypto', backendData.crypto);
                        break;
                    default:
                        break;
                }
            } else {
                console.error(`No data found for ${type} or missing 'investments' property.`);
                }
            });
        } 




function renderData(category, data) {
    const sectionContent = $(`#${category}Section .section-content`);
    console.log(data);
    sectionContent.empty();

    if (data.length > 0) {
        const table = $('<table></table>');
        const tableHead = $('<thead></thead>');
        const tableBody = $('<tbody></tbody>');

        const keys = Object.keys(data[0]);
        const headerRow = $('<tr></tr>');

        keys.forEach(key => {
            headerRow.append(`<th>${key}</th>`);
        });

        tableHead.append(headerRow);
        table.append(tableHead);

        data.forEach(item => {
            const row = $('<tr></tr>');

            keys.forEach(key => {
                if (key === 'unrealisedGain' && (category === 'mutualfunds' || category === 'stocks')) {
                    const gainValue = parseFloat(item[key]);
                    let arrowClass = 'fa-minus'; 

                    if (gainValue > 0) {
                        arrowClass = 'fa-arrow-up'; 
                    } else if (gainValue < 0) {
                        arrowClass = 'fa-arrow-down';
                    }

                    row.append(`<td style="color: ${gainValue >= 0 ? 'green' : 'red'};"><i class="fas ${arrowClass}"></i> ${item[key]}</td>`);
                } else if (key === 'profit' && category === 'crypto') {
                    const profitValue = parseFloat(item[key]);
                    let arrowClass = 'fa-minus'; 

                    if (profitValue > 0) {
                        arrowClass = 'fa-arrow-up'; 
                    }
                    else if (profitValue < 0) {
                        arrowClass = 'fa-arrow-down';
                    }

                    row.append(`<td style="color: ${profitValue >= 0 ? 'green' : 'red'};"><i class="fas ${arrowClass}"></i> ${item[key]}</td>`);
                } else {
                    row.append(`<td>${item[key]}</td>`);
                }
            });

            tableBody.append(row);
        });

        table.append(tableBody);
        sectionContent.append(table);
    } else {
        sectionContent.append('<p>No data available.</p>');
    }
}


function updateAdditionalData(category, data) {
                const additionalDataContainer = $(`#${category}AdditionalData`);
                const totalInvested = data.reduce((total, item) => total + parseFloat(item.invested), 0).toFixed(2);
                const totalCurrentAmount = data.reduce((total, item) => total + parseFloat(item.currentAmount), 0).toFixed(2);
                const totalProfitLoss = (totalCurrentAmount - totalInvested).toFixed(2);
                const maturityAmt = data.reduce((total, item) => total + parseFloat(item.maturityAmount), 0).toFixed(2);
                const installment = data.reduce((total, item) => total + parseFloat(item.installment), 0).toFixed(2);

                if (category === 'recurringdeposit') {
                    console.log('rd');
                    additionalDataContainer.html(`
                    <p>Installment: Rs ${installment}</p>
                    <p>Total Invested: Rs ${totalInvested}</p>
                    <p>Maturity Amount: Rs ${maturityAmt}</p>
                `);
                        
                }else{

                additionalDataContainer.html(`
                    <p>Total Invested: Rs ${totalInvested}</p>
                    <p>Total Current Amount: Rs ${totalCurrentAmount}</p>
                    <p>${totalProfitLoss < 0 ? 'Loss' : 'Profit'}: Rs ${Math.abs(totalProfitLoss)}</p>
                `);
            }

                // Add arrow icon for profit/loss
                const arrowIcon = additionalDataContainer.parent().find('.arrow-icon');
                if (totalProfitLoss > 0) {
                    arrowIcon.html('<i class="fas fa-arrow-up" style="color: green;"></i>');
                } else if (totalProfitLoss < 0) {
                    arrowIcon.html('<i class="fas fa-arrow-down" style="color: red;"></i>');
                } else {
                    arrowIcon.html('<i class="fas fa-minus" style="color: grey;"></i>');
                }
            }

        // Function to toggle section (expand/collapse)
        window.toggleSection = function(sectionId) {
            const section = $(`#${sectionId}`);
            const sectionContent = section.find('.section-content');

            if (sectionContent.is(':visible')) {
                sectionContent.slideUp();
            } else {
                // Hide other open sections
                $('.section-content').slideUp();

                // Show clicked section
                sectionContent.slideDown();

                // Fetch and render data if not already loaded
                const category = sectionId.replace('Section', '');
                const data = backendData[category];
                if (data && data.length > 0) {
                    renderData(category, data);
                    updateAdditionalData(category, data);
                    switch (sectionId) {
                    case 'mutualfunds':
                        renderPieChart('mutualfundsSection','mutualfundschart', 'Mutual Funds', backendData.mutualFunds);
                        break;
                    case 'stocksSection':
                        renderPieChart('stocksSection','stockschart', 'Stocks', backendData.stocks);
                        break;
                    case 'cryptoSection':
                        renderPieChart('cryptoSection','cryptochart', 'Crypto', backendData.crypto);
                        break;
                    default:
                        break;
                }
                }
            }
        };

function addCanvasToSection(sectionId, canvasId, canvasWidth, canvasHeight) {
        var sectionContent = document.getElementById(sectionId+'Content');
        
        var canvasElement = document.createElement("canvas");
        canvasElement.id = canvasId;
        canvasElement.width = canvasWidth;
        canvasElement.height = canvasHeight;

        
        sectionContent.appendChild(canvasElement);
    }

function renderPieChart(section, chartId, title, data) {
                addCanvasToSection(section,chartId,400,200);
                const ctx = document.getElementById(chartId).getContext('2d');
                if (charts[chartId]) {
                    charts[chartId].destroy();  // Destroy the existing chart
                }

                charts[chartId] = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.map(item => item.name),
                        datasets: [{
                            label: `${title} Distribution`,
                            data: data.map(item => item.invested),
                            backgroundColor: getRandomColorArray(data.length),
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                display: false,  
                            },
                            y: {
                                display: false,
                            },
                        },
                    },
                });
            }

function getRandomColorArray(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
        colors.push(color);
    }
    return colors;
}
$('.section-content').hide(); //to make it in collpased state by default
});