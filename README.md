# Chatbot_Ordering
Using JS (ES6) with Paypal sandbox 
*Must have developer paypal account 


# USING GITHUB ACCOUNT
1. Clone the repository from the github
2. Open VS Code
3. Create a folder workspace
4. In the VS Code terminal type the following command
    > git clone + paste the github clone link + .
5. In order to use heroku environment
5.1. Step #1. Download Heroku CLI in the following link https://devcenter.heroku.com/articles/heroku-cli
5.2. Step. 2. Install Heroku CLI in the VS Code terminal with the following command
              for Windows                        --> npm install -g heroku
              for Ubuntu 16+                     --> sudo snap install --classic heroku
              for Debian Ubuntu / Debian apt-get --> curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
              for Arch Linux                     --> yay -S heroku-cli
6. Stage Commit any changes in VS Code to GitHub by Source Control view


# USING PAYPAL ACCOUNT
1. Login in your Paypal credentials in the link below
    https://developer.paypal.com/
2. My apps & credentials page
    Choose Sandbox > Click Create App
3. Type any AppName
4. Choose Merchant as App Type
5. Then, click Create App
6. Open the newly created App.
7. Copy the CLient ID


# USING HEROKU ACCOUNT
1. In the user account dashboard click New > Create new app
2. Type any app-name then click Create app
   *This name should only contain lowercase letters, numbers, and dashes.
3. Go to Settings Menu
4. In the Config Vars > Click Reveal Config Vars
5. Type the following info in the COnfig Vars
    KEY = SB_CLIENT_ID
    VALUE = Paste here the Sandbox Client ID 
7. Choose GitHub as deployment method
8. Search the Repository name and click Connect
9. Choose the branch to deploy.
10. Enable automatic deploys
11. Deploy the branch


# USING VS CODE TERMINAL
1. npm install
2. SB_CLIENT_ID=<put_in_your_client_id> npm start

