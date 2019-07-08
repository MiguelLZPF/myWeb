import { Component, OnInit } from '@angular/core';
import { Card } from 'src/models/Card';
import { CardContent } from 'src/models/CardContent';

const items: string[][] = [
  /* Blue */
  ['CPU: Intel 7th Gen Core i7-4790K', 'GPU: NVIDIA GeForce GTX 1080Ti', 'RAM: 16 GB DDR3 1600 MHz',
   'Storage: 3.2 TB 5xSSD, 12.5 TB 3xHDD', 'Conectivity: Dual Gigabit Ethernet & Bluethoot 4.2',
   'Display: 27" 2560x1440 LED & 22" 1920x1080', 'Full custom liquid cooling EKWB loop'],
  /* EVE V */
  ['CPU: Intel 7th Gen Core i7-7Y75', 'RAM: 16 GB LPDDR3', 'Storage: 1 TB PCIe SSD',
   'Connectivity: WiFi ac (2x2 MU-MIMO) & Bluetooth 4.2',
   'Display: 12.3" IGZO LCD 2880x1920, 1:1500 contrast ratio, 100% sRGB', 'Battery: 48Wh'],
  /* Black Ice */
  ['CPU: Qualcomm® Snapdragon 845 (Octa-core, 10nm, 2.8 GHz)', 'RAM: 8 GB LPDDR4X',
   'Storage: UFS 2.1 2-LANE 128 GB', 'Connectivity: WiFi ac (2x2 MIMO) & Bluethoot 5.0 (aptX HD)',
   'Display: 6.28" Optic AMOLED 2280x1080, sRGB, DCI-P3', 'Battery: 3300 mAh with Dash Charge'],
  /* HTC VIVE */
  ['Horse Power: Blue ;-)', 'Display: 3.6" Dual AMOLED 1080x1200 pixels per eye (2160x1200), 90 Hz, 110° FOV']
];

const itemsIcons: string[][] = [
  ['memory', '4k', 'developer_board', 'storage', 'wifi', 'personal_video', 'local_drink'],
  ['memory', 'developer_board', 'storage', 'wifi', 'personal_video', 'battery_charging_full'],
  ['memory', 'developer_board', 'storage', 'wifi', 'personal_video', 'battery_charging_full'],
  ['developer_board', 'personal_video']
];

const CARDS = [
  new Card('Angular 7', 'code',
            new CardContent('assets/images/angular_7.png', items[0], itemsIcons[0])),
  new Card('Material Design', 'code',
            new CardContent('assets/images/material.jpg', items[1], itemsIcons[1])),
  new Card('RaspberryPi 3', 'memory',
            new CardContent('assets/images/raspberry_pi_3.png', items[2], itemsIcons[2]))
];

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {
  cards = CARDS;
  constructor() { }

  ngOnInit() {
  }

}
