const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,Ethereum,dogecoin&vs_currencies=usd';
const btc = document.querySelector("#bitcoin");
const eth = document.querySelector("#ethereum");
const doge = document.querySelector("#dogecoin");

  
  const getcrypto = async()=>{
    try {
        const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log(data);
    
    btc.textContent = "$"+data.bitcoin.usd;
    eth.textContent ="$"+data.ethereum.usd;
    doge.textContent ="$"+data.dogecoin.usd;

    } catch(error) {
     alert('error')
    }
};



getcrypto(); 

