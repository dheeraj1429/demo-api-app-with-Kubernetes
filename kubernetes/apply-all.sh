#!/bin/bash

# make sure your docker driver is installed and up and running.
# minikube start --driver=docker

kubectl apply -f=host-pv.yaml
kubectl apply -f=host-pvc.yaml
kubectl apply -f=service.yaml
kubectl apply -f=deployment.yaml

# to open the minikube dashboard
# minikube dashboard