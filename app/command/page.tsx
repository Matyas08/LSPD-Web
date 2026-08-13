export default function Command() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Navigace */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <div className="flex items-center gap-4">

          <img
            src="https://f1878fbdde.cbaul-cdnwnd.com/be3ea2aecb372dfda9f983de98d525f5/200000003-b062db062f/700/Sn%C3%ADmek%20obrazovky%202024-10-04%20231128%281%29.webp?ph=f1878fbdde"
            className="w-20 h-20 object-contain"
            alt="LSPD Logo"
          />

          <h1 className="text-2xl font-bold">
            Los Santos Police Department
          </h1>

        </div>


        <div className="space-x-6">

          <a
            href="/"
            className="hover:text-blue-400"
          >
            Domov
          </a>

          <a
            href="/divisions"
            className="hover:text-blue-400"
          >
            Divize
          </a>

          <a
            href="/command"
            className="hover:text-blue-400"
          >
            Vedení
          </a>

          <a
            href="/officer-login"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Přihlášení důstojníka
          </a>

        </div>

      </nav>


      {/* Nadpis */}
      <section className="px-10 py-16">

        <h2 className="text-5xl font-bold text-center">
          Vedení sboru
        </h2>

      </section>


      {/* Výpis vedení */}
      <section className="px-10 pb-20">

        <div className="max-w-5xl mx-auto space-y-8">


          {/* CHIEF OF POLICE */}
          <OfficerCard
            rank="Chief of Police"
            name="Jacob William Benning"
            image="/images/benning.png"
          />


          {/* FIRST ASSISTANT CHIEF */}
          <OfficerCard
            rank="First Assistant Chief of Police"
            name="Weston Troy Lopez"
            image="/images/Lopez.png"
          />


          {/* ASSISTANT CHIEF */}
          <OfficerCard
            rank="Assistant Chief of Police"
            name="John Williams"
            image="/images/john-williams.png"
          />


          {/* DEPUTY CHIEF - BRADFORD */}
          <OfficerCard
            rank="Deputy Chief of Police"
            name="David Bradford"
            image="/images/david-bradford.png"
          />


          {/* DEPUTY CHIEF - WILLIS */}
          <OfficerCard
            rank="Deputy Chief of Police"
            name="Henry Willis"
            image="/images/wilis.png"
          />


        </div>

      </section>

    </main>
  );
}


function OfficerCard({
  rank,
  name,
  image
}: {
  rank: string;
  name: string;
  image: string;
}) {

  return (

    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-8 items-center">


      {/* Fotografie */}
      <div className="w-full md:w-72 h-80 bg-gray-700 border-4 border-gray-600 rounded-lg overflow-hidden">

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
        />

      </div>


      {/* Informace */}
      <div className="flex-1">

        <h3 className="text-3xl font-bold">
          {rank}
        </h3>

        <h4 className="text-2xl text-gray-300 mt-3">
          {name}
        </h4>


        <div className="mt-8 bg-gray-800 p-5 rounded-lg">

          <p className="text-gray-400">
            Zde bude připravený prostor pro informace o tomto členovi vedení.
            Může zde být historie služby, ocenění, zkušenosti nebo další informace.
          </p>

        </div>

      </div>

    </div>

  );
}