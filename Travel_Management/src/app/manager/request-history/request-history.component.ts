import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.scss'
})
export class RequestHistoryComponent {
isDarkMode = false;

  totalLogs = 284;
  currentPage = 1;
  itemsPerPage = 5;

  requests = [
    {
      employee: {
        name: 'Marcus Thorne',
        title: 'Senior Director, Strategy',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApAS7aYqPHGt5v9GsQxjylKWrx3QGuFwhC83j22AevckNfiYF45-G6SF8gJCg5bUD6U3lj5o9lTJdsSBO6Az2Kc9hXfH99WmkGIOaoChgjnrv5sH94Ohqv-n4mOppnL7oVYer6sSeUMq6e4XnJyFS7EX2pmYQrURuTbeBv3WWm4iIpsiW7ykredzzkEtYeGhLbDinwoXoM84APg2AIXUnyUIefJHavdo1YhJUqjI3uH-treSyUah4ECgcSO8s6haqDfJ4hJjKnyYM'
      },
      destination: {
        location: 'London, UK',
        dates: 'Oct 12 - Oct 18, 2024'
      },
      status: {
        label: 'Approved',
        type: 'approved',
        date: 'Oct 05, 2024'
      }
    },
    {
      employee: {
        name: 'Elena Rodriguez',
        title: 'VP Engineering',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtfV2bFNBVkpP5QVXZ-8AOhAcLtibqKuX1AHBPFIMiiezKzgoJfG6UFfU8H-XH4Fx1NUZC3cU-l-AYylFGlsOcaIWyShO_hjONNBPEpsP1Z4cNPAQmikHLjxEfL2nWfA1UugiEdf85jJdXzgcQvmQiaBmLH1Z38x21a9Lzj_Ujx55KG-pgh0N10JW-Kg6Pj2s5XjGP3n84Um6OCMClLZNmLQKz2_x2BBFUqGmIXS9YHmaAWvIgFp1F_n2T8NjbFupj7amlS1J_UvY'
      },
      destination: {
        location: 'Tokyo, Japan',
        dates: 'Nov 02 - Nov 10, 2024'
      },
      status: {
        label: 'Rejected',
        type: 'rejected',
        date: 'Oct 14, 2024'
      }
    },
    {
      employee: {
        name: 'David Chen',
        title: 'Account Manager',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOaUe53iB3E9XnFSBCxMj9-NAtFLlsAmrguiPT-lziVpUq0QM9L8Qfb14zwQg7HWB48qEQInLCvgB5Fks68aX1AOesi0wQhURl-A1YcW49ESPd7uiKQZ9IWrtNntVKZMFlAY-iybpFva1qq991Bq-oiUJ6Fjl7Nh3cpuBOj2TrcBtBkkuSCR9o_GWtKH1wJVkwLeCDG88FSVfFUa-bLZSuSwIogevGyaxCUGds9Rsi-rkmNd3SJBVCfYApDuBXSPidlYHAwgaylMI'
      },
      destination: {
        location: 'San Francisco, USA',
        dates: 'Sep 15 - Sep 20, 2024'
      },
      status: {
        label: 'Completed',
        type: 'completed',
        date: 'Sep 01, 2024'
      }
    },
    {
      employee: {
        name: 'Sarah Jenkins',
        title: 'HR Generalist',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ8mNAKcc0CsmXkfxgJI-XQ6gpKWQl_aLl76Wpgt_ivyRSjnmC90_C0W0LKRq4MbjoflLgo6V8IAoC1-7_MgROUZC1x2DAbRKh8a6cNgvA-u61bYoUF5WkoA6NNuT2sS38RC936J_dlskj0JqFNEBsxZPEU8VUaH_lj9it1o9pKb0jrBlTZRUE0sgXxu7Dl8KCnui4JOf4sU4v5VvLyKFj2oLI8V_0UjxnA07OLGVIeeNPW59tFfjGLzp_7NYPIoXXLds_-R2iSc8'
      },
      destination: {
        location: 'Zurich, Switzerland',
        dates: 'Oct 20 - Oct 25, 2024'
      },
      status: {
        label: 'Reimbursed',
        type: 'reimbursed',
        date: 'Oct 18, 2024'
      }
    },
    {
      employee: {
        name: 'Julian Meyer',
        title: 'Head of Brand',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAtFcCy-MFAqKJX_aJB680rO_HsSMF1o_AnWA5HkcrKLY1EGSmwkJxg3SyuPndIeHHqbG1nW-a4CIQs-dbOSv51zJObfj_EkwEfk3pwkrl_DvxhXlJjErlPk202BTBdISV6l6CvVm3DY7lj0wpa7P-orqRrz-s0bb0jvM8cQcrr6bGRAc6lKSc_TpHicHyryMtAP-IgJ6mACSI8HCN1O23_UQMdzQtvvN8ypbDW1smtaikfOlq5_YI6sDKsWnLN2nDh_dWOGgFNL0'
      },
      destination: {
        location: 'Berlin, Germany',
        dates: 'Dec 05 - Dec 12, 2024'
      },
      status: {
        label: 'Approved',
        type: 'approved',
        date: 'Oct 28, 2024'
      }
    }
  ];

  get paginatedRequests() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.requests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.requests.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  clearFilters(): void {
    // Add filter clearing logic here
    console.log('Filters cleared');
  }
}
