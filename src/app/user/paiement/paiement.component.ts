import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  paymentHandler: any = null;
  invoiceGenerated: boolean = false;
  id: any;
  
  constructor(
    private route: ActivatedRoute,
    private service: CrudService,
    private router: Router,
   
  ) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.invokeStripe();
  }
  
  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51ORfw8CGCz5RXlZeoe3XDe37HmmqpZVdoHzeTdv6BwUbc2FN7TshEC3TQJeGrDQPE1oBRYJHeXUPDPqoUvwRZsAb00g0HXBiwp',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        alert('Stripe token generated!');
        this.displayInvoice();
      },
    });
    paymentHandler.open({
      name: '',
      description: '',
    });
  }
  
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51ORfw8CGCz5RXlZeoe3XDe37HmmqpZVdoHzeTdv6BwUbc2FN7TshEC3TQJeGrDQPE1oBRYJHeXUPDPqoUvwRZsAb00g0HXBiwp',
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            alert('Payment effectuée avec success!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  
  displayInvoice() {
    
    alert('Voici votre facture !');
    this.invoiceGenerated = true; 
  }
  
  connexion(): void {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
