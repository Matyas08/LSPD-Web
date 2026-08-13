import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

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

    if (!name || !officerId || !rank || !discord || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Chybí povinné údaje.",
        },
        { status: 400 }
      );
    }

    // Kontrola existující žádosti
    const { data: existingRequests, error: requestCheckError } =
      await supabase
        .from("access_requests")
        .select("id, officer_id, discord, status")
        .or(`officer_id.eq.${officerId},discord.eq.${discord}`)
        .eq("status", "pending")
        .limit(1);

    if (requestCheckError) {
      console.error(requestCheckError);

      return NextResponse.json(
        {
          success: false,
          message: "Nepodařilo se zkontrolovat existující žádosti.",
        },
        { status: 500 }
      );
    }

    if (existingRequests && existingRequests.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Již máte aktivní žádost. Počkejte na její vyřízení IT oddělením.",
        },
        { status: 409 }
      );
    }

    // Bezpečné zahashování hesla
    const passwordHash = await bcrypt.hash(password, 12);

    // ID žádosti
    const requestId =
      "REQ-" + Math.floor(10000 + Math.random() * 90000);

    // Uložení žádosti do Supabase
    const { data, error } = await supabase
      .from("access_requests")
      .insert([
        {
          request_id: requestId,
          full_name: name,
          officer_id: officerId,
          rank,
          discord,
          password_hash: passwordHash,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Nepodařilo se uložit žádost do databáze.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Žádost byla úspěšně uložena.",
      request: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Došlo k neočekávané chybě.",
      },
      { status: 500 }
    );
  }
}