function alertSwalUsername(username){
    Swal.fire({
        title: `Your username is: ${username}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        showClass: {
            popup: 'animate__animated animate__backInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__backOutDown'
          },
        allowOutsideClick:false,
    }).then(function() {
        window.location = "/signin";
    });

}

function alertSwalMessage(message, isSuccess){
    if (isSuccess){
        Swal.fire({
            title: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showClass: {
                popup: 'animate__animated animate__backInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutDown'
              },
            allowOutsideClick:false,
        });
        // .then(function() {
        //     window.location = "/signin";
        // });
    }else{
        Swal.fire({
            title: message,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showClass: {
                popup: 'animate__animated animate__backInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutDown'
              },
            allowOutsideClick:false,
        }).then(function() {
            window.location = "/signin";
        });
    }
}