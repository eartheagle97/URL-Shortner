# URL Shortener

A simple URL shortener application with a backend built using Node.js, Express, and DynamoDB, and a frontend built with React.

## Backend

### Prerequisites

- Node.js
- AWS Account with DynamoDB configured
- AWS CLI (for local DynamoDB development)

### Getting Started

1. Clone the repository:

   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener/backend

2. Install dependencies:

   npm install

3. Configure AWS credentials:

   Obtain your AWS credentials (Access Key ID and Secret Access Key) from the AWS console.

   aws configure

4. Set up DynamoDB:

   Ensure you have DynamoDB locally for development:

   npm install -g dynamodb-admin
   dynamodb-admin

5. Create the DynamoDB table:

   npm run create-table

6. Start the server:

   npm start

   The server will run on `http://localhost:3001`.


## Frontend

### Prerequisites

- Node.js
- npm or yarn

### Getting Started

1. Navigate to the frontend directory:

   cd ../frontend

3. Install dependencies:

   npm install

4. Start the React app:

   npm start

   The app will run on `http://localhost:3000`.

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter a long URL in the input field and click "Generate".
3. Copy the shortened URL and use it to redirect to the original URL.

### Technologies Used

- React
- Axios for API requests

---

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback is highly appreciated!
