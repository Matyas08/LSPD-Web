import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("officer_accounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOAD ACCOUNTS ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Nepodařilo se načíst policejní účty.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      accounts: data || [],
    });
  } catch (error) {
    console.error("ACCOUNTS API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Serverová chyba.",
      },
      { status: 500 }
    );
  }
}