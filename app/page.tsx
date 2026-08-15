"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const photos = [
    "/images/detectiv.png",
    "/images/cars.png",
    "/images/pohreb.png",
    "/images/swatak.png",
    "/images/vedeni.png",
    "/images/porada.png",
    "/images/auto.png",            
  ];

  const [currentPhoto, setCurrentPhoto] = useState(0);

  function previousPhoto() {
    setCurrentPhoto((current) =>
      current === 0 ? photos.length - 1 : current - 1
    );
  }

  function nextPhoto() {
    setCurrentPhoto((current) =>
      current === photos.length - 1 ? 0 : current + 1
    );
  }

  // Automatické přepínání fotografií
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((current) =>
        current === photos.length - 1 ? 0 : current + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <main className="bg-gray-950 text-white overflow-hidden">

      {/* ================================================= */}
      {/* HERO - FOTKA + NAVIGACE */}
      {/* ================================================= */}

      <section className="relative min-h-screen w-full overflow-hidden">

        {/* FOTKA */}

        {photos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt="Los Santos Police Department"
            className={`
              absolute
              inset-0
              w-full
              h-full
              object-cover
              transition-opacity
              duration-1000
              ${
                currentPhoto === index
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />
        ))}

        {/* TMAVÝ OVERLAY */}

        <div className="absolute inset-0 bg-black/55" />

        {/* MODRÝ POLICEJNÍ PŘECHOD */}

        <div className="
          absolute
          inset-0
          bg-gradient-to-br
          from-blue-950/70
          via-transparent
          to-black/80
        " />

        {/* SPODNÍ PŘECHOD */}

        <div className="
          absolute
          bottom-0
          left-0
          right-0
          h-72
          bg-gradient-to-t
          from-gray-950
          via-gray-950/70
          to-transparent
        " />


        {/* ================================================= */}
        {/* NAVIGACE */}
        {/* ================================================= */}

        <nav className="
          absolute
          top-0
          left-0
          right-0
          z-30
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
            gap-2
            md:gap-6
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
                hover:bg-white/10
                hover:text-blue-300
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
                hover:bg-white/10
                hover:text-blue-300
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
                shadow-blue-900/40
              "
            >
              Přihlášení
            </a>

          </div>

        </nav>


        {/* ================================================= */}
        {/* HLAVNÍ TEXT */}
        {/* ================================================= */}

        <div className="
          relative
          z-20
          min-h-screen
          flex
          items-center
          justify-center
          text-center
          px-6
        ">

          <div className="max-w-5xl mt-20">

            <p className="
              text-blue-400
              uppercase
              tracking-[0.5em]
              font-bold
              text-sm
              md:text-base
              mb-5
            ">
              Los Santos Police Department
            </p>

            <h2 className="
              text-5xl
              md:text-7xl
              lg:text-8xl
              font-black
              tracking-tight
              drop-shadow-2xl
            ">
              Protecting
              <br />
              Los Santos
            </h2>

            <p className="
              text-xl
              md:text-3xl
              italic
              text-gray-200
              mt-6
            ">
              "To Protect and To Serve"
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfHjjMiVgWszcvmgb6NcI1THAaMMQyayVMR6CnBJavni3Fpog/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                mt-10
                bg-blue-600
                hover:bg-blue-500
                px-8
                py-4
                rounded-xl
                font-bold
                text-lg
                transition
                shadow-xl
                shadow-blue-900/40
                hover:scale-105
              "
            >
              Přidej se k LSPD
            </a>

          </div>

        </div>


        {/* ================================================= */}
        {/* ŠIPKY */}
        {/* ================================================= */}

        <button
          onClick={previousPhoto}
          aria-label="Předchozí fotografie"
          className="
            absolute
            z-30
            left-4
            md:left-8
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            md:w-14
            md:h-14
            rounded-full
            bg-black/40
            hover:bg-blue-600/80
            border
            border-white/20
            text-2xl
            transition
            backdrop-blur-sm
          "
        >
          ←
        </button>


        <button
          onClick={nextPhoto}
          aria-label="Další fotografie"
          className="
            absolute
            z-30
            right-4
            md:right-8
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            md:w-14
            md:h-14
            rounded-full
            bg-black/40
            hover:bg-blue-600/80
            border
            border-white/20
            text-2xl
            transition
            backdrop-blur-sm
          "
        >
          →
        </button>


        {/* ================================================= */}
        {/* INDIKÁTORY */}
        {/* ================================================= */}

        <div className="
          absolute
          z-30
          bottom-10
          left-1/2
          -translate-x-1/2
          flex
          gap-3
        ">

          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              aria-label={`Fotografie ${index + 1}`}
              className={`
                h-2
                rounded-full
                transition-all
                duration-300
                ${
                  currentPhoto === index
                    ? "w-10 bg-blue-500"
                    : "w-2 bg-white/50 hover:bg-white"
                }
              `}
            />
          ))}

        </div>

      </section>


      {/* ================================================= */}
      {/* MODRÁ PŘEDĚLOVACÍ SEKCE */}
      {/* ================================================= */}

      <section className="
        relative
        py-24
        px-6
        bg-gradient-to-b
        from-gray-950
        via-blue-950/30
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

        <div className="max-w-6xl mx-auto text-center">

          <p className="
            text-blue-400
            uppercase
            tracking-[0.35em]
            font-bold
            text-sm
            mb-4
          ">
            Naše poslání
          </p>

          <h2 className="
            text-4xl
            md:text-5xl
            font-black
            mb-6
          ">
            Bezpečnost města.
            <br />
            <span className="text-blue-400">
              Naše odpovědnost.
            </span>
          </h2>

          <p className="
            max-w-3xl
            mx-auto
            text-gray-400
            text-lg
            leading-relaxed
          ">
            Los Santos Police Department je zde pro obyvatele
            města každý den. Naším cílem je chránit životy,
            udržovat veřejný pořádek a reagovat na situace,
            ve kterých je potřeba naše pomoc.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* STATISTIKY */}
      {/* ================================================= */}

      <section className="
        px-6
        py-20
        bg-gradient-to-b
        from-gray-950
        to-blue-950/20
      ">

        <div className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
        ">

          <Stat
            number="24/7"
            text="Policejní služba"
          />

          <Stat
            number="911"
            text="Pomoc v nouzi"
          />

          <Stat
            number="∞"
            text="Odhodlání sloužit"
          />

          <Stat
            number="1"
            text="Bezpečné Los Santos"
          />

        </div>

      </section>


      {/* ================================================= */}
      {/* VEDENÍ */}
      {/* ================================================= */}

      <section className="
        px-6
        md:px-10
        py-24
        bg-gradient-to-b
        from-blue-950/20
        via-gray-950
        to-gray-950
      ">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <p className="
              text-blue-400
              uppercase
              tracking-[0.3em]
              text-sm
              font-bold
              mb-4
            ">
              Command Staff
            </p>

            <h2 className="
              text-4xl
              md:text-5xl
              font-black
            ">
              Vedení sboru
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            <OfficerCard
              rank="Chief of Police"
              name="Jacob William Benning"
              image="/images/benning.png"
            />

            <OfficerCard
              rank="First Assistant Chief of Police"
              name="Weston Troy Lopez"
              image="/images/Lopez.png"
            />

            <OfficerCard
              rank="Assistant Chief of Police"
              name="John Williams"
              image="/images/john-williams.png"
            />

          </div>


          <div className="
            grid
            md:grid-cols-3
            gap-8
            mt-10
            max-w-6xl
            mx-auto
          ">

            <OfficerCard
              rank="Deputy Chief of Police"
              name="David Bradford"
              image="/images/david-bradford.png"
            />

            <OfficerCard
              rank="Deputy Chief of Police"
              name="Henry Willis"
              image="/images/wilis.png"
            />

            <OfficerCard
              rank="Deputy Chief of Detective Bureau"
              name="Michael Joseph Truman"
              image="/images/michael-truman.png"
            />

          </div>

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
/* STATISTIKA */
/* ================================================= */

function Stat({
  number,
  text,
}: {
  number: string;
  text: string;
}) {

  return (

    <div className="
      relative
      overflow-hidden
      bg-gray-900/80
      border
      border-blue-900/50
      rounded-2xl
      p-7
      text-center
      hover:border-blue-500
      hover:bg-blue-950/30
      transition-all
      duration-300
    ">

      <div className="
        text-4xl
        md:text-5xl
        font-black
        text-blue-400
      ">
        {number}
      </div>

      <p className="
        text-gray-300
        mt-3
        font-semibold
      ">
        {text}
      </p>

    </div>

  );
}


/* ================================================= */
/* OFFICER CARD */
/* ================================================= */

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

    <div className="
      bg-gray-900/80
      border
      border-gray-800
      hover:border-blue-600
      rounded-2xl
      p-6
      text-center
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-blue-950/30
    ">

      <img
        src={image}
        alt={name}
        className="
          w-32
          h-36
          mx-auto
          mt-5
          mb-5
          rounded-full
          object-cover
          object-top
          border-4
          border-gray-700
        "
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