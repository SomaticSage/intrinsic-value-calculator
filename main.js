document.getElementById('calculateButton').addEventListener('click', function() {
    const operatingCashFlow = parseFloat(document.getElementById('operatingCashFlow').value);
    const capitalExpenditure = parseFloat(document.getElementById('capitalExpenditure').value);
    const numberOfYears = parseInt(document.getElementById('numberOfYears').value);
    const annualGrowth = parseFloat(document.getElementById('annualGrowth').value) / 100;
    const cashFlowMultiple = parseFloat(document.getElementById('cashFlowMultiple').value);
    const inflationPercentage = parseFloat(document.getElementById('inflationPercentage').value) / 100;
    
    if (isNaN(operatingCashFlow) || isNaN(capitalExpenditure) || isNaN(numberOfYears) ||
        isNaN(annualGrowth) || isNaN(cashFlowMultiple) || isNaN(inflationPercentage)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    let initialCashFlow = operatingCashFlow - capitalExpenditure;
    console.log(`Initial Cash Flow: ${initialCashFlow}`);

    let results = [];
    let tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous results

    for (let i = 0; i < numberOfYears; i++) {
        console.log(`Year ${i + 1}:`);
        console.log(`  Initial Cash Flow Before Growth: ${initialCashFlow.toFixed(2)}`);
        
        let discountedValue = i === 0 ? initialCashFlow : initialCashFlow - (initialCashFlow * inflationPercentage);
        console.log(`  Discounted Value After Inflation: ${discountedValue.toFixed(2)}`);
        
        results.push(discountedValue);
        
        let row = tableBody.insertRow();
        row.insertCell(0).innerText = `Year ${i + 1}`;
        row.insertCell(1).innerText = initialCashFlow.toFixed(2);
        row.insertCell(2).innerText = discountedValue.toFixed(2);
        
        if (i < numberOfYears - 1) {
            initialCashFlow *= (1 + annualGrowth);
            console.log(`  Initial Cash Flow After Growth: ${initialCashFlow.toFixed(2)}`);
        }
    }

    // Calculate terminal value based on the final year's cash flow before growth
    let terminalValue = initialCashFlow * cashFlowMultiple;
    console.log(`Terminal Value Calculation:`);
    console.log(`  Final Year's Cash Flow: ${initialCashFlow.toFixed(2)}`);
    console.log(`  Cash Flow Multiple: ${cashFlowMultiple}`);
    console.log(`  Terminal Value Before Discount: ${terminalValue.toFixed(2)}`);
    
    let discountedTerminalValue = terminalValue - (terminalValue * inflationPercentage);
    console.log(`  Terminal Value After Discount: ${discountedTerminalValue.toFixed(2)}`);

    document.getElementById('terminalValue').value = discountedTerminalValue.toFixed(2);

    let totalValue = results.reduce((acc, val) => acc + val, 0) + discountedTerminalValue;
    console.log(`Total Intrinsic Value: ${totalValue.toFixed(2)}`);

    document.getElementById('totalValue').innerText = `Total Intrinsic Value: ${totalValue.toFixed(2)}`;
});
