<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/leandrodcs/MyWallet-front">
    <img src="https://w7.pngwing.com/pngs/596/619/png-transparent-computer-icons-digital-wallet-coin-purse-reward-purple-violet-text-thumbnail.png" alt="Logo" width="100px" height="auto">
  </a>

  <h3 align="center">My Wallet</h3>

  <p align="center">
    Keep track of your expenses.
    <br />
    <a href="https://github.com/leandrodcs/MyWallet-front"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://my-wallet-sepia.vercel.app/">View Demo</a>
    <br />
  </p>
</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Create a root project folder named gratibox for semantics
```sh
mkdir mywallet
```
2. Clone the front-end repo (within the /gratibox folder)
```sh
git clone https://github.com/leandrodcs/MyWallet-front.git
```
3. Install NPM packages for the front-end repo
```sh
npm install
```
4. Clone the back-end repo (within the /gratibox folder)
```sh
git clone https://github.com/leandrodcs/MyWallet-back.git
```
5. Install NPM packages for the back-end repo
```sh
npm install
```
6. Create a database using the command below via postgres
```sh
CREATE DATABASE mywallet
```
7. Inside the created database, create tables using the dump included in the back-end repo <a href="https://github.com/leandrodcs/gratibox-back/blob/main/dump.sql">here</a>.

8. Connect to the created database using the .env.example included in the back-end repo <a href="https://github.com/leandrodcs/MyWallet-back/blob/main/.env.example">here</a>, to make it easy, name your .env file like so ".env.dev".

### Running

1. On the back-end repo run the server connected to the database you just created using the following command.
```sh
npm run dev
```
2. Now on the fron-end repo use the same command you just used on step 8 and you should be good.

<!-- USAGE EXAMPLES -->
## Usage

Visitores need to `sign-up` and later `sign-in` to be able to use mywallet.

Once signed-in, users can add their earnings or expenses on the buttons located at the bottom of the homepage.

Once a value is added, it can now be viewed together with your current balance at the homepage.

<!-- Developer -->
## Developer

* [Leandro D. C. Schmidt ](https://github.com/leandrodcs)