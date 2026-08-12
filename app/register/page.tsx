"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [officerId, setOfficerId] = useState("");
  const [rank, setRank] = useState("");
  const [discord, setDiscord] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const ranks = [
    "Chief Of Police",
    "First Assistant Chief of Police",
    "Assistant Chief of Police",
    "Deputy Chief of Police",
    "Commander",
    "Captain III",
    "Captain II",
    "Captain I",
    "Lieutenant II",
    "Lieutenant I",
    "Sergeant II",
    "Sergeant",
    "Detective III",
    "Detective II",
    "Detective I",
    "Police Officer III+I",
    "Police Officer III",
    "Police Officer II",
  ];

  async function submitRequest() {
    if (
      !name ||
      !officerId ||
      !rank ||
      !discord ||
      !password ||
      !confirmPassword
    ) {
      alert("Vyplňte všechna povinná pole.");
      return;
    }

    if (!name.includes(" ")) {
      alert("Zadejte prosím celé jméno a příjmení.");
      return;
    }

    if (!/^[0-9]+$/.test(officerId)) {
      alert("Číslo služebního odznaku může obsahovat pouze čísla.");
      return;
    }

    if (password.length < 5) {
      alert("Heslo musí obsahovat alespoň 5 znaků.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Hesla se neshodují.");
      return;
    }

    setLoading(true);

    try {
      // Zavolání API pro kontrolu Discord uživatele
      const checkRes = await fetch("/api/check-discord-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordUserId: discord.trim() }),
      });

      const checkData = await checkRes.json();

      if (!checkData.isMember) {
        alert("PŘÍSTUP ZAMÍTNUT: Tento účet není členem nášho Discord serveru LSPD!");
        setLoading(false);
        return;
      }

      const requests = JSON.parse(
        localStorage.getItem("officerRequests") || "[]"
      );

      const accounts = JSON.parse(
        localStorage.getItem("officerAccounts") || "[]"
      );

      const activeRequest = requests.find(
        (user: any) =>
          (user.officerId === officerId || user.discord === discord) &&
          user.status === "Pending"
      );

      if (activeRequest) {
        alert("Již máte aktivní žádost. Počkejte na její vyřízení IT oddělením.");
        setLoading(false);
        return;
      }

      const existingAccount = accounts.find(
        (user: any) => user.officerId === officerId || user.discord === discord
      );

      if (existingAccount) {
        alert("Tento služební účet již existuje.");
        setLoading(false);
        return;
      }

      const requestId =
        "REQ-" + Math.floor(10000 + Math.random() * 90000);

      const newRequest = {
        id: Date.now(),
        requestId,
        name,
        officerId,
        rank,
        discord,
        password,
        status: "Pending",
        createdAt: new Date().toLocaleString("cs-CZ"),
      };

      requests.push(newRequest);
      localStorage.setItem("officerRequests", JSON.stringify(requests));

      alert("Žádost byla úspěšně odeslána a ověřena oproti Discordu.");

      setName("");
      setOfficerId("");
      setRank("");
      setDiscord("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Chyba při ověřování Discord účtu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-xl bg-gray-900/90 border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-black text-center mb-4">
          Registrace policejního účtu
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Vaše žádost bude zkontrolována IT oddělením LSPD.
        </p>

        <input
          className="w-full p-4 mb-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none"
          placeholder="Jméno a příjmení *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-4 mb-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none"
          placeholder="Číslo služebního odznaku *"
          value={officerId}
          onChange={(e) => setOfficerId(e.target.value)}
        />

        <select
          className="w-full p-4 mb-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
        >
          <option value="">Vyberte hodnost *</option>
          {ranks.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          className="w-full p-4 mb-1 bg-gray-800 rounded-2xl border border-gray-700 outline-none"
          placeholder="Discord ID uživatele (např. 38283921...)"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
        />
        <p className="text-xs text-gray-500 mb-4 px-2">
          Pravé tlačítko na vaše jméno v Discordu → Kopírovat ID uživatele.
        </p>

        <div className="relative mb-4">
          <input
            className="w-full p-4 pr-14 bg-gray-800 rounded-2xl border border-gray-700 outline-none"
            placeholder="Heslo *"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="relative mb-2">
          <input
            className="w-full p-4 pr-14 bg-gray-800 rounded-2xl border border-gray-700 outline-none"
            placeholder="Potvrzení hesla *"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Heslo musí obsahovat minimálně 5 znaků.
        </p>

        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-2xl font-black text-lg"
        >
          {loading ? "Ověřování na Discordu..." : "📝 Odeslat žádost"}
        </button>

        <button
          onClick={() => router.push("/officer-login")}
          className="w-full mt-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-2xl font-bold"
        >
          ← Zpět na přihlášení
        </button>
      </div>
    </main>
  );
}