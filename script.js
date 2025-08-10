// Initial data for the teams
let teams = [
    { id: 0, name: 'Health Foundation', funds: 0, expenditure: 0 },
    { id: 1, name: 'Wellness Collective', funds: 0, expenditure: 0 },
    { id: 2, name: 'Insurance Alliance', funds: 0, expenditure: 0 },
    { id: 3, name: 'Spiritual Center', funds: 0, expenditure: 0 }
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

// Function to update the main metrics and check for over-spend
function updateMetrics() {
    totalFundsEl.textContent = `$${totalFunds.toFixed(2)}`;
    userFundEl.textContent = `$${userFund.toFixed(2)}`;
    minContributionEl.textContent = `$${minContribution.toFixed(2)}`;

    // Calculate and display average spend
    const totalExpenditure = teams.reduce((sum, team) => sum + team.expenditure, 0);
    const avgSpend = totalExpenditure / numTeams;
    avgSpendEl.textContent = `$${avgSpend.toFixed(2)}`;

    // Check for over-spend and update user fund
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
}

// Function to render all team cards
function renderTeams() {
    teamsContainer.innerHTML = '';
    teams.forEach(team => {
        const teamCard = document.createElement('div');
        teamCard.className = 'bg-white p-6 rounded-lg shadow-md';
        teamCard.innerHTML = `
            <h3 class="text-lg font-semibold text-indigo-700 mb-2">${team.name}</h3>
            <p class="text-sm text-gray-600">Current Funds: <span id="funds-${team.id}" class="font-bold text-green-600">$${team.funds.toFixed(2)}</span></p>
            <p class="text-sm text-gray-600 mb-4">Total Expenditure: <span id="expenditure-${team.id}" class="font-bold text-red-600">$${team.expenditure.toFixed(2)}</span></p>
            
            <div class="flex items-end space-x-2">
                <input type="number" id="spend-input-${team.id}" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" placeholder="Amount spent">
                <button data-team-id="${team.id}" class="spend-btn bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                    Spend
                </button>
            </div>
        `;
        teamsContainer.appendChild(teamCard);
    });

    // Add event listeners to the new buttons
    document.querySelectorAll('.spend-btn').forEach(button => {
        button.addEventListener('click', spendHandler);
    });
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

// New spend handler function
function spendHandler(event) {
    const teamId = event.target.dataset.teamId;
    const team = teams.find(t => t.id == teamId);
    const spendInput = document.getElementById(`spend-input-${teamId}`);
    const spendAmount = parseFloat(spendInput.value);

    if (isNaN(spendAmount) || spendAmount <= 0) {
        alert('Please enter a valid amount to spend.');
        return;
    }

    if (spendAmount > team.funds) {
        alert(`Team ${team.name} does not have enough funds to spend $${spendAmount.toFixed(2)}.`);
        return;
    }

    // Deduct from funds and add to expenditure
    team.funds -= spendAmount;
    team.expenditure += spendAmount;

    // Clear input and update UI
    spendInput.value = '';
    updateMetrics();
    renderTeams();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTeams();
    updateMetrics();
});
