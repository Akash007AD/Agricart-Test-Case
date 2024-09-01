import crypto from 'crypto';

// Simulate UPI Payment Creation (replace with real UPI service integration)
const createUPIPayment = (amount) => {
  return {
    id: crypto.randomUUID(), // Unique Payment ID
    status: 'created',
    amount: amount,
    currency: 'INR',
    upiId: 'upi_id@bank', // Simulated UPI ID
  };
};

// Verify UPI payment (assuming verification logic is similar to signature verification)
const verifyUPIPayment = (req, res) => {
  const { paymentId, paymentSignature } = req.body;
  const secret = process.env.UPI_SECRET_KEY;

  // Generate signature for comparison
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${paymentId}`)
    .digest('hex');

  if (generatedSignature === paymentSignature) {
    res.status(200).json({ success: true, message: 'Payment verified successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Signature verification failed!' });
  }

  // Debugging output
  console.log('Payment ID:', paymentId);
  console.log('Received Signature:', paymentSignature);
  console.log('Generated Signature:', generatedSignature);
};

export { createUPIPayment, verifyUPIPayment };
