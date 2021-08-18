const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

imgDiv.addEventListener('mouseenter', function()
{
    uploadBtn.style.display = 'block'
});

imgDiv.addEventListener('mouseleave', function()
{
    uploadBtn.style.display = 'none'
});


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
// }

