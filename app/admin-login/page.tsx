"use client";

import { useState } from "react";

export default function AdminLogin() {


  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);




  const accounts = [

    {
      username: "admin",
      password: "pd",
      role: "Administrator"
    },


    {
      username: "Executive",
      password: "execut1ve",
      role: "Command Staff"
    }

  ];







  function login(){



    const account = accounts.find(

      (acc)=>

        acc.username === username &&

        acc.password === password

    );






    if(account){



      localStorage.setItem(

        "adminLoggedIn",

        "true"

      );





      localStorage.setItem(

        "adminUser",

        JSON.stringify(account)

      );






      window.location.href="/admin";



    }

    else{


      setError(

        "❌ Nesprávné uživatelské jméno nebo heslo."

      );


    }


  }







  return (


    <main className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-gray-950
      to-red-950
      flex
      items-center
      justify-center
      p-6
      text-white
    ">



      <div className="
        w-full
        max-w-md
        bg-gray-900
        rounded-3xl
        p-8
        shadow-2xl
        border
        border-gray-800
      ">




        <h1 className="
          text-3xl
          font-black
          text-center
          mb-2
        ">

          LSPD Admin Login

        </h1>




        <p className="
          text-center
          text-gray-400
          mb-8
        ">

          Administrátorský přístup

        </p>








        <label className="
          font-bold
          block
          mb-2
        ">

          Uživatelské jméno

        </label>




        <input


          className="
            w-full
            bg-gray-800
            p-3
            rounded-xl
            mb-5
            outline-none
            border
            border-gray-700
            focus:border-red-600
          "


          placeholder="Zadejte uživatelské jméno"


          value={username}


          onChange={(e)=>
            setUsername(e.target.value)
          }


        />









        <label className="
          font-bold
          block
          mb-2
        ">

          Heslo

        </label>






        <div className="
          relative
        ">



          <input


            className="
              w-full
              bg-gray-800
              p-3
              rounded-xl
              pr-12
              outline-none
              border
              border-gray-700
              focus:border-red-600
            "


            placeholder="Zadejte heslo"


            type={
              showPassword
              ?
              "text"
              :
              "password"
            }


            value={password}


            onChange={(e)=>
              setPassword(e.target.value)
            }


          />




          <button

            type="button"

            onClick={()=>
              setShowPassword(!showPassword)
            }


            className="
              absolute
              right-3
              top-3
              text-gray-400
            "

          >

            {showPassword ? "🙈" : "👁️"}

          </button>




        </div>









        <button


          onClick={login}


          className="
            w-full
            mt-6
            bg-red-600
            hover:bg-red-700
            py-3
            rounded-xl
            font-black
            transition
            duration-200
          "


        >

          🔐 Přihlásit se


        </button>







        {error && (


          <p className="
            text-red-400
            text-center
            mt-5
            font-bold
          ">


            {error}


          </p>


        )}






      </div>



    </main>


  );


}