import asdImage from "../images/asd2.png";

export default function Divisions() {
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
              bg-blue-900/30
              text-blue-400
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
              hover:bg-blue-900/30
              hover:text-blue-400
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
      {/* HLAVIČKA STRÁNKY */}
      {/* ========================================= */}

      <section className="
        relative
        py-28
        px-6
        text-center
        overflow-hidden
        bg-gradient-to-b
        from-blue-950/40
        via-gray-950
        to-gray-950
      ">

        {/* Modré světlo */}

        <div className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[300px]
          bg-blue-600/10
          blur-3xl
          rounded-full
        " />


        <div className="relative z-10 max-w-4xl mx-auto">

          <p className="
            text-blue-400
            uppercase
            tracking-[0.4em]
            font-bold
            text-sm
            mb-5
          ">
            Los Santos Police Department
          </p>

          <h2 className="
            text-5xl
            md:text-7xl
            font-black
            tracking-tight
          ">
            Divize
          </h2>

          <p className="
            text-gray-400
            text-lg
            md:text-xl
            mt-6
            max-w-2xl
            mx-auto
          ">
            Specializované jednotky a oddělení
            Los Santos Police Department
          </p>

        </div>


        {/* Spodní přechod */}

        <div className="
          absolute
          bottom-0
          left-0
          right-0
          h-32
          bg-gradient-to-t
          from-gray-950
          to-transparent
        " />

      </section>


      {/* ========================================= */}
      {/* MODRÁ LINKA */}
      {/* ========================================= */}

      <div className="
        h-px
        max-w-6xl
        mx-auto
        bg-gradient-to-r
        from-transparent
        via-blue-600
        to-transparent
      " />


      {/* ========================================= */}
      {/* DIVIZE */}
      {/* ========================================= */}

      <section className="
        relative
        px-6
        md:px-10
        py-24
        bg-gradient-to-b
        from-gray-950
        via-blue-950/10
        to-gray-950
      ">

        <div className="
          max-w-7xl
          mx-auto
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-7
        ">

          <DivisionCard
            name="Detective Bureau"
            description="Divize zaměřená na vyšetřování závažné trestné činnosti, práci s důkazy a vedení komplexních vyšetřování."
          />

          <DivisionCard
            name="Special Weapons and Tactics"
            description="Speciální taktická jednotka určená pro řešení vysoce rizikových situací, krizových událostí a taktických operací."
          />

          <DivisionCard
            name="Recruitment & Training Division"
            description="Zajišťuje nábor nových členů, jejich výcvik a přípravu budoucích policistů Los Santos Police Department."
          />

          <DivisionCard
            name="Gang and Narcotics Division"
            description="Jednotka zaměřená na boj proti gangům, organizovanému zločinu a drogové kriminalitě."
          />

          <DivisionCard
            name="Air Support Division"
            description="Poskytuje leteckou podporu, průzkum ze vzduchu a asistenci pozemním jednotkám při náročných operacích."
            image={asdImage.src}
          />

          <DivisionCard
            name="Traffic Enforcement Division"
            description="Zajišťuje dohled nad bezpečností silničního provozu, kontrolu dopravy a řešení dopravních přestupků."
          />

          <DivisionCard
            name="Canine Platoon"
            description="Jednotka služebních psů využívaná při pátrání, zadržování pachatelů a vyhledávání důkazů."
          />

        </div>

      </section>


      {/* ========================================= */}
      {/* SPODNÍ MODRÁ SEKCE */}
      {/* ========================================= */}

      <section className="
        relative
        py-24
        px-6
        text-center
        bg-gradient-to-b
        from-gray-950
        via-blue-950/30
        to-black
      ">

        <div className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500
          to-transparent
        " />

        <div className="max-w-3xl mx-auto">

          <p className="
            text-blue-400
            uppercase
            tracking-[0.3em]
            text-sm
            font-bold
            mb-4
          ">
            Los Santos Police Department
          </p>

          <h2 className="
            text-3xl
            md:text-4xl
            font-black
          ">
            Jednotně. Profesionálně. Připraveně.
          </h2>

          <p className="
            text-gray-400
            mt-5
            leading-relaxed
          ">
            Každá divize má svou specializaci, ale všechny
            mají společný cíl – chránit obyvatele Los Santos
            a poskytovat profesionální policejní službu.
          </p>

        </div>

      </section>


      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}

      <footer className="
        border-t
        border-blue-900/40
        bg-black
        py-8
        text-center
      ">

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
/* DIVISION CARD */
/* ========================================= */

function DivisionCard({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image?: string;
}) {

  return (

    <div className="
      group
      relative
      overflow-hidden
      bg-gray-900/80
      rounded-2xl
      border
      border-gray-800
      p-7
      hover:border-blue-600
      hover:bg-blue-950/20
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      hover:shadow-blue-950/40
    ">

      {/* Horní modrá linka */}

      <div className="
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
      " />


      {/* ASD OBRÁZEK */}

      {image && (

        <div className="
          w-full
          h-64
          rounded-xl
          mb-6
          overflow-hidden
          bg-black/30
          border
          border-gray-800
        ">

          <img
            src={image}
            className="
              w-full
              h-full
              object-contain
              scale-125
              group-hover:scale-135
              transition-transform
              duration-500
            "
            alt={name}
          />

        </div>

      )}


      <h3 className="
        text-2xl
        font-bold
        group-hover:text-blue-400
        transition
      ">
        {name}
      </h3>


      <p className="
        text-gray-400
        leading-relaxed
        mt-4
      ">
        {description}
      </p>


      <button
        className="
          mt-7
          bg-blue-600
          hover:bg-blue-500
          px-5
          py-2.5
          rounded-lg
          font-semibold
          transition
          shadow-lg
          shadow-blue-950/30
        "
      >
        Více informací
      </button>

    </div>

  );
}