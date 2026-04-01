import QRCode from "qrcode";

export async function generateQRCodeDataURL(token: string): Promise<string> {
  const validationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/qr/validate?token=${token}`;
  return QRCode.toDataURL(validationUrl, {
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
}

export function generateQRToken(): string {
  return crypto.randomUUID();
}
