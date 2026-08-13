export default function Home() {
  return (
    <main>

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


      {/* Úvod */}
      <section className="text-center py-40">

        <h2 className="text-6xl font-bold mb-6">
          Los Santos Police Department
        </h2>

        <p className="text-3xl italic text-gray-300">
          "To Protect and To Serve"
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfHjjMiVgWszcvmgb6NcI1THAaMMQyayVMR6CnBJavni3Fpog/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Přidej se k LSPD!
        </a>

      </section>


      {/* Vedení sboru */}
      <section className="px-10 py-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Vedení sboru
        </h2>


        {/* Vrchní vedení */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CHIEF - BENNING */}
          <OfficerCard
            rank="Chief of Police"
            name="Jacob William Benning"
            image="/images/benning.png"
          />


          {/* FIRST ASSISTANT CHIEF - LOPEZ */}
          <OfficerCard
            rank="First Assistant Chief of Police"
            name="Weston Troy Lopez"
            image="/images/Lopez.png"
          />


          {/* ASSISTANT CHIEF - WILLIAMS */}
          <OfficerCard
            rank="Assistant Chief of Police"
            name="John Williams"
            image="/images/john-williams.png"
          />

        </div>


        {/* Deputy Command */}
        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">

          {/* DCOP - BRADFORD */}
          <OfficerCard
            rank="Deputy Chief of Police"
            name="David Bradford"
            image="/images/david-bradford.png"
          />


          {/* DCOP - WILlIS */}
          <OfficerCard
            rank="Deputy Chief of Police"
            name="Henry Willis"
            image="/images/wilis.png"
          />


          {/* DEPUTY CHIEF - DETECTIVE BUREAU */}
          <OfficerCard
            rank="Deputy Chief of Detective Bureau"
            name="Michael Joseph Truman"
            image="/images/michael-truman.png"
          />

        </div>

      </section>

    </main>
  );
}


/* ========================================= */
/*             OFFICER CARD                 */
/* ========================================= */

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

    <div className="bg-gray-900 p-6 rounded-xl text-center border border-gray-800">

      <img
        src={image}
        alt={name}
        className="w-32 h-36 mx-auto mt-8 mb-5 rounded-full object-cover object-top border-4 border-gray-600"
      />

      <h3 className="text-xl font-bold">
        {rank}
      </h3>

      <p className="text-gray-400 mt-2">
        {name}
      </p>

    </div>

  );
}