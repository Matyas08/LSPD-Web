export default function Command() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* ========================================= */}
      {/* NAVIGACE */}
      {/* ========================================= */}

      <nav
        className="
          relative
          z-30
          flex
          justify-between
          items-center
          px-6
          md:px-10
          py-5
          border-b
          border-blue-900/40
          bg-gradient-to-r
          from-black
          via-gray-950
          to-blue-950/40
        "
      >

        {/* LOGO */}

        <div className="flex items-center gap-4">

          <img
            src="/images/badge.png"
            className="w-16 h-16 object-contain"
            alt="LSPD Logo"
          />

          <div className="hidden sm:block">

            <h1 className="text-xl md:text-2xl font-bold">
              Los Santos Police Department
            </h1>

            <p className="text-xs text-blue-400 uppercase tracking-widest mt-1">
              To Protect and To Serve
            </p>

          </div>

        </div>


        {/* ODKAZY */}

        <div className="flex items-center gap-1 md:gap-5 text-sm md:text-base">

          <a
            href="/"
            className="
              px-3
              py-2
              rounded-lg
              hover:bg-blue-900/30
              hover:text-blue-400
              transition
            "
          >
            Domov
          </a>
          <a
  href="/news"
  className="hover:text-blue-400"
>
  Novinky
</a>

          <a
            href="/divisions"
            className="
              px-3
              py-2
              rounded-lg
              hover:bg-blue-900/30
              hover:text-blue-400
              transition
            "
          >
            Divize
          </a>

          <a
            href="/command"
            className="
              px-3
              py-2
              rounded-lg
              bg-blue-900/30
              text-blue-400
              transition
            "
          >
            Vedení
          </a>

          <a
            href="/officer-login"
            className="
              bg-blue-600
              hover:bg-blue-500
              px-4
              py-2
              rounded-lg
              font-semibold
              transition
              shadow-lg
              shadow-blue-950/40
            "
          >
            Přihlášení
          </a>

        </div>

      </nav>


      {/* ========================================= */}
      {/* HLAVIČKA */}
      {/* ========================================= */}

      <section
        className="
          relative
          py-28
          px-6
          text-center
          overflow-hidden
          bg-gradient-to-b
          from-blue-950/40
          via-gray-950
          to-gray-950
        "
      >

        {/* Modré světlo */}

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[300px]
            bg-blue-600/10
            blur-3xl
            rounded-full
          "
        />


        <div className="relative z-10 max-w-4xl mx-auto">

          <p
            className="
              text-blue-400
              uppercase
              tracking-[0.4em]
              font-bold
              text-sm
              mb-5
            "
          >
            Los Santos Police Department
          </p>


          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              tracking-tight
            "
          >
            Vedení sboru
          </h2>


          <p
            className="
              text-gray-400
              text-lg
              md:text-xl
              mt-6
              max-w-2xl
              mx-auto
            "
          >
            Velitelé a vedoucí představitelé
            Los Santos Police Department
          </p>

        </div>


        {/* Spodní přechod */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-32
            bg-gradient-to-t
            from-gray-950
            to-transparent
          "
        />

      </section>


      {/* ========================================= */}
      {/* MODRÁ LINKA */}
      {/* ========================================= */}

      <div
        className="
          h-px
          max-w-6xl
          mx-auto
          bg-gradient-to-r
          from-transparent
          via-blue-600
          to-transparent
        "
      />


      {/* ========================================= */}
      {/* VEDENÍ */}
      {/* ========================================= */}

      <section
        className="
          relative
          px-6
          md:px-10
          py-24
          bg-gradient-to-b
          from-gray-950
          via-blue-950/10
          to-gray-950
        "
      >

        <div className="max-w-5xl mx-auto space-y-8">

          {/* CHIEF */}

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


      {/* ========================================= */}
      {/* SPODNÍ SEKCE */}
      {/* ========================================= */}

      <section
        className="
          relative
          py-24
          px-6
          text-center
          bg-gradient-to-b
          from-gray-950
          via-blue-950/30
          to-black
        "
      >

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-blue-500
            to-transparent
          "
        />


        <div className="max-w-3xl mx-auto">

          <p
            className="
              text-blue-400
              uppercase
              tracking-[0.3em]
              text-sm
              font-bold
              mb-4
            "
          >
            Command Staff
          </p>


          <h2
            className="
              text-3xl
              md:text-4xl
              font-black
            "
          >
            Vedení, které vede příkladem.
          </h2>


          <p
            className="
              text-gray-400
              mt-5
              leading-relaxed
            "
          >
            Vedení Los Santos Police Department zajišťuje
            chod sboru, strategické rozhodování a dohled
            nad jednotlivými složkami policejního oddělení.
          </p>

        </div>

      </section>


      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}

      <footer
        className="
          border-t
          border-blue-900/40
          bg-black
          py-8
          text-center
        "
      >

        <p className="text-gray-500">
          Los Santos Police Department
        </p>

        <p className="text-gray-600 text-sm mt-2">
          To Protect and To Serve
        </p>

      </footer>

    </main>
  );
}


/* ========================================= */
/* OFFICER CARD */
/* ========================================= */

function OfficerCard({
  rank,
  name,
  image,
}: {
  rank: string;
  name: string;
  image: string;
}) {

  return (

    <div
      className="
        group
        relative
        overflow-hidden
        bg-gray-900/80
        rounded-2xl
        border
        border-gray-800
        p-6
        md:p-8
        flex
        flex-col
        md:flex-row
        gap-8
        items-center
        hover:border-blue-600
        hover:bg-blue-950/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-blue-950/40
      "
    >

      {/* Horní modrá linka */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-1
          bg-gradient-to-r
          from-blue-900
          via-blue-500
          to-blue-900
          opacity-60
          group-hover:opacity-100
          transition
        "
      />


      {/* FOTO */}

      <div
        className="
          w-full
          md:w-72
          h-80
          bg-black/40
          border-4
          border-gray-700
          group-hover:border-blue-600
          rounded-xl
          overflow-hidden
          transition-all
          duration-300
          shrink-0
        "
      >

        <img
          src={image}
          alt={name}
          className="
            w-full
            h-full
            object-cover
            object-top
            group-hover:scale-105
            transition-transform
            duration-500
          "
        />

      </div>


      {/* INFORMACE */}

      <div className="flex-1 w-full">



        <h3
          className="
            text-3xl
            md:text-4xl
            font-black
            group-hover:text-blue-400
            transition
          "
        >
          {rank}
        </h3>


        <h4
          className="
            text-2xl
            text-gray-300
            mt-3
          "
        >
          {name}
        </h4>


        {/* INFO BOX */}

        <div
          className="
            mt-8
            bg-gray-950/70
            border
            border-gray-800
            group-hover:border-blue-900/60
            p-5
            rounded-xl
            transition
          "
        >

          <p className="text-gray-400 leading-relaxed">
            Zde bude připravený prostor pro informace
            o tomto členovi vedení. Může zde být historie
            služby, ocenění, zkušenosti nebo další informace.
          </p>

        </div>

      </div>

    </div>

  );
}