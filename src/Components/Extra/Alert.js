import Swal from "sweetalert2";

export const successAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Thank You!",
    text: "Your Message Successfully Send!",
    // text: "Your message is sent successfully!",
    padding: "20px",
    timer: 8000,
    timerProgressBar: true,
    confirmButtonText: "Ok",
    confirmButtonColor: "#f48c06",
  });
};

export const errorAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Sorry",
    text: "Please enter your valuable Message!",
    // text: "Something is wrong, Please check your form data!",
    padding: "20px",
    timer: 5000,
    timerProgressBar: true,
    confirmButtonText: "Ok",
    confirmButtonColor: "#f48c06",
  });
};
