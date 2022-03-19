# Chatbot_Ordering
Using JS (ES6) with Paypal sandbox 
*Must have developer paypal account 

# STEP-BY-STEP GUIDE TO BUILD THE PROJECT
*** The following are needed ***
1. A Visual Studio Code installed locally
2. A Node.JS package manager installed locally
3. Heroku environment account.
4. Paypal sandbox account
	  
STEP #1 USING GITHUB ACCOUNT
1.1. Clone the repository from the github
	1.1.1. Open the repository and Click Code
	1.1.2. Select Https
	1.1.3. Copy the link.

STEP #2 USING VISUAL STUDIO (VS) CODE
2.1. Open VS Code after copying the link in the Github
2.2. Create a folder workspace in the desktop and rename that folder on your own accord
2.3. Drag the workspace folder in the VS Code Interface
2.4. Go to the VS Code Menu toolbar and select Terminal
2.5. In the VS Code terminal type the following command
	> git clone + paste the github clone link + .
2.6. After cloning the respository. Install the (NPM) package manager for Node.js packages or modules.
2.7. If NPM is not yet installed. Download from this website link https://nodejs.org/en/download/
2.8. Select LTS and choose from the installation packages depending in your operating system. 
   	Options to choose between (32bit and 64bit)
2.9. Install the downloaded files. 
2.10. After the installation is done. Type the below command in the VS code terminal
	> npm install

STEP #3 INSTALL HEROKU CLI
3.1. Download Heroku CLI in the following link https://devcenter.heroku.com/articles/heroku-cli
3.2. Install Heroku CLI in the VS Code terminal with the following command
     	for Windows                        --> npm install -g heroku
      for Ubuntu 16+                     --> sudo snap install --classic heroku
      for Debian Ubuntu / Debian apt-get --> curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
      for Arch Linux                     --> yay -S heroku-cli
3.3. Stage Commit any changes in VS Code to GitHub by Source Control view

STEP #4 SETUP PAYPAL SANDBOX ACCOUNT
4.1. Open the link in any web browser 	
	https://developer.paypal.com/
4.2. Login using your Paypal sandbox account. If account does not exist, then create one 
4.3. After successfully login in go to My apps & credentials page, then Choose Sandbox and Click Create App
4.4. Type any AppName
4.5. Choose Merchant as App Type
4.6. Then, click Create App
4.7. Open the newly created App
4.8. Copy the CLient ID

STEP #5 CREATE HEROKU ACCOUNT
5.1. Open the link in any web browser
	https://www.heroku.com/
5.2. Login if already have an existing account. Else, create an account. 
5.3. After successfully login or created an account. Enter the code in the authenticator apps  
5.4. In the user account dashboard click New > Create new app
5.5. Type any app-name then click Create app
	*This name should only contain lowercase letters, numbers, and dashes
5.6. Open the created App-name
5.7. Go to Settings Menu
5.8. In the Config Vars > Click Reveal Config Vars
5.9. Type the following info in the Config Vars input field
    	KEY = SB_CLIENT_ID
    	VALUE = Paste here the Sandbox Client ID 
5.10. Go to Deploy Menu
5.11. Choose GitHub as deployment method
5.12. In App connected to Github. Search the Repository name and click Connect
5.13. Choose the branch to deploy under Manual deploy options
5.14. Click Enable Automatic Deploys under Automatic deploys option
5.15. Click Deploy Branch under Manual deploy option


# HOW TO RUN THE PROJECT
** Using VS Code or Heroku link **

OPTION #1 USING VS CODE TERMINAL
1. In the VS Code terminal type 
	> npm install
2. then copy and paste the below code. Replace <put_in_your_client_id> using your client ID in your Paypal sandbox account
	SB_CLIENT_ID=<put_in_your_client_id> npm start

OPTION #2 USING HEROKU LINK
1. In your GitHub account. Open the repository name of the project
2. On the right side portion of the repository. Click the link under Environments, below the Packages
3. Then, on the right side click View deployment button


# HOW TO USE THE PROJECT
Step #1. When the project loaded, type any letters and press Enter key
Step #2. Select from the available menu.
Step #3. Select the size you want to order between small, medium and large
Step #4. Select toppings/fillings based from the menu item you selected
Step #5. Type 'Yes' for additional toppings or 'No' to proceed to next Step #6.
	If input is 'Yes', go back to Step #4. 
Step #6. Type 'Yes' for add drinks / beverages or 'No' to proceed to next Step #8.
Step #7. If input is 'Yes' in Step #6, select from the available drinks/beverage. 
	If 'No' display confirmation not to avail any drinks
Step #8. Type 'Yes' to add side orders or 'No' to proceed to next Step #10.
Step #9. If input is 'Yes' in Step #8, select side orders from the options. 
Step #10. Option to add additional order. If input is 'Yes', go back to Step #2, 
		else input is 'No', display the orders.
Step #11. Option to proceed to checkout. If input is 'Yes', then go back to Step #10, 
		else input is 'No', display the total amount of your order.
Step #12. Click the link next to the total purchase amount to pay using Paypal sandbox
Step #13. Click Paypal option 
Step #14. In the pop-up menu, login using your Paypal sandbox account and click Next button
Step #15. Choose pay with Visa
Step #16. Click Pay Now
Step #17. Display payment confirmation in the application and the shipping address
 "# Chatbot" 
"# Chatbot" 


This is version 2 online change

This is version 3 change

This is local machine change

This is online to local change
