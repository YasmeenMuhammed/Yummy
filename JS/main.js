
let rowData = document.getElementById('rowData');
let inputSearch = document.getElementById('inputSearch');
let loadingScreen = document.getElementById('loading-screen');
let openBtn = document.getElementById('openBtn');
let closeBtn = document.getElementById('closeBtn');

let navList = document.querySelector('.nav-items');
let navBar = document.querySelector('.navbar');
let navItem = document.querySelectorAll('.nav-item');

let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let passInput = document.getElementById('passInput');
let RepassInput = document.getElementById('RepassInput');
submitBtn = document.getElementById("submitBtn");


let NavList = document.getElementById("NavList");




let form = document.getElementById('formm');


let navItem1 = document.getElementById('navItem1');
let navItem2 = document.getElementById('navItem2');
let navItem3 = document.getElementById('navItem3');
let navItem4 = document.getElementById('navItem4');
let navItem5 = document.getElementById('navItem5');









openBtn.addEventListener('click', () => {
    openBtn.classList.add('d-none');
    closeBtn.classList.remove('d-none');
    navList.style.cssText = "position: fixed; left: 0;";
    navBar.style.cssText = "position: fixed; left: 17%;";
    NavList.style.cssText = "transform: translateY(0);";

})

closeBtn.addEventListener('click', () => {
    closeNavBar();
})


function closeNavBar() {
    navList.style.cssText = "position: fixed; left: -20%;";
    navBar.style.cssText = "position: fixed; left: 0;";
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    NavList.style.cssText = "transform: translateY(100%);"

}

searchMeals("");





// getCategories();

// Function Categories

async function getCategories() {
    inputSearch.classList.add('d-none');
    closeNavBar();
    try {
        loadingScreen.classList.remove('d-none');
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        console.log(data.categories);
        dataArray = data.categories;
        displayCategories(dataArray);
    } catch (error) {
        alert('Error')
    }
    finally {
        loadingScreen.classList.add('d-none');
    }
}

