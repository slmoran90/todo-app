import Swal from "sweetalert2"
import "animate.css"

const swal = (
  title,
  text,
  icon,
  showCancelButton,
  colorBtnConfirm,
  colorBtnCancel
) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor: colorBtnConfirm,
    cancelButtonColor: colorBtnCancel,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Atrás",
    reverseButtons: true,
    showClass: {
      popup: "animate__animated animate__fadeIn",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOut",
    },
  })
}

export default swal
