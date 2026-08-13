import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { officerId, password } = body;

    if (!officerId || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Zadejte číslo odznaku a heslo.",
        },
        { status: 400 }
      );
    }

    const { data: account, error } = await supabase
      .from("officer_accounts")
      .select("*")
      .eq("officer_id", officerId.trim())
      .eq("password", password)
      .eq("status", "Active")
      .maybeSingle();

    if (error) {
      console.error(
        "OFFICER LOGIN SUPABASE ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Nepodařilo se ověřit účet.",
        },
        { status: 500 }
      );
    }

    if (!account) {
      return NextResponse.json(
        {
          success: false,
          error: "Nesprávné číslo odznaku nebo heslo.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Přihlášení bylo úspěšné.",
      officer: {
        id: account.id,
        request_id: account.request_id,
        name: account.name,
        officer_id: account.officer_id,
        rank: account.rank,
        discord: account.discord,
        status: account.status,
      },
    });
  } catch (error) {
    console.error(
      "OFFICER LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Serverová chyba při přihlašování.",
      },
      { status: 500 }
    );
  }
}