const team = [
  { name: "Hui Ru Yang", subject: "Physics" },
  { name: "Anna Udicova", subject: "Chemistry" },
  { name: "Ela Sabolova", subject: "Environmental Science" },
  { name: "Milana Golubkova", subject: "Biology" },
  { name: "Alexander Hvezdon Stefko", subject: "Computer Science" },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">
          About
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">
          About Us
        </h1>
        <p className="text-slate-500 max-w-2xl">
          Five IB Diploma students from three disciplines, collaborating across
          subject boundaries to investigate a real-world health and
          sustainability challenge.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {team.map(({ name, subject }) => (
          <div key={name} className="border border-slate-100 rounded-2xl p-6">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-rose-300">
                {name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{name}</h3>
            <p className="text-sm text-rose-500">{subject}</p>
          </div>
        ))}
      </div>

      <div className="bg-rose-50 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          About This Project
        </h2>
        <p className="text-slate-600 leading-relaxed">
          This IB Collaborative Science project investigates menstrual products
          across Biology, Chemistry, Physics, and Environmental Science. Seven
          branded products from three manufacturers were tested in a controlled
          school laboratory setting. The findings are presented here alongside
          an interactive recommendation tool.
        </p>
      </div>
    </div>
  );
}
