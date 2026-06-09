const team = [
  { name: "Hui Ru Yang", subject: "Physics", image: "/pictures/lab-21.jpeg" },
  {
    name: "Anna Udičová",
    subject: "Chemistry",
    image: "/pictures/anicka.jpeg",
  },
  { name: "Ela Sabolová", subject: "Biology", image: "/pictures/ela.jpeg" },
  { name: "Milana Golubková", subject: "Environmental Systems and Societies" },
  {
    name: "Alexander Hvezdoň Štefko",
    subject: "Computer Science",
    image: "/pictures/alex.png",
  },
];

export default function About() {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-rose-500 uppercase">
            About
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-950 mt-1 sm:mt-2 mb-2 sm:mb-3">
            About Us
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl">
            Five IB Diploma students from five disciplines, collaborating across
            subjects to investigate a real-world health and sustainability
            challenge.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {team.map(({ name, subject, image }) => (
            <div
              key={name}
              className="border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex items-center gap-4 sm:gap-5"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1">
                  {name}
                </h3>
                <p className="text-sm sm:text-base text-rose-500 font-medium">{subject}</p>
              </div>
              <div className="w-20 h-20 shrink-0 rounded-full bg-rose-50 flex items-center justify-center overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className={`w-full h-full object-cover ${image === "/pictures/ela.jpeg" ? "scale-[3] origin-top" : image === "/pictures/alex.png" ? "scale-150 translate-x-1 -translate-y-1" : ""}`}
                  />
                ) : (
                  <span className="text-2xl font-bold text-rose-500">
                    {name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-rose-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 sm:mb-3">
            About This Project
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            This IB Collaborative Science project investigates menstrual
            products across Biology, Chemistry, Physics, and Environmental
            Science. Physics involved hands-on laboratory experiments
            measuring absorption capacity and rate for all seven products. The
            Biology, Chemistry, and Environmental Science assessments are based
            on published literature review and peer-reviewed scientific studies.
            Computer Science contributed the interactive web platform, data
            processing, and statistical analysis that makes the findings
            accessible. The results are presented here alongside an interactive
            recommendation tool.
          </p>
        </div>
      </div>
    </div>
  );
}
