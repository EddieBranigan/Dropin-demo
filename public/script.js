var submitButton = document.getElementById("submit-button");
const setAmount = "10.00";
var threeDSecureParameters = {
  amount: setAmount,
  email: "test@example.com",
  billingAddress: {
    givenName: "Jill",
    surname: "Doe",
    phoneNumber: "8101234567",
    streetAddress: "555 Smith St.",
    extendedAddress: "#5",
    locality: "Oakland",
    region: "CA",
    postalCode: "12345",
    countryCodeAlpha2: "US",
  },
};

//this fetch request retrieves the a client token from the server /checkout endpoint
fetch("/checkout")
  .then((response) => {
    return response.text();
  })
  .then(function (client_token) {
    braintree.dropin.create(
      {
        //https://braintree.github.io/braintree-web-drop-in/docs/current/module-braintree-web-drop-in.html#.create
        authorization: client_token,
        container: "#dropin-container",
        dataCollector: true,
        amount: setAmount,
        //vault: { allowVaultCardOverride: true },
        threeDSecure: { authorization: client_token, version: 2 },
      },
      (componentError, instance) => {
        if (componentError) {
          console.log(componentError);
        }

        submitButton.addEventListener("click", (e) => {
          e.preventDefault();
          instance.requestPaymentMethod(
            { threeDSecure: threeDSecureParameters },
            function (ReqPayMethodError, payload) {
              fetch("/checkout", {
                method: "POST",
                body: JSON.stringify({
                  paymentMethodNonce: payload.nonce,
                  amount: setAmount,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((result) => {
                  instance.teardown((teardownErr) => {
                    if (teardownErr) {
                      console.error("Could not tear down Drop-in UI!");
                    } else {
                      console.info("Drop-in UI has been torn down!");
                    }
                  });
                  if ((result.sucess = "true")) {
                    document.getElementById("divResponse").innerHTML = 
                    '<pre>Transaction successful\n\n' + JSON.stringify(result, null, 4)
                      + '/<pre>';
                  } else {
                    document.getElementById("divResponse").innerHTML = 
                    'Transaction failed\n' + JSON.stringify(result, null, 4);
                  }
                });
            }
          );
        });
      }
    );
  });