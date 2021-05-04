#!/bin/bash

set -e

git checkout staging
git pull origin staging
git checkout prod
git pull origin prod 
git merge staging
git push origin prod
git checkout staging
