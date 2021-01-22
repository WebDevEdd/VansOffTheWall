fetch("./vansAPI.json")
.then(response => {
   return response.json();
}).then(products => {

    const shoes = products.shoes;
    
    shoes.forEach(shoe => {
        console.log(shoe.key);
    });

    console.log(shoes);
});