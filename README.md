# Microservices with NodeJs and Next.js

## Setup JWT_KEY

```shell
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdfgsdas

kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=sk_test_51IX7ANAMmGQtQHB5ljmDNwldbjUueeDB4SbwfSNa82M3jYSctm98XbZd6pv9Oe7pkWBkgKdMXm4ZtJ2FBjUIg8fE00algc6qeM
```

## Setup Ingress-Nginx

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml

```
