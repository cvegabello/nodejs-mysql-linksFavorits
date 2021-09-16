const current_location = location.pathname;
const _nav_menu = document.getElementById("nav_menu");
const imgDiv = document.querySelector(".profile-pic-div");
const img = document.getElementById("photo");
const file = document.querySelector("#pic_file");
const _changePhotoBtn = document.querySelector("#changePhotoBtn");
const _IdTxtPhotoHide = document.getElementById("IdTxtPhotoHide");


if (current_location == "/") {
  _nav_menu.style.visibility = "hidden";
}

file.addEventListener("change", function () {
  const choosedFile = this.files[0];
  if (choosedFile) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      img.setAttribute("src", reader.result);
      _IdTxtPhotoHide.setAttribute("value", file.files[0].name);
    });
    reader.readAsDataURL(choosedFile);
    _changePhotoBtn.style.display = "none";

    imgDiv.addEventListener("mouseenter", function () {
      _changePhotoBtn.style.display = "block";
    });
    
    imgDiv.addEventListener("mouseleave", function () {
      _changePhotoBtn.style.display = "none";
    });
  }
});

_changePhotoBtn.addEventListener("click", function () {
  _changePhotoBtn.style.display = "none";
});


// var getFavicon = function(){
//   var favicon = undefined;
//   var nodeList = document.getElementsByTagName("link");
//   for (var i = 0; i < nodeList.length; i++)
//   {
//       if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
//       {
//           favicon = nodeList[i].getAttribute("href");
//       }
//   }
//   return favicon;        
// }

// alert(getFavicon());​












// _btnSave.addEventListener("click", forceInputUppercase);

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("formLink").addEventListener("submit", forceInputUppercase);
// })

// function forceInputUppercase(event)
// {
//     event.preventDefault();
//     let _txtTitleLink = document.getElementById("txtTitleLink").value;
//     _txtTitleLink = _txtTitleLink.toUpperCase();
//     alert(_txtTitleLink);
//     let objetivo = document.getElementById('txtTitleLink');
//     objetivo.innerHTML =  _txtTitleLink;
//     this.submit();
//     // return 0;

//     // alert("Hola Mundo!!!! Bacan")
// 
