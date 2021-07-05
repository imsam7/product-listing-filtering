import "core-js/stable";
import "regenerator-runtime/runtime";
import './styles/main.css';
import * as serviceHelper from './serviceHelper'

let products;
let productsElement = document.querySelector("#products")
let filtersElement = document.querySelector("#filters")

const applyFilters = () => {
    let menFilter = document.querySelector("#Men").checked
    let womenFilter = document.querySelector("#Women").checked
    // let boysFilter = document.querySelector("#Boys").value
    // let girlFilter = document.querySelector("#Girls").value
    console.log(menFilter)
    console.log(womenFilter)

    productsElement.innerHTML = ''
    let filteredProducts;
    if (menFilter) {
        filteredProducts = products.filter(element => element.gender === "Men")
    }
    else if (womenFilter) {
        console.log(products)
        filteredProducts = products.filter(element => element.gender === "Women")
        console.log(filteredProducts)
    }
    displayProducts(filteredProducts)
}

filtersElement.addEventListener("click", applyFilters);

const displayProducts = (productParam) => {
    const div = document.createElement("div")
    productParam.forEach((element) => {
        const childDiv = document.createElement("div")
        childDiv.classList.add("productBox")
        const img = document.createElement("img")
        img.src = element.searchImage
        img.classList.add("imgWrap")
        const span1 = document.createElement("span")
        span1.innerHTML = '<br>' + element.brand + '<br>'
        const span2 = document.createElement("span")
        span2.innerHTML = element.productName + '<br>'
        const span3 = document.createElement("span")
        span3.innerHTML = 'Rs.' + element.price + '<br>'
        // const span3 = document.createElement("span")
        // span3.innerHTML = 'Product Name: ' + element.rating
        childDiv.appendChild(img)

        childDiv.appendChild(span1)
        childDiv.appendChild(span2)
        // childDiv.appendChild(span3)
        childDiv.appendChild(span3)
        div.appendChild(childDiv)
    })
    productsElement.appendChild(div)
}

const getAllFilters = (products) => {
    const filteredArr = products.reduce((acc, current) => {
        const x = acc.find(item => item.gender === current.gender);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    console.log([...new Set(products.map((element) => element.gender))])
    console.log(genderFilter)
}

const getProducts = async () => {
    products = await serviceHelper.get('https://demo7242716.mockable.io/products')
    products = products.products
    displayProducts(products)
    getAllFilters(products)
    console.log(products)
}

getProducts()