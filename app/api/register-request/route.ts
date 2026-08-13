import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      officerId,
      rank,
      discord,
      password,
    } = body;

    // ==========================================
    // KONTROLA POVINNÝCH ÚDAJŮ
    // ==========================================

    if (
      !name ||
      !officerId ||
      !rank ||
      !discord ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Chybí některé povinné údaje.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // VYTVOŘENÍ ID ŽÁDOSTI
    // ==========================================

    const requestId =
      "LSPD-" +
      Date.now()
        .toString(36)
        .toUpperCase();

    // ==========================================
    // KONTROLA EXISTUJÍCÍ ŽÁDOSTI
    // ==========================================

    const {
      data: existingRequest,
      error: existingError,
    } = await supabase
      .from("officer_requests")
      .select("request_id")
      .or(
        `officer_id.eq.${officerId},discord.eq.${discord}`
      )
      .eq("status", "Pending")
      .maybeSingle();

    if (existingError) {
      console.error(
        "CHECK ERROR:",
        existingError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Nepodařilo se zkontrolovat existující žádost.",
          details:
            existingError.message,
        },
        { status: 500 }
      );
    }

    // ==========================================
    // POKUD UŽ ŽÁDOST EXISTUJE
    // ==========================================

    if (existingRequest) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Pro tento odznak nebo Discord již existuje aktivní žádost.",
        },
        { status: 409 }
      );
    }

    // ==========================================
    // ULOŽENÍ ŽÁDOSTI DO SUPABASE
    // ==========================================

    const {
      data,
      error,
    } = await supabase
      .from("officer_requests")
      .insert([
        {
          request_id: requestId,

          name:
            name.trim(),

          officer_id:
            officerId.trim(),

          rank:
            rank,

          discord:
            discord.trim(),

          password:
            password,

          status:
            "Pending",
        },
      ])
      .select()
      .single();

    // ==========================================
    // CHYBA PŘI UKLÁDÁNÍ
    // ==========================================

    if (error) {
      console.error(
        "SUPABASE INSERT ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Nepodařilo se uložit žádost do databáze.",
          details:
            error.message,
        },
        { status: 500 }
      );
    }

    // ==========================================
    // ÚSPĚŠNÉ VYTVOŘENÍ
    // ==========================================

    console.log(
      "NOVÁ LSPD ŽÁDOST:",
      data
    );

    return NextResponse.json({
      success: true,
      message:
        "Žádost byla úspěšně odeslána.",
      data,
    });

  } catch (error) {

    console.error(
      "REGISTER REQUEST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Serverová chyba při zpracování žádosti.",
      },
      { status: 500 }
    );
  }
}