function displayCategories(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
 <div class="col-md-3">
    <div class="card-item position-relative rounded-3" onclick="getMealsDetails('${arr[i].strCategory}')">
        <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
        <div class="card-layer position-absolute top-100 h-100 w-100 rounded-3">
            <div class="ms-2 title fs-3 fw-bolder text-center">
                ${arr[i].strCategory}
            </div>
            <p class="p-2">${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>
 </div>
`
    }
    rowData.innerHTML = box;
}

// Function Search By Word

async function searchMeals(term = "") {
    inputSearch.classList.remove('d-none');
    closeNavBar();
    try {
        loadingScreen.classList.remove('d-none');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        let data = await response.json();
        console.log(data.meals);
        let dataArray = data.meals;
        displaySearchedMeals(dataArray);

    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');

    }
}

function displaySearchedMeals(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {

        box += `
        
                 <div class="col-md-3">
                    <div class="card-item position-relative rounded-3" onclick="getMealDetails(${arr[i].idMeal})"   >
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block">
                        <div class="card-layer position-absolute d-flex align-items-center top-100 h-100 w-100 rounded-3">
                            <div class=" ms-2 title fs-3 fw-bolder">

                            
                                ${arr[i].strMeal}
                            </div>
                        </div>
                    </div>
         </div>
        
    
        `
    }
    rowData.innerHTML = box;
}

// Function Search By first letter

async function searchByLetter(term) {

    try {
        loadingScreen.classList.remove('d-none');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
        let data = await response.json();
        console.log(data.meals);

        let dataArray = data.meals;
        displaySearchByLetter(dataArray);

    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');
    }
}

function displaySearchByLetter(arr) {
    let box = '';
    for (let i = 0; i < arr.length; i++) {

        box += `
                
                 <div class="col-md-3">
                    <div class="card-item position-relative rounded-3"  onclick="getMealDetails(${arr[i].idMeal})" >
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block">
                        <div class="card-layer position-absolute d-flex align-items-center top-100 h-100 w-100 rounded-3">
                            <div class=" ms-2 title fs-3 fw-bolder">
                                ${arr[i].strMeal}
                            </div>
                        </div>
                    </div>
         </div>
        `
    }
    rowData.innerHTML = box;
}


// Function to get Details(Category)==>

async function getMealsDetails(category) {
    inputSearch.classList.add('d-none');

    try {
        loadingScreen.classList.remove('d-none');

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();

        console.log(data.meals);
        let dataArray = data.meals;
        displayMealsCategory(dataArray);

    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');
    }
}

function displayMealsCategory(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {

        box += `
                 <div class="col-md-3">
                    <div class="card-item position-relative rounded-3"  onclick="getMealDetails(${arr[i].idMeal})">
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block">
                        <div class="card-layer position-absolute d-flex align-items-center top-100 h-100 w-100 rounded-3">
                            <div class=" ms-2 title fs-3 fw-bolder">
                                ${arr[i].strMeal}
                            </div>
                        </div>
                    </div>
         </div>
        `
    }
    rowData.innerHTML = box;
}


// Meals Details

async function getMealDetails(id) {

    try {
        loadingScreen.classList.remove('d-none');

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

        let data = await response.json();

        console.log(data.meals);


        let dataArray = data.meals;
        displayMealDetails(dataArray);

    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');
    }
}

function displayMealDetails(arr) {

    let ingredients = "";
    let meal = arr[0];

    for (let i = 1; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }

    }

    rowData.innerHTML = `
    
            <div class="row my-4">
            <div class="col-md-4">
                <div class="item-details">
                    <img src="${arr[0].strMealThumb}" alt="" class="w-100">
                    <h3>
                        ${arr[0].strMeal}
                    </h3>
                </div>
            </div>
            <div class="col-md-8">
                <div class="item-details">
                    <h3>
                        Instructions
                    </h3>
                    <p>
${arr[0].strInstructions}
                    </p>

                    <h4>
                        <span class="fw-bolder">Area : </span>${arr[0].strArea}
                    </h4>
                    <h4>
                        <span class="fw-bolder">Category : </span>${arr[0].strCategory}
                    </h4>
                    <h4>
                        <span class="fw-bolder">Recipes : </span>
                    </h4>
                 <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                    <h4>
                        <span class="fw-bolder">Tags :</span>
                    </h4>
                    <a class="btn btn-success m-2" target="_blank" href="${arr[0].strSource}">Success</a>
                    <a class="btn btn-danger m-2" target="_blank" href="${arr[0].strYoutube}">Youtube</a>
                </div>
            </div>
        </div>
    `

}

// Function to get Area

async function getArea() {
    inputSearch.classList.add('d-none');

    closeNavBar();

    try {
        loadingScreen.classList.remove('d-none');

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json();

        let dataArray = data.meals;
        displayArea(dataArray);
        console.log(dataArray);

    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');
    }

}

function displayArea(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div class="card-item position-relative rounded-3 text-center" onclick="getAreaMeals('${arr[i].strArea}')">
                        <i class="fa-solid fa-house-laptop text-white fa-4x"></i>

                        <div class=" ms-2 title fs-3 fw-bolder">
                            ${arr[i].strArea}
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = box;

}

// Function to get Category Area == >

async function getAreaMeals(area) {
    try {
        loadingScreen.classList.remove('d-none');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let data = await response.json();

        let dataArray = data.meals;
        console.log(data.meals);
        displayAreaMeals(dataArray);

    } catch (error) {
        alert("Error")
    }
    finally {
        loadingScreen.classList.add('d-none');

    }
}

function displayAreaMeals(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
                 <div class="col-md-3">
                    <div class="card-item position-relative rounded-3"  onclick="getMealDetails(${arr[i].idMeal})">
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block">
                        <div class="card-layer position-absolute d-flex align-items-center top-100 h-100 w-100 rounded-3">
                            <div class=" ms-2 title fs-3 fw-bolder">
                                ${arr[i].strMeal}
                            </div>
                        </div>
                    </div>
         </div>
        `
        rowData.innerHTML = box;
    }

}

// Function to get Ingredients

async function getIngredients() {
    closeNavBar();

    try {
        loadingScreen.classList.remove('d-none');

        let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        let data = await response.json();

        let dataArray = data.meals.slice(0, 20);
        console.log(data.meals.slice(0, 20));

        displayIngredients(dataArray);

    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');
    }
}

function displayIngredients(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
                <div class="col-md-3">
                    <div class="card-item position-relative rounded-3 text-center"  onclick="getIngredientsFilter('${arr[i].strIngredient}')"  >
<i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <div class=" ms-2 title fs-3 fw-bolder">
                        ${arr[i].strIngredient}
                        </div>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = box;

}


async function getIngredientsFilter(ing) {

    try {
        loadingScreen.classList.remove('d-none');
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
        let data = await response.json();
        let dataArray = data.meals;
        displayIngredientsFilter(dataArray);
        console.log(data.meals);
    } catch (error) {
        alert('Error');
    }
    finally {
        loadingScreen.classList.add('d-none');
    }
}

