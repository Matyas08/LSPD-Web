import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ==========================================
// GET - NAČTENÍ ÚČTŮ
// ==========================================

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

// ==========================================
// DELETE - SMAZÁNÍ ÚČTU
// ==========================================

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Chybí ID účtu.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("officer_accounts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ACCOUNT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Nepodařilo se odstranit účet.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Účet byl úspěšně odstraněn.",
    });
  } catch (error) {
    console.error("DELETE API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Serverová chyba při mazání účtu.",
      },
      { status: 500 }
    );
  }
}

// ==========================================
// PATCH - ÚPRAVA ÚČTU
// ==========================================

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const id = body?.id;
    const rank = body?.rank;
    const officer_id = body?.officer_id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Chybí ID účtu.",
        },
        { status: 400 }
      );
    }

    if (!rank || !officer_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Chybí hodnost nebo číslo odznaku.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("officer_accounts")
      .update({
        rank: rank,
        officer_id: officer_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE ACCOUNT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Nepodařilo se upravit účet.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Účet byl úspěšně upraven.",
      account: data,
    });
  } catch (error) {
    console.error("UPDATE API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Serverová chyba při úpravě účtu.",
      },
      { status: 500 }
    );
  }
}