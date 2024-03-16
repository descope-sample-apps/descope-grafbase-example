<img width="1400" alt="Screenshot 2024-03-15 at 4 11 58 PM" src="https://github.com/descope-sample-apps/descope-grafbase-example/assets/32936811/e46d6995-b560-49f9-9cb5-08c35a0bd7e3">

# Grafbase + Descope Sample App

This app showcases the power of using Grafbase with a Postgres database ([Neon](https://neon.tech/) in this case) as your data source and Descope for secure authentication. Perfect for Next.js developers aiming to spin up serverless backends quickly with advanced auth methods. :zap:

## Features :sparkles:

- **Secure Authentication**: Utilizes Descope for user authentication.
- **Serverless Backend**: Leverages Grafbase with a Postgres database for a scalable, serverless backend. Test any GraphQL Queries or Mutations against your Grafbase-powered backend.
- **Flexible Configuration**: Easy to switch data sources or extend functionality with `grafbase.config.ts`.

<img width="1718" alt="image" src="https://github.com/descope-sample-apps/descope-grafbase-example/assets/32936811/2e04763a-34dc-4a49-8846-e4c8635c82f8">

## Getting Started 🚀

Follow these steps to clone the repository and start using the app.

### Prerequisites

- An account on [Grafbase](https://grafbase.com/) and [Descope](https://descope.com/).
- A Postgres database, for example, Neon, already set up.

### Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/descope-sample-apps/descope-grafbase-example.git
cd descope-grafbase-example
```

### Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
yarn install
```

### Configuration

Before you run the app, make sure to configure the following:

- **Grafbase Configuration**: The app uses `grafbase.config.ts` for Grafbase setup. To switch the data source or extend the Postgres database with Grafbase Resolvers, modify this file accordingly.
- **Environment Variables**: Set up your environment variables in a `.env.local` file. You'll need to include your Grafbase API URL and Descope project settings:

```
####### Descope ENV Variables
NEXT_PUBLIC_DESCOPE_PROJECT_ID="" // Descope Project ID
NEXT_PUBLIC_DESCOPE_FLOW_ID="sign-up-or-in" // Descope flow to use on Sign In Page

DESCOPE_MANAGEMENT_KEY="" // Descope Management Key
SIGN_IN_ROUTE="/sign-in" // Route of Sign In Page

####### Grafbase ENV Variables
NEXT_PUBLIC_GRAFBASE_API_URL="http://127.0.0.1:4000/graphql"
DATABASE_URL="postgresql://..."
DESCOPE_ISSUER_URL="https://api.descope.com/YOUR_DESCOPE_PROJECT_ID"
```

- **Descope JWT**: Ensure AWS compliant JWTs are enabled in your Descope project. This is crucial for the authentication process to work seamlessly. The Issuer URL in the JWT must include `https://api.descope.com/` as a prefix. <img width="700" alt="Monosnap Descope Console 2024-03-15 17-11-44" src="https://github.com/descope-sample-apps/descope-grafbase-example/assets/32936811/4e141ad7-bd54-45e3-97d3-d8924bab021f">


### Running the Grafbase Server

If you've never run Grafbase on your local environment before, from the root of the directory run the following command:

```
npx grafbase@latest init
```

Once your graph has been initialized, to run your Grafbase Server locally, you'll can run this command:

```
npx grafbase dev
```

This is all you will need to test this sample app. The `.env.example` already has `localhost` configured as your Grafbase API endpoint.

> If you wish to deploy to Grafbase to push your changes and host the backend, you can use this command: `npx grafbase@latest deploy`

### Running the App

Once you've configured your app, you're ready to run it:

```bash
yarn dev
```

This command starts the Next.js development server, making your app accessible at [http://localhost:3000](http://localhost:3000).

## Support :raised_hands:

If you encounter any issues or have questions, consult the Grafbase and Descope documentation, or reach out to our [support](https://www.descope.com/contact) for assistance.

- [Grafbase Documentation](https://docs.grafbase.com/)
- [Descope Documentation](https://docs.descope.com/)

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have suggestions or improvements.

## License

This sample app is open-source and available under the MIT License. See the LICENSE file for more details.
