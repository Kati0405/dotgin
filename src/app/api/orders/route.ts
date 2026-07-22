import { NextResponse } from "next/server";
import { Resend } from "resend";
import { orderSchema } from "@/lib/orderSchema";

const PRICE = 466;
const MANAGER_EMAIL = "24site@gmail.com";
// TODO: once a domain is verified in Resend, remove this and always send to MANAGER_EMAIL.
const TEST_RECIPIENT_EMAIL = "k.kovshykova@gmail.com";

export async function POST(request: Request) {
  const body = await request.json();
  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const order = { ...result.data, total: PRICE * result.data.quantity };
  console.log("New order:", order);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; skipping order email.");
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const testMode = process.env.RESEND_TEST_MODE === "true";
  const { error } = await resend.emails.send({
    from: process.env.ORDERS_FROM_EMAIL ?? "Замовлення .G <orders@resend.dev>",
    to: testMode ? TEST_RECIPIENT_EMAIL : MANAGER_EMAIL,
    subject: `Нове замовлення .G — ${order.name} ${order.surname}`,
    text: [
      `Ім'я: ${order.name} ${order.surname}`,
      `Телефон: ${order.phone}`,
      `Місто: ${order.city}`,
      `Відділення/поштомат: ${order.branch}`,
      `Кількість пляшок: ${order.quantity}`,
      `Сума: ${order.total} грн`,
      order.comment ? `Коментар: ${order.comment}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Failed to send order email:", error);
  }

  return NextResponse.json({ ok: true });
}
