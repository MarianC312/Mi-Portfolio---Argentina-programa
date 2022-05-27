import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicio/auth.service';
import { TokenService } from '../servicio/token.service';
import { LoginUsuario } from '../modelo/login-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  isLoginFail: boolean = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  msgError: string;
  form:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private tokenService: TokenService,
    private toastr: ToastrService) {
    this.form = this.formBuilder.group(
      {
        nombreUsuario:['', [Validators.required]],
        password:['', [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;

        this.toastr.success('Bienvenido '+data.nombreUsuario, 'OK');
        this.router.navigate(['/portfolio']);
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.toastr.error('Ocurrió un error: '+err.message, 'ERROR')
      }
    );
  }

  get NombreUsuario() { return this.form.get('nombreUsuario'); }
  get Password() { return this.form.get('password'); }
}
