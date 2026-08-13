"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Request = {
  id?: number;
  request_id: string;
  name: string;
  officer_id: string;
  rank: string;
  discord: string;
  password?: string;
  status: string;
  reason?: string;
  approved_by?: string;
  rejected_by?: string;
  created_at: string;
  processed_at?: string;
};

type OfficerAccount = {
  id: number;
  request_id?: string;
  name: string;
  officer_id: string;
  rank: string;
  discord: string;
  password: string;
  status: string;
  created_at: string;
  updated_at?: string;
};

export default function Admin() {
  const router = useRouter();

  const [requests, setRequests] = useState<Request[]>([]);
  const [officerAccounts, setOfficerAccounts] = useState<
    OfficerAccount[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [accountsLoading, setAccountsLoading] = useState(true);

  const [adminUser, setAdminUser] = useState<any>(null);

  const [rejectRequestData, setRejectRequestData] =
    useState<Request | null>(null);

  const [rejectReason, setRejectReason] = useState("");

  const [showPassword, setShowPassword] =
    useState<number | null>(null);

  const [editAccount, setEditAccount] =
    useState<OfficerAccount | null>(null);

  const [editRank, setEditRank] = useState("");
  const [editOfficerId, setEditOfficerId] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

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

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.push("/admin-login");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("adminUser") || "null"
    );

    setAdminUser(user);

    loadAllData();
  }, [router]);

  async function loadAllData() {
    await Promise.all([
      loadRequests(),
      loadAccounts(),
    ]);
  }

  async function loadRequests() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/register-requests",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se načíst žádosti."
        );
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error(
        "LOAD REQUESTS ERROR:",
        error
      );

      alert(
        "Nepodařilo se načíst žádosti."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadAccounts() {
    try {
      setAccountsLoading(true);

      const response = await fetch(
        "/api/officer-accounts",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se načíst účty."
        );
      }

      setOfficerAccounts(
        data.accounts || []
      );
    } catch (error) {
      console.error(
        "LOAD ACCOUNTS ERROR:",
        error
      );

      alert(
        "Nepodařilo se načíst policejní účty."
      );
    } finally {
      setAccountsLoading(false);
    }
  }

  async function refreshAll() {
    await loadAllData();
  }

  function logout() {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    localStorage.removeItem(
      "adminUser"
    );

    router.push("/");
  }

  // ==========================================
  // SCHVÁLENÍ
  // ==========================================

  async function approveRequest(
    request: Request
  ) {
    if (!request.request_id) {
      alert(
        "Tato žádost nemá request ID."
      );
      return;
    }

    if (
      !confirm(
        `Opravdu chcete schválit žádost ${request.request_id}?`
      )
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(
        "/api/register-request-action",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            requestId:
              request.request_id,

            action: "approve",

            approvedBy:
              adminUser?.username ||
              "Unknown",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se schválit žádost."
        );
      }

      alert(
        `Žádost byla schválena.\n\nÚčet vytvořen:\n\nOdznak: ${request.officer_id}\nHeslo: ${request.password || "neuvedeno"}`
      );

      await loadAllData();
    } catch (error: any) {
      console.error(
        "APPROVE ERROR:",
        error
      );

      alert(
        error.message ||
          "Chyba při schvalování."
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ==========================================
  // ZAMÍTNUTÍ
  // ==========================================

  async function rejectRequest() {
    if (
      !rejectRequestData?.request_id
    ) {
      alert(
        "Žádost nemá request ID."
      );
      return;
    }

    if (!rejectReason.trim()) {
      alert(
        "Vyplňte důvod zamítnutí."
      );
      return;
    }

    try {
      setActionLoading(true);

      const response = await fetch(
        "/api/register-request-action",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            requestId:
              rejectRequestData.request_id,

            action: "reject",

            reason:
              rejectReason.trim(),

            rejectedBy:
              adminUser?.username ||
              "Unknown",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se zamítnout žádost."
        );
      }

      setRejectRequestData(null);
      setRejectReason("");

      alert(
        "Žádost byla zamítnuta."
      );

      await loadRequests();
    } catch (error: any) {
      console.error(
        "REJECT ERROR:",
        error
      );

      alert(
        error.message ||
          "Chyba při zamítání."
      );
    } finally {
      setActionLoading(false);
    }
  }

  // ==========================================
  // SMAZÁNÍ ÚČTU
  // ==========================================

  async function deleteAccount(
    account: OfficerAccount
  ) {
    if (
      !confirm(
        `Opravdu chcete odstranit účet ${account.officer_id}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        "/api/officer-accounts",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: account.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se odstranit účet."
        );
      }

      alert(
        "Účet byl odstraněn."
      );

      await loadAccounts();
    } catch (error: any) {
      console.error(
        "DELETE ACCOUNT ERROR:",
        error
      );

      alert(
        error.message ||
          "Chyba při mazání účtu."
      );
    }
  }

  // ==========================================
  // EDITACE ÚČTU
  // ==========================================

  function openEditAccount(
    account: OfficerAccount
  ) {
    setEditAccount(account);
    setEditRank(account.rank);
    setEditOfficerId(
      account.officer_id
    );
  }

  async function updateAccount() {
    if (!editAccount) {
      return;
    }

    if (!editRank || !editOfficerId.trim()) {
      alert(
        "Vyplňte hodnost a číslo odznaku."
      );
      return;
    }

    try {
      const response = await fetch(
        "/api/officer-accounts",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: editAccount.id,

            rank: editRank,

            officer_id:
              editOfficerId.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Nepodařilo se upravit účet."
        );
      }

      setEditAccount(null);

      alert(
        "Účet byl upraven."
      );

      await loadAccounts();
    } catch (error: any) {
      console.error(
        "UPDATE ACCOUNT ERROR:",
        error
      );

      alert(
        error.message ||
          "Chyba při úpravě účtu."
      );
    }
  }

  const pendingRequests =
    requests.filter(
      (request) =>
        request.status ===
        "Pending"
    );

  const approvedRequests =
    requests
      .filter(
        (request) =>
          request.status ===
          "Approved"
      )
      .slice(0, 5);

  const rejectedRequests =
    requests
      .filter(
        (request) =>
          request.status ===
          "Rejected"
      );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-red-950 text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* ====================================== */}
        {/* HEADER */}
        {/* ====================================== */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-black">
              LSPD Administration Portal
            </h1>

            <p className="text-gray-400 mt-2">
              Správa policejních účtů a žádostí
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={refreshAll}
              disabled={actionLoading}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-6 py-3 rounded-2xl font-bold"
            >
              🔄 Obnovit
            </button>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-bold"
            >
              Odhlásit
            </button>

          </div>

        </div>

        {/* ====================================== */}
        {/* ČEKAJÍCÍ ŽÁDOSTI */}
        {/* ====================================== */}

        <section className="bg-gray-900 rounded-3xl p-6 shadow-xl mb-8">

          <h2 className="text-2xl font-black mb-6">
            🟡 Čekající žádosti
          </h2>

          {loading ? (
            <p className="text-gray-400">
              Načítání žádostí...
            </p>
          ) : pendingRequests.length === 0 ? (
            <p className="text-gray-400">
              Žádné čekající žádosti.
            </p>
          ) : (

            <div className="space-y-5">

              {pendingRequests.map(
                (request, index) => (

                  <div
                    key={
                      request.request_id ||
                      `${request.officer_id}-${request.discord}-${index}`
                    }
                    className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
                  >

                    <h3 className="text-xl font-bold mb-4">
                      📄{" "}
                      {request.request_id}
                    </h3>

                    <p>
                      👤{" "}
                      <b>Jméno:</b>{" "}
                      {request.name}
                    </p>

                    <p>
                      🪪{" "}
                      <b>Číslo odznaku:</b>{" "}
                      {request.officer_id}
                    </p>

                    <p>
                      ⭐{" "}
                      <b>Hodnost:</b>{" "}
                      {request.rank}
                    </p>

                    <p>
                      💬{" "}
                      <b>Discord:</b>{" "}
                      {request.discord}
                    </p>

                    <p>
                      📅{" "}
                      <b>Datum:</b>{" "}
                      {new Date(
                        request.created_at
                      ).toLocaleString(
                        "cs-CZ"
                      )}
                    </p>

                    <p className="text-yellow-400 font-bold mt-3">
                      Status:{" "}
                      {request.status}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mt-6">

                      <button
                        disabled={
                          actionLoading
                        }
                        onClick={() =>
                          approveRequest(
                            request
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 py-3 rounded-xl font-bold"
                      >
                        ✅ Schválit
                      </button>

                      <button
                        disabled={
                          actionLoading
                        }
                        onClick={() =>
                          setRejectRequestData(
                            request
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 py-3 rounded-xl font-bold"
                      >
                        ❌ Zamítnout
                      </button>

                      <button
                        onClick={() =>
                          loadRequests()
                        }
                        className="bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold"
                      >
                        🔄 Skrýt
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

        {/* ====================================== */}
        {/* MODAL ZAMÍTNUTÍ */}
        {/* ====================================== */}

        {rejectRequestData && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">

            <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full">

              <h2 className="text-2xl font-black mb-4">
                ❌ Důvod zamítnutí
              </h2>

              <p className="text-gray-400 mb-4">
                Žádost:{" "}
                {rejectRequestData.request_id}
              </p>

              <textarea
                className="w-full h-32 bg-gray-800 rounded-2xl p-4 border border-gray-700 outline-none"
                placeholder="Napište důvod zamítnutí..."
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(
                    e.target.value
                  )
                }
              />

              <div className="flex gap-4 mt-5">

                <button
                  disabled={
                    actionLoading
                  }
                  onClick={
                    rejectRequest
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 py-3 rounded-xl font-bold"
                >
                  Potvrdit
                </button>

                <button
                  disabled={
                    actionLoading
                  }
                  onClick={() => {
                    setRejectRequestData(
                      null
                    );
                    setRejectReason("");
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 py-3 rounded-xl font-bold"
                >
                  Zrušit
                </button>

              </div>

            </div>

          </div>

        )}

        {/* ====================================== */}
        {/* POSLEDNÍCH 5 SCHVÁLENÝCH */}
        {/* ====================================== */}

        <section className="bg-gray-900 rounded-3xl p-6 shadow-xl mb-8">

          <h2 className="text-2xl font-black mb-5">
            🟢 Posledních 5 schválených žádostí
          </h2>

          {approvedRequests.length ===
          0 ? (

            <p className="text-gray-400">
              Zatím nejsou žádné schválené žádosti.
            </p>

          ) : (

            approvedRequests.map(
              (item, index) => (

                <div
                  key={
                    item.request_id ||
                    `approved-${item.officer_id}-${index}`
                  }
                  className="bg-gray-800 rounded-xl p-4 mb-3"
                >

                  <p>
                    📄{" "}
                    {item.request_id}
                  </p>

                  <p>
                    👤 {item.name}
                  </p>

                  <p>
                    🪪{" "}
                    {item.officer_id}
                  </p>

                  <p>
                    ⭐ {item.rank}
                  </p>

                  <p className="text-green-400 font-bold mt-2">
                    Approved
                  </p>

                  {item.approved_by && (
                    <p className="text-gray-400 text-sm mt-1">
                      Schválil:{" "}
                      {item.approved_by}
                    </p>
                  )}

                </div>

              )
            )

          )}

        </section>

        {/* ====================================== */}
        {/* ZAMÍTNUTÉ */}
        {/* ====================================== */}

        <section className="bg-gray-900 rounded-3xl p-6 shadow-xl mb-8">

          <h2 className="text-2xl font-black mb-5">
            🔴 Zamítnuté žádosti
          </h2>

          {rejectedRequests.length ===
          0 ? (

            <p className="text-gray-400">
              Zatím nejsou žádné zamítnuté žádosti.
            </p>

          ) : (

            rejectedRequests.map(
              (item, index) => (

                <div
                  key={
                    item.request_id ||
                    `rejected-${item.officer_id}-${index}`
                  }
                  className="bg-gray-800 rounded-xl p-4 mb-3"
                >

                  <p>
                    📄{" "}
                    {item.request_id}
                  </p>

                  <p>
                    👤 {item.name}
                  </p>

                  <p>
                    🪪{" "}
                    {item.officer_id}
                  </p>

                  <p>
                    ⭐ {item.rank}
                  </p>

                  <p className="text-red-400 mt-2">
                    ❌ Status: Rejected
                  </p>

                  {item.reason && (
                    <p className="text-gray-300 mt-2">
                      <b>Důvod:</b>{" "}
                      {item.reason}
                    </p>
                  )}

                  {item.rejected_by && (
                    <p className="text-gray-500 text-sm mt-1">
                      Zamítl:{" "}
                      {item.rejected_by}
                    </p>
                  )}

                </div>

              )
            )

          )}

        </section>

        {/* ====================================== */}
        {/* AKTIVNÍ ÚČTY */}
        {/* ====================================== */}

        <section className="bg-gray-900 rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-black mb-5">
            👮 Aktivní policejní účty
          </h2>

          {accountsLoading ? (

            <p className="text-gray-400">
              Načítání účtů...
            </p>

          ) : officerAccounts.length ===
            0 ? (

            <p className="text-gray-400">
              Žádné aktivní účty.
            </p>

          ) : (

            officerAccounts.map(
              (account) => (

                <div
                  key={account.id}
                  className="bg-gray-800 rounded-xl p-4 mb-4"
                >

                  <p>
                    👤{" "}
                    <b>Jméno:</b>{" "}
                    {account.name}
                  </p>

                  <p>
                    🪪{" "}
                    <b>Číslo odznaku:</b>{" "}
                    {account.officer_id}
                  </p>

                  <p>
                    ⭐{" "}
                    <b>Hodnost:</b>{" "}
                    {account.rank}
                  </p>

                  <p>
                    💬{" "}
                    <b>Discord:</b>{" "}
                    {account.discord}
                  </p>

                  <div className="mt-3">

                    <p>
                      🔑{" "}
                      <b>Heslo:</b>{" "}

                      {showPassword ===
                      account.id ? (

                        <span className="text-green-400">
                          {
                            account.password
                          }
                        </span>

                      ) : (

                        <span>
                          ••••••
                        </span>

                      )}

                      <button
                        onClick={() =>
                          setShowPassword(
                            showPassword ===
                            account.id
                              ? null
                              : account.id
                          )
                        }
                        className="ml-3 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg"
                      >
                        👁️
                      </button>

                    </p>

                  </div>

                  <p className="text-green-400 font-bold mt-3">
                    {account.status}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        openEditAccount(
                          account
                        )
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold"
                    >
                      ✏️ Upravit
                    </button>

                    <button
                      onClick={() =>
                        deleteAccount(
                          account
                        )
                      }
                      className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold"
                    >
                      🗑️ Smazat
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </section>

        {/* ====================================== */}
        {/* EDITACE ÚČTU */}
        {/* ====================================== */}

        {editAccount && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">

            <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full">

              <h2 className="text-2xl font-black mb-5">
                ✏️ Upravit důstojníka
              </h2>

              <label className="block mb-2">
                Hodnost
              </label>

              <select
                value={editRank}
                onChange={(e) =>
                  setEditRank(
                    e.target.value
                  )
                }
                className="w-full bg-gray-800 p-3 rounded-xl mb-5"
              >

                {ranks.map(
                  (rank) => (
                    <option
                      key={rank}
                      value={rank}
                    >
                      {rank}
                    </option>
                  )
                )}

              </select>

              <label className="block mb-2">
                Číslo odznaku
              </label>

              <input
                value={editOfficerId}
                onChange={(e) =>
                  setEditOfficerId(
                    e.target.value
                  )
                }
                className="w-full bg-gray-800 p-3 rounded-xl mb-5 outline-none"
              />

              <div className="flex gap-3">

                <button
                  onClick={
                    updateAccount
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold"
                >
                  Uložit
                </button>

                <button
                  onClick={() =>
                    setEditAccount(null)
                  }
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold"
                >
                  Zrušit
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}