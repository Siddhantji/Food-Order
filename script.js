let arr = [];
async function fetchData() {
  try {
    const response = await fetch(" https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    arr = data; // Assign the fetched data to the array
    displayData(arr); // Call another function to process the data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();

function displayData(data) {
  console.log("in display");
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  data.forEach((element) => {
    menu.innerHTML += `
    <div class="card my-3 color text-white" style="width: 22rem">
                   <img src="${element.imgSrc}" class="p-1 card-img-top" alt="..." />
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="card-title">${element.name}</h5>
                                <p class="card-text">${element.price}</p>
                            </div>
                            <button class="bg-secondary border-0 text-secondary-emphasis"
                                style="height: 30px; background-color: #363a43">
                                +
                            </button>
                        </div>
                    </div>
    </div>
    `;
  });
  handleOrder();
}

function takeOrder(arr){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
    let order =[];
    let a =   Math.floor(Math.random() * (arr.length - 0 + 1)) + 0;
    let b = Math.floor(Math.random() * (arr.length - 0 + 1)) + 0;
    let c = Math.floor(Math.random() * (arr.length - 0 + 1)) + 0;
    order.push(arr[a]);
    order.push(arr[b]);
    order.push(arr[b]);
    resolve(order);  
  },2500)
  })
}

function orderPrep() {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve({ order_status: true, paid: false });
      }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve({ order_status: true, paid: true });
      }, 1000);
  });
}

function thankyouFnc() {
  alert('Thank you for eating with us today!');
}

async function handleOrder() {
  try {
      const order = await takeOrder(arr);
      console.log('Order:', order);

      const prepStatus = await orderPrep();
      console.log('Order Preparation:', prepStatus);

      const paymentStatus = await payOrder();
      console.log('Payment:', paymentStatus);

      if (paymentStatus.paid) {
          thankyouFnc();
      }
  } catch (error) {
      console.error('Error handling order:', error);
  }
}