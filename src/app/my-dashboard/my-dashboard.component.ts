import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component} from '@angular/core';
import { map } from 'rxjs/operators';
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

const cardsData1 = [
  new Card('Full liquid cooled RGB Desktop Computer (AKA: Blue)', 'desktop_windows',
            new CardContent('assets/images/blue.JPG', items[0], itemsIcons[0]), 7, 1),
  new Card('EVE V', 'computer',
            new CardContent('assets/images/eve_v.jpg', items[1], itemsIcons[1]), 6, 1),
  new Card('OnePlus 6 (AKA: Black Ice)', 'smartphone',
            new CardContent('assets/images/black_ice.jpg', items[2], itemsIcons[2]), 6, 1),
  new Card('HTC Vive (Virtual Reality)', 'play_circle_filled',
            new CardContent('assets/images/htc_vive.jpg', items[3], itemsIcons[3]), 4, 1)
];
const cardsData2 = [
  new Card('Full liquid cooled RGB Desktop Computer (AKA: Blue)', 'desktop_windows',
            new CardContent('assets/images/blue.JPG', items[0], itemsIcons[0]), 6, 2),
  new Card('EVE V', 'computer',
            new CardContent('assets/images/eve_v.jpg', items[1], itemsIcons[1]), 5, 2),
  new Card('OnePlus 6 (AKA: Black Ice)', 'smartphone',
            new CardContent('assets/images/black_ice.jpg', items[2], itemsIcons[2]), 5, 2),
  new Card('HTC Vive (Virtual Reality)', 'play_circle_filled',
            new CardContent('assets/images/htc_vive.jpg', items[3], itemsIcons[3]), 3, 2)
];

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return cardsData2;
      }
      return cardsData1;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
