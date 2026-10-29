export interface CreatePaymentInput {
  orderId: string;
  customerId: string;
  amountMinor: number;
  currency: string;
  method: 'upi' | 'card' | 'netbanking' | 'cod';
  scenario?: 'success' | 'failure' | 'timeout';
}

export interface PaymentIntent {
  paymentId: string;
  providerReference: string;
  amountMinor: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  requiresAction?: boolean;
}

export interface VerifyPaymentInput {
  paymentId: string;
  providerReference: string;
  scenario?: 'success' | 'failure';
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  status: 'succeeded' | 'failed';
  failureReason?: string;
  settledAt?: string;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  refundAmountMinor: number;
  status: 'refunded' | 'failed';
}

export interface PaymentProvider {
  createPaymentIntent(input: CreatePaymentInput): Promise<PaymentIntent>;
  verifyPayment(input: VerifyPaymentInput): Promise<PaymentResult>;
  refundPayment(paymentId: string, amountMinor: number): Promise<RefundResult>;
}

export class MockPaymentProvider implements PaymentProvider {
  async createPaymentIntent(input: CreatePaymentInput): Promise<PaymentIntent> {
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const providerReference = `mock_ref_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

    if (input.method === 'cod') {
      return {
        paymentId,
        providerReference: `cod_${Date.now()}`,
        amountMinor: input.amountMinor,
        currency: input.currency,
        status: 'pending',
      };
    }

    if (input.scenario === 'failure') {
      return {
        paymentId,
        providerReference,
        amountMinor: input.amountMinor,
        currency: input.currency,
        status: 'failed',
      };
    }

    return {
      paymentId,
      providerReference,
      amountMinor: input.amountMinor,
      currency: input.currency,
      status: 'succeeded',
    };
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<PaymentResult> {
    if (input.scenario === 'failure') {
      return {
        success: false,
        paymentId: input.paymentId,
        status: 'failed',
        failureReason: 'Bank servers declined simulated transaction: Insufficient demo balance or simulated timeout.',
      };
    }

    return {
      success: true,
      paymentId: input.paymentId,
      status: 'succeeded',
      settledAt: new Date().toISOString(),
    };
  }

  async refundPayment(paymentId: string, amountMinor: number): Promise<RefundResult> {
    return {
      success: true,
      refundId: `ref_${Date.now()}`,
      refundAmountMinor: amountMinor,
      status: 'refunded',
    };
  }
}

export const paymentProvider = new MockPaymentProvider();
