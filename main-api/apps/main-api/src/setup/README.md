## Setup Module

This folder group all the settings and libraries needed in the main App,
These settings are loaded first during the bootstrap of the App

Some of them are listed here:

- dotenv: Load the environment variables
- elasticsearch (not used yet)
- graphql: Protocol used to comunicate with the web applications
  - Web-Portal
  - Web-App
  - Web-Admin
- kafka: Setup a client for the chat-microservice
- redis: Setup Redis (cache)
- throttler: Setup a brute force security
- typeorm: Setup the connection with the PostgreSQL Database

The entry point is the `setup.module.ts` file
