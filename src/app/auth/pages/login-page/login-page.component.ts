import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  //Creamos el formulario
  private fb = inject( FormBuilder );
  //Inyecta el servicio
  private authService = inject(AuthService);
  //Intec. Router para hacer la navegación
  private router = inject( Router )

  //Creamos el formulario
  public myForm: FormGroup = this.fb.group({
    email: ['miguel@gmail.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  login(){
    const { email, password } = this.myForm.value;

    this.authService.login( email, password )
      //Para que la peticion se dispara hay que suscribirse
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error')
        }
      })


  }

}
