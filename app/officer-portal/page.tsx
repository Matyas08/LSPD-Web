"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Officer = {
  id: number;
  request_id?: string;
  name: string;
  officer_id: string;
  rank: string;
  discord: string;
  status: string;
  photo?: string;
};

export default function OfficerPortal() {
  const router = useRouter();

  const fileInput = useRef<HTMLInputElement>(null);

  const [officer, setOfficer] = useState<Officer | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedInOfficer = localStorage.getItem(
      "officerLoggedIn"
    );

    if (!loggedInOfficer) {
      router.push("/officer-login");
      return;
    }

    try {
      const parsedOfficer = JSON.parse(loggedInOfficer);

      setOfficer(parsedOfficer);
    } catch {
      localStorage.removeItem("officerLoggedIn");
      router.push("/officer-login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("officerLoggedIn");
    router.push("/");
  }

  async function uploadPhoto(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file || !officer) {
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("id", String(officer.id));
      formData.append("file", file);

      const response = await fetch(
        "/api/officer-accounts",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se nahrát profilovou fotografii."
        );
      }

      const updatedOfficer: Officer = {
        ...officer,
        photo: data.photo,
      };

      setOfficer(updatedOfficer);

      localStorage.setItem(
        "officerLoggedIn",
        JSON.stringify(updatedOfficer)
      );

      setMessage(
        "Profilová fotografie byla úspěšně uložena."
      );
    } catch (error) {
      console.error("PHOTO UPLOAD ERROR:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Nastala chyba při nahrávání fotografie."
      );
    } finally {
      setUploading(false);

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
  }

  if (!officer) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          Načítání profilu...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-5xl mx-auto">

        {/* HLAVIČKA */}

        <div className="bg-gray-900 p-8 rounded-xl mb-8">

          <div className="flex items-center gap-8">

            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={uploadPhoto}
              className="hidden"
            />

            <div className="relative">

              <img
                src={
                  officer.photo ||
                  "https://www.supersoused.cz/bundles/ineedtemplate/images/avatar-customer.png"
                }
                alt="Profilová fotografie"
                onClick={() =>
                  !uploading &&
                  fileInput.current?.click()
                }
                className={`
                  w-36
                  h-36
                  rounded-full
                  object-cover
                  cursor-pointer
                  border-4
                  border-gray-700
                  hover:border-blue-500
                  transition
                  ${uploading ? "opacity-50" : ""}
                `}
              />

              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 px-3 py-2 rounded-lg text-sm">
                    Nahrávání...
                  </div>
                </div>
              )}

            </div>

            <div>
              <h1 className="text-5xl font-bold">
                Los Santos Police Intranet
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Officer Portal
              </p>

              <p className="text-gray-500 mt-2">
                Kliknutím na fotografii ji můžete změnit.
              </p>

              {message && (
                <p
                  className={`mt-3 ${
                    message.includes("úspěšně")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

          </div>

          {/* OSOBNÍ ÚDAJE */}

          <div className="mt-8 bg-gray-800 p-8 rounded-xl">

            <h2 className="text-3xl font-bold mb-6">
              Osobní údaje
            </h2>

            <div className="space-y-4 text-xl">

              <p>
                <b>Jméno:</b>{" "}
                {officer.name || "Neuvedeno"}
              </p>

              <p>
                <b>Číslo odznaku:</b>{" "}
                {officer.officer_id || "Neuvedeno"}
              </p>

              <p>
                <b>Hodnost:</b>{" "}
                {officer.rank || "Neuvedeno"}
              </p>

              <p>
                <b>Discord:</b>{" "}
                {officer.discord || "Neuvedeno"}
              </p>

              <p>
                <b>Stav účtu:</b>{" "}
                <span className="text-green-400">
                  {officer.status || "Active"}
                </span>
              </p>

            </div>

          </div>

          {/* ODHLÁŠENÍ */}

          <button
            onClick={logout}
            className="
              mt-8
              bg-red-600
              hover:bg-red-700
              px-6
              py-3
              rounded
              text-lg
              font-bold
              transition
            "
          >
            Odhlásit se
          </button>

        </div>

        {/* SEKCE PORTÁLU */}

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition cursor-pointer">

            <h2 className="text-xl font-bold">
              📄 Dokumenty
            </h2>

            <p className="text-gray-400 mt-2">
              Policejní dokumenty a materiály.
            </p>

          </div>

          <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition cursor-pointer">

            <h2 className="text-xl font-bold">
              📋 SOP
            </h2>

            <p className="text-gray-400 mt-2">
              Standardní operační postupy.
            </p>

          </div>

          <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition cursor-pointer">

            <h2 className="text-xl font-bold">
              📝 Formuláře
            </h2>

            <p className="text-gray-400 mt-2">
              Policejní formuláře a materiály.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}