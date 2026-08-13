
export default function News() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* ================================================= */}
      {/* NAVIGACE */}
      {/* ================================================= */}

      <nav className="
        flex
        justify-between
        items-center
        px-6
        md:px-10
        py-5
        bg-black/20
        backdrop-blur-sm
        border-b
        border-white/10
      ">

        {/* LOGO */}

        <div className="flex items-center gap-4">

          <img
            src="/images/badge.png"
            alt="LSPD Badge"
            className="w-16 h-16 object-contain"
          />

          <div className="hidden sm:block">

            <h1 className="text-lg md:text-xl font-bold">
              Los Santos Police Department
            </h1>

            <p className="text-xs text-blue-300 uppercase tracking-widest">
              To Protect and To Serve
            </p>

          </div>

        </div>


        {/* ODKAZY */}

        <div className="
          flex
          items-center
          gap-1
          md:gap-3
          text-sm
          md:text-base
        ">

          <a
            href="/"
            className="
              px-3
              py-2
              rounded-lg
              hover:bg-white/10
              hover:text-blue-300
              transition
              whitespace-nowrap
            "
          >
            Domov
          </a>


          <a
            href="/news"
            className="
              px-3
              py-2
              rounded-lg
              hover:bg-white/10
              hover:text-blue-300
              transition
              whitespace-nowrap
            "
          >
            Novinky
          </a>


          <a
            href="/divisions"
            className="
              px-3
              py-2
              rounded-lg
              hover:bg-white/10
              hover:text-blue-300
              transition
              whitespace-nowrap
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
              hover:bg-white/10
              hover:text-blue-300
              transition
              whitespace-nowrap
            "
          >
            Vedení
          </a>


          <a
            href="/officer-login"
            className="
              ml-1
              md:ml-2
              bg-blue-600
              hover:bg-blue-500
              px-4
              py-2
              rounded-lg
              font-semibold
              transition
              shadow-lg
              shadow-blue-900/40
              whitespace-nowrap
            "
          >
            Přihlášení
          </a>

        </div>

      </nav>


      {/* ================================================= */}
      {/* HLAVIČKA NOVINEK */}
      {/* ================================================= */}

      <section className="
        relative
        py-24
        px-6
        text-center
        bg-gradient-to-b
        from-blue-950/30
        via-gray-950
        to-gray-950
      ">

        <div className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500
          to-transparent
        " />

        <p className="
          text-blue-400
          uppercase
          tracking-[0.35em]
          font-bold
          text-sm
          mb-4
        ">
          Los Santos Police Department
        </p>


        <h2 className="
          text-5xl
          md:text-6xl
          font-black
        ">
          Novinky
        </h2>


        <p className="
          max-w-2xl
          mx-auto
          text-gray-400
          text-lg
          mt-5
          leading-relaxed
        ">
          Aktuální informace, oznámení a důležité události
          týkající se Los Santos Police Department.
        </p>

      </section>


      {/* ================================================= */}
      {/* NOVINKY */}
      {/* ================================================= */}

      <section className="
        px-6
        md:px-10
        py-20
        bg-gradient-to-b
        from-gray-950
        via-blue-950/10
        to-gray-950
      ">

        <div className="
          max-w-6xl
          mx-auto
          grid
          md:grid-cols-2
          gap-8
        ">


          {/* NOVINKA 1 */}

          <NewsCard
            date="13. srpna 2026"
            title="Oficiální web Los Santos Police Department"
            text="Vítejte na oficiálních stránkách Los Santos Police Department. Zde budou zveřejňovány důležité informace a oznámení pro veřejnost."
          />


          {/* NOVINKA 2 */}

          <NewsCard
            date="13. srpna 2026"
            title="Informace pro veřejnost"
            text="Veřejnost může prostřednictvím této stránky sledovat aktuální dění, oznámení a další informace týkající se činnosti policejního sboru."
          />


          {/* NOVINKA 3 */}

          <NewsCard
            date="12. srpna 2026"
            title="Bezpečnost města"
            text="Los Santos Police Department pokračuje ve své práci na udržování bezpečnosti a veřejného pořádku v celém městě."
          />


          {/* NOVINKA 4 */}

          <NewsCard
            date="10. srpna 2026"
            title="Policejní sbor"
            text="Naším cílem je poskytovat profesionální policejní službu, chránit obyvatele Los Santos a reagovat na situace, ve kterých je potřeba naše pomoc."
          />

        </div>

      </section>


      {/* ================================================= */}
      {/* INFORMAČNÍ SEKCE */}
      {/* ================================================= */}

      <section className="
        relative
        px-6
        py-24
        bg-gradient-to-b
        from-gray-950
        via-blue-950/20
        to-gray-950
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

        <div className="
          max-w-5xl
          mx-auto
          text-center
        ">

          <p className="
            text-blue-400
            uppercase
            tracking-[0.3em]
            font-bold
            text-sm
            mb-4
          ">
            Informace
          </p>


          <h2 className="
            text-4xl
            md:text-5xl
            font-black
            mb-6
          ">
            Buďte informováni
          </h2>


          <p className="
            max-w-3xl
            mx-auto
            text-gray-400
            text-lg
            leading-relaxed
          ">
            Tato stránka slouží jako veřejný informační prostor
            Los Santos Police Department. Pravidelně zde mohou
            přibývat nová oznámení, informace o dění ve sboru
            a další důležité zprávy.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="
        border-t
        border-blue-900/40
        bg-black
        py-10
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


/* ================================================= */
/* NEWS CARD */
/* ================================================= */

function NewsCard({
  date,
  title,
  text,
}: {
  date: string;
  title: string;
  text: string;
}) {

  return (

    <article className="
      relative
      overflow-hidden
      bg-gray-900/80
      border
      border-gray-800
      rounded-2xl
      p-7
      transition-all
      duration-300
      hover:border-blue-600
      hover:bg-blue-950/20
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-blue-950/30
    ">

      {/* MODRÁ LINKA */}

      <div className="
        absolute
        left-0
        top-0
        bottom-0
        w-1
        bg-blue-600
      " />


      {/* DATUM */}

      <p className="
        text-blue-400
        text-sm
        font-semibold
        uppercase
        tracking-wider
      ">
        {date}
      </p>


      {/* NADPIS */}

      <h3 className="
        text-2xl
        md:text-3xl
        font-black
        mt-3
      ">
        {title}
      </h3>


      {/* TEXT */}

      <p className="
        text-gray-400
        leading-relaxed
        mt-5
      ">
        {text}
      </p>

    </article>

  );
}
