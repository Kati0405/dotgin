import { NextResponse } from "next/server";

const NP_API_URL = "https://api.novaposhta.ua/v2.0/json/";

type NpCity = {
  Ref: string;
  Description: string;
  AreaDescription: string;
};

type NpWarehouse = {
  Ref: string;
  Description: string;
  CityRef: string;
};

async function callNovaPoshta<T>(
  apiKey: string,
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown>,
): Promise<T[]> {
  const response = await fetch(NP_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey, modelName, calledMethod, methodProperties }),
  });

  if (!response.ok) {
    throw new Error(`Nova Poshta API request failed: ${response.status}`);
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(`Nova Poshta API error: ${JSON.stringify(data.errors)}`);
  }

  return data.data as T[];
}

export async function GET(request: Request) {
  const apiKey = process.env.NOVA_POSHTA_API_KEY;
  if (!apiKey) {
    console.error("NOVA_POSHTA_API_KEY is not set.");
    return NextResponse.json({ error: "Nova Poshta integration is not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "cities") {
      const query = searchParams.get("query")?.trim() ?? "";
      if (query.length < 2) return NextResponse.json({ cities: [] });

      const cities = await callNovaPoshta<NpCity>(apiKey, "Address", "getCities", {
        FindByString: query,
        Limit: 10,
      });

      return NextResponse.json({
        cities: cities.map((c) => ({
          ref: c.Ref,
          name: c.Description,
          area: c.AreaDescription,
        })),
      });
    }

    if (type === "warehouses") {
      const cityRef = searchParams.get("cityRef")?.trim();
      if (!cityRef) {
        return NextResponse.json({ error: "cityRef is required" }, { status: 400 });
      }

      const warehouses = await callNovaPoshta<NpWarehouse>(apiKey, "Address", "getWarehouses", {
        CityRef: cityRef,
        Limit: 200,
      });

      return NextResponse.json({
        warehouses: warehouses.map((w) => ({
          ref: w.Ref,
          name: w.Description,
        })),
      });
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  } catch (error) {
    console.error("Nova Poshta API call failed:", error);
    return NextResponse.json({ error: "Nova Poshta request failed" }, { status: 502 });
  }
}
