import Swal from 'sweetalert2'
import 'animate.css'

const swal = (title, text, icon, showCancelButton, colorBtnConfirm, colorBtnCancel) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor: colorBtnConfirm,
    cancelButtonColor: colorBtnCancel,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Atrás',
    reverseButtons: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown'
    }
  })
}

export default swal
