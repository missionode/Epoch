# Epoch Project
## Project Overview
The Epoch Project is a single-page web application designed to demonstrate a collaborative funding model focused on prevention. It brings together various organizations—such as health, spiritual, and insurance teams—into a "super team." The core mission is to fund preventative research and initiatives.

Users can contribute money to a central fund, which is then distributed equally among the participating teams. Each team can then spend their allocated funds on their respective projects. The app tracks all these activities in real time and includes a unique economic model:
 * Real-time Calculations: All contributions, fund allocations, and expenditures are updated instantly.
 * Average Spend: The application calculates the average expenditure across all teams.
 * User Fund: If a team spends more than the average, the excess amount is deducted from their funds and moved to a special User Fund. This fund is used to adjust the minimum contribution amount for users, acting as a form of reward or incentive.
Tech Stack
The project is built with a minimalist and modern tech stack:
 * HTML: For the page structure and content.
 * Tailwind CSS: A utility-first CSS framework for clean, modern, and responsive styling.
 * JavaScript: The core logic for all real-time calculations, dynamic UI updates, and event handling.
How to Run the Project
This project does not require any build tools or complex setup. You can run it directly in any modern web browser.
 * Clone the repository or download the project files (index.html, script.js).
 * Open the index.html file in your preferred web browser (e.g., Chrome, Firefox, Edge).
The application will load and be ready to use immediately.
Key Features
1. User Contributions
 * Users can enter a contribution amount in the input field.
 * The minimum contribution dynamically adjusts based on the value of the User Fund.
 * Clicking "Contribute" distributes the money equally to all teams and updates the Total Funds display.
2. Team Performance
 * Each team has a dedicated card showing their Current Funds and Total Expenditure.
 * Team members can manually input an amount and click the "Spend" button to record their expenditure.
 * The system checks if a team has sufficient funds before allowing an expenditure.
3. Real-Time Metrics
 * The header displays the Total Funds received from all users.
 * A dedicated section shows the Average Team Spend and the current value of the User Fund.
 * All these metrics update instantly with every new contribution or expenditure.
