import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.scss'
})
export class ManagerProfileComponent {
profile = {
    name: 'Alexander Sterling',
    title: 'Senior Manager, Global Strategy & Consulting',
    tag: 'Executive Profile',
    status: 'Active',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDr3EIgNc3khw5fmdb6QTQ6o3RZYjs5HSXZZQF6ol6cKA-tN32sFQ2s3rg-b2nXkkG-gtPy3MZJl3bBjzE0Wet01_tWPoCb5gMtgFqhddWJDShwP8zIJTMPJHREKiDJU3b2pcKmvFnDkhlHlpiRSXwg3bfZ5R5LHsWI1pt2g_Gj6UWvjmisF0aBV5kat_HMzaeOFn_IW17442ItcLmoszpqIOvYJvlje5-Ha_iQ3-I9ElpcjxM2cdHiV6qkJkK4IQQBjJhnOQLiKV8',
  };

  manager = {
    name: 'Victoria Chen',
    title: 'Senior VP of Operations',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ihv4JcvDpAT-Vea7xltjJyEa7w8V6evw_VKKmeyhHiRYsEUKE5Pk02fkvUAbNBhkCGR-gR6BJKNWLdYyrvjmtVEI5t8ihb9Lw3bN-IsEZUlXRUyJyLFmdAmnGinRTw08ZS_PX-pjehL2wmqLBjBlWgNNkHzxSex3I8eztQgk6HGEY5HwMDALFhb3QpWrlMShUxxtP7KC1m-CajIa1A7HVYuP1fUGvODyI_nSsgXLTAdDyvINl29riFo0xZaCZg0ibdggFThPLiY',
  };

  tags = ['Strategic Operations', 'EMEA Markets'];

  officeLocation = 'London HQ, Mayfair';
  corporateId = 'AS-9901-01';

  currentYear = new Date().getFullYear();
}
