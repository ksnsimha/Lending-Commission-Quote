Node version 20.19.0
Command to create the react starter
npx create-react-app commission-quote-app
All instructions are in the https://create-react-app.dev/docs/getting-started/
Added MUI dependencies to package.json
Created a very simple Loan Application Form component using Claude
Created a OpenAPI spec for the API in the swaggerhub portal
Added related dev dependencies for codegen  (Which was given by Claude)
Added a script to code gen (Which was given by Claude)
I started getting ERROR in './src/components/LoanApplicationForm.js 7:0-64' Module not found: Error: Can't resolve 'commission-quote-client' in '/Users/narasimhankhadri/commission-quote-app/src/components'
I had to google and use the swagger-typescript-api module in my dev dependency instead.
The script for generate:sdk was also fetched from the module help page.
Added npx storybook@latest init to test components
Added a Quote Result component
Created jest test cases using Claude. Modified components to include data-testid so that its easy to do unit testing