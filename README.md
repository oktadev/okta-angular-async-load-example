# Angular Async Configuration Loading

This respository shows you how to load configuration data from an external server to integrate Okta into an Angular app. Please read [Three Ways to Configure Modules in Your Angular App](https://developer.okta.com/blog/2022/02/24/angular-async-config) to see how it was created.

**Prerequisites**

* Node 14
* Okta CLI

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```shell
git clone https://github.com/oktadev/okta-angular-async-example.git
cd okta-angular-async-example
```

Navigate into both `async-load-app` and `config-server` directories and run

```shell
npm ci
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: SPA**
- Redirect URI: `http://localhost:4200/login/callback`
- Logout Redirect URI: `http://localhost:4200`

The application configuration will be printed to your screen:

```shell
Okta application configuration:
Issuer:    https://<OKTA_DOMAIN>.okta.com/oauth2/default
Client ID: <CLIENT_ID>
```

In Okta dashboard, navigate to **Directory** > **People** and populate "department" field for your user with either a `1` or `2`. Navigate to **Security** > **API** and add "department" custom claim to your application Authorization Server ID token by mapping it to `user.profile.department`. The tutorial walks you through this process.

Update `config-server/server.js` with your Okta settings.

```ts
app.get('/config', (req, res) => {
    res.json({
        issuer: 'https://{yourOktaDomain}/oauth2/default',
        clientId: '{yourClientId}', 
    });
});
```

Start server first, then start the app. Run both by running

```shell
npm start
```

Run tests in `async-load-app` by running

```shell
npm run test
```

## Links

This example uses the following open source libraries from Okta:

* [Okta Angular SDK](https://github.com/okta/okta-angular)
* [Okta Auth JS SDK](https://github.com/okta/okta-auth-js)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog