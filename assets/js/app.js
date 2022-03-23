
const URL = 'https://fakestoreapi.com/products';
let data = await fetch (URL);
    data= await data.json();
    console.log(data);
    let tag = document.getElementById('goods-list');
    let searchInput = document.getElementById('search');
    let sortUp = document.getElementById('sort-up');
    let sortDown = document.getElementById('sort-down');
    let sortDirection = null;
    let sv = '';
    sortUp.addEventListener('click', function(){
        sortDirection = 'up';
        render(sv,sortDirection);
    });
    sortDown.addEventListener('click', function(){
        sortDirection = 'down';
        render(sv,sortDirection);
    });
    searchInput.addEventListener('input', function(){
        sv = searchInput.value.toLowerCase().trim();
        render(sv,sortDirection);
    });
    render(sv,sortDirection);
    function render (s,sd){
        let result = [...data];
        result = result.filter(i => i.title.toLowerCase().includes(s));
        if (sd == 'up') {
            result = result.sort((a,b) => a.price - b.price);
        }    
        if (sd == 'down') {
            result = result.sort((a,b) => b.price - a.price);
        } 
        tag.innerHTML = result.map(goods => `
            <div class="card mb-1" style="max-height: 45vh">
                <div class="d-flex flex-column align-items-center justify-content-center" style="height: 30%">
                <img src="${goods.image}" class="card-img-top" alt="..." style="max-height: 90%; max-width: 35%">
                </div>   
                <div class="card-body">
                    <h6 class="card-title fs-bold" style="min-height: 30%; display: -webkit-box; -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;overflow: hidden">${goods.title}</h6>
                    <p class="card-text" style="font-size: 0.8rem; display: -webkit-box; -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;overflow: hidden">${goods.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-end"> ${goods.price}</li>
                </ul>
            </div>
        `).join('');
    }