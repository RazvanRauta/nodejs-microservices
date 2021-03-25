# Microservices with NodeJs and Next.js

### Created with:

 ``1. NextJs - FE`` | ``5. Stripe``
 
 ``2. NodeJs - BE`` | ``6. Nodemailer and Mailgun API``
 
 ``3. Nats-Streaming`` | ``7. Chakra UI``
 
 ``4. Mongo DB`` | ``8. Typescript``
 
 #### Testing
 ``1. Jest`` | ``2. Supertest`` | ``3. Testing Library`` | ``4. Mock Service Worker``
 

 

 

 


## Setup JWT_KEY

```shell
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=
```
## Setup Stripe Key

```shell
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=
```
## Setup Mailgun Key

```shell
kubectl create secret generic mailgun-secret --from-literal=MAILGUN_API_KEY=
```

## Setup Ingress-Nginx

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
```
## Run DEV

```shell
skaffold dev
```
## Run PROD

```shell
kubectl apply -f infrastructure/k8s-prod
```
