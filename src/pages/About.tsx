const team = [
  { name: "Hui Ru Yang", subject: "Physics", image: "/pictures/yang.jpeg" },
  { name: "Anna Udičová", subject: "Chemistry" },
  { name: "Ela Sabolová", subject: "Biology" },
  { name: "Milana Golubková", subject: "Environmental Systems and Societies" },
  { name: "Alexander Hvezdoň Štefko", subject: "Computer Science" },
];

export default function About() {
  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">
            About
          </span>
          <h1 className="text-4xl font-bold text-slate-950 mt-2 mb-3">
            About Us
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            Five IB Diploma students from five disciplines, collaborating across
            subject boundaries to investigate a real-world health and
            sustainability challenge.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {team.map(({ name, subject, image }) => (
            <div
              key={name}
              className="border border-slate-200 rounded-2xl p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
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
              <h3 className="text-lg font-bold text-slate-950 mb-1">{name}</h3>
              <p className="text-base text-rose-500 font-medium">{subject}</p>
            </div>
          ))}
        </div>

        <div className="bg-rose-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-slate-950 mb-3">
            About This Project
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            This IB Collaborative Science project investigates menstrual
            products across Biology, Chemistry, Physics, and Environmental
            Science. Seven branded products from three manufacturers were tested
            in a controlled school laboratory setting. The findings are
            presented here alongside an interactive recommendation tool.
          </p>
        </div>
      </div>
    </div>
  );
}
