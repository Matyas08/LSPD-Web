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
      requestId,
      action,
      reason,
      approvedBy,
      rejectedBy,
    } = body;

    if (!requestId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: "Chybí requestId nebo action.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // NAČTENÍ ŽÁDOSTI
    // ==========================================

    const { data: registration, error: registrationError } =
      await supabase
        .from("officer_requests")
        .select("*")
        .eq("request_id", requestId)
        .single();

    if (registrationError || !registration) {
      console.error(
        "REGISTRATION LOAD ERROR:",
        registrationError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Žádost nebyla nalezena.",
        },
        { status: 404 }
      );
    }

    // ==========================================
    // SCHVÁLENÍ
    // ==========================================

    if (action === "approve") {

      // Kontrola, jestli už účet existuje
      const { data: existingAccount } = await supabase
        .from("officer_accounts")
        .select("id")
        .eq("officer_id", registration.officer_id)
        .maybeSingle();

      if (existingAccount) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Pro toto číslo odznaku už policejní účet existuje.",
          },
          { status: 409 }
        );
      }

      // Vytvoření účtu
      const { data: account, error: accountError } =
        await supabase
          .from("officer_accounts")
          .insert([
            {
              request_id: registration.request_id,
              name: registration.name,
              officer_id: registration.officer_id,
              rank: registration.rank,
              discord: registration.discord,
              password: registration.password,
              status: "Active",
            },
          ])
          .select()
          .single();

      if (accountError) {
        console.error(
          "OFFICER ACCOUNT CREATE ERROR:",
          accountError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Nepodařilo se vytvořit policejní účet.",
            details: accountError.message,
          },
          { status: 500 }
        );
      }

      // Změna žádosti na Approved
      const { data: updatedRequest, error: updateError } =
        await supabase
          .from("officer_requests")
          .update({
            status: "Approved",
          })
          .eq("request_id", requestId)
          .select()
          .single();

      if (updateError) {
        console.error(
          "REQUEST APPROVE UPDATE ERROR:",
          updateError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Účet byl vytvořen, ale nepodařilo se změnit stav žádosti.",
            details: updateError.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Žádost byla schválena a účet vytvořen.",
        account,
        request: updatedRequest,
      });
    }

    // ==========================================
    // ZAMÍTNUTÍ
    // ==========================================

    if (action === "reject") {

      if (!reason || !reason.trim()) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Musíte zadat důvod zamítnutí.",
          },
          { status: 400 }
        );
      }

      const { data: updatedRequest, error: updateError } =
        await supabase
          .from("officer_requests")
          .update({
            status: "Rejected",
          })
          .eq("request_id", requestId)
          .select()
          .single();

      if (updateError) {
        console.error(
          "REJECT SUPABASE ERROR:",
          updateError
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "Nepodařilo se zamítnout žádost.",
            details: updateError.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Žádost byla zamítnuta.",
        request: updatedRequest,
      });
    }

    // ==========================================
    // NEZNÁMÁ AKCE
    // ==========================================

    return NextResponse.json(
      {
        success: false,
        error: "Neznámá akce.",
      },
      { status: 400 }
    );

  } catch (error) {

    console.error(
      "REGISTER REQUEST ACTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Serverová chyba při zpracování akce.",
      },
      { status: 500 }
    );
  }
}