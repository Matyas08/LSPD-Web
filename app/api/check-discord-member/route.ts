import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { discordUserId } = await req.json();

    if (!discordUserId) {
      return NextResponse.json(
        { error: "Chybí Discord User ID" },
        { status: 400 }
      );
    }

    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!guildId || !botToken) {
      console.log("❌ CHYBA: Chybí DISCORD_GUILD_ID nebo DISCORD_BOT_TOKEN v .env.local!");
      return NextResponse.json(
        { error: "Chybí konfigurace Discord Bota v .env.local" },
        { status: 500 }
      );
    }

    // Dotaz na Discord API
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/${discordUserId}`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
        cache: "no-store",
      }
    );

    // 🔍 VÝPIS PRO DEBUG KOLEM V ČEM JE CHYBA:
    const debugData = await response.clone().json().catch(() => ({}));
    console.log("-----------------------------------------");
    console.log("Discord API Status Kód:", response.status);
    console.log("Odpověď z Discordu:", debugData);
    console.log("Zadané ID uživatele:", discordUserId);
    console.log("Použité Guild ID:", guildId);
    console.log("-----------------------------------------");

    if (response.ok) {
      const memberData = await response.json();
      return NextResponse.json({
        isMember: true,
        user: {
          username: memberData.user.username,
          globalName: memberData.user.global_name,
        },
      });
    } else if (response.status === 404) {
      return NextResponse.json({
        isMember: false,
        message: "Uživatel není členem požadovaného Discord serveru.",
      });
    } else {
      return NextResponse.json(
        { error: "Chyba při komunikaci s Discord API", details: debugData },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Interní chyba serveru:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 }
    );
  }
}