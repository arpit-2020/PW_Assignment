# PW_Assignment
Certainly! Here's a sample README.md file for your micro-service project:

---

# Summary Statistics Micro-Service

This micro-service provides functionality to calculate summary statistics (mean, min, max) on a dataset. It offers various API endpoints to interact with the dataset, including adding and deleting records, fetching summary statistics, and more.

## Getting Started

Follow these steps to set up and run the micro-service on your local machine.

### Prerequisites

Make sure you have the following dependencies installed:

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project_directory>
   ```

3. Install the required npm packages:

   ```bash
   npm install
   ```
### Running the Micro-Service

Start the micro-service using the following command:

```bash
npm index.js
```

The micro-service should now be running on `http://localhost:3000` (or your specified port).

## API Endpoints

1. **Add a New Record**:
   - Method: POST
   - Endpoint: `/add`
   - Description: Add a new record to the dataset.

2. **Delete a Record**:
   - Method: POST
   - Endpoint: `/delete`
   - Description: Delete a record from the dataset by ID.

3. **Fetch Summary Statistics for Entire Dataset**:
   - Method: GET
   - Endpoint: `/entire-dataset`
   - Description: Fetch summary statistics for salary over the entire dataset.

4. **Fetch Summary Statistics for Records on Contract**:
   - Method: GET
   - Endpoint: `/onContract`
   - Description: Fetch summary statistics for salary for records with "on_contract" set to "true."

5. **Fetch Summary Statistics for Salary in Each Department**:
   - Method: GET
   - Endpoint: `/eachDept`
   - Description: Fetch summary statistics for salary in each department.

6. **Fetch Summary Statistics for Salary in Each Department and Sub-Department Combination**:
   - Method: GET
   - Endpoint: `/onSubdept`
   - Description: Fetch summary statistics for salary for each department and sub-department combination.

## Authentication and Authorization

- Basic authentication is implemented with a dummy user (username:"Arpit@test.com" and password:"1234").
- Token-based authorization is used for API access.
- Use the generated token to authenticate and authorize API requests.

## Error Handling

Proper error handling is implemented, including validation of input payloads and use of appropriate error codes for authentication, authorization, and logic errors.

## Author

Author : Arpit Katiyar
