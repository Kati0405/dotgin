import { NextResponse } from "next/server";
import { Resend } from "resend";
import { orderSchema } from "@/lib/orderSchema";

const PRICE = 400;
const MANAGER_EMAIL = "ukrcraftbrd@gmail.com";
// TODO: once a domain is verified in Resend, remove this and always send to MANAGER_EMAIL.
const TEST_RECIPIENT_EMAIL = "ukrcraftbrd@gmail.com";

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

  const messageLines = [
    `Нове замовлення Джин .G`,
    `Ім'я: ${order.name} ${order.surname}`,
    `Телефон: ${order.phone}`,
    `Місто: ${order.city}`,
    `Відділення/поштомат: ${order.branch}`,
    `Кількість пляшок: ${order.quantity}`,
    `Сума: ${order.total} грн`,
    order.comment ? `Коментар: ${order.comment}` : null,
  ].filter(Boolean);

  await Promise.all([sendOrderEmail(order, messageLines), sendOrderTelegram(messageLines)]);

  return NextResponse.json({ ok: true });
}

async function sendOrderEmail(
  order: { name: string; surname: string },
  messageLines: (string | null)[],
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; skipping order email.");
    return;
  }

  const resend = new Resend(apiKey);
  const testMode = process.env.RESEND_TEST_MODE === "true";
  const { error } = await resend.emails.send({
    from: process.env.ORDERS_FROM_EMAIL ?? "Замовлення Джин .G <orders@resend.dev>",
    to: testMode ? TEST_RECIPIENT_EMAIL : MANAGER_EMAIL,
    subject: `Нове замовлення Джин .G — ${order.name} ${order.surname}`,
    text: messageLines.join("\n"),
  });

  if (error) {
    console.error("Failed to send order email:", error);
  }
}

async function sendOrderTelegram(messageLines: (string | null)[]) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set; skipping order Telegram message.");
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageLines.join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Failed to send order Telegram message:", await response.text());
    }
  } catch (error) {
    console.error("Failed to send order Telegram message:", error);
  }
}
