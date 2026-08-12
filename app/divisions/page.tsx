import asdImage from "../images/asd2.png";


export default function Divisions() {
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

          <a href="/" className="hover:text-blue-400">
            Home
          </a>

          <a href="/divisions" className="hover:text-blue-400">
            Divisions
          </a>

          <a href="/command" className="hover:text-blue-400">
            Vedení
          </a>

          <a
            href="/officer-login"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Officer Login
          </a>

        </div>

      </nav>





      {/* Nadpis */}
      <section className="text-center py-20">

        <h2 className="text-5xl font-bold">
          Divisions
        </h2>

        <p className="text-gray-400 text-xl mt-4">
          Specializované jednotky Los Santos Police Department
        </p>

      </section>





      {/* Divize */}
      <section className="px-10 pb-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">


          <DivisionCard
            name="Detective Bureau"
            description="Divize zaměřená na vyšetřování závažné trestné činnosti, práci s důkazy a vedení vyšetřování."
          />


          <DivisionCard
            name="Special Weapons and Tactics"
            description="Speciální taktická jednotka určená pro řešení vysoce rizikových situací a krizových událostí."
          />


          <DivisionCard
            name="Recruitment Training Division"
            description="Zodpovídá za nábor nových členů, výcvik a přípravu budoucích policistů LSPD."
          />


          <DivisionCard
            name="Gang and Narcotics Division"
            description="Jednotka zaměřená na boj proti gangům, organizovanému zločinu a drogové kriminalitě."
          />


          <DivisionCard
            name="Air Support Division"
            description="Poskytuje leteckou podporu, průzkum ze vzduchu a asistenci ostatním jednotkám."
            image={asdImage.src}
          />


          <DivisionCard
            name="Traffic Enforcement Division"
            description="Zajišťuje dohled nad bezpečností silničního provozu a řešení dopravních přestupků."
          />


          <DivisionCard
            name="Canine Platoon"
            description="Jednotka služebních psů využívaná při pátrání, zadržení pachatelů a vyhledávání důkazů."
          />


        </div>

      </section>


    </main>
  );
}







function DivisionCard({
  name,
  description,
  image
}: {
  name: string;
  description: string;
  image?: string;
}) {


  return (

    <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 hover:border-blue-500 transition">


      {image && (

        <div className="w-full h-72 rounded-lg mb-6 flex items-center justify-center overflow-hidden">

          <img
            src={image}
            className="w-full h-full object-contain scale-150"
            alt={name}
          />

        </div>

      )}



      <h3 className="text-2xl font-bold mb-4">
        {name}
      </h3>



      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>




      <button
        className="mt-6 bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Více informací
      </button>


    </div>

  );

}