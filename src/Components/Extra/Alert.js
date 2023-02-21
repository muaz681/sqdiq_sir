import Swal from "sweetalert2";

export const successAlert = () => {
  Swal.fire({
    icon: "success",
    title: "ধন্যবাদ!",
    text: "আাপনার মেসেজটি সফলভাবে পৌঁছে গেছে!",
    // text: "Your message is sent successfully!",
    padding: "20px",
    timer: 8000,
    timerProgressBar: true,
    confirmButtonText: "ঠিক আছে",
    confirmButtonColor: "#f48c06",
  });
};

export const errorAlert = () => {
  Swal.fire({
    icon: "error",
    title: "দুঃখিত!",
    text: "দয়া করে সঠিক তথ্য প্রদান করুন!",
    // text: "Something is wrong, Please check your form data!",
    padding: "20px",
    timer: 5000,
    timerProgressBar: true,
    confirmButtonText: "ঠিক আছে",
    confirmButtonColor: "#f48c06",
  });
};
