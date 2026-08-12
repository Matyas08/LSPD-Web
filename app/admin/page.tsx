"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Admin() {


  const router = useRouter();



  const [requests, setRequests] = useState<any[]>([]);

  const [approvedRequests, setApprovedRequests] = useState<any[]>([]);

  const [rejectedRequests, setRejectedRequests] = useState<any[]>([]);

  const [officerAccounts, setOfficerAccounts] = useState<any[]>([]);



  const [adminUser, setAdminUser] = useState<any>(null);



  const [rejectId, setRejectId] = useState<number | null>(null);

  const [rejectReason, setRejectReason] = useState("");



  // EDITACE ÚČTU

  const [editAccount, setEditAccount] = useState<any>(null);

  const [editRank, setEditRank] = useState("");

  const [editOfficerId, setEditOfficerId] = useState("");



  // ZOBRAZENÍ HESLA

  const [showPassword, setShowPassword] = useState<number | null>(null);




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

    "Police Officer II"

  ];





  useEffect(() => {


    const loggedIn =
      localStorage.getItem("adminLoggedIn");



    if(loggedIn !== "true"){

      router.push("/admin-login");

      return;

    }





    const user = JSON.parse(

      localStorage.getItem("adminUser") || "null"

    );



    setAdminUser(user);






    setRequests(

      JSON.parse(

        localStorage.getItem("officerRequests") || "[]"

      )

    );





    setApprovedRequests(

      JSON.parse(

        localStorage.getItem("approvedRequests") || "[]"

      )

    );





    setRejectedRequests(

      JSON.parse(

        localStorage.getItem("rejectedRequests") || "[]"

      )

    );





    setOfficerAccounts(

      JSON.parse(

        localStorage.getItem("officerAccounts") || "[]"

      )

    );



  }, [router]);






  function logout(){


    localStorage.removeItem("adminLoggedIn");

    localStorage.removeItem("adminUser");


    router.push("/");


  }






  function deleteRequest(id:number){


    if(!confirm("Opravdu chcete smazat tuto žádost?"))

      return;



    const updated = requests.filter(

      item => item.id !== id

    );



    setRequests(updated);



    localStorage.setItem(

      "officerRequests",

      JSON.stringify(updated)

    );


  }






  function deleteApproved(id:number){


    if(!confirm("Opravdu chcete smazat záznam?"))

      return;



    const updated = approvedRequests.filter(

      item => item.id !== id

    );



    setApprovedRequests(updated);



    localStorage.setItem(

      "approvedRequests",

      JSON.stringify(updated)

    );


  }






  function deleteRejected(id:number){


    if(!confirm("Opravdu chcete smazat záznam?"))

      return;



    const updated = rejectedRequests.filter(

      item => item.id !== id

    );



    setRejectedRequests(updated);



    localStorage.setItem(

      "rejectedRequests",

      JSON.stringify(updated)

    );


  }
  



  function deleteAccount(id:number){


    if(!confirm("Opravdu chcete odstranit účet?"))

      return;



    const updated = officerAccounts.filter(

      item => item.id !== id

    );



    setOfficerAccounts(updated);



    localStorage.setItem(

      "officerAccounts",

      JSON.stringify(updated)

    );


  }






  function openEditAccount(account:any){


    setEditAccount(account);

    setEditRank(account.rank);

    setEditOfficerId(account.officerId);


  }






  function updateAccount(){


    if(!editAccount) return;



    const updated = officerAccounts.map(

      (account)=>


        account.id === editAccount.id

        ?

        {

          ...account,

          rank: editRank,

          officerId: editOfficerId

        }

        :

        account


    );




    setOfficerAccounts(updated);



    localStorage.setItem(

      "officerAccounts",

      JSON.stringify(updated)

    );



    setEditAccount(null);



    alert(

      "Účet byl upraven."

    );


  }








  function approveRequest(id:number){


    const request = requests.find(

      item => item.id === id

    );



    if(!request) return;







    const account = {


      ...request,



      // Přihlášení přes číslo odznaku

      username: request.officerId,



      // Heslo vytvořené při registraci

      password: request.password,



      status:"Active",



      createdAt:

        new Date().toLocaleString("cs-CZ")


    };







    const accounts = [


      ...officerAccounts,


      account


    ];



    setOfficerAccounts(accounts);



    localStorage.setItem(

      "officerAccounts",

      JSON.stringify(accounts)

    );









    const approved = [


      ...approvedRequests,


      {


        ...request,


        status:"Approved",



        approvedAt:


          new Date().toLocaleString("cs-CZ"),



        approvedBy:


          adminUser?.username || "Unknown"


      }


    ];





    setApprovedRequests(approved);



    localStorage.setItem(

      "approvedRequests",

      JSON.stringify(approved)

    );









    const updated = requests.filter(

      item => item.id !== id

    );



    setRequests(updated);



    localStorage.setItem(

      "officerRequests",

      JSON.stringify(updated)

    );








    alert(

      `Účet vytvořen\n\nLogin: ${account.username}\nHeslo: ${account.password}`

    );


  }









  function rejectRequest(){



    if(!rejectId || !rejectReason){


      alert(

        "Vyplňte důvod zamítnutí."

      );


      return;


    }






    const request = requests.find(

      item => item.id === rejectId

    );



    if(!request) return;







    const rejected = [



      ...rejectedRequests,



      {



        ...request,



        status:"Rejected",



        reason:rejectReason,



        rejectedAt:


          new Date().toLocaleString("cs-CZ"),



        rejectedBy:


          adminUser?.username || "Unknown"


      }


    ];







    setRejectedRequests(rejected);



    localStorage.setItem(

      "rejectedRequests",

      JSON.stringify(rejected)

    );







    const updated = requests.filter(

      item => item.id !== rejectId

    );



    setRequests(updated);



    localStorage.setItem(

      "officerRequests",

      JSON.stringify(updated)

    );







    setRejectId(null);

    setRejectReason("");



    alert(

      "Žádost byla zamítnuta."

    );


  }




