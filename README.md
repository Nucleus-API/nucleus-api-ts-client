# Typescript client for Nucleus API

Instantiate the client and start making calls:
```
import NucleusAPIClient from 'nucleus-api-ts-client';

const nucleusAPI = new NucleusAPIClient(
    <your api key>,
    true // true in prod and false in dev
);
```