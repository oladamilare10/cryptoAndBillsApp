import React, { useState } from 'react'
import { useFetcher } from 'react-router-dom';

const PayStack = (props) => {
    const [amount, setAmount] = useState("")
    const [sucMessage, setSucMessage] = useState(null)
    const email = "supported@gmail.com"
    const oldBal = props.balance;
    const dateData = new Date();
    const addBal = (a, b) => a + b;
    const newBal = addBal(Number(oldBal), Number(amount));
    const ref_id = Math.floor((Math.random()*1000000)+1);
    const user_id = localStorage.getItem("user_id");
    const url = 'https://api.allbillsarena.com.ng/update_wallet.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
      {
        user_id: user_id,
        new_balance: newBal,
        t_amount: amount,
        desc: "Wallet TopUp",
        t_id: ref_id,
        date: dateData
      }
    )
  const handleWalletUpdate = ()=>{
    fetch(url, {
      method: "POST",
      header: header,
      body: body
    })
    .then(res => {
      return res.json();
    })
    .then(msg => {
      setSucMessage(msg.result.data)
      console.log(msg)
    })
  }

    var paymentForm = document.getElementById('paymentForm');
    function payWithPaystack() {
      var handler = PaystackPop.setup({
        key: 'pk_test_5a21e10af7739d8589fb6b861d901d9508d705f1', // Replace with your public key
        email: email,
        amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        ref: ref_id, // Replace with a reference you generated
        callback: function(response) {
          //this happens after the payment is completed successfully
          if (response.status === "success"){
            handleWalletUpdate();
          }
          var reference = response.reference;
          alert('Payment complete! Reference: ' + reference);
          // Make an AJAX call to your server with the reference to verify the transaction
        },
        onClose: function() {
          alert('Transaction was not completed, window closed.');
        },
      });
      handler.openIframe();
    }


  return (
    <>
        <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Fund With Card</h1>
        </div>
        </header>
        <main>
        <form id="paymentForm" onSubmit={payWithPaystack} className='mt-6'>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">₦</span>
                </div>
                <input
                type="text"
                name="price"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full bg-white rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                    Currency
                </label>
                <select
                    id="currency"
                    name="currency"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                    <option>NGN</option>
                </select>
                </div>
            </div>
            {sucMessage && <div className='text-green-500 font-medium text-sm text-center mt-6'>{sucMessage}</div>}
            <span className="sm:ml-3">
                <button type="button" onClick={() => payWithPaystack()} className="mt-7 inline-flex items-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Pay
                </button>
              </span>
            </form>

            <script src="https://js.paystack.co/v1/inline.js"></script>
        </main>
    </>
  )
}

export default PayStack
