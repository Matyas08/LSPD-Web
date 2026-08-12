"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OfficerPortal() {

  const router = useRouter();

  const fileInput = useRef<HTMLInputElement>(null);

  const [officer, setOfficer] = useState<any>(null);


  useEffect(() => {

    const loggedInOfficer = localStorage.getItem("officerLoggedIn");


    if (!loggedInOfficer) {

      router.push("/officer-login");

      return;

    }


    setOfficer(JSON.parse(loggedInOfficer));


  }, [router]);



  function logout() {

    localStorage.removeItem("officerLoggedIn");

    window.location.href = "http://localhost:3000/";

  }



function uploadPhoto(e: any) {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    const updatedOfficer = {
      ...officer,
      photo: reader.result
    };

    // Uložení přihlášeného uživatele
    localStorage.setItem(
      "officerLoggedIn",
      JSON.stringify(updatedOfficer)
    );

    // Načtení všech účtů
    const accounts = JSON.parse(
      localStorage.getItem("officerAccounts") || "[]"
    );

    // Aktualizace účtu přihlášeného policisty
    const updatedAccounts = accounts.map((account: any) => {
      if (
        account.username === updatedOfficer.username &&
        account.officerId === updatedOfficer.officerId
      ) {
        return updatedOfficer;
      }

      return account;
    });

    // Uložení zpět
    localStorage.setItem(
      "officerAccounts",
      JSON.stringify(updatedAccounts)
    );

    // Aktualizace stránky
    setOfficer(updatedOfficer);

  };

  reader.readAsDataURL(file);

}



  return (

    <main className="min-h-screen bg-gray-950 text-white p-10">


      <div className="max-w-5xl mx-auto">


        <div className="bg-gray-900 p-8 rounded-xl mb-8">


          <div className="flex items-center gap-8">


            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              className="hidden"
            />



            <img

              onClick={() => fileInput.current?.click()}

              src={
                officer?.photo ||
                "https://www.supersoused.cz/bundles/ineedtemplate/images/avatar-customer.png"
              }

              className="w-36 h-36 rounded-full object-cover cursor-pointer"

            />



            <h1 className="text-5xl font-bold">
              Los Santos Police Intranet
            </h1>


          </div>





          {officer && (


            <div className="mt-8 bg-gray-800 p-8 rounded-xl">


              <h2 className="text-3xl font-bold mb-6">
                Osobní údaje
              </h2>



              <div className="space-y-4 text-xl">


                <p>
                  <b>Jméno:</b> {officer.name}
                </p>


                <p>
                  <b>ID Policisty:</b> {officer.officerId}
                </p>


                <p>
                  <b>Hodnost:</b> {officer.rank}
                </p>


                <p>
                  <b>Discord:</b> {officer.discord}
                </p>


              </div>


            </div>


          )}






          <button

            onClick={logout}

            className="mt-8 bg-red-600 px-6 py-3 rounded text-lg"

          >

            Odhlásit se

          </button>



        </div>






        <div className="grid md:grid-cols-3 gap-5">


          <div className="bg-gray-900 p-6 rounded-xl">

            <h2 className="text-xl font-bold">
              📄 Dokumenty
            </h2>

          </div>



          <div className="bg-gray-900 p-6 rounded-xl">

            <h2 className="text-xl font-bold">
              📋 SOP
            </h2>

          </div>



          <div className="bg-gray-900 p-6 rounded-xl">

            <h2 className="text-xl font-bold">
              📝 Formuláře
            </h2>

          </div>


        </div>



      </div>


    </main>

  );

}