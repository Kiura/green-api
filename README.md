## Some assumptions:
I have not done any code challenges for a long time, as I assumed they were not required for senior positions 😅.

Also, bear in mind, I never used rabbitMQ, I used to use Kafka and Google Pub/Sub, so some best practises might not be in place.

0. A boilerplate has been used to set up typescript (however, not much of TS been in the code).

1. Haven't used interfaces, so we are able to test the code properly (maybe rabbitMQ have some mock system we can employ?)

2. I didn't do any logging because I believe that microservices architectures should have a tracing mechanism enabled for debugging purposes. However, setting up OpenTracing (Jaeger or alternative) would be overkill for a code challenge.

3. I didn't process the data because it was out of the scope of the challenge.

4. Production readiness: I would have followed some best practices for a production system, such as:

   1. At very list I would have added a graceful shutdown. 
   2. We should have some kind of monitoring mechanism in place
   3. Unit tests and maybe integration tests
   4. Better logger with levels if stdout logging is used in the team
   5. Retry-ability
   6. Timeouts
   7. Security measures
   8. Etc...


Here are some additional things I would have considered for a production system:

1. Scalability: The application should be able to scale horizontally to handle increasing load.

2. Resilience: The application should be able to withstand failures of individual components.

3. Fault tolerance: The application should be able to recover from failures gracefully.

## Prerequisites
* Node.js 16+
* NPM or Yarn

## Setup
```shell
git clone https://github.com/Kiura/green-api.git
```

### Set up the producer
```shell
cd producer

yarn install

yarn start
```

### Set up the consumer
```shell
cd ../consumer

yarn install

yarn start
```

## Test
```shell
curl -X POST -H "Content-Type: application/json" -d '{"clickInfo":"some info"}' localhost:4500/click
```
