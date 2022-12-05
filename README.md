***DEVELOPMENT SETUP***
________________

**Major Branches**

***PLEASE DO NOT DIRECT COMMIT ON THE BRANCHES BELOW AS THEY ARE AUTOMATICALLY BUILD AND PUSHED BY GITHUB ACTIONS TO DOCKER HUB***

1. *production-asm* - official production branch (Used for ASM until December 19, 2022)
2. *staging* - Demo production branch (Used for ASM Demo unitl December 19, 2022)
3. *staging-beta* - Demo production branch for updated ACEBOOK functions 
3. *production-live* - LIVE production branch for ACEBOOK 

ASM Branch Process
staging -> production-asm

ACEBOOK Branch Process
staging-beta -> production-live

**Note** : *Before merging on the branches above, please make a backup branch for saftey purposes. Follow instructions below, and follow the existing increment*

*Backup branch name Format*
1. backup-prod/[increment, asc, oldest is 1]  , ex. backup-prod/1 
2. backup-staging/[increment, asc, oldest is 1]  , ex. backup-staging/1
3. backup-staging-beta/[increment, asc, oldest is 1]  , ex. backup-staging-beta/1
3. backup-prod-live/[increment, asc, oldest is 1]  , ex. backup-prod-live/1
 
**BASIC SETUP**

*Install*
- Node.Js v16.13.0
- yarn


1. clone project https://github.com/mis2021/ACE-BOOK.git (latest branch: **staging-beta**)
2. checkout **staging-beta**
3. create new branch from **staging-beta**

*--API--*
            
4. Make sure you have installed mongodb and mongodb compass
5. Copy .env-template and rename .env
6. Configure databases, rename **acebook-test** with the database name you have setup
7. Install dependencies
```
cd api
yarn
```
8. Feed mongodb
```
yarn migrate-mongo up
```
9. Start project
```
yarn start:dev
```

*--FILE SERVER--*
10. copy ftp folder into public folder
11. Install and run dependencies
```
cd file-srv
yarn
yarn start
```
*--FRONT--*

13. Make sure you have installed nodejs v16.13.0 and yarn 
14. Copy .env-template and rename .env
15. Install Dependencies and run
```
cd front
yarn
yarn dev:gql
```
________________
***DEPLOYMENT SETUP***
________________

**Process**

Note: Everytime you want to deploy, change the version of package.json on each affected ends
(Front, File-srv, API). Do not change if no update or changed file.

Versioning format:

Beta - fr-beta-1.0.0

Demo - fr-demo-1.0.0

Live - fr-1.0.0

(First number on 1.0.0 corresponds with major updates, Second number corresponds with minimal updates, 
last number means fixes) Must be incremental

**PROCESS**

Change package.json version --> Change version on argocd --> push on your current branch 
--> backup production branch before merge --> merge current branch to production branch 
--> wait until github actions has pushed to docker hub (Make sure na push na or green check)
--> refresh argocd project --> synchronized argocd --> verify the project if updates are reflected