function displayIngredientsFilter(arr) {
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
                 <div class="col-md-3">
                    <div class="card-item position-relative rounded-3"  onclick="getMealDetails(${arr[i].idMeal})">
                        <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block">
                        <div class="card-layer position-absolute d-flex align-items-center top-100 h-100 w-100 rounded-3">
                            <div class=" ms-2 title fs-3 fw-bolder">
                                ${arr[i].strMeal}
                            </div>
                        </div>
                    </div>
         </div>
        `
        rowData.innerHTML = box;
    }
}






























// Function to Validate

function validationInputs(element, msgId) {


    let text = element.value;

    let regex = {
        nameInput: /^[a-zA-Z ]+$/,
        emailInput: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phoneInput: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        ageInput: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        passInput: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
    }

    console.log(text);

    let msgError = document.getElementById(msgId);

    console.log(msgError);

    if (text === "") {
        element.classList.remove('is-valid', 'is-invalid');
        msgError.classList.add("d-none");
        return false;
    }
    if (regex[element.id].test(text) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msgError.classList.add("d-none");
        return true;
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msgError.classList.remove("d-none");
        return false;
    }

}

// function to show Contact==>

function showContact() {
    closeNavBar();


    rowData.innerHTML = `
    
        <div class="cotainer w-75 mx-auto contact">

            <form id="formm">


                <div class="row g-3">
                    <div class="col-md-6">
                        <input onkeyup="validationInputs(this , 'nameMsg')" type="text" class="form-control"
                            id="nameInput" placeholder="Enter Your Name">
                        <p class="alert alert-danger mt-1 p-1 d-none" id="nameMsg">
                            Special characters and numbers not allowed
                        </p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validationInputs(this , 'emailMsg')" type="email" class="form-control"
                            id="emailInput" placeholder="Enter Your Email">
                        <p class="alert alert-danger mt-1 p-1 d-none" id="emailMsg">
                            Email not valid *exemple@yyy.zzz
                        </p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validationInputs(this , 'phoneMsg')" type="number" class="form-control"
                            id="phoneInput" placeholder="Enter Your Phone">
                        <p class="alert alert-danger mt-1 p-1 d-none" id="phoneMsg">
                            Enter valid Phone Number
                        </p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validationInputs(this , 'ageMsg')" type="number" class="form-control"
                            id="ageInput" placeholder="Enter Your Age">
                        <p class="alert alert-danger mt-1 p-1 d-none" id="ageMsg">
                            Enter valid age
                        </p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validationInputs(this , 'passMsg')" type="password" class="form-control"
                            id="passInput" placeholder="Enter Your Password">
                        <p class="alert alert-danger mt-1 p-1 d-none" id="passMsg">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="validateRepass()"  type="password" class="form-control" id="RepassInput"
                            placeholder="Reenter Your Password">
                        <p class="alert alert-danger mt-1 p-1 d-none" id="repassMsg">
                            Enter valid repassword
                        </p>
                    </div>
                    <div class="col-md-12 text-center">
                        <button id="submitBtn" class="btn btn-outline-danger" disabled >Submit</button>
                    </div>
                </div>
            </form>
        </div>

    `
    let nameInput = document.getElementById('nameInput');
    let emailInput = document.getElementById('emailInput');
    let phoneInput = document.getElementById('phoneInput');
    let ageInput = document.getElementById('ageInput');
    let passInput = document.getElementById('passInput');
    let RepassInput = document.getElementById('RepassInput');
    let form = document.getElementById('formm');

    function checkForm() {

        if (
            validationInputs(nameInput, 'nameMsg') &&
            validationInputs(emailInput, 'emailMsg') &&
            validationInputs(phoneInput, 'phoneMsg') &&
            validationInputs(ageInput, 'ageMsg') &&
            validationInputs(passInput, 'passMsg') &&
            validateRepass()

        ) {
            submitBtn.removeAttribute("disabled")
        }
        else {
            submitBtn.setAttribute("disabled", true)
        }

    }

    submitBtn = document.getElementById("submitBtn");

    form.addEventListener('input', checkForm);
    

}

function validateRepass() {

    let RepassInput = document.getElementById('RepassInput');
    let repassMsg = document.getElementById('repassMsg');
    let passInput = document.getElementById('passInput');

    const pass = passInput.value;
    const repass = RepassInput.value;

    if (pass == repass) {
        RepassInput.classList.add('is-valid');
        RepassInput.classList.remove('is-invalid');
        repassMsg.classList.add('d-none');
        return true;
    }
    else {
        RepassInput.classList.add('is-invalid');
        RepassInput.classList.remove('is-valid');
        repassMsg.classList.remove('d-none');
        return false;
    }

}


