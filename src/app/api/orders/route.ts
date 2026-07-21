import { NextResponse } from "next/server";

type OrderPayload = {
  name: string;
  phone: string;
  city: string;
  branch: string;
  quantity: number;
  comment: string;
  total: number;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<OrderPayload>;

  if (!body.name || !body.phone || !body.city || !body.branch) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  // TODO: persist to database and send an email/notification once set up.
  console.log("New order:", body);

  return NextResponse.json({ ok: true });
}