return (


<main className="
  min-h-screen
  bg-gradient-to-br
  from-black
  via-gray-950
  to-red-950
  text-white
  p-6
">


<div className="
  max-w-7xl
  mx-auto
">



<div className="
  flex
  justify-between
  items-center
  mb-8
">


<div>

<h1 className="
  text-4xl
  font-black
">

LSPD Administration Portal

</h1>


<p className="
 text-gray-400
 mt-2
">

Správa policejních účtů a žádostí

</p>


</div>





<button

onClick={logout}

className="
bg-red-600
hover:bg-red-700
px-6
py-3
rounded-2xl
font-bold
"

>

Odhlásit

</button>



</div>







<section className="
bg-gray-900
rounded-3xl
p-6
shadow-xl
mb-8
">


<h2 className="
text-2xl
font-black
mb-6
">

🟡 Čekající žádosti

</h2>






{
requests.length === 0 ? (


<p className="text-gray-400">

Žádné čekající žádosti.

</p>



) : (



<div className="space-y-5">



{
requests.map((request)=>(



<div

key={request.id}

className="
bg-gray-800
rounded-2xl
p-6
border
border-gray-700
"

>


<h3 className="
text-xl
font-bold
mb-4
">

📄 {request.requestId}

</h3>




<p>
👤 <b>Jméno:</b> {request.name}
</p>


<p>
🪪 <b>Číslo odznaku:</b> {request.officerId}
</p>


<p>
⭐ <b>Hodnost:</b> {request.rank}
</p>


<p>
💬 <b>Discord:</b> {request.discord}
</p>


<p>
📅 <b>Datum:</b> {request.createdAt}
</p>



<p className="
text-yellow-400
font-bold
mt-3
">

Status: {request.status}

</p>







<div className="
grid
grid-cols-3
gap-3
mt-6
">



<button

onClick={()=>approveRequest(request.id)}

className="
bg-green-600
hover:bg-green-700
py-3
rounded-xl
font-bold
"

>

✅ Schválit

</button>





<button

onClick={()=>setRejectId(request.id)}

className="
bg-red-600
hover:bg-red-700
py-3
rounded-xl
font-bold
"

>

❌ Zamítnout

</button>





<button

onClick={()=>deleteRequest(request.id)}

className="
bg-gray-700
hover:bg-gray-600
py-3
rounded-xl
font-bold
"

>

🗑️ Smazat

</button>




</div>




</div>



))


}



</div>


)


}



</section>







{
rejectId && (


<div className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
p-6
">


<div className="
bg-gray-900
rounded-3xl
p-8
max-w-md
w-full
">


<h2 className="
text-2xl
font-black
mb-4
">

❌ Důvod zamítnutí

</h2>




<textarea

className="
w-full
h-32
bg-gray-800
rounded-2xl
p-4
border
border-gray-700
outline-none
"

placeholder="Napište důvod zamítnutí..."

value={rejectReason}

onChange={(e)=>setRejectReason(e.target.value)}

/>





<div className="
flex
gap-4
mt-5
">


<button

onClick={rejectRequest}

className="
flex-1
bg-red-600
py-3
rounded-xl
font-bold
"

>

Potvrdit

</button>





<button

onClick={()=>{

setRejectId(null);

setRejectReason("");

}}

className="
flex-1
bg-gray-700
py-3
rounded-xl
font-bold
"

>

Zrušit

</button>



</div>



</div>


</div>


)

}






<section className="
bg-gray-900
rounded-3xl
p-6
shadow-xl
mb-8
">


<h2 className="
text-2xl
font-black
mb-5
">

🟢 Posledních 5 schválených žádostí

</h2>





{
approvedRequests
.slice(-5)
.reverse()
.map((item)=>(



<div

key={item.id}

className="
bg-gray-800
rounded-xl
p-4
mb-3
"

>


<p>
📄 {item.requestId}
</p>


<p>
👤 {item.name}
</p>


<p>
⭐ {item.rank}
</p>


<p className="
text-green-400
font-bold
">

Approved

</p>




<button

onClick={()=>deleteApproved(item.id)}

className="
mt-3
bg-gray-700
hover:bg-gray-600
px-4
py-2
rounded-xl
font-bold
"

>

🗑️ Smazat

</button>



</div>



))


}




</section>









<section className="
bg-gray-900
rounded-3xl
p-6
shadow-xl
mb-8
">



<h2 className="
text-2xl
font-black
mb-5
">

🔴 Zamítnuté žádosti

</h2>







{
rejectedRequests
.slice()
.reverse()
.map((item)=>(



<div

key={item.id}

className="
bg-gray-800
rounded-xl
p-4
mb-3
"

>



<p>
📄 {item.requestId}
</p>


<p>
👤 {item.name}
</p>


<p>
⭐ {item.rank}
</p>




<p className="
text-red-400
mt-2
">

Důvod:
{" "}
{item.reason}

</p>





<button

onClick={()=>deleteRejected(item.id)}

className="
mt-3
bg-gray-700
hover:bg-gray-600
px-4
py-2
rounded-xl
font-bold
"

>

🗑️ Smazat

</button>



</div>


))


}




</section>









<section className="
bg-gray-900
rounded-3xl
p-6
shadow-xl
">


<h2 className="
text-2xl
font-black
mb-5
">

👮 Aktivní policejní účty

</h2>








{
officerAccounts.map((account)=>(



<div

key={account.id}

className="
bg-gray-800
rounded-xl
p-4
mb-4
"

>


<p>
👤 <b>Jméno:</b> {account.name}
</p>



<p>
🪪 <b>Číslo odznaku:</b> {account.officerId}
</p>




<p>
⭐ <b>Hodnost:</b> {account.rank}
</p>




<p>
💬 <b>Discord:</b> {account.discord}
</p>






<div className="mt-3">

<p>
🔑 <b>Heslo:</b>
{" "}


{
showPassword === account.id

?

<span className="text-green-400">

{account.password}

</span>


:

<span>

••••••

</span>


}



<button

onClick={()=>


setShowPassword(

showPassword === account.id

?

null

:

account.id


)

}

className="
ml-3
bg-gray-700
px-3
py-1
rounded-lg
"

>

👁️

</button>


</p>


</div>






<p className="
text-green-400
font-bold
mt-3
">

Active

</p>






<div className="
flex
gap-3
mt-4
">





<button

onClick={()=>openEditAccount(account)}

className="
flex-1
bg-blue-600
hover:bg-blue-700
py-3
rounded-xl
font-bold
"

>

✏️ Upravit

</button>







<button

onClick={()=>deleteAccount(account.id)}

className="
flex-1
bg-red-600
hover:bg-red-700
py-3
rounded-xl
font-bold
"

>

🗑️ Smazat

</button>





</div>



</div>



))


}




</section>









{
editAccount && (


<div className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
p-6
">


<div className="
bg-gray-900
rounded-3xl
p-8
max-w-md
w-full
">


<h2 className="
text-2xl
font-black
mb-5
">

✏️ Upravit důstojníka

</h2>





<label>

Hodnost

</label>



<select

value={editRank}

onChange={(e)=>setEditRank(e.target.value)}

className="
w-full
bg-gray-800
p-3
rounded-xl
mb-5
"

>


{
ranks.map(rank=>(


<option key={rank}>

{rank}

</option>


))

}



</select>







<label>

Číslo odznaku

</label>




<input

value={editOfficerId}

onChange={(e)=>setEditOfficerId(e.target.value)}

className="
w-full
bg-gray-800
p-3
rounded-xl
mb-5
"

/>







<div className="
flex
gap-3
">



<button

onClick={updateAccount}

className="
flex-1
bg-green-600
py-3
rounded-xl
font-bold
"

>

Uložit

</button>






<button

onClick={()=>setEditAccount(null)}

className="
flex-1
bg-gray-700
py-3
rounded-xl
font-bold
"

>

Zrušit

</button>



</div>





</div>


</div>



)


}







</div>


</main>


);


}