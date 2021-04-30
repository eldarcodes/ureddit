#!/bin/bash

echo What should the version be?
read VERSION

docker build -t mirzabekov00/ureddit:$VERSION .
docker push mirzabekov00/ureddit:$VERSION
ssh root@161.35.211.105 "docker pull mirzabekov00/ureddit:$VERSION && docker tag mirzabekov00/ureddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"