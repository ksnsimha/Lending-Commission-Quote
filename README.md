Node version 20.19.0

Clone the Repository

Instruction to run the mock server

1. cd mock-server
2. npm install 
3. npm run start 

This should log this statement in the console
Mock Commission Quote API running at http://localhost:4000


In another terminal ,

1. Go to the root directory
2. npm install
3. npm run start

This should open up the Web Application in the browser in http://localhost:3000/



These are the steps I did to implement this solution. I have mentioned where and how I have used LLM 


1. Command to create the react starter npx create-react-app commission-quote-app
2. All instructions are in the https://create-react-app.dev/docs/getting-started/
3. Added MUI dependencies to package.json
4. Created a very simple Loan Application Form component using Claude
5. Created a OpenAPI spec for the API in the swaggerhub portal
6. Added related dev dependencies for codegen  (Which was given by Claude)
7. Added a script to code gen (Which was given by Claude)
8. I started getting ERROR in './src/components/LoanApplicationForm.js 7:0-64' Module not found: Error: Can't resolve 'commission-quote-client' in '/Users/narasimhankhadri/commission-quote-app/src/components'
9. I had to google and use the swagger-typescript-api module in my dev dependency instead.
10. The script for generate:sdk was also fetched from the module help page.
11. Executed npx storybook@latest init to test components
12. Added a Quote Result component
13. Created jest test cases using Claude. Modified components to include data-testid so that its easy to do unit testing.
14. Instructed Claude to give me a mock server. Instructed it to randomly throw 503 error message based on env value