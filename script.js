// Initial data for the teams
let teams = [
    { name: 'Health Foundation', funds: 0, expenditure: 0 },
    { name: 'Wellness Collective', funds: 0, expenditure: 0 },
    { name: 'Insurance Alliance', funds: 0, expenditure: 0 },
    { name: 'Spiritual Center', funds: 0, expenditure: 0 }
];

// Initial state variables
let totalFunds = 0;
let userFund = 0;
let minContribution = 10;
const numTeams = teams.length;

// DOM element references
const totalFundsEl = document.getElementById('total-funds');
const minContributionEl = document.getElementById('min-contribution');
const contributionInput = document.getElementById('contribution-amount');
const contributeBtn = document.getElementById('contribute-btn');
const avgSpendEl = document.getElementById('avg-spend');
const userFundEl = document.getElementById('user-fund');
const teamsContainer = document.getElementById('teams-container');

// Function to render all team cards
function renderTeams() {
    teamsContainer.innerHTML = '';
    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'bg-white p-6 rounded-lg shadow-md';
        teamCard.innerHTML = `
            <h3 class="text-lg font-semibold text-indigo-700 mb-2">${team.name}</h3>
            <p class="text-sm text-gray-600">Current Funds: <span class="font-bold text-green-600">$${team.funds.toFixed(2)}</span></p>
            <p class="text-sm text-gray-600">Total Expenditure: <span class="font-bold text-red-600">$${team.expenditure.toFixed(2)}</span></p>
        `;
        teamsContainer.appendChild(teamCard);
    });
}

// Function to update the main metrics
function updateMetrics() {
    totalFundsEl.textContent = `$${totalFunds.toFixed(2)}`;
    userFundEl.textContent = `$${userFund.toFixed(2)}`;
    minContributionEl.textContent = `$${minContribution.toFixed(2)}`;
    
    // Calculate and display average spend
    const totalExpenditure = teams.reduce((sum, team) => sum + team.expenditure, 0);
    const avgSpend = totalExpenditure / numTeams;
    avgSpendEl.textContent = `$${avgSpend.toFixed(2)}`;
}

// Contribution handler
contributeBtn.addEventListener('click', () => {
    const amount = parseFloat(contributionInput.value);
    
    if (isNaN(amount) || amount < minContribution) {
        alert(`Please enter a contribution amount of at least $${minContribution.toFixed(2)}`);
        return;
    }

    // Update total funds and distribute equally
    totalFunds += amount;
    const distributedAmount = amount / numTeams;
    teams.forEach(team => {
        team.funds += distributedAmount;
    });

    // Clear input and update UI
    contributionInput.value = '';
    updateMetrics();
    renderTeams();
});

// A placeholder for a real-time event where teams spend money
function simulateSpending() {
    teams.forEach(team => {
        // Simulate a random spend amount
        const spendAmount = Math.random() * (team.funds * 0.2); 
        if (team.funds >= spendAmount) {
            team.funds -= spendAmount;
            team.expenditure += spendAmount;
        }
    });

    // Recalculate average and check for over-spend
    const totalExpenditure = teams.reduce((sum, team) => sum + team.expenditure, 0);
    const avgSpend = totalExpenditure / numTeams;

    teams.forEach(team => {
        if (team.expenditure > avgSpend) {
            const overSpend = team.expenditure - avgSpend;
            // Deduct overspend from team funds and add to user fund
            team.funds -= overSpend; 
            userFund += overSpend;
        }
    });

    // Update min contribution based on user fund (simplified logic)
    minContribution = 10 - Math.min(Math.floor(userFund / 100), 5); // Example: min contribution decreases by $1 for every $100 in user fund, up to a max of $5 reduction
    if (minContribution < 1) minContribution = 1;

    updateMetrics();
    renderTeams();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTeams();
    updateMetrics();
    // Simulate real-time updates every 3 seconds
    setInterval(simulateSpending, 3000);
});
