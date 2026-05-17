import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MonthlySpend {
  month: string;
  amount: string;
  height: string;
  isHighlighted: boolean;
}

interface PolicyViolation {
  icon: string;
  title: string;
  description: string;
}

interface DepartmentSpend {
  name: string;
  amount: string;
  percentage: number;
}

interface TopTraveler {
  name: string;
  title: string;
  totalSpend: string;
  trips: string;
  image: string;
}

@Component({
  selector: 'app-report-snapshot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-snapshots.component.html',
  styleUrls: ['./report-snapshots.component.scss']
})
export class ReportSnapshotComponent {

  totalPeriodSpend = '$1.18M';
  growthMoM = '+12.4%';
  projectedSavings = '$82,400';

  monthlySpendData: MonthlySpend[] = [
    { month: 'Jul', amount: '$142k', height: '45%', isHighlighted: false },
    { month: 'Aug', amount: '$188k', height: '62%', isHighlighted: false },
    { month: 'Sep', amount: '$165k', height: '55%', isHighlighted: false },
    { month: 'Oct', amount: '$241k', height: '90%', isHighlighted: true },
    { month: 'Nov', amount: '$210k', height: '75%', isHighlighted: false },
    { month: 'Dec', amount: '$232k', height: '82%', isHighlighted: false }
  ];

  policyViolations: PolicyViolation[] = [
    {
      icon: 'warning',
      title: 'Class of Service',
      description: '42 unauthorized First Class bookings identified this month.'
    },
    {
      icon: 'schedule',
      title: 'Advanced Booking',
      description: '65% of flights booked less than 14 days prior to departure.'
    },
    {
      icon: 'hotel',
      title: 'Rate Ceiling',
      description: 'Excessive spend on lodging in London and NYC markets.'
    }
  ];

  departmentSpends: DepartmentSpend[] = [
    { name: 'Engineering & Product', amount: '$442,000', percentage: 42 },
    { name: 'Global Sales', amount: '$385,000', percentage: 36 },
    { name: 'Marketing & Events', amount: '$215,000', percentage: 21 },
    { name: 'Operations', amount: '$138,000', percentage: 14 }
  ];

  topTravelers: TopTraveler[] = [
    {
      name: 'Alexander Thorne',
      title: 'VP Global Partnerships',
      totalSpend: '$48,250',
      trips: '18 Trips',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg-mDM1X-Zov4DCBxVfFrW82kfMtNkeuYdCynv5YiNKHupAVqGc8dfBjGMaHgxXO7CCQN4Mw7USJ81hg5zKjaDpg_Zv8YwijM18uiiRDRVyUtndxqt-rxXSsXJHXsozuDMEnluir55eSWA-SBPT_3CmSvWFTUB2UcL49YS_3Qi0ArRW-U___hPxKkS0fvNOLWqIyEVqh67VxRkAUKaI1nDPXbSf8fdF-CJ5zzlDXJ9lOzfVeaIKqp_IsiMFf9j0mbD5l6A0qO0ayc'
    },
    {
      name: 'Elena Sterling',
      title: 'Director of Innovation',
      totalSpend: '$42,110',
      trips: '14 Trips',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK3CWpn-KpCSi17ingbpWrrJDlO37XbPYhgxw3qPQ2jc9RjqVJ3O6W9BR963-DE0wyLSThALsDcCYcbpZaA8iDrFCJ7iVX0QMwf80YAevjLrUpeUoa0Fs1iy83pUVvmKFpfFtC00Oij5z0eUCi3gt2y2DXyhICaY1nuECJCXo79Uq11JKJgjoky9QiZ8SCB1cCsKGLNCmAGyF27xGCR3IGde-m-3yKngrSbAkbdKg9lHwdBU2YOtvx-1a7uBgnQiHQEkwiRdOWNGo'
    },
    {
      name: 'Marcus Vane',
      title: 'Sr. Solution Architect',
      totalSpend: '$39,800',
      trips: '22 Trips',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_zqkpG7DWi7AQpYRPuGdsMftcSeFxTbvUMnQ-4hBCCBtXnZn2UH78NMgcrckwVjJySRC9BAvOZH3-pGTNwrgP7nxbS0pk1m0FrVgkFsVrGN6u9RmL36RodaThryvIXukCBBOZYs2Pkv8m9aYI952S5qCykEJf-d4mgC4UWzXDZtDcmkRbKY-F9-hv5Y8PDCSVaj24lsvj5ISYCle2TKvHLi6hloFgLVHOwbnmLqRJ3gPGJzG9vIbeq0b2BbH-RZlJeJA5diJQEzw'
    }
  ];

  generatePdf(): void {
    console.log('Generating PDF...');
  }

  dispatchIntelligence(): void {
    console.log('Dispatching intelligence...');
  }

  viewAuditLog(): void {
    console.log('Viewing audit log...');
  }
}