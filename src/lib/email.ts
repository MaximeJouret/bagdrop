import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface BookingConfirmationParams {
  to: string;
  bookingId: string;
  trailerName: string;
  trailerAddress: string;
  lockerLabel: string;
  lockerSize: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  qrCodeDataUrl: string;
}

export async function sendBookingConfirmation({
  to,
  trailerName,
  trailerAddress,
  lockerLabel,
  lockerSize,
  startTime,
  endTime,
  totalPrice,
  qrCodeDataUrl,
}: BookingConfirmationParams) {
  const qrCodeBuffer = Buffer.from(
    qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
    "base64"
  );

  await getResend().emails.send({
    from: "BagDrop <noreply@bagdrop.be>",
    to,
    subject: "BagDrop — Votre réservation est confirmée",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #18181b;">Réservation confirmée ✓</h1>
        <p>Votre casier est réservé. Présentez le QR code ci-dessous à votre arrivée.</p>

        <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p><strong>Emplacement :</strong> ${trailerName}</p>
          <p><strong>Adresse :</strong> ${trailerAddress}</p>
          <p><strong>Casier :</strong> ${lockerLabel} (${lockerSize === "LARGE" ? "Grand — valise 23kg" : "Petit — bagage à main"})</p>
          <p><strong>Début :</strong> ${startTime}</p>
          <p><strong>Fin :</strong> ${endTime}</p>
          <p><strong>Prix total :</strong> ${totalPrice.toFixed(2)} €</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <img src="cid:qrcode" alt="QR Code" width="250" height="250" />
        </div>

        <p style="color: #71717a; font-size: 14px;">
          En cas de problème, contactez-nous à support@bagdrop.be
        </p>
      </div>
    `,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeBuffer,
        contentType: "image/png",
      },
    ],
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
    },
  });
}

interface DeliveryConfirmationParams {
  to: string;
  bookingId: string;
  trailerName: string;
  trailerAddress: string;
  lockerLabel: string;
  lockerSize: string;
  depositDeadline: string;
  scheduledDeparture: string;
  destinationAddress: string;
  totalPrice: number;
  trackingUrl: string;
  qrCodeDataUrl: string;
}

export async function sendDeliveryConfirmation({
  to,
  trailerName,
  trailerAddress,
  lockerLabel,
  lockerSize,
  depositDeadline,
  scheduledDeparture,
  destinationAddress,
  totalPrice,
  trackingUrl,
  qrCodeDataUrl,
}: DeliveryConfirmationParams) {
  const qrCodeBuffer = Buffer.from(
    qrCodeDataUrl.replace(/^data:image\/png;base64,/, ""),
    "base64"
  );

  await getResend().emails.send({
    from: "BagDrop <noreply@bagdrop.be>",
    to,
    subject: "BagDrop — Votre livraison aéroport est confirmée",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #18181b;">Livraison aéroport confirmée ✓</h1>
        <p>Votre bagage sera livré à Brussels Airport. Déposez-le avant l'heure limite indiquée ci-dessous.</p>

        <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p><strong>Dépôt :</strong> ${trailerName}</p>
          <p><strong>Adresse dépôt :</strong> ${trailerAddress}</p>
          <p><strong>Casier :</strong> ${lockerLabel} (${lockerSize === "LARGE" ? "Grand — valise 23kg" : "Petit — bagage à main"})</p>
          <p style="color: #d97706;"><strong>⚠ Déposez avant :</strong> ${depositDeadline}</p>
          <p><strong>Départ :</strong> ${scheduledDeparture}</p>
          <p><strong>Destination :</strong> ${destinationAddress}</p>
          <p><strong>Prix total :</strong> ${totalPrice.toFixed(2)} €</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <img src="cid:qrcode" alt="QR Code" width="250" height="250" />
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <a href="${trackingUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Suivre ma livraison en temps réel
          </a>
        </div>

        <p style="color: #71717a; font-size: 14px;">
          En cas de problème, contactez-nous à support@bagdrop.be
        </p>
      </div>
    `,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeBuffer,
        contentType: "image/png",
      },
    ],
    headers: {
      "X-Entity-Ref-ID": crypto.randomUUID(),
    },
  });
}
