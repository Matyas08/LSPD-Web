"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OfficerLogin() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  function login() {

    const accounts = JSON.parse(
      localStorage.getItem("officerAccounts") || "[]"
    );


    const account = accounts.find(
      (user:any) =>
        user.username === username &&
        user.password === password
    );


    if(account) {

      localStorage.setItem(
        "officerLoggedIn",
        JSON.stringify(account)
      );


      router.push("/officer-portal");


    } else {

      alert("Nesprávné přihlašovací údaje");

    }

  }




  return (

    <main className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-gray-950
      to-blue-950
      flex
      items-center
      justify-center
      p-6
      text-white
    ">



      <div className="
        w-full
        max-w-md
        bg-gray-900/90
        backdrop-blur-xl
        border
        border-gray-800
        rounded-3xl
        p-8
        shadow-2xl
      ">




        <div className="
          text-center
          mb-8
        ">



          <div className="
            flex
            justify-center
            mb-5
          ">



            <Image

              src="/images/badge.png"

              alt="Police Badge"

              width={150}

              height={150}

              className="
                object-contain
                drop-shadow-xl
              "

            />



          </div>






          <h1 className="
            text-4xl
            font-black
            tracking-tight
          ">

            Officer Portal

          </h1>




          <p className="
            text-gray-400
            mt-3
          ">

            Los Santos Police Department

          </p>



        </div>







        <label className="
          text-sm
          text-gray-400
          ml-2
        ">

          Username

        </label>



        <input

          className="
            w-full
            mt-2
            mb-5
            p-4
            bg-gray-800
            border
            border-gray-700
            rounded-2xl
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/30
            transition-all
          "

          placeholder="Uživatelské jméno"

          value={username}

          onChange={(e) =>
            setUsername(e.target.value)
          }

        />








        <label className="
          text-sm
          text-gray-400
          ml-2
        ">

          Password

        </label>




        <input

          className="
            w-full
            mt-2
            mb-6
            p-4
            bg-gray-800
            border
            border-gray-700
            rounded-2xl
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/30
            transition-all
          "

          placeholder="Heslo"

          type="password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

        />








        <button

          onClick={login}

          className="
            w-full
            py-4
            rounded-2xl
            bg-blue-600
            hover:bg-blue-700
            transition-all
            duration-200
            hover:scale-105
            active:scale-95
            shadow-xl
            hover:shadow-blue-500/40
            font-black
            text-lg
          "

        >

          🔐 Přihlásit se

        </button>








        <div className="
          mt-8
          grid
          grid-cols-2
          gap-4
        ">



          <a

            href="/register"

            className="
              bg-emerald-700/80
              hover:bg-emerald-600
              text-white
              py-3
              rounded-2xl
              text-center
              font-bold
              transition-all
              duration-200
              hover:scale-105
              shadow-lg
            "

          >

            📝 Registrace

          </a>








          <a

            href="/admin-login"

            className="
              bg-red-800/80
              hover:bg-red-700
              text-white
              py-3
              rounded-2xl
              text-center
              font-bold
              transition-all
              duration-200
              hover:scale-105
              shadow-lg
            "

          >

            🛡️ Admin Login

          </a>





        </div>





      </div>



    </main>

  );

}