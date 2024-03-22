# URL Shortener

A simple URL shortener application with a backend built using Node.js, Express, and DynamoDB, and a frontend built with React.

## Backend

### Prerequisites

- Node.js
- AWS Account with DynamoDB configured
- AWS CLI (for local DynamoDB development)

### Getting Started

1. Clone the repository:

```bash
   git clone [https://github.com/eartheagle97/url-shortener.git](https://github.com/eartheagle97/URL-Shortner)
   cd url-shortener/backend
```

3. Install dependencies:

```bash
   npm install
```

4. Configure AWS credentials:

   Obtain your AWS credentials (Access Key ID and Secret Access Key) from the AWS console.

```bash
   aws configure
```

5. Set up DynamoDB:

   Ensure you have DynamoDB locally for development:

```bash
   npm install -g dynamodb-admin
   dynamodb-admin
```

6. Create the DynamoDB table:

```bash
   npm run create-table
```

7. Start the server:

```bash
   npm start
```

   The server will run on `http://localhost:3001`.


## Frontend

### Prerequisites

- Node.js
- npm or yarn

### Getting Started

1. Navigate to the frontend directory:

```bash
   cd ../frontend
```

3. Install dependencies:
```bash
   npm install
```
4. Start the React app:
```bash
   npm start
```
   The app will run on `http://localhost:3000`.

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter a long URL in the input field and click "Generate".
3. Copy the shortened URL and use it to redirect to the original URL.

### Technologies Used

- React
- Axios for API requests

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback is highly appreciated!

## Support

If you enjoyed URL Shortner and would like to support the development, consider buying me a coffee! ☕️

[![Buy Me a Coffee](https://camo.githubusercontent.com/12f516d86d600c89a6abd2326256045c27325ad7c8532c0d36772965a4923be0/68747470733a2f2f7777772e6275796d6561636f666665652e636f6d2f6173736574732f696d672f637573746f6d5f696d616765732f6f72616e67655f696d672e706e67)](https://www.buymeacoffee.com/kairavpateu)

Your support helps keep the adventure alive! 🚀
