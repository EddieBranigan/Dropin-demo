# Dropin-demo
A simple braintree server built in NodeJS with express framework and using the Braintree drop-in integration.

# Setup instructions
Install the packages from the package-json file by typing:
'''npm install'''

# Testing
Testing in the Braintree sandbox environment can be done using testing card numbers provided in the Braintree developer docs located here:
https://developer.paypal.com/braintree/docs/reference/general/testing/ruby#credit-card-numbers

NOTE:
When testing card verifications and transactions, keep in mind:

“*” Transaction success is determined by the test amount you use. For example, when testing decline scenarios.
“*” Verification success is determined by the test card number you use. For example, when testing Vault and recurring billing scenarios.
