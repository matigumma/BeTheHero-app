# BeTheHero-app
Nodejs, Express, Knex, Sqlite, Jest, React, Axios, React-Native, Expo

`Be The Hero - backend + web front-end + mobile app - Semana Omnistack - Rocketseat`

This is the result of last 4 days working on a simple app, that gives an interface to who want to help others 
looking on a cases's list and getting in touch by Whatsapp message or email.

`Backend`
In the back hold an express server, define a simple cors access to * by default,
create a REST API using a mvc struccture and a sqlite database handled by knex with migrate option for versioning history.
Validate routes with celebrate middleware to ensure the correct data that will be used by controllers

`Web Front-end`
Here use a create-react-app, fully function style and hook oriented components, 
handle routes with react-router-dom,
access api request using async-await functions,
get/set of localstorage

`mobile app`
React-Native, my first time using it
this is an Expo default project, that let develop looking the result live on simulator, mobile or web
handle navigation with react-navigation, use of stack navigation for buttons actions
it have an infinite scroll layout, and a button that lauch a new whatsapp conversation with a custom text
also a button for email.




