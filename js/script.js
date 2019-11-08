let textDescription = document.querySelector(".photoBlock__description");
let breed = document.querySelector(".inputBlock__breeds");
let color = document.querySelector(".inputBlock__colors");
let font = document.querySelector(".input_fontes");
let photoDog = document.querySelector(".imagem_photo");
let namePet = document.querySelector(".inputBlock__dog--text");
window.onload = init();

function init() {
    getImage(); 
    getBreed();
    saveInfosBreed();
    getInfosBreed();
    saveInfosFont();
    getInfosFont();
    saveInfosColor();
    getInfosColor();
    saveInfosName();
    getInfosName();
    getHora();
    

}

$(".inputBlock__dog--button").click(function() {

    if(breed.value != "none" && color.value != "none" && font.value != "none"){
        getBreedPhoto();
        saveImage();
        colorSet();
        fontSet();
        namePetSet();
        document.querySelector(".status").innerHTML = "Salvo com Sucesso! \u{270c}"
    }else{
        document.querySelector(".status").innerHTML = " Epa, Preencha todos os campos! \u{1F914}"
    }
});

function colorSet(){
    let selectColor = document.querySelector(".inputBlock__colors").value;
    textDescription.style.color = selectColor;
}
function fontSet(){
    let selectFonts = document.querySelector(".input_fontes").value;
    textDescription.style.fontFamily = selectFonts;
}

function namePetSet(){
    let nomePet = document.getElementById("textDog");
    if(nomePet.value == ""){
        document.querySelector(".photoBlock__description").innerHTML ="Pet sem nome";
    
    }else{
        document.querySelector(".photoBlock__description").innerHTML =nomePet.value;
    }
    
}

//função para consumir raça e popular o select
function getBreed(){
    let urlStr = "https://dog.ceo/api/breeds/list/all";
    $.ajax({
        url : urlStr,
        type : "get",
        dataType : "json",
        success : function(data){
            for (let i = 0; i < Object.entries(data.message).length; i++){
                newOption = document.createElement("option"); 
                newOption.value =Object.entries(data.message)[i][0];
                newOption.text=Object.entries(data.message)[i][0];
                breed.add(newOption);
            }
        },
        error : function(erro){
            console.log(erro);
        }
    });
}
//função para consumir imagem
function getBreedPhoto(){
    let urlStrPhotos = "https://dog.ceo/api/breed/"+breed.value+"/images";
    $.ajax({
        url : urlStrPhotos,
        type : "get",
        dataType : "json",
        success : function(dataPhoto){
            let numberImages = (Object.entries(dataPhoto.message).length);
            let numberImagesRandom = (Math.round(Math.random() * (numberImages- 0 + 1) + 0));
            photoDog.src = Object.entries(dataPhoto.message)[numberImagesRandom][1];

        },
        error : function(erro){
            console.log(erro);
        }
    });
}
//salvando opções de raça no localstorage
function saveInfosBreed() {
    $('.inputBlock__breeds').change(function() {
        localStorage.setItem('breed', this.value);
    })
}
// chamando as fotos
function getInfosBreed() {
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url === "https://dog.ceo/api/breeds/list/all") {
            if (localStorage.getItem('breed')) {
                $('.inputBlock__breeds').val(localStorage.getItem('breed'));
            }
        }
    });
}
//salvando opções de cor no localstorage
function saveInfosColor() {
    $('.inputBlock__colors').change(function() {
        localStorage.setItem('color', this.value); 
    })
}
//chmando as cores salvas
function getInfosColor() {
    if (localStorage.getItem('color')) {
        $('.inputBlock__colors').val(localStorage.getItem('color'));
        document.querySelector(".photoBlock__description").style.color = localStorage.getItem('color')

    }
}
//salvando opções de fonte no localstorage
function saveInfosFont() {
    $('.input_fontes').change(function() {
        localStorage.setItem('font', this.value);
    })
}// função qye mostra as fonts
function getInfosFont() {
    if (localStorage.getItem('font')) {
        $('.input_fontes').val(localStorage.getItem('font'));
        document.querySelector(".photoBlock__description").style.fontFamily = localStorage.getItem('font')
    }
}
//salvando opções de nome no localstorage
function saveInfosName() {
    $('#textDog').on('keyup', function() {
        localStorage.setItem('name', this.value);
    })
}// função que mostra o nome
function getInfosName() {
    if (localStorage.getItem('name')) {
        $('.photoBlock__description').text(localStorage.getItem('name'));
        $('#textDog').val(localStorage.getItem('name'));
    }
}
//salvando foto no localstorage
function saveImage() {
    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url.indexOf('/images') >= 0) {
            localStorage.setItem('image', $('.imagem_photo').attr('src'))
        }
    })
}
// função que chama a imagem
function getImage() {
    if (localStorage.getItem('image')) {
        $('.imagem_photo').attr('src', localStorage.getItem('image'));
    }
}
// mostra hora
function getHora(){ 
    let data = new Date();
    let dia = data.getDate(); 
    var mes = data.getMonth() +1; 
    let hora = data.getHours();
    let minutos = data.getMinutes();
    localStorage.setItem("horario",dia +"/"+ mes +" "+ hora +":"+minutos)
    if (localStorage.getItem('horario'))
        $(".inputHora").text(localStorage.getItem('horario'));
        
}

