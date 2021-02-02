# SingularityNET Frontend Monorepo

## Quick links
 - [Marketplace](https://beta.singularitynet.io/)
 - [Publisher-portal](https://publisher.singularitynet.io/)
 - [Staking-portal](https://staking.singularitynet.io/)
 - [RFAI-portal](https://rfai.singularitynet.io/)
 - [UI-components](https://custom-ui.singularitynet.io/index.html)
 
## Prerequisites
### Windows
- Node >= 10.14.1 < 12.0.0
- yarn >= 1.15.0 < 2.0.0
### Linux
- Node >= 10.16.0 < 12.0.0
- Yarn >= 1.15.0  < 2.0.0

## Initial setup
- `git clone https://github.com/singnet/snet-dapp-monorepo.git`
- `cd snet-dapp-monorepo`
- `yarn`

That's it you're all set up. You can start play with the repo.

## Starting Marketplace
- `cd packages/marketplace-dapp`
- `cp .env.example .env`
- Add the appropriate values for the keys in the `.env` file
- `cd ../../`
- `yarn start:marketplace`

Marketplace is ready for you. 

## Starting RFAI
- `cd packages/rfai-dapp`
- `cp .env.example .env`
- Add the appropriate values for the keys in the `.env` file
- `cd ../../`
- `yarn start:rfai`

## Starting PUBLISHER
- `cd packages/publisher-dapp`
- `cp .env.example .env`
- Add the appropriate values for the keys in the `.env` file
- `cd ../../`
- `yarn start:publisher`

## Building new components
- `cd packages/shared`
- Add the component in the `src/components` folder
- Add story for it in the `index.stories.js` file
- `yarn build:shared`
  
Awesome. You can start using your components in any other project. Just import it from the path `shared/dist/components/[ComponentName]`

## Cleaning the node_modules
Developers try new things and may end up in mess. Don't worry! we got you covered! Just run `yarn nuke` from the `root`. Node modules from all the packages will be cleaned and you can start fresh.


## Troubleshooting Monorepo.
<details>
<summary>If the import of the shared packages is not working</summary>
Try running <code>lerna exec -- yarn link</code>.
This will recreate the symlinks of all the packages in the monorepo.

If lerna is not installed globally, then try <code>yarn run link:all</code>. 
This will use the locally installed version of lerna
</details>

# Quick Links
## Publisher Portal
### Ropsten: development preview
http://ropsten-publisher.singularitynet.io.s3-website-us-east-1.amazonaws.com/
### Mainnet: production
https://publisher.singularitynet.io/

## Staking Portal
### Ropsten: development preview
http://ropsten-stake.singularitynet.io.s3-website-us-east-1.amazonaws.com/landing
### Mainnet: production
https://staking.singularitynet.io/