App = {
	web3Provider: null,
	contracts: {},
	account: "0x0",
	loading: false,
	tokenPrice: 1000000000000,
	tokensSold: 0,
	tokensAvailable: 750000,

	init: function() {
		console.log("App initialized!")
		return App.initWeb3();
	},

	initWeb3: function() {
		// Set a provider (HttpProvider)
		// https://github.com/ethereum/web3.js/
		// Dependent on Metamask (chrome extension)
		// -> wire up Metamask with Web3
		if (typeof web3 !== "undefined") {
			App.web3Provider = web3.currentProvider;
  			web3 = new Web3(web3.currentProvider);
		} else {
  			// Set the provider you want from Web3.providers
  			App.web3Provider = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  			web3 = new Web3(App.web3Provider);
		}
		return App.initContracts();
	},

	initContracts: function() {
		$.getJSON("MEDTokenSale.json", function(MEDTokenSale) {
			App.contracts.MEDTokenSale = TruffleContract(MEDTokenSale);
			App.contracts.MEDTokenSale.setProvider(App.web3Provider);
			App.contracts.MEDTokenSale.deployed().then(function(MEDTokenSale) {
				console.log("MED Token Sale address:", MEDTokenSale.address);
			});
		}).done(function() {
			$.getJSON("MEDToken.json", function(MEDToken) {
				App.contracts.MEDToken = TruffleContract(MEDToken);
				App.contracts.MEDToken.setProvider(App.web3Provider);
				App.contracts.MEDToken.deployed().then(function(MEDToken) {
					console.log("MED Token address:", MEDToken.address);
				});
				App.listenForEvents();
				return App.render();
			});
		})
	},

	// Client side functionalities
	render: function() {
		if (App.loading) {
			return;
		}
		App.loading = true;

		var loader = $("#loader");
		var content = $("#content");

		loader.show();
		content.hide();

		// Load account data
		web3.eth.getCoinbase(function(err, account) {
			if(err == null) {
				App.account = account;
				$("#accountAddress").html("Your account: " + account);
			}
		})

		// Load TokenSale contract
		App.contracts.MEDTokenSale.deployed().then(function(instance) {
			MEDTokenSaleInstance = instance;
			return MEDTokenSaleInstance.tokenPrice();
		}).then(function(tokenPrice) {
			App.tokenPrice = tokenPrice;
			$(".token-price").html(web3.fromWei(App.tokenPrice, "ether").toNumber());
			return MEDTokenSaleInstance.tokensSold();
		}).then(function(tokensSold) {
			App.tokensSold = tokensSold.toNumber();
			$(".tokens-sold").html(App.tokensSold);
			$(".tokens-available").html(App.tokensAvailable);

			var progress = (App.tokensSold / App.tokensAvailable) * 100;
			$("#progress").css("width", progress + "%");

			App.contracts.MEDToken.deployed().then(function(instance) {
				MEDTokeninstance = instance;
				return MEDTokeninstance.balanceOf(App.account);
			}).then(function(balance) {
				$(".med-balance").html(balance.toNumber());
				
				App.loading = false;
				loader.hide();
				content.show();
			})
		});
	},

	buyTokens: function() {
		var loader = $("#loader");
		var content = $("#content");

		loader.show();
		content.hide();
		var numberOfTokens = $("#numberOfTokens").val();
		App.contracts.MEDTokenSale.deployed().then(function(instance) {
			return instance.buyTokens(numberOfTokens, {
				from: App.account,
				value: numberOfTokens * App.tokenPrice,
				gas: 500000 // gas limit
			});
		}).then(function(result) {
			console.log("Tokens bought: ", numberOfTokens);
			$("form").trigger("reset"); // reset the input form
			// Wait for Sell event to fire

			// loader.hide();
			// content.show();
		});
	},

	// Events emitted buy the tokenSale contract
	listenForEvents: function() {
		App.contracts.MEDTokenSale.deployed().then(function(instance) {
			instance.Sell({}, {
				fromBlock: 0,
				toBlock: "lastest",

			}).watch(function(error, event) {
				console.log("Event triggered: ", event);
				App.render();
			})
		})
	}

}
// Whenever the window loads, initialize the App;
// This technique often used in jQuery;
$(function() {
	$(window).load(function() {
		App.init();
	})
});