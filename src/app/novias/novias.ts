import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-novias',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './novias.html',
  styleUrls: ['./novias.css']
})
export class Novias { }
