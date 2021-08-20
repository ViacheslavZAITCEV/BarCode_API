<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="160" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API to search for information about a food product by barcode.
API uses openfoodfacts.org database

API written as a technical [test](https://github.com/InnovOrder/software-technical-tests)


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Authorization

Authorization is implemented through the JVT token

API returns JVT token after successful authorization of root (api/login)
Roots requiring authorization:
/api/auth/update
/api/findProductByCode/

For successful authorization, add the received token as Bearer Token to the "Authorization" field of the request.
for example for JWT token tokePart1.tokenPart2.tokenPart3

```bash
Bearer tokePart1.tokenPart2.tokenPart3
```


## Stay in touch

- Author - [Viacheslav ZAITCEV](https://github.com/ViacheslavZAITCEV)
- Docsite - [https://nestjs.com](https://nestjs.com/